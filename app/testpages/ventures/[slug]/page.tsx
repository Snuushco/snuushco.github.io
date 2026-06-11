import Link from "next/link";
import { notFound } from "next/navigation";
import { venturePages, type VentureSlug } from "../data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ventureArt: Record<VentureSlug, { label: string; title: string; items: string[]; metric: string; metricLabel: string }> = {
  volbloei: {
    label: "Zacht. Eerlijk. Discreet.",
    title: "Ondersteuning voor een fase waar te lang omheen gepraat is.",
    items: ["Overgang zonder taboe", "Heldere gidsen", "Rustige thuisbezorging"],
    metric: "40+",
    metricLabel: "voor vrouwen middenin het leven",
  },
  powerpoot: {
    label: "Performance nutrition",
    title: "Voor honden die trainen, werken en blijven gaan.",
    items: ["Agility", "Canicross", "Zwemmen", "Dagelijkse energie"],
    metric: "ACTIVE",
    metricLabel: "snacks & supplementen voor teams",
  },
  pijlpost: {
    label: "Door de brievenbus",
    title: "Tips, flights en shafts voordat je set versleten is.",
    items: ["Tips", "Flights", "Shafts", "Maandelijks"],
    metric: "180",
    metricLabel: "geen excuus meer aan het bord",
  },
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

  const art = ventureArt[venture.slug];

  return (
    <main className={`venture-landing-page venture-theme-${venture.slug}`}>
      <div className="venture-landing-shell">
        <nav className="venture-nav">
          <Link href="/testpages/ventures" className="venture-back-link">
            ← Alle testpagina's
          </Link>
          <span className="venture-status-pill">Concept / niet live</span>
        </nav>

        <section className="venture-hero">
          <div className="venture-hero-copy">
            <div className="venture-brand-pill">{venture.brand}</div>
            <h1 className="venture-hero-title">{venture.headline}</h1>
            <p className="venture-hero-subtitle">{venture.subheadline}</p>
            <div className="venture-usps">
              {venture.usps.map((usp) => (
                <div key={usp} className="venture-usp">
                  <span aria-hidden="true">✓</span>
                  {usp}
                </div>
              ))}
            </div>
          </div>

          <aside className="venture-side">
            <div className="venture-art-card" aria-label={`${venture.brand} sfeerkaart`}>
              <div className="venture-art-orbit venture-art-orbit-one" />
              <div className="venture-art-orbit venture-art-orbit-two" />
              <p className="venture-art-label">{art.label}</p>
              <div className="venture-art-metric">{art.metric}</div>
              <h2>{art.title}</h2>
              <div className="venture-art-items">
                {art.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p>{art.metricLabel}</p>
            </div>

            <div className="venture-waitlist-card venture-intent-card">
              <p className="venture-eyebrow">Testfase</p>
              <h2>{venture.intentQuestion}</h2>
              <p className="venture-waitlist-text">{venture.waitlistText}</p>
              <form className="venture-form" aria-label={`${venture.brand} testformulier`}>
                <input type="email" placeholder="jij@example.nl" aria-label="E-mailadres" className="venture-input" disabled />
                <button type="button" disabled className="venture-button">
                  {venture.buttonText}
                </button>
              </form>
              <p className="venture-microcopy">{venture.microcopy}</p>
            </div>
          </aside>
        </section>

        <section className="venture-product-section" aria-label={`${venture.brand} productconcept`}>
          <div className="venture-section-heading">
            <p className="venture-eyebrow">{venture.product.eyebrow}</p>
            <h2>{venture.product.title}</h2>
            <p>{venture.product.description}</p>
          </div>
          <div className="venture-product-grid">
            <div className="venture-product-mockup" aria-label={`${venture.brand} productmockup`}>
              <div className="venture-box-lid" />
              <div className="venture-box-face">
                <span>{venture.brand}</span>
                <strong>{venture.product.eyebrow}</strong>
                <em>Concept pack</em>
              </div>
              <div className="venture-box-shadow" />
            </div>
            <div className="venture-product-includes">
              {venture.product.includes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="venture-packages-section" aria-label={`${venture.brand} pakketvoorstel`}>
          <div className="venture-section-heading compact">
            <p className="venture-eyebrow">Pakketvoorstel</p>
            <h2>Prijsankers om interesse meetbaar te maken.</h2>
            <p>Conceptprijzen voor validatie; nog geen checkout en geen betaling.</p>
          </div>
          <div className="venture-package-grid">
            {venture.packages.map((pack) => (
              <article key={pack.name} className="venture-package-card">
                <p>{pack.name}</p>
                <div>
                  <strong>{pack.price}</strong>
                  <span>{pack.cadence}</span>
                </div>
                <p>{pack.description}</p>
                <ul>
                  {pack.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="venture-flow-section" aria-label={`${venture.brand} testflow`}>
          <div className="venture-step-grid">
            {venture.steps.map((step, index) => (
              <article key={step.title} className="venture-step-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="venture-proof-card">
            <p className="venture-eyebrow">{venture.proofTitle}</p>
            <div>
              {venture.proofPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </div>
        </section>

        <p className="venture-note">{venture.note}</p>
      </div>
    </main>
  );
}
