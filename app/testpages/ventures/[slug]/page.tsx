import Link from "next/link";
import { notFound } from "next/navigation";
import { venturePages, type VentureSlug } from "../data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(venturePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const venture = venturePages[slug as VentureSlug];

  if (!venture) {
    return {};
  }

  return {
    title: venture.metaTitle,
    description: venture.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function VentureLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = venturePages[slug as VentureSlug];

  if (!venture) {
    notFound();
  }

  return (
    <main className="venture-landing-page" style={{ backgroundColor: venture.palette.background, color: venture.palette.foreground }}>
      <div className="venture-landing-shell">
        <nav className="venture-nav">
          <Link href="/testpages/ventures" className="venture-back-link">
            ← Alle testpagina's
          </Link>
          <span className="venture-status-pill">Concept / niet live</span>
        </nav>

        <section className="venture-hero">
          <div className="venture-hero-copy">
            <div className="venture-brand-pill" style={{ backgroundColor: venture.palette.card, color: venture.palette.accent }}>
              {venture.brand}
            </div>
            <h1 className="venture-hero-title">{venture.headline}</h1>
            <p className="venture-hero-subtitle">{venture.subheadline}</p>
            <div className="venture-usps">
              {venture.usps.map((usp) => (
                <div key={usp} className="venture-usp" style={{ backgroundColor: venture.palette.card, borderColor: `${venture.palette.foreground}22` }}>
                  {usp}
                </div>
              ))}
            </div>
          </div>

          <aside className="venture-waitlist-card" style={{ backgroundColor: venture.palette.card, borderColor: `${venture.palette.foreground}22` }}>
            <p className="venture-eyebrow" style={{ color: venture.palette.accent }}>Binnenkort</p>
            <h2>{venture.waitlistTitle}</h2>
            <p className="venture-waitlist-text">{venture.waitlistText}</p>
            <form className="venture-form" aria-label={`${venture.brand} testformulier`}>
              <input type="email" placeholder="jij@example.nl" aria-label="E-mailadres" className="venture-input" style={{ borderColor: `${venture.palette.foreground}33` }} disabled />
              <button type="button" disabled className="venture-button" style={{ backgroundColor: venture.palette.accent }}>
                {venture.buttonText}
              </button>
            </form>
            <p className="venture-microcopy">{venture.microcopy}</p>
            <p className="venture-note" style={{ borderColor: `${venture.palette.foreground}22` }}>{venture.note}</p>
          </aside>
        </section>
      </div>
    </main>
  );
}
