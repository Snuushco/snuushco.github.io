import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("sslmode=") ? undefined : { rejectUnauthorized: true },
      max: 3,
    });
  }

  return pool;
}

export async function ensureSnuushcoTables() {
  const db = getPool();
  if (!db) return false;

  await db.query(`
    create table if not exists snuushco_intakes (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      company text not null,
      email text not null,
      segment text not null,
      market text not null,
      package_name text not null,
      price_range text not null,
      route text not null,
      authorization_status text not null,
      status text not null default 'new',
      intake jsonb not null,
      advice jsonb not null,
      notification text,
      stripe_checkout_session_id text,
      stripe_payment_status text
    );

    create index if not exists snuushco_intakes_created_at_idx on snuushco_intakes (created_at desc);
    create index if not exists snuushco_intakes_email_idx on snuushco_intakes (email);
    create index if not exists snuushco_intakes_status_idx on snuushco_intakes (status);

    create table if not exists snuushco_fulfillment_tasks (
      id bigserial primary key,
      lead_id bigint references snuushco_intakes(id) on delete cascade,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      task_type text not null,
      status text not null,
      priority text not null default 'normal',
      package_name text not null,
      brief jsonb not null,
      checklist jsonb not null
    );

    create index if not exists snuushco_fulfillment_tasks_lead_id_idx on snuushco_fulfillment_tasks (lead_id);
    create index if not exists snuushco_fulfillment_tasks_status_idx on snuushco_fulfillment_tasks (status);
  `);

  return true;
}

export async function saveIntake(input: {
  intake: Record<string, unknown>;
  advice: Record<string, unknown>;
  authorizationStatus: string;
  notification?: string;
}) {
  const db = getPool();
  if (!db) return null;

  await ensureSnuushcoTables();

  const result = await db.query(
    `
      insert into snuushco_intakes (
        company,
        email,
        segment,
        market,
        package_name,
        price_range,
        route,
        authorization_status,
        intake,
        advice,
        notification
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11)
      returning id
    `,
    [
      input.intake.company,
      input.intake.email,
      input.intake.segment,
      input.intake.market,
      input.advice.package,
      input.advice.priceRange,
      input.advice.route,
      input.authorizationStatus,
      JSON.stringify(input.intake),
      JSON.stringify(input.advice),
      input.notification ?? null,
    ],
  );

  return String(result.rows[0].id);
}

export async function createFulfillmentTask(input: {
  leadId: string;
  taskType: string;
  status: string;
  priority?: string;
  packageName: string;
  brief: Record<string, unknown>;
  checklist: string[];
}) {
  const db = getPool();
  if (!db) return null;

  await ensureSnuushcoTables();

  const result = await db.query(
    `
      insert into snuushco_fulfillment_tasks (
        lead_id,
        task_type,
        status,
        priority,
        package_name,
        brief,
        checklist
      )
      values ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb)
      returning id
    `,
    [
      input.leadId,
      input.taskType,
      input.status,
      input.priority ?? "normal",
      input.packageName,
      JSON.stringify(input.brief),
      JSON.stringify(input.checklist),
    ],
  );

  return String(result.rows[0].id);
}

export async function markCheckoutStarted(leadId: string, sessionId: string) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_intakes
      set stripe_checkout_session_id = $2,
          stripe_payment_status = 'checkout_started',
          status = 'checkout_started'
      where id = $1
    `,
    [leadId, sessionId],
  );

  return true;
}

export async function getOperationsHealth() {
  const db = getPool();
  if (!db) {
    return { database: "not_configured" };
  }

  await ensureSnuushcoTables();

  const [intakes, tasks] = await Promise.all([
    db.query("select count(*)::int as count from snuushco_intakes"),
    db.query("select status, count(*)::int as count from snuushco_fulfillment_tasks group by status order by status"),
  ]);

  return {
    database: "ok",
    intakes: intakes.rows[0].count,
    fulfillment: tasks.rows,
  };
}

export async function markCheckoutCompleted(sessionId: string, paymentStatus: string) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_intakes
      set stripe_payment_status = $2,
          status = case when $2 = 'paid' then 'paid' else status end
      where stripe_checkout_session_id = $1
    `,
    [sessionId, paymentStatus],
  );

  if (paymentStatus === "paid") {
    await db.query(
      `
        update snuushco_fulfillment_tasks
        set status = 'ready_for_production',
            updated_at = now()
        where lead_id = (
          select id from snuushco_intakes where stripe_checkout_session_id = $1
        )
        and status = 'awaiting_payment'
      `,
      [sessionId],
    );
  }

  return true;
}
