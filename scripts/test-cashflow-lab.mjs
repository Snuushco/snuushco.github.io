import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  buildCashflowLabCheckoutParams,
  CASHFLOW_LAB_PRODUCT,
  cashflowLabCheckoutKey,
  cashflowLabCheckoutSchema,
  getCashflowLabProviderAvailability,
  isVerifiedCashflowLabPayment,
  reservesCashflowLabSlot,
} from "../app/lib/cashflow-lab.ts";
import { getCashflowLabCheckoutDecision } from "../app/lib/db.ts";

const validInput = {
  businessEmail: "OWNER@SMALL-SECURITY.EXAMPLE",
  company: "Kleine Beveiliging B.V.",
  isSmallSecurityCompany: "yes",
  hasConcreteB2BQuote: "yes",
  acceptsFixedScope: "yes",
  canProvideSanitizedIntake: "yes",
  source: "warm-intro",
  campaign: "founder-pilot-2026-07",
  privacyAcknowledged: true,
  termsAccepted: true,
};

function mustReject(name, value) {
  assert.equal(
    cashflowLabCheckoutSchema.safeParse(value).success,
    false,
    `${name} moet fail-closed worden geweigerd`,
  );
}

const parsed = cashflowLabCheckoutSchema.parse(validInput);
assert.equal(parsed.businessEmail, "owner@small-security.example");
assert.equal(CASHFLOW_LAB_PRODUCT.amount, 9_900);
assert.equal(CASHFLOW_LAB_PRODUCT.capacity, 3);
assert.equal(CASHFLOW_LAB_PRODUCT.productKey, "margecheck-offerteadvies");
assert.equal(CASHFLOW_LAB_PRODUCT.termsVersion, "2026-07-13");
const checkoutKey = cashflowLabCheckoutKey(parsed);
assert.match(checkoutKey, /^[a-f0-9]{64}$/);
assert.equal(checkoutKey, cashflowLabCheckoutKey({ businessEmail: "owner@small-security.example" }));

for (const field of [
  "isSmallSecurityCompany",
  "hasConcreteB2BQuote",
  "acceptsFixedScope",
  "canProvideSanitizedIntake",
]) {
  mustReject(`${field}=no`, { ...validInput, [field]: "no" });
  const missing = { ...validInput };
  delete missing[field];
  mustReject(`${field} ontbreekt`, missing);
}
mustReject("privacy niet bevestigd", { ...validInput, privacyAcknowledged: false });
mustReject("voorwaarden niet bevestigd", { ...validInput, termsAccepted: false });
mustReject("prijsmanipulatie", { ...validInput, amount: 1 });
mustReject("gevulde honeypot", { ...validInput, website: "https://spam.example" });
mustReject("ongeldig e-mailadres", { ...validInput, businessEmail: "geen-email" });

const checkout = buildCashflowLabCheckoutParams(parsed, "https://snuushco.nl");
assert.equal(checkout.mode, "payment");
assert.deepEqual(checkout.payment_method_types, ["card", "ideal"]);
assert.ok(checkout.expires_at >= Math.floor(Date.now() / 1000) + 34 * 60);
assert.ok(checkout.expires_at <= Math.floor(Date.now() / 1000) + 36 * 60);
assert.equal(checkout.customer_creation, "always");
assert.equal(checkout.billing_address_collection, "required");
assert.deepEqual(checkout.tax_id_collection, { enabled: true });
assert.deepEqual(checkout.automatic_tax, { enabled: true });
assert.deepEqual(checkout.invoice_creation, { enabled: true });
assert.equal(checkout.line_items?.length, 1);
assert.equal(checkout.line_items?.[0]?.quantity, 1);
assert.equal(checkout.line_items?.[0]?.price_data?.unit_amount, 9_900);
assert.equal(checkout.line_items?.[0]?.price_data?.currency, "eur");
assert.equal(checkout.line_items?.[0]?.price_data?.tax_behavior, "exclusive");
assert.equal(
  checkout.line_items?.[0]?.price_data?.product_data?.name,
  "Cashflow Lab — Margecheck + Offerteadvies",
);
assert.equal(checkout.metadata?.productKey, "margecheck-offerteadvies");
assert.equal(checkout.metadata?.checkoutKey, checkoutKey);
assert.equal(checkout.metadata?.privacyAcknowledged, "true");
assert.equal(checkout.metadata?.termsAccepted, "true");
assert.equal(checkout.metadata?.termsVersion, "2026-07-13");
assert.equal(checkout.metadata?.source, "warm-intro");
assert.equal(checkout.metadata?.campaign, "founder-pilot-2026-07");
assert.equal(
  checkout.success_url,
  "https://snuushco.nl/margecheck-offerteadvies/bedankt?session_id={CHECKOUT_SESSION_ID}",
);
assert.equal(
  checkout.cancel_url,
  "https://snuushco.nl/margecheck-offerteadvies?checkout=geannuleerd#geschiktheidscheck",
);

assert.equal(
  isVerifiedCashflowLabPayment({
    payment_status: "paid",
    metadata: { productKey: "margecheck-offerteadvies" },
  }),
  true,
);
assert.equal(
  isVerifiedCashflowLabPayment({
    payment_status: "unpaid",
    metadata: { productKey: "margecheck-offerteadvies" },
  }),
  false,
);
assert.equal(
  isVerifiedCashflowLabPayment({
    payment_status: "paid",
    metadata: { productKey: "ander-product" },
  }),
  false,
);

function fakeDecisionClient({ order = null } = {}) {
  return {
    async query(sql) {
      const text = String(sql);
      if (text.includes("where checkout_key = $1")) {
        return { rows: order ? [order] : [], rowCount: order ? 1 : 0 };
      }
      throw new Error(`unexpected SQL in decision test: ${text}`);
    },
  };
}

const decisionInput = { checkoutKey };
assert.deepEqual(
  await getCashflowLabCheckoutDecision(fakeDecisionClient(), decisionInput),
  { kind: "create", currentAttempt: 0, nextAttempt: 1 },
);
assert.deepEqual(
  await getCashflowLabCheckoutDecision(
    fakeDecisionClient({ order: { status: "paid", attempt: 1 } }),
    decisionInput,
  ),
  { kind: "blocked", reason: "already_paid" },
);
assert.deepEqual(
  await getCashflowLabCheckoutDecision(
    fakeDecisionClient({ order: { status: "checkout_open", attempt: 1 } }),
    decisionInput,
  ),
  { kind: "create", currentAttempt: 1, nextAttempt: 2 },
);

const now = Math.floor(Date.now() / 1_000);
const providerSessions = [
  {
    id: "cs_open_same_key",
    metadata: { productKey: CASHFLOW_LAB_PRODUCT.productKey, checkoutKey },
    payment_status: "unpaid",
    status: "open",
    expires_at: now + 600,
    url: "https://checkout.stripe.com/c/pay/cs_open_same_key",
    payment_intent: null,
  },
  {
    id: "cs_paid_other",
    metadata: { productKey: CASHFLOW_LAB_PRODUCT.productKey, checkoutKey: "other" },
    payment_status: "paid",
    status: "complete",
    expires_at: now - 60,
    url: null,
    payment_intent: { status: "succeeded" },
  },
  {
    id: "cs_unrelated",
    metadata: { productKey: "other" },
    payment_status: "paid",
    status: "complete",
    expires_at: now,
    url: null,
    payment_intent: { status: "succeeded" },
  },
];
assert.equal(reservesCashflowLabSlot(providerSessions[0], new Set(), now), true);
assert.equal(reservesCashflowLabSlot(providerSessions[1], new Set(["cs_paid_other"]), now), false);
const providerAvailability = await getCashflowLabProviderAvailability(
  { checkout: { sessions: { list: async () => ({ data: providerSessions, has_more: false }) } } },
  checkoutKey,
);
assert.equal(providerAvailability.reservedSlots, 2);
assert.equal(providerAvailability.hasCapacity, true);
assert.equal(providerAvailability.reusableSession?.id, "cs_open_same_key");

const root = new URL("../", import.meta.url);
const files = {
  landing: await readFile(new URL("app/margecheck-offerteadvies/page.tsx", root), "utf8"),
  form: await readFile(new URL("app/margecheck-offerteadvies/suitability-form.tsx", root), "utf8"),
  thanks: await readFile(new URL("app/margecheck-offerteadvies/bedankt/page.tsx", root), "utf8"),
  route: await readFile(new URL("app/api/cashflow-lab/checkout/route.ts", root), "utf8"),
  cashflow: await readFile(new URL("app/lib/cashflow-lab.ts", root), "utf8"),
  webhook: await readFile(new URL("app/api/stripe/webhook/route.ts", root), "utf8"),
  notification: await readFile(new URL("app/lib/cashflow-lab-notification.ts", root), "utf8"),
  db: await readFile(new URL("app/lib/db.ts", root), "utf8"),
  terms: await readFile(new URL("app/voorwaarden/page.tsx", root), "utf8"),
  privacy: await readFile(new URL("app/privacy/page.tsx", root), "utf8"),
};

for (const marker of [
  "€ 99",
  "Maximaal 3 founder-pilots",
  "geen cao-, juridisch, fiscaal, boekhoudkundig",
  "geen losse tool of download",
]) {
  assert.match(files.landing, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
}
assert.match(files.landing, /TrackingPixel/);
assert.match(files.landing, /voorlopige zelfcheck/);
assert.match(files.form, /Deel hier geen cijfers, offerte-inhoud, documenten of medewerker- en klantgegevens/);
assert.match(files.form, /aria-busy/);
assert.match(files.thanks, /getCashflowLabOrderStatus/);
assert.match(files.thanks, /orderStatus === "paid"/);
assert.match(files.thanks, /dit scherm is daarom geen betalingsbewijs/i);
assert.match(files.route, /cashflowLabCheckoutSchema\.safeParse/);
assert.match(files.route, /withCashflowLabCheckoutLock/);
assert.match(files.route, /getCashflowLabCheckoutDecision/);
assert.match(files.route, /saveCashflowLabCheckoutReservation/);
assert.match(files.route, /idempotencyKey/);
assert.doesNotMatch(files.route, /checkout\.sessions\.list/);
assert.match(files.cashflow, /created: \{ gte: CASHFLOW_LAB_PRODUCT\.launchEpoch \}/);
assert.match(files.cashflow, /page < 10/);
assert.match(files.cashflow, /cashflow_lab_provider_scan_limit_reached/);
assert.match(files.db, /create table if not exists snuushco_cashflow_orders/);
assert.match(files.db, /checkout_key text not null unique/);
assert.match(files.db, /snuushco_cashflow_stripe_events/);
assert.match(files.db, /on conflict \(event_id\) do nothing/);
assert.match(files.db, /insertedEvent\.rowCount === 0/);
assert.match(files.db, /payment_refunded/);
assert.match(files.db, /payment_disputed/);
assert.match(files.webhook, /checkout\.session\.async_payment_succeeded/);
assert.match(files.webhook, /checkout\.session\.async_payment_failed/);
assert.match(files.webhook, /charge\.refunded/);
assert.match(files.webhook, /charge\.dispute\.created/);
assert.match(files.webhook, /cashflowSessionForPaymentIntent/);
assert.match(files.webhook, /payment_intent: paymentIntentId/);
assert.match(files.notification, /markCashflowLabNotification/);
assert.match(files.thanks, /finishCashflowLabPaymentNotification\(reconciliation\)/);
assert.doesNotMatch(files.webhook, /metadata\?\.company.*sendMessage/s);
assert.match(files.terms, /Versie 2026-07-13/);
assert.match(files.terms, /zeven kalenderdagen/);
assert.match(files.privacy, /uiterlijk na 90 dagen/);
assert.match(files.privacy, /zeven jaar/);
assert.doesNotMatch(files.landing, /Praesidion Holding B\.V\./);

console.log("CASHFLOW_LAB_TEST_PASS schema=11 checkout=22 ledger=10 webhooks=7 copy=18");
