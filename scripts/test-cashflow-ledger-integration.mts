import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import pg from "pg";
import {
  ensureSnuushcoTables,
  getCashflowLabCheckoutDecision,
  getCashflowLabOrderStatus,
  recordCashflowLabStripeEvent,
  saveCashflowLabCheckoutReservation,
} from "../app/lib/db.ts";

const { Client } = pg;
const envFile = process.env.VERCEL_ENV_FILE;
if (envFile) {
  const line = readFileSync(envFile, "utf8")
    .split(/\n/)
    .find((candidate) => candidate.startsWith("DATABASE_URL="));
  assert.ok(line, "DATABASE_URL ontbreekt in Vercel-envbestand");
  process.env.DATABASE_URL = JSON.parse(line.slice("DATABASE_URL=".length).replace(/\r$/, "")).trim();
}
const token = `${Date.now()}${Math.random().toString(16).slice(2)}`;
const checkoutKey = `integration-${token}`;
const sessionId = `cs_test_cashflow_${token}`;
const paymentIntentId = `pi_test_cashflow_${token}`;
let leadId: string | null = null;

assert.ok(process.env.DATABASE_URL, "DATABASE_URL ontbreekt");
await ensureSnuushcoTables();
const connectionString = process.env.DATABASE_URL.trim();
const client = new Client({
  connectionString,
  ssl: connectionString.includes("sslmode=") ? undefined : { rejectUnauthorized: true },
});
await client.connect();

try {
  await client.query("begin");
  assert.deepEqual(
    await getCashflowLabCheckoutDecision(client, { checkoutKey }),
    { kind: "create", currentAttempt: 0, nextAttempt: 1 },
  );
  const reservation = await saveCashflowLabCheckoutReservation(client, {
    checkoutKey,
    sessionId,
    expiresAt: new Date(Date.now() + 35 * 60_000),
    productKey: "margecheck-offerteadvies",
    packageName: "Cashflow Lab Margecheck + Offerteadvies — integration test",
    businessEmail: `integration-${token}@example.invalid`,
    company: "__CASHFLOW_LEDGER_INTEGRATION_TEST__",
    attempt: 1,
    amount: 9900,
    currency: "eur",
    source: "integration-test",
    campaign: "integration-test",
    qualificationVersion: "2026-07",
    termsVersion: "2026-07-13",
  });
  leadId = reservation.leadId;
  await client.query("commit");

  const processingEventId = `evt_test_processing_${token}`;
  await recordCashflowLabStripeEvent({
    eventId: processingEventId,
    eventType: "checkout.session.completed",
    targetStatus: "payment_processing",
    sessionId,
    paymentIntentId,
    amountTotal: 11979,
    currency: "eur",
  });
  await recordCashflowLabStripeEvent({
    eventId: `evt_test_failed_${token}`,
    eventType: "checkout.session.async_payment_failed",
    targetStatus: "payment_failed",
    sessionId,
    paymentIntentId,
    amountTotal: 11979,
    currency: "eur",
  });
  await recordCashflowLabStripeEvent({
    eventId: processingEventId,
    eventType: "checkout.session.completed",
    targetStatus: "payment_processing",
    sessionId,
    paymentIntentId,
    amountTotal: 11979,
    currency: "eur",
  });
  assert.equal(await getCashflowLabOrderStatus(sessionId), "payment_failed");

  await recordCashflowLabStripeEvent({
    eventId: `evt_test_refund_${token}`,
    eventType: "charge.refunded",
    targetStatus: "refunded",
    sessionId,
    paymentIntentId,
    amountTotal: 0,
    currency: "eur",
  });
  const latePaid = await recordCashflowLabStripeEvent({
    eventId: `evt_test_paid_${token}`,
    eventType: "checkout.session.completed",
    targetStatus: "paid",
    sessionId,
    paymentIntentId,
    amountTotal: 11979,
    currency: "eur",
  });
  assert.deepEqual(
    { status: await getCashflowLabOrderStatus(sessionId), shouldNotify: latePaid.shouldNotify },
    { status: "refunded", shouldNotify: false },
  );

  const evidence = await client.query(
    `select
      (select count(*)::int from snuushco_cashflow_stripe_events e join snuushco_cashflow_orders o on o.id=e.order_id where o.stripe_checkout_session_id=$1) as stripe_events,
      (select count(*)::int from snuushco_conversion_events where session_id=$1 and event_name='paid_lead') as paid_events,
      (select count(*)::int from snuushco_conversion_events where session_id=$1 and event_name='payment_refunded') as refund_events,
      (select status from snuushco_intakes where id=$2::bigint) as lead_status,
      (select status from snuushco_fulfillment_tasks where lead_id=$2::bigint and task_type='cashflow_lab_pilot') as task_status`,
    [sessionId, leadId],
  );
  assert.deepEqual(evidence.rows[0], {
    stripe_events: 4,
    paid_events: 0,
    refund_events: 1,
    lead_status: "archived",
    task_status: "blocked",
  });
  console.log("CASHFLOW_LEDGER_INTEGRATION_PASS create=1 duplicate_no_regression=1 refund_before_paid=1 terminal_refund=1 fulfillment=blocked");
} finally {
  try { await client.query("rollback"); } catch {}
  await client.query("delete from snuushco_cashflow_orders where checkout_key=$1", [checkoutKey]);
  await client.query("delete from snuushco_conversion_events where session_id=$1", [sessionId]);
  if (leadId) await client.query("delete from snuushco_intakes where id=$1::bigint", [leadId]);
  const leftovers = await client.query(
    `select
      (select count(*)::int from snuushco_cashflow_orders where checkout_key=$1) +
      (select count(*)::int from snuushco_conversion_events where session_id=$2) +
      (select count(*)::int from snuushco_intakes where company='__CASHFLOW_LEDGER_INTEGRATION_TEST__') as count`,
    [checkoutKey, sessionId],
  );
  assert.equal(leftovers.rows[0].count, 0, "integratietestdata is niet volledig verwijderd");
  await client.end();
}
