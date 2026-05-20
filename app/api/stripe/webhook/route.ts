import { NextResponse } from "next/server";
import Stripe from "stripe";
import { markCheckoutCompleted } from "../../../lib/db";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.id) {
      await markCheckoutCompleted(session.id, session.payment_status ?? "completed");
    }
  }

  return NextResponse.json({ received: true });
}
