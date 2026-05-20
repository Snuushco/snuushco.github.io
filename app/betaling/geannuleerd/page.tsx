import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Betaling niet afgerond | Snuushco",
};

export default function PaymentCancelledPage() {
  return (
    <main>
      <section className="band white">
        <div className="inner section-head">
          <div>
            <p className="eyebrow">Niet afgerond</p>
            <h1>Je betaling is niet afgerond.</h1>
            <p className="muted">
              Je intake blijft bruikbaar. Je kunt terug naar de intake en opnieuw starten wanneer je
              het pakket wilt reserveren.
            </p>
            <div className="actions">
              <Link className="button" href="/intake">
                Terug naar intake <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
