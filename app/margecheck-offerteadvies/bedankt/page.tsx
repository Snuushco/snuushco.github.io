import type { Metadata } from "next";
import { CheckCircle2, CircleAlert } from "lucide-react";
import Link from "next/link";
import Stripe from "stripe";
import { isVerifiedCashflowLabPayment } from "../../lib/cashflow-lab";
import { finishCashflowLabPaymentNotification } from "../../lib/cashflow-lab-notification";
import {
  getCashflowLabOrderStatus,
  recordCashflowLabStripeEvent,
} from "../../lib/db";
import { Footer, Header } from "../../page";

export const metadata: Metadata = {
  title: "Betalingscontrole Margecheck + Offerteadvies | Snuushco",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://snuushco.nl/margecheck-offerteadvies/bedankt",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type VerificationResult = {
  confirmed: boolean;
};

function sessionIdFrom(value: string | string[] | undefined) {
  const sessionId = Array.isArray(value) ? value[0] : value;
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(sessionId)) return null;
  return sessionId;
}

async function verifyPayment(sessionId: string | null): Promise<VerificationResult> {
  const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!sessionId || !stripeSecret) return { confirmed: false };

  try {
    const stripe = new Stripe(stripeSecret);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });
    if (!isVerifiedCashflowLabPayment(session)) return { confirmed: false };

    const paymentIntent =
      session.payment_intent && typeof session.payment_intent !== "string"
        ? session.payment_intent
        : null;
    const charge =
      paymentIntent?.latest_charge && typeof paymentIntent.latest_charge !== "string"
        ? paymentIntent.latest_charge
        : null;
    if (charge?.refunded || charge?.disputed) {
      await recordCashflowLabStripeEvent({
        eventId: `reconcile:${charge.disputed ? "disputed" : "refunded"}:${session.id}`,
        eventType: charge.disputed ? "reconcile.charge.disputed" : "reconcile.charge.refunded",
        targetStatus: charge.disputed ? "disputed" : "refunded",
        sessionId: session.id,
        paymentIntentId: paymentIntent?.id ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
      return { confirmed: false };
    }

    let orderStatus = await getCashflowLabOrderStatus(session.id);
    if (orderStatus !== "paid") {
      const reconciliation = await recordCashflowLabStripeEvent({
        eventId: `reconcile:paid:${session.id}`,
        eventType: "reconcile.checkout.session.paid",
        targetStatus: "paid",
        sessionId: session.id,
        paymentIntentId: paymentIntent?.id ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
      await finishCashflowLabPaymentNotification(reconciliation);
      orderStatus = await getCashflowLabOrderStatus(session.id);
    }
    return { confirmed: orderStatus === "paid" };
  } catch {
    // A failed lookup must never be presented as a successful payment.
    return { confirmed: false };
  }
}

export default async function CashflowLabThankYouPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const result = await verifyPayment(sessionIdFrom(params.session_id));

  return (
    <>
      <Header />
      <main className="cashflow-verification-page">
        <section className="band white">
          <div className="inner cashflow-verification-shell">
            {result.confirmed ? (
              <>
                <CheckCircle2 className="cashflow-verification-icon cashflow-verification-success" size={54} />
                <p className="eyebrow">Door Stripe bevestigd</p>
                <h1>Bedankt. Je betaling en pilotreservering zijn bevestigd.</h1>
                <p className="muted">
                  We nemen via het zakelijke e-mailadres uit de betaalroute contact op voor de complete,
                  van persoonsgegevens ontdane intake. De levertijd van 2 werkdagen start zodra die intake
                  compleet is en de betaling bevestigd blijft.
                </p>
                <div className="cashflow-next-steps">
                  <h2>Wat gebeurt er nu?</h2>
                  <ol>
                    <li>Je ontvangt de instructies voor de complete intake.</li>
                    <li>We bevestigen dat één kostenprofiel en één offerte binnen de pilotscope passen.</li>
                    <li>Daarna volgen de PDF, rekensamenvatting en drie scenario’s, plus de afspraak van 30 minuten.</li>
                  </ol>
                </div>
                <p className="cashflow-refund-inline">
                  Past scope of capaciteit bij de complete intake toch niet, dan wordt de reservering volledig terugbetaald.
                </p>
              </>
            ) : (
              <>
                <CircleAlert className="cashflow-verification-icon cashflow-verification-warning" size={54} />
                <p className="eyebrow">Niet bevestigd</p>
                <h1>We kunnen deze betaling niet bevestigen.</h1>
                <p className="muted">
                  Er is op deze pagina geen geldige, betaalde Stripe-sessie voor exact de Cashflow Lab
                  Margecheck + Offerteadvies vastgesteld. Dit scherm is daarom geen betalingsbewijs en
                  het werk is niet gestart.
                </p>
                <p className="cashflow-refund-inline">
                  Heb je zojuist betaald? Controleer je Stripe-bevestiging en laad deze pagina nogmaals.
                  Start niet opnieuw met betalen zolang de status onduidelijk is.
                </p>
              </>
            )}
            <div className="actions">
              <Link className="button" href="/margecheck-offerteadvies">
                Terug naar Margecheck + Offerteadvies
              </Link>
              <Link className="button secondary" href="/voorwaarden">Bekijk voorwaarden</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
