import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import { Footer, Header } from "../../page";
import TrackingPixel from "../../tracking-pixel";

export const metadata: Metadata = {
  title: "Website laten maken voor dienstverleners | Snuushco",
  description:
    "Laat een website maken die betere aanvragen oplevert voor dienstverleners. Met gerichte intake, duidelijke pakketten en menselijke review bij maatwerk.",
  alternates: {
    canonical: "/website-laten-maken/dienstverleners",
  },
  openGraph: {
    title: "Website laten maken voor dienstverleners | Snuushco",
    description: "Websites met aanvraagroutes voor dienstverleners die minder tijd willen verliezen aan vage aanvragen.",
    url: "https://snuushco.nl/website-laten-maken/dienstverleners",
    type: "website",
    locale: "nl_NL",
  },
};

export default function ServiceLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://snuushco.nl/website-laten-maken/dienstverleners#service",
    name: "Website laten maken voor dienstverleners",
    url: "https://snuushco.nl/website-laten-maken/dienstverleners",
    provider: {
      "@type": "Organization",
      name: "Snuushco",
      url: "https://snuushco.nl",
    },
    areaServed: ["Nederland", "België"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Dienstverleners",
    },
    description:
      "Snuushco bouwt websites en aanvraagroutes voor dienstverleners die betere aanvragen willen en minder handmatig opvolgwerk.",
    offers: [
      { "@type": "Offer", name: "Website Quickstart", priceCurrency: "EUR", price: "1750" },
      { "@type": "Offer", name: "Business Website", priceCurrency: "EUR", price: "2750" },
      { "@type": "Offer", name: "Growth Website", priceCurrency: "EUR", price: "6500" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackingPixel eventName="landing_view" metadata={{ landing: "website-laten-maken-dienstverleners" }} />
      <Header />
      <main>
        <section className="hero segment-hero">
          <div className="hero-content">
            <p className="eyebrow">Website laten maken voor dienstverleners</p>
            <h1>Een website die aanvragen beter voorbereidt voordat jij hoeft op te volgen.</h1>
            <p className="lead">
              Snuushco bouwt websites voor dienstverleners die niet alleen mooi willen overkomen,
              maar vooral betere aanvragen willen ontvangen: duidelijker, completer en makkelijker op te volgen.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/intake?source=landing&campaign=dienstverleners">
                Doe de intake <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/#diensten">Bekijk pakketten</Link>
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Waarom deze pagina bestaat</p>
                <h2>Voor ondernemers die genoeg hebben van vage aanvragen.</h2>
              </div>
              <p>
                Veel dienstverleners krijgen wel contactaanvragen, maar missen budget, locatie, timing,
                diensttype of urgentie. Daardoor kost opvolging meer tijd dan nodig is.
              </p>
            </div>
            <div className="grid three">
              <article className="tile"><ClipboardList /><h3>Gerichte intake</h3><p>Bezoekers leveren vooraf de gegevens aan die jij normaal achteraf moet opvragen.</p></article>
              <article className="tile"><ShieldCheck /><h3>Menselijke review</h3><p>Claims, complexe koppelingen en uitzonderingen worden gecontroleerd voordat iets live gaat.</p></article>
              <article className="tile"><CheckCircle2 /><h3>Meetbare conversies</h3><p>Intake, checkout en betaling worden als aparte conversiestappen bijgehouden.</p></article>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Geschikt voor</p>
                <h2>Branches waar vertrouwen en snelle opvolging direct meetellen.</h2>
              </div>
              <p>
                Denk aan beveiliging, facilitaire dienstverlening, bouw en techniek, recruitment,
                administratie, zorgondersteuning en lokale specialisten.
              </p>
            </div>
            <div className="actions">
              <Link className="button" href="/intake?source=landing&campaign=dienstverleners">
                Ontvang pakketadvies <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
