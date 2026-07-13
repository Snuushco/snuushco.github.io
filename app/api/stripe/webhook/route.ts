import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CASHFLOW_LAB_PRODUCT } from "../../../lib/cashflow-lab";
import { finishCashflowLabPaymentNotification } from "../../../lib/cashflow-lab-notification";
import {
  markCheckoutCompleted,
  recordCashflowLabStripeEvent,
  saveConversionEvent,
} from "../../../lib/db";

function stripeId(value: string | { id: string } | null | undefined) {
  return typeof value === "string" ? value : value?.id ?? null;
}

async function cashflowSessionForPaymentIntent(stripe: Stripe, paymentIntentId: string | null) {
  if (!paymentIntentId) return null;
  const sessions = await stripe.checkout.sessions.list({ payment_intent: paymentIntentId, limit: 1 });
  const session = sessions.data[0] ?? null;
  return session?.metadata?.productKey === CASHFLOW_LAB_PRODUCT.productKey ? session : null;
}

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ error: "Webhook niet geconfigureerd" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Stripe signature ontbreekt" }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecret);
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Ongeldige webhook signature" }, { status: 400 });
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.productKey === CASHFLOW_LAB_PRODUCT.productKey) {
        const targetStatus = session.payment_status === "paid" ? "paid" : "payment_processing";
        const result = await recordCashflowLabStripeEvent({
          eventId: event.id,
          eventType: event.type,
          targetStatus,
          sessionId: session.id,
          paymentIntentId: stripeId(session.payment_intent),
          amountTotal: session.amount_total,
          currency: session.currency,
        });
        if (targetStatus === "paid") await finishCashflowLabPaymentNotification(result);
      } else if (session.id) {
        await markCheckoutCompleted(session.id, session.payment_status ?? "completed");
        if (session.payment_status === "paid") {
          try {
            await saveConversionEvent({
              eventName: "paid_lead",
              leadId: session.metadata?.leadId ?? null,
              sessionId: session.id,
              metadata: {
                packageName: session.metadata?.packageName ?? "",
                company: session.metadata?.company ?? "",
                amountTotal: session.amount_total ?? null,
                currency: session.currency ?? "eur",
              },
            });
          } catch {
            // Preserve the legacy checkout behavior; Cashflow Lab uses its durable order ledger above.
          }
        }
      }
    } else if (
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.productKey === CASHFLOW_LAB_PRODUCT.productKey) {
        await recordCashflowLabStripeEvent({
          eventId: event.id,
          eventType: event.type,
          targetStatus:
            event.type === "checkout.session.expired" ? "expired" : "payment_failed",
          sessionId: session.id,
          paymentIntentId: stripeId(session.payment_intent),
          amountTotal: session.amount_total,
          currency: session.currency,
        });
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = stripeId(charge.payment_intent);
      const session = await cashflowSessionForPaymentIntent(stripe, paymentIntentId);
      if (charge.refunded && session) {
        await recordCashflowLabStripeEvent({
          eventId: event.id,
          eventType: event.type,
          targetStatus: "refunded",
          sessionId: session.id,
          paymentIntentId,
          amountTotal: charge.amount - charge.amount_refunded,
          currency: charge.currency,
        });
      }
    } else if (event.type === "charge.dispute.created") {
      const dispute = event.data.object as Stripe.Dispute;
      const paymentIntentId = stripeId(dispute.payment_intent);
      const session = await cashflowSessionForPaymentIntent(stripe, paymentIntentId);
      if (session) {
        await recordCashflowLabStripeEvent({
          eventId: event.id,
          eventType: event.type,
          targetStatus: "disputed",
          sessionId: session.id,
          paymentIntentId,
          amountTotal: dispute.amount,
          currency: dispute.currency,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      "stripe_webhook_processing_failed",
      event.id,
      error instanceof Error ? error.name : "unknown_error",
    );
    return NextResponse.json({ error: "Webhookverwerking tijdelijk mislukt" }, { status: 500 });
  }
}
