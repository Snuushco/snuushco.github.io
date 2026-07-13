import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
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

/**
 * Serializes the capacity check and Stripe Checkout Session creation across
 * all server instances. Without this shared Postgres advisory lock, two
 * concurrent requests could both observe the final free pilot slot.
 */
export async function withCashflowLabCheckoutLock<T>(
  operation: (client: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const db = getPool();
  if (!db) throw new Error("cashflow_lab_capacity_lock_unavailable");
  await ensureSnuushcoTables();

  const client = await db.connect();
  try {
    await client.query("begin");
    await client.query("set local lock_timeout = '10s'");
    await client.query("select pg_advisory_xact_lock($1::integer, $2::integer)", [20260713, 9900]);
    const result = await operation(client);
    await client.query("commit");
    return result;
  } catch (error) {
    try {
      await client.query("rollback");
    } catch {
      // Preserve the original checkout failure.
    }
    throw error;
  } finally {
    client.release();
  }
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

    create table if not exists snuushco_cashflow_orders (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      lead_id bigint references snuushco_intakes(id) on delete set null,
      checkout_key text not null unique,
      stripe_checkout_session_id text unique,
      stripe_payment_intent_id text,
      product_key text not null,
      package_name text not null,
      business_email text not null,
      company text not null,
      status text not null,
      attempt integer not null default 1,
      amount integer not null,
      currency text not null,
      source text,
      campaign text,
      qualification_version text not null,
      terms_version text not null,
      checkout_expires_at timestamptz,
      paid_at timestamptz,
      refunded_at timestamptz,
      disputed_at timestamptz,
      notification_sent_at timestamptz,
      notification_error text
    );

    create index if not exists snuushco_cashflow_orders_status_idx on snuushco_cashflow_orders (status);
    create index if not exists snuushco_cashflow_orders_payment_intent_idx on snuushco_cashflow_orders (stripe_payment_intent_id);

    create table if not exists snuushco_cashflow_stripe_events (
      event_id text primary key,
      event_type text not null,
      order_id bigint references snuushco_cashflow_orders(id) on delete cascade,
      received_at timestamptz not null default now()
    );
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

export type CashflowLabCheckoutDecision =
  | { kind: "create"; currentAttempt: number; nextAttempt: number }
  | { kind: "blocked"; reason: "already_paid" | "processing" | "closed" };

export async function getCashflowLabCheckoutDecision(
  client: pg.PoolClient,
  input: { checkoutKey: string },
): Promise<CashflowLabCheckoutDecision> {
  const existing = await client.query<{
    attempt: number;
    status: string;
  }>(
    `
      select attempt, status
      from snuushco_cashflow_orders
      where checkout_key = $1
      for update
    `,
    [input.checkoutKey],
  );
  const order = existing.rows[0];

  if (order?.status === "paid") return { kind: "blocked", reason: "already_paid" };
  if (order?.status === "payment_processing") return { kind: "blocked", reason: "processing" };
  if (order?.status === "refunded" || order?.status === "disputed") {
    return { kind: "blocked", reason: "closed" };
  }

  const currentAttempt = order?.attempt ?? 0;
  return { kind: "create", currentAttempt, nextAttempt: currentAttempt + 1 };
}

export async function getReleasedCashflowLabSessionIds(client: pg.PoolClient) {
  const result = await client.query<{ stripe_checkout_session_id: string }>(
    `
      select stripe_checkout_session_id
      from snuushco_cashflow_orders
      where status in ('refunded', 'disputed')
        and stripe_checkout_session_id is not null
    `,
  );
  return new Set(result.rows.map((row) => row.stripe_checkout_session_id));
}

export async function saveCashflowLabCheckoutReservation(
  client: pg.PoolClient,
  input: {
    checkoutKey: string;
    sessionId: string;
    expiresAt: Date;
    productKey: string;
    packageName: string;
    businessEmail: string;
    company: string;
    attempt: number;
    amount: number;
    currency: string;
    source: string;
    campaign: string;
    qualificationVersion: string;
    termsVersion: string;
  },
) {
  const existing = await client.query<{ lead_id: string | null }>(
    "select lead_id from snuushco_cashflow_orders where checkout_key = $1 for update",
    [input.checkoutKey],
  );
  let leadId = existing.rows[0]?.lead_id ?? null;

  const intake = {
    company: input.company,
    email: input.businessEmail,
    segment: "security",
    market: "b2b",
    productKey: input.productKey,
    qualificationVersion: input.qualificationVersion,
    termsVersion: input.termsVersion,
    dataInstruction: "PII-arme complete intake pas na providerbevestigde betaling",
  };
  const advice = {
    package: input.packageName,
    priceRange: "€ 99 excl. btw",
    route: "cashflow-lab-founder-pilot",
    scope: "één kostenprofiel, één concrete offerte, PDF, drie scenario's en bespreking",
  };

  if (!leadId) {
    const lead = await client.query<{ id: string }>(
      `
        insert into snuushco_intakes (
          company, email, segment, market, package_name, price_range, route,
          authorization_status, status, intake, advice, stripe_checkout_session_id, stripe_payment_status
        ) values ($1, $2, 'security', 'b2b', $3, '€ 99 excl. btw', 'cashflow-lab',
          'self_qualified_pending_intake_review', 'checkout_started', $4::jsonb, $5::jsonb, $6, 'unpaid')
        returning id
      `,
      [input.company, input.businessEmail, input.packageName, JSON.stringify(intake), JSON.stringify(advice), input.sessionId],
    );
    leadId = String(lead.rows[0].id);
  } else {
    await client.query(
      `
        update snuushco_intakes
        set company = $2, email = $3, status = 'checkout_started',
            stripe_checkout_session_id = $4, stripe_payment_status = 'unpaid',
            intake = $5::jsonb, advice = $6::jsonb
        where id = $1
      `,
      [leadId, input.company, input.businessEmail, input.sessionId, JSON.stringify(intake), JSON.stringify(advice)],
    );
  }

  const order = await client.query<{ id: string }>(
    `
      insert into snuushco_cashflow_orders (
        lead_id, checkout_key, stripe_checkout_session_id, product_key, package_name,
        business_email, company, status, attempt, amount, currency, source, campaign,
        qualification_version, terms_version, checkout_expires_at
      ) values (
        $1::bigint, $2, $3, $4, $5, $6, $7, 'checkout_open', $8, $9, $10, $11, $12, $13, $14, $15
      )
      on conflict (checkout_key) do update set
        updated_at = now(), lead_id = excluded.lead_id,
        stripe_checkout_session_id = excluded.stripe_checkout_session_id,
        stripe_payment_intent_id = null, business_email = excluded.business_email,
        company = excluded.company, status = 'checkout_open', attempt = excluded.attempt,
        source = excluded.source, campaign = excluded.campaign,
        qualification_version = excluded.qualification_version, terms_version = excluded.terms_version,
        checkout_expires_at = excluded.checkout_expires_at, notification_error = null
      returning id
    `,
    [
      leadId,
      input.checkoutKey,
      input.sessionId,
      input.productKey,
      input.packageName,
      input.businessEmail,
      input.company,
      input.attempt,
      input.amount,
      input.currency,
      input.source,
      input.campaign,
      input.qualificationVersion,
      input.termsVersion,
      input.expiresAt,
    ],
  );

  await client.query(
    `
      insert into snuushco_fulfillment_tasks (
        lead_id, task_type, status, priority, package_name, brief, checklist
      )
      select $1::bigint, 'cashflow_lab_pilot', 'awaiting_payment', 'high', $2, $3::jsonb, $4::jsonb
      where not exists (
        select 1 from snuushco_fulfillment_tasks where lead_id = $1::bigint and task_type = 'cashflow_lab_pilot'
      )
    `,
    [
      leadId,
      input.packageName,
      JSON.stringify({ productKey: input.productKey, company: input.company, checkoutKey: input.checkoutKey }),
      JSON.stringify([
        "Wacht op providerbevestigde betaling",
        "Vraag daarna PII-arme complete intake op",
        "Controleer scope en capaciteit vóór start",
        "Lever alleen na menselijke review",
      ]),
    ],
  );

  await client.query(
    `
      insert into snuushco_conversion_events (
        event_name, lead_id, session_id, source, campaign, path, metadata
      )
      select 'checkout_started', $1::bigint, $2, $3, $4, '/margecheck-offerteadvies', $5::jsonb
      where not exists (
        select 1 from snuushco_conversion_events
        where event_name = 'checkout_started' and session_id = $2
      )
    `,
    [
      leadId,
      input.sessionId,
      input.source,
      input.campaign,
      JSON.stringify({ productKey: input.productKey, packageName: input.packageName, amount: input.amount }),
    ],
  );

  return { orderId: String(order.rows[0].id), leadId };
}

export async function recordCashflowLabStripeEvent(input: {
  eventId: string;
  eventType: string;
  targetStatus: "paid" | "payment_processing" | "payment_failed" | "expired" | "refunded" | "disputed";
  sessionId?: string | null;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
}) {
  const db = getPool();
  if (!db) throw new Error("cashflow_lab_order_store_unavailable");
  await ensureSnuushcoTables();

  const client = await db.connect();
  try {
    await client.query("begin");
    const lookup = await client.query<{
      id: string;
      lead_id: string | null;
      status: string;
      source: string | null;
      campaign: string | null;
      package_name: string;
      notification_sent_at: Date | null;
      stripe_checkout_session_id: string;
    }>(
      `
        select id, lead_id, status, source, campaign, package_name,
               notification_sent_at, stripe_checkout_session_id
        from snuushco_cashflow_orders
        where ($1::text is not null and stripe_checkout_session_id = $1)
           or ($2::text is not null and stripe_payment_intent_id = $2)
        for update
      `,
      [input.sessionId ?? null, input.paymentIntentId ?? null],
    );
    const order = lookup.rows[0];
    if (!order) {
      await client.query("rollback");
      return { tracked: false, shouldNotify: false, sessionId: null };
    }

    const insertedEvent = await client.query(
      `
        insert into snuushco_cashflow_stripe_events (event_id, event_type, order_id)
        values ($1, $2, $3::bigint)
        on conflict (event_id) do nothing
        returning event_id
      `,
      [input.eventId, input.eventType, order.id],
    );
    if (insertedEvent.rowCount === 0) {
      await client.query("commit");
      return {
        tracked: true,
        shouldNotify: order.status === "paid" && !order.notification_sent_at,
        sessionId: order.stripe_checkout_session_id,
      };
    }

    let nextStatus = input.targetStatus;
    if ((order.status === "refunded" || order.status === "disputed") && nextStatus === "paid") {
      nextStatus = order.status as "refunded" | "disputed";
    }
    if (
      (order.status === "paid" || order.status === "refunded" || order.status === "disputed") &&
      (nextStatus === "payment_failed" || nextStatus === "expired" || nextStatus === "payment_processing")
    ) {
      nextStatus = order.status as "paid" | "refunded" | "disputed";
    }

    const firstPaid = nextStatus === "paid" && order.status !== "paid";
    const firstRefund = nextStatus === "refunded" && order.status !== "refunded";
    const firstDispute = nextStatus === "disputed" && order.status !== "disputed";

    await client.query(
      `
        update snuushco_cashflow_orders
        set status = $2,
            updated_at = now(),
            stripe_payment_intent_id = coalesce(nullif($3, ''), stripe_payment_intent_id),
            paid_at = case when $2 = 'paid' then coalesce(paid_at, now()) else paid_at end,
            refunded_at = case when $2 = 'refunded' then coalesce(refunded_at, now()) else refunded_at end,
            disputed_at = case when $2 = 'disputed' then coalesce(disputed_at, now()) else disputed_at end
        where id = $1::bigint
      `,
      [order.id, nextStatus, input.paymentIntentId ?? ""],
    );

    if (order.lead_id) {
      const leadStatus = nextStatus === "paid" ? "paid" : nextStatus === "refunded" || nextStatus === "disputed" ? "archived" : "checkout_started";
      await client.query(
        `
          update snuushco_intakes
          set stripe_payment_status = $2, status = $3
          where id = $1::bigint
        `,
        [order.lead_id, nextStatus, leadStatus],
      );

      if (nextStatus === "paid") {
        await client.query(
          `update snuushco_fulfillment_tasks set status = 'ready_for_production', updated_at = now()
           where lead_id = $1::bigint and task_type = 'cashflow_lab_pilot' and status = 'awaiting_payment'`,
          [order.lead_id],
        );
      } else if (nextStatus === "refunded" || nextStatus === "disputed") {
        await client.query(
          `update snuushco_fulfillment_tasks set status = 'blocked', updated_at = now(),
             next_action = $2 where lead_id = $1::bigint and task_type = 'cashflow_lab_pilot'`,
          [order.lead_id, nextStatus === "refunded" ? "Niet leveren: betaling terugbetaald" : "Niet leveren: betaling betwist"],
        );
      }
    }

    const conversionName = firstPaid ? "paid_lead" : firstRefund ? "payment_refunded" : firstDispute ? "payment_disputed" : null;
    if (conversionName) {
      await client.query(
        `
          insert into snuushco_conversion_events (
            event_name, lead_id, session_id, source, campaign, path, metadata
          )
          select $1, $2::bigint, $3, $4, $5, '/margecheck-offerteadvies', $6::jsonb
          where not exists (
            select 1 from snuushco_conversion_events where event_name = $1 and session_id = $3
          )
        `,
        [
          conversionName,
          order.lead_id,
          order.stripe_checkout_session_id,
          order.source,
          order.campaign,
          JSON.stringify({ packageName: order.package_name, amountTotal: input.amountTotal ?? null, currency: input.currency ?? "eur" }),
        ],
      );
    }

    await client.query("commit");
    return {
      tracked: true,
      shouldNotify: nextStatus === "paid" && !order.notification_sent_at,
      sessionId: order.stripe_checkout_session_id,
    };
  } catch (error) {
    try {
      await client.query("rollback");
    } catch {
      // Preserve the original webhook failure.
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function markCashflowLabNotification(
  sessionId: string,
  result: { sent: true } | { sent: false; error: string },
) {
  const db = getPool();
  if (!db) throw new Error("cashflow_lab_order_store_unavailable");
  await db.query(
    result.sent
      ? `update snuushco_cashflow_orders set notification_sent_at = coalesce(notification_sent_at, now()), notification_error = null, updated_at = now() where stripe_checkout_session_id = $1`
      : `update snuushco_cashflow_orders set notification_error = $2, updated_at = now() where stripe_checkout_session_id = $1`,
    result.sent ? [sessionId] : [sessionId, ("error" in result ? result.error : "unknown").slice(0, 500)],
  );
}

export async function getCashflowLabOrderStatus(sessionId: string) {
  const db = getPool();
  if (!db) return null;
  await ensureSnuushcoTables();
  const result = await db.query<{ status: string }>(
    "select status from snuushco_cashflow_orders where stripe_checkout_session_id = $1",
    [sessionId],
  );
  return result.rows[0]?.status ?? null;
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
    return { database: "not_configured", leads: [], tasks: [], summary: [] };
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

  const [leads, tasks, summary, events, funnel] = await Promise.all([
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
  ]);

  return {
    database: "ok",
    leads: leads.rows,
    tasks: tasks.rows,
    summary: summary.rows,
    events: events.rows,
    funnel: funnel.rows,
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
