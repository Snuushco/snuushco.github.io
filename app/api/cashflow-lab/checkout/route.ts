import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  buildCashflowLabCheckoutParams,
  CASHFLOW_LAB_PRODUCT,
  cashflowLabCheckoutKey,
  cashflowLabCheckoutSchema,
  getCashflowLabProviderAvailability,
} from "../../../lib/cashflow-lab";
import {
  getCashflowLabCheckoutDecision,
  getReleasedCashflowLabSessionIds,
  saveCashflowLabCheckoutReservation,
  withCashflowLabCheckoutLock,
} from "../../../lib/db";

export const runtime = "nodejs";

function siteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl?.startsWith("https://")) return configuredUrl.replace(/\/$/, "");

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return `https://${productionHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  return "https://snuushco.nl";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige checkoutaanvraag." }, { status: 400 });
  }

  const parsed = cashflowLabCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Deze pilot is alleen beschikbaar wanneer alle geschiktheidsvragen passend zijn beantwoord.",
      },
      { status: 422 },
    );
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeSecret) {
    return NextResponse.json(
      { error: "De betaalpagina is momenteel niet beschikbaar." },
      { status: 503 },
    );
  }

  const stripe = new Stripe(stripeSecret);

  try {
    const checkout = await withCashflowLabCheckoutLock(async (client) => {
      const checkoutKey = cashflowLabCheckoutKey(parsed.data);
      const decision = await getCashflowLabCheckoutDecision(client, { checkoutKey });
      if (decision.kind === "blocked") return decision;

      const releasedSessionIds = await getReleasedCashflowLabSessionIds(client);
      const provider = await getCashflowLabProviderAvailability(
        stripe,
        checkoutKey,
        releasedSessionIds,
      );
      if (provider.existingPayment) {
        return {
          kind: "blocked" as const,
          reason: provider.existingPayment === "paid" ? ("already_paid" as const) : ("processing" as const),
        };
      }

      const persistReservation = async (input: {
        sessionId: string;
        expiresAt: Date;
        attempt: number;
      }) => {
        await saveCashflowLabCheckoutReservation(client, {
          checkoutKey,
          sessionId: input.sessionId,
          expiresAt: input.expiresAt,
          productKey: CASHFLOW_LAB_PRODUCT.productKey,
          packageName: CASHFLOW_LAB_PRODUCT.packageName,
          businessEmail: parsed.data.businessEmail,
          company: parsed.data.company,
          attempt: input.attempt,
          amount: CASHFLOW_LAB_PRODUCT.amount,
          currency: CASHFLOW_LAB_PRODUCT.currency,
          source: parsed.data.source || "direct",
          campaign: parsed.data.campaign || CASHFLOW_LAB_PRODUCT.campaign,
          qualificationVersion: CASHFLOW_LAB_PRODUCT.qualificationVersion,
          termsVersion: CASHFLOW_LAB_PRODUCT.termsVersion,
        });
      };

      if (provider.reusableSession) {
        await persistReservation({
          sessionId: provider.reusableSession.id,
          expiresAt: provider.reusableSession.expiresAt,
          attempt: Math.max(1, decision.currentAttempt),
        });
        return { kind: "ready" as const, url: provider.reusableSession.url };
      }
      if (!provider.hasCapacity) return { kind: "full" as const };

      const session = await stripe.checkout.sessions.create(
        buildCashflowLabCheckoutParams(parsed.data, siteUrl()),
        {
          idempotencyKey: `cashflow-lab:${checkoutKey}:${decision.nextAttempt}`,
        },
      );
      if (!session.url || !session.expires_at) {
        throw new Error("cashflow_lab_checkout_incomplete");
      }

      await persistReservation({
        sessionId: session.id,
        expiresAt: new Date(session.expires_at * 1_000),
        attempt: decision.nextAttempt,
      });

      return { kind: "ready" as const, url: session.url };
    });

    if (checkout.kind === "full") {
      return NextResponse.json(
        { error: "De drie founder-pilotplekken zijn gereserveerd." },
        { status: 409 },
      );
    }
    if (checkout.kind === "blocked") {
      const messages = {
        already_paid:
          "Voor dit e-mailadres is al een provider-bevestigde pilotbetaling geregistreerd. Betaal niet opnieuw.",
        processing:
          "De betaling voor dit e-mailadres wordt nog door Stripe verwerkt. Betaal niet opnieuw.",
        closed:
          "Deze eerdere reservering is gesloten. Neem contact op voordat je opnieuw probeert te betalen.",
      } as const;
      return NextResponse.json({ error: messages[checkout.reason] }, { status: 409 });
    }

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error(
      "cashflow_lab_checkout_failed",
      error instanceof Error ? error.name : "unknown_error",
    );
    // Never expose Stripe errors, credentials, session IDs, checkout URLs, or database details.
    return NextResponse.json(
      { error: "De betaalpagina kon niet veilig worden geopend. Probeer het later opnieuw." },
      { status: 502 },
    );
  }
}
