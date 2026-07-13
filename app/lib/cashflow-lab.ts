import { createHash } from "node:crypto";
import type Stripe from "stripe";
import { z } from "zod";

export const CASHFLOW_LAB_PRODUCT = {
  amount: 9_900,
  campaign: "founder-pilot-2026-07",
  capacity: 3,
  currency: "eur",
  launchEpoch: Math.floor(Date.UTC(2026, 6, 13) / 1_000),
  packageName: "Cashflow Lab Margecheck + Offerteadvies — founder-pilot",
  productKey: "margecheck-offerteadvies",
  productName: "Cashflow Lab — Margecheck + Offerteadvies",
  qualificationVersion: "2026-07",
  termsVersion: "2026-07-13",
} as const;

const businessEmailSchema = z.string().trim().toLowerCase().email().max(254);

/**
 * Every qualification answer is a literal `yes`. Missing, negative, unknown,
 * and additional client-controlled fields are rejected before Stripe is called.
 */
export const cashflowLabCheckoutSchema = z
  .object({
    businessEmail: businessEmailSchema,
    company: z.string().trim().min(2).max(120),
    isSmallSecurityCompany: z.literal("yes"),
    hasConcreteB2BQuote: z.literal("yes"),
    acceptsFixedScope: z.literal("yes"),
    canProvideSanitizedIntake: z.literal("yes"),
    campaign: z.string().trim().max(120).optional(),
    privacyAcknowledged: z.literal(true),
    source: z.string().trim().max(120).optional(),
    termsAccepted: z.literal(true),
    website: z.string().max(0).optional(),
  })
  .strict();

export type CashflowLabCheckoutInput = z.infer<typeof cashflowLabCheckoutSchema>;

export function cashflowLabCheckoutKey(input: Pick<CashflowLabCheckoutInput, "businessEmail">) {
  return createHash("sha256").update(input.businessEmail).digest("hex");
}

export function buildCashflowLabCheckoutParams(
  input: CashflowLabCheckoutInput,
  baseUrl: string,
): Stripe.Checkout.SessionCreateParams {
  const checkoutKey = cashflowLabCheckoutKey(input);

  return {
    mode: "payment",
    payment_method_types: ["card", "ideal"],
    expires_at: Math.floor(Date.now() / 1000) + 35 * 60,
    customer_email: input.businessEmail,
    customer_creation: "always",
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    automatic_tax: { enabled: true },
    invoice_creation: { enabled: true },
    locale: "nl",
    metadata: {
      productKey: CASHFLOW_LAB_PRODUCT.productKey,
      checkoutKey,
      packageName: CASHFLOW_LAB_PRODUCT.packageName,
      company: input.company,
      isSmallSecurityCompany: input.isSmallSecurityCompany,
      hasConcreteB2BQuote: input.hasConcreteB2BQuote,
      acceptsFixedScope: input.acceptsFixedScope,
      canProvideSanitizedIntake: input.canProvideSanitizedIntake,
      privacyAcknowledged: String(input.privacyAcknowledged),
      termsAccepted: String(input.termsAccepted),
      qualificationVersion: CASHFLOW_LAB_PRODUCT.qualificationVersion,
      termsVersion: CASHFLOW_LAB_PRODUCT.termsVersion,
      source: input.source || "direct",
      campaign: input.campaign || CASHFLOW_LAB_PRODUCT.campaign,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CASHFLOW_LAB_PRODUCT.currency,
          unit_amount: CASHFLOW_LAB_PRODUCT.amount,
          tax_behavior: "exclusive",
          product_data: {
            name: CASHFLOW_LAB_PRODUCT.productName,
            description:
              "Handmatige analyse van één kostenprofiel en één concrete offerte, met PDF, rekensamenvatting, drie scenario's en bespreking.",
          },
        },
      },
    ],
    success_url: `${baseUrl}/margecheck-offerteadvies/bedankt?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/margecheck-offerteadvies?checkout=geannuleerd#geschiktheidscheck`,
  };
}

type PaymentVerificationSession = Pick<Stripe.Checkout.Session, "metadata" | "payment_status">;

export function isVerifiedCashflowLabPayment(session: PaymentVerificationSession) {
  return (
    session.payment_status === "paid" &&
    session.metadata?.productKey === CASHFLOW_LAB_PRODUCT.productKey
  );
}

type CapacitySession = Pick<
  Stripe.Checkout.Session,
  "expires_at" | "id" | "metadata" | "payment_intent" | "payment_status" | "status" | "url"
>;

export function reservesCashflowLabSlot(
  session: CapacitySession,
  releasedSessionIds: ReadonlySet<string> = new Set(),
  nowEpochSeconds = Math.floor(Date.now() / 1_000),
) {
  if (releasedSessionIds.has(session.id)) return false;
  if (session.metadata?.productKey !== CASHFLOW_LAB_PRODUCT.productKey) return false;
  if (session.payment_status === "paid") return true;
  if (session.status === "open") return (session.expires_at ?? 0) > nowEpochSeconds;
  if (session.status !== "complete") return false;

  const paymentIntent = session.payment_intent;
  const paymentIntentStatus =
    paymentIntent && typeof paymentIntent !== "string" ? paymentIntent.status : null;
  return paymentIntentStatus !== "canceled" && paymentIntentStatus !== "requires_payment_method";
}

/**
 * Stripe remains the provider source of truth for capacity. The scan is
 * bounded to this pilot's launch date and ten pages; reaching that bound throws
 * instead of silently reopening capacity.
 */
export async function getCashflowLabProviderAvailability(
  stripe: Stripe,
  checkoutKey: string,
  releasedSessionIds: ReadonlySet<string> = new Set(),
) {
  let reservedSlots = 0;
  let startingAfter: string | undefined;
  let reusableSession: { id: string; url: string; expiresAt: Date } | null = null;
  let existingPayment: "paid" | "processing" | null = null;

  for (let page = 0; page < 10; page += 1) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: { gte: CASHFLOW_LAB_PRODUCT.launchEpoch },
      expand: ["data.payment_intent"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of sessions.data) {
      if (session.metadata?.productKey !== CASHFLOW_LAB_PRODUCT.productKey) continue;
      const reserves = reservesCashflowLabSlot(session, releasedSessionIds);
      if (reserves) reservedSlots += 1;

      if (session.metadata?.checkoutKey !== checkoutKey) continue;
      if (session.payment_status === "paid" && !releasedSessionIds.has(session.id)) {
        existingPayment = "paid";
      } else if (reserves && session.status === "complete" && existingPayment !== "paid") {
        existingPayment = "processing";
      } else if (
        reserves &&
        session.status === "open" &&
        session.url &&
        session.expires_at
      ) {
        reusableSession = {
          id: session.id,
          url: session.url,
          expiresAt: new Date(session.expires_at * 1_000),
        };
      }
    }

    if (!sessions.has_more) {
      return {
        existingPayment,
        hasCapacity: reservedSlots < CASHFLOW_LAB_PRODUCT.capacity,
        reservedSlots,
        reusableSession,
      };
    }
    const last = sessions.data.at(-1);
    if (!last) throw new Error("cashflow_lab_provider_scan_empty_page");
    startingAfter = last.id;
  }

  throw new Error("cashflow_lab_provider_scan_limit_reached");
}
