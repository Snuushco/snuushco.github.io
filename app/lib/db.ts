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

  return true;
}
