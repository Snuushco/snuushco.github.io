import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Betaling ontvangen | Snuushco",
};

export default function PaymentSuccessPage() {
  return (
    <main>
      <section className="band white">
        <div className="inner section-head">
          <div>
            <p className="eyebrow">Betaling ontvangen</p>
            <h1>Je aanvraag staat klaar voor verwerking.</h1>
            <p className="muted">
              We hebben je betaling ontvangen en koppelen deze aan je intake. De volgende stap is het
              voorbereiden van de projectbrief en de eerste opleverroute.
            </p>
            <div className="actions">
              <Link className="button" href="/">
                Terug naar Snuushco <CheckCircle2 size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
