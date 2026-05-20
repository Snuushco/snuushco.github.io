import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { markCheckoutStarted } from "../../lib/db";

const checkoutSchema = z.object({
  packageName: z.string(),
  leadId: z.string().optional(),
  email: z.string().email().optional(),
  company: z.string().optional(),
});

const checkoutPackages: Record<string, { label: string; amount: number; description: string }> = {
  "Website Quickstart": {
    label: "Snuushco Website Quickstart",
    amount: 95000,
    description: "Compacte website of landingpage met aanvraagroute.",
  },
  "Business Website": {
    label: "Snuushco Business Website",
    amount: 275000,
    description: "Website voor dienstverleners met meerdere pagina's en professionele aanvraagroute.",
  },
  "Growth Website": {
    label: "Snuushco Growth Website",
    amount: 650000,
    description: "Uitgebreide website voor waardevolle aanvragen en snellere opvolging.",
  },
  "Premium Custom": {
    label: "Snuushco Premium Discovery",
    amount: 95000,
    description: "Betaalde discovery voor maatwerk, integraties of projecten buiten standaard scope.",
  },
};

function siteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl?.startsWith("https://")) return configuredUrl.replace(/\/$/, "");

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) return `https://${productionHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  return "https://snuushco.nl";
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige checkout aanvraag" }, { status: 400 });
  }

  const selected = checkoutPackages[parsed.data.packageName];
  if (!selected) {
    return NextResponse.json({ error: "Onbekend pakket" }, { status: 400 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeSecret) {
    return NextResponse.json({ error: "Checkout is nog niet geconfigureerd" }, { status: 503 });
  }

  const stripe = new Stripe(stripeSecret);
  const baseUrl = siteUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.data.email,
    client_reference_id: parsed.data.leadId,
    metadata: {
      leadId: parsed.data.leadId ?? "",
      packageName: parsed.data.packageName,
      company: parsed.data.company ?? "",
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: selected.amount,
          product_data: {
            name: selected.label,
            description: selected.description,
          },
        },
      },
    ],
    success_url: `${baseUrl}/betaling/gelukt?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/betaling/geannuleerd`,
  });

  if (parsed.data.leadId && session.id) {
    await markCheckoutStarted(parsed.data.leadId, session.id);
  }

  return NextResponse.json({ url: session.url });
}
