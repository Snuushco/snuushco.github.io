import { randomUUID } from "crypto";
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

    create table if not exists snuushco_conversion_events (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      event_name text not null,
      lead_id bigint references snuushco_intakes(id) on delete set null,
      session_id text,
      source text,
      campaign text,
      path text,
      metadata jsonb not null default '{}'::jsonb
    );

    create index if not exists snuushco_conversion_events_created_at_idx on snuushco_conversion_events (created_at desc);
    create index if not exists snuushco_conversion_events_event_name_idx on snuushco_conversion_events (event_name);
    create index if not exists snuushco_conversion_events_lead_id_idx on snuushco_conversion_events (lead_id);

    create table if not exists kassie_marketing_leads (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      kind text not null check (kind in ('newsletter', 'contact')),
      email text not null,
      name text,
      company text,
      phone text,
      topic text,
      message text,
      consent boolean not null default false,
      source text,
      status text not null default 'new',
      review_owner text,
      review_notes text,
      unsubscribe_token text not null unique,
      unsubscribed_at timestamptz,
      resend_status text not null default 'disabled',
      metadata jsonb not null default '{}'::jsonb
    );

    create index if not exists kassie_marketing_leads_created_at_idx on kassie_marketing_leads (created_at desc);
    create index if not exists kassie_marketing_leads_kind_idx on kassie_marketing_leads (kind);
    create index if not exists kassie_marketing_leads_email_idx on kassie_marketing_leads (email);
    create index if not exists kassie_marketing_leads_status_idx on kassie_marketing_leads (status);
  `);

  await db.query(`
    alter table snuushco_intakes
      add column if not exists ops_priority text not null default 'normal',
      add column if not exists ops_owner text,
      add column if not exists next_action text,
      add column if not exists ops_notes text,
      add column if not exists next_action_at timestamptz;

    alter table snuushco_fulfillment_tasks
      add column if not exists ops_owner text,
      add column if not exists next_action text,
      add column if not exists ops_notes text;

    create index if not exists snuushco_intakes_ops_priority_idx on snuushco_intakes (ops_priority);
    create index if not exists snuushco_intakes_ops_owner_idx on snuushco_intakes (ops_owner);
  `);

  return true;
}

export async function saveConversionEvent(input: {
  eventName: string;
  leadId?: string | null;
  sessionId?: string | null;
  source?: string | null;
  campaign?: string | null;
  path?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const db = getPool();
  if (!db) return null;

  await ensureSnuushcoTables();

  const result = await db.query(
    `
      insert into snuushco_conversion_events (
        event_name,
        lead_id,
        session_id,
        source,
        campaign,
        path,
        metadata
      )
      values ($1, nullif($2, '')::bigint, nullif($3, ''), nullif($4, ''), nullif($5, ''), nullif($6, ''), $7::jsonb)
      returning id
    `,
    [
      input.eventName,
      input.leadId ?? "",
      input.sessionId ?? "",
      input.source ?? "",
      input.campaign ?? "",
      input.path ?? "",
      JSON.stringify(input.metadata ?? {}),
    ],
  );

  return String(result.rows[0].id);
}

export type KassieMarketingLeadInput = {
  kind: "newsletter" | "contact";
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  topic?: string;
  message?: string;
  consent: boolean;
  source?: string;
  metadata?: Record<string, unknown>;
};

export async function saveKassieMarketingLead(input: KassieMarketingLeadInput) {
  const db = getPool();
  if (!db) return null;

  await ensureSnuushcoTables();

  const result = await db.query(
    `
      insert into kassie_marketing_leads (
        kind,
        email,
        name,
        company,
        phone,
        topic,
        message,
        consent,
        source,
        unsubscribe_token,
        metadata
      )
      values ($1, lower($2), nullif($3, ''), nullif($4, ''), nullif($5, ''), nullif($6, ''), nullif($7, ''), $8, nullif($9, ''), $10, $11::jsonb)
      returning id, unsubscribe_token
    `,
    [
      input.kind,
      input.email,
      input.name ?? "",
      input.company ?? "",
      input.phone ?? "",
      input.topic ?? "",
      input.message ?? "",
      input.consent,
      input.source ?? "kassieapp.nl",
      randomUUID(),
      JSON.stringify(input.metadata ?? {}),
    ],
  );

  return { id: String(result.rows[0].id), unsubscribeToken: String(result.rows[0].unsubscribe_token) };
}

export async function unsubscribeKassieMarketingLead(token: string) {
  const db = getPool();
  if (!db) return { database: "not_configured", updated: false };

  await ensureSnuushcoTables();

  const result = await db.query(
    `
      update kassie_marketing_leads
      set unsubscribed_at = now(),
          status = 'unsubscribed',
          updated_at = now()
      where unsubscribe_token = $1
      returning id
    `,
    [token],
  );

  return { database: "ok", updated: (result.rowCount ?? 0) > 0 };
}

export function getKassieResendState() {
  const apiKeyConfigured = Boolean(process.env.RESEND_API_KEY);
  const sendingEnabled = process.env.KASSIE_RESEND_SENDING_ENABLED === "true";
  const from = process.env.KASSIE_NEWSLETTER_FROM || "nieuwsbrief@kassieapp.nl";
  const contactTo = process.env.KASSIE_CONTACT_TO || "contact@kassieapp.nl";

  return {
    apiKeyConfigured,
    sendingEnabled: apiKeyConfigured && sendingEnabled,
    from,
    contactTo,
  };
}

export async function maybeSendKassieOwnerNotification(input: KassieMarketingLeadInput & { leadId: string }) {
  const resend = getKassieResendState();
  let status = "disabled";
  if (!resend.sendingEnabled) {
    status = resend.apiKeyConfigured ? "configured_disabled" : "disabled";
  } else {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: resend.from,
        to: [resend.contactTo],
        subject: input.kind === "newsletter" ? "Nieuwe Kassie nieuwsbrief opt-in" : "Nieuw Kassie contactbericht",
        text: [
          `Type: ${input.kind}`,
          `Lead: ${input.leadId}`,
          `Naam: ${input.name ?? "-"}`,
          `Bedrijf: ${input.company ?? "-"}`,
          `E-mail: ${input.email}`,
          `Telefoon: ${input.phone ?? "-"}`,
          `Onderwerp: ${input.topic ?? "-"}`,
          "",
          input.message ?? "",
          "",
          "Geen campagne verzonden. Dit is alleen een interne review-notificatie.",
        ].join("\n"),
      }),
    });
    status = response.ok ? "owner_notification_sent" : "owner_notification_failed";
  }

  const db = getPool();
  if (db) {
    await db.query(
      `
        update kassie_marketing_leads
        set resend_status = $2,
            updated_at = now()
        where id = $1
      `,
      [input.leadId, status],
    );
  }

  return status;
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

  const [intakes, tasks, events] = await Promise.all([
    db.query("select count(*)::int as count from snuushco_intakes"),
    db.query("select status, count(*)::int as count from snuushco_fulfillment_tasks group by status order by status"),
    db.query("select event_name, count(*)::int as count from snuushco_conversion_events group by event_name order by event_name"),
  ]);

  return {
    database: "ok",
    intakes: intakes.rows[0].count,
    fulfillment: tasks.rows,
    events: events.rows,
  };
}

export async function getOperationsDashboard(filters: { q?: string; status?: string; owner?: string } = {}) {
  const db = getPool();
  if (!db) {
    return { database: "not_configured", leads: [], tasks: [], summary: [], kassieLeads: [], kassieSummary: [] };
  }

  await ensureSnuushcoTables();

  const where: string[] = [];
  const params: string[] = [];
  if (filters.q) {
    params.push(`%${filters.q}%`);
    where.push(`(
      company ilike $${params.length}
      or email ilike $${params.length}
      or segment ilike $${params.length}
      or market ilike $${params.length}
      or package_name ilike $${params.length}
      or intake::text ilike $${params.length}
      or advice::text ilike $${params.length}
    )`);
  }
  if (filters.status) {
    params.push(filters.status);
    where.push(`status = $${params.length}`);
  }
  if (filters.owner) {
    params.push(filters.owner);
    where.push(`coalesce(ops_owner, '') = $${params.length}`);
  }
  const whereSql = where.length ? `where ${where.join(" and ")}` : "";

  const [leads, tasks, summary, events, funnel, kassieLeads, kassieSummary] = await Promise.all([
    db.query(
      `
        select
          id,
          created_at,
          company,
          email,
          segment,
          market,
          package_name,
          price_range,
          route,
          authorization_status,
          status,
          stripe_payment_status,
          ops_priority,
          ops_owner,
          next_action,
          ops_notes,
          next_action_at,
          intake,
          advice
        from snuushco_intakes
        ${whereSql}
        order by created_at desc
        limit 75
      `,
      params,
    ),
    db.query(
      `
        select
          t.id,
          t.lead_id,
          t.created_at,
          t.updated_at,
          t.task_type,
          t.status,
          t.priority,
          t.ops_owner,
          t.next_action,
          t.ops_notes,
          t.package_name,
          t.brief,
          t.checklist,
          i.company,
          i.email
        from snuushco_fulfillment_tasks t
        left join snuushco_intakes i on i.id = t.lead_id
        order by
          case t.priority when 'urgent' then 1 when 'high' then 2 else 3 end,
          t.updated_at desc
        limit 100
      `,
    ),
    db.query(
      `
        select status, count(*)::int as count
        from snuushco_intakes
        group by status
        order by status
      `,
    ),
    db.query(
      `
        select event_name, count(*)::int as count
        from snuushco_conversion_events
        where created_at > now() - interval '30 days'
        group by event_name
        order by event_name
      `,
    ),
    db.query(
      `
        select
          coalesce(nullif(source, ''), 'direct') as source,
          coalesce(nullif(campaign, ''), 'none') as campaign,
          count(*) filter (where event_name = 'landing_view')::int as landing_view,
          count(*) filter (where event_name = 'intake_started')::int as intake_started,
          count(*) filter (where event_name = 'intake_submitted')::int as intake_submitted,
          count(*) filter (where event_name = 'checkout_started')::int as checkout_started,
          count(*) filter (where event_name = 'paid_lead')::int as paid_lead
        from snuushco_conversion_events
        where created_at > now() - interval '30 days'
        group by 1, 2
        order by landing_view desc, intake_submitted desc, checkout_started desc
        limit 25
      `,
    ),
    db.query(
      `
        select
          id,
          created_at,
          kind,
          email,
          name,
          company,
          phone,
          topic,
          message,
          source,
          status,
          review_owner,
          review_notes,
          unsubscribed_at,
          resend_status
        from kassie_marketing_leads
        order by created_at desc
        limit 75
      `,
    ),
    db.query(
      `
        select kind, status, count(*)::int as count
        from kassie_marketing_leads
        group by kind, status
        order by kind, status
      `,
    ),
  ]);

  return {
    database: "ok",
    leads: leads.rows,
    tasks: tasks.rows,
    summary: summary.rows,
    events: events.rows,
    funnel: funnel.rows,
    kassieLeads: kassieLeads.rows,
    kassieSummary: kassieSummary.rows,
  };
}

export async function getLeadDetail(id: string) {
  const db = getPool();
  if (!db) return { database: "not_configured", lead: null, tasks: [] };

  await ensureSnuushcoTables();

  const [lead, tasks] = await Promise.all([
    db.query(
      `
        select
          id,
          created_at,
          company,
          email,
          segment,
          market,
          package_name,
          price_range,
          route,
          authorization_status,
          status,
          stripe_payment_status,
          stripe_checkout_session_id,
          ops_priority,
          ops_owner,
          next_action,
          ops_notes,
          next_action_at,
          intake,
          advice
        from snuushco_intakes
        where id = $1
      `,
      [id],
    ),
    db.query(
      `
        select *
        from snuushco_fulfillment_tasks
        where lead_id = $1
        order by updated_at desc
      `,
      [id],
    ),
  ]);

  return { database: "ok", lead: lead.rows[0] ?? null, tasks: tasks.rows };
}

export async function updateLeadOps(input: {
  id: string;
  status: string;
  priority: string;
  owner?: string;
  nextAction?: string;
  notes?: string;
}) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_intakes
      set status = $2,
          ops_priority = $3,
          ops_owner = nullif($4, ''),
          next_action = nullif($5, ''),
          ops_notes = nullif($6, '')
      where id = $1
    `,
    [input.id, input.status, input.priority, input.owner ?? "", input.nextAction ?? "", input.notes ?? ""],
  );

  return true;
}

export async function updateFulfillmentTaskOps(input: {
  id: string;
  status: string;
  owner?: string;
  nextAction?: string;
  notes?: string;
}) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_fulfillment_tasks
      set status = $2,
          ops_owner = nullif($3, ''),
          next_action = nullif($4, ''),
          ops_notes = nullif($5, ''),
          updated_at = now()
      where id = $1
    `,
    [input.id, input.status, input.owner ?? "", input.nextAction ?? "", input.notes ?? ""],
  );

  return true;
}

export async function updateLeadStatus(id: string, status: string) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_intakes
      set status = $2
      where id = $1
    `,
    [id, status],
  );

  return true;
}

export async function updateFulfillmentTaskStatus(id: string, status: string) {
  const db = getPool();
  if (!db) return false;

  await db.query(
    `
      update snuushco_fulfillment_tasks
      set status = $2,
          updated_at = now()
      where id = $1
    `,
    [id, status],
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
