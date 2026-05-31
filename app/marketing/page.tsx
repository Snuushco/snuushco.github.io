import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  Megaphone,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Footer, Header } from "../page";
import TrackingPixel from "../tracking-pixel";

export const metadata: Metadata = {
  title: "Marketing agency voor MKB-groei | Snuushco",
  description:
    "Snuushco Marketing bouwt campagnes, landingspagina's en opvolgroutes voor MKB-bedrijven die aantoonbaar betere aanvragen willen ontvangen.",
  alternates: {
    canonical: "/marketing",
  },
  openGraph: {
    title: "Snuushco Marketing | Campagnes die aanvragen opleveren",
    description:
      "Marketing agency voor MKB-bedrijven: positionering, landingspagina's, advertentiecampagnes, tracking en opvolging in één commerciële route.",
    url: "https://snuushco.nl/marketing",
    type: "website",
    locale: "nl_NL",
  },
};

const services = [
  {
    icon: Target,
    title: "Positionering die verkoopt",
    text: "We scherpen aanbod, doelgroep, pijn en bewijs aan voordat er advertentiebudget wordt uitgegeven.",
  },
  {
    icon: MousePointerClick,
    title: "Landingspagina's per campagne",
    text: "Geen generieke homepage als eindpunt, maar pagina's met één propositie, één doelgroep en één volgende stap.",
  },
  {
    icon: Megaphone,
    title: "Performance campagnes",
    text: "Google, Meta en LinkedIn worden ingericht rond concrete aanvraagkwaliteit, niet rond losse impressies.",
  },
  {
    icon: LineChart,
    title: "Tracking en conversiecontrole",
    text: "We meten welke route aanvragen oplevert, waar bezoekers afhaken en welke opvolging omzetkans verdient.",
  },
];

const packages = [
  {
    name: "Launch Sprint",
    price: "vanaf €1.950",
    for: "Voor bedrijven die binnen 2 tot 3 weken een campagnebasis live willen hebben.",
    items: ["Commerciële propositie", "Campagne-landingspagina", "Basis tracking", "Eerste advertentie-opzet"],
  },
  {
    name: "Growth Engine",
    price: "vanaf €2.750 p/m",
    for: "Voor MKB-bedrijven die doorlopend betere aanvragen willen genereren en leren van data.",
    items: ["Maandelijkse campagne-optimalisatie", "Nieuwe landingspagina's", "A/B-test backlog", "Leadkwaliteit review"],
  },
  {
    name: "Managed Revenue",
    price: "maatwerk",
    for: "Voor teams die marketing, intake en commerciële opvolging als één systeem willen laten draaien.",
    items: ["Campagne + intakeflow", "CRM/WhatsApp/e-mail koppelingen", "Sales handoff", "Managementrapportage"],
  },
];

const process = [
  "Aanbod en doelgroep scherp maken",
  "Landingspagina en intake bouwen",
  "Campagnes live zetten met meetplan",
  "Wekelijks leren van aanvraagkwaliteit",
];

export default function MarketingAgencyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://snuushco.nl/marketing#service",
    name: "Snuushco Marketing",
    url: "https://snuushco.nl/marketing",
    description:
      "Marketing agency voor MKB-bedrijven: positionering, campagne-landingspagina's, performance campagnes, tracking en commerciële opvolgroutes.",
    areaServed: ["Nederland", "België"],
    provider: {
      "@type": "Organization",
      name: "Snuushco",
      url: "https://snuushco.nl",
    },
    serviceType: "Marketing agency, performance marketing, landingspagina's en leadgeneratie",
    offers: packages.map((item) => ({
      "@type": "Offer",
      name: item.name,
      description: item.for,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: item.price,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackingPixel eventName="landing_view" metadata={{ landing: "marketing-agency" }} />
      <Header />
      <main className="marketing-page">
        <section className="marketing-hero">
          <div className="marketing-orb marketing-orb-one" />
          <div className="marketing-orb marketing-orb-two" />
          <div className="marketing-hero-inner">
            <div className="marketing-hero-copy">
              <p className="marketing-eyebrow">Snuushco Marketing Agency</p>
              <h1>Marketing die niet druk oogt, maar aanvragen oplevert.</h1>
              <p className="marketing-lead">
                We bouwen commerciële routes voor MKB-bedrijven: positionering, campagnepagina's,
                advertenties, tracking en opvolging. Strak genoeg om snel live te gaan, kritisch genoeg
                om budget niet te verbranden.
              </p>
              <div className="marketing-actions">
                <Link className="marketing-button primary" href="/intake?source=marketing&campaign=agency">
                  Plan groeiscan <ArrowRight size={18} />
                </Link>
                <a className="marketing-button secondary" href="#aanpak">Bekijk aanpak</a>
              </div>
              <div className="marketing-proof-row" aria-label="Marketing resultaten waarop gestuurd wordt">
                <span><strong>14 dagen</strong> tot eerste campagnebasis</span>
                <span><strong>1 route</strong> van klik tot opvolging</span>
                <span><strong>0 ruis</strong> in rapportage</span>
              </div>
            </div>
            <aside className="marketing-dashboard" aria-label="Campagne dashboard illustratie">
              <div className="dashboard-topline">
                <span>Growth route</span>
                <span className="status-dot">Live</span>
              </div>
              <div className="dashboard-metric">
                <span>Aanvraagkwaliteit</span>
                <strong>+38%</strong>
              </div>
              <div className="dashboard-bars">
                <span style={{ height: "44%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "42%" }} />
                <span style={{ height: "74%" }} />
                <span style={{ height: "86%" }} />
                <span style={{ height: "69%" }} />
              </div>
              <div className="dashboard-card-list">
                <div><CheckCircle2 size={16} /> Propositie gevalideerd</div>
                <div><CheckCircle2 size={16} /> Landingspagina live</div>
                <div><BarChart3 size={16} /> Campagnebudget bewaakt</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="marketing-band white" id="diensten">
          <div className="marketing-inner">
            <div className="marketing-section-head">
              <div>
                <p className="marketing-eyebrow">Wat we bouwen</p>
                <h2>Een marketingmachine zonder bureau-theater.</h2>
              </div>
              <p>
                Je krijgt geen losse posts, vage dashboards of vrijblijvende brainstorms. We bouwen de route
                waar omzet begint: een duidelijke belofte, een scherpe pagina, meetbare campagnes en opvolging
                die geen lead laat verdampen.
              </p>
            </div>
            <div className="marketing-grid four">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="marketing-card" key={service.title}>
                    <Icon size={26} />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="marketing-band" id="aanpak">
          <div className="marketing-inner split">
            <div>
              <p className="marketing-eyebrow">Aanpak</p>
              <h2>Van commerciële scherpte naar live campagne.</h2>
              <p className="marketing-body">
                We starten niet met kanalen, maar met wat iemand moet geloven voordat hij aanvraagt.
                Daarna bouwen we pagina, campagne, meetplan en opvolging als één route.
              </p>
            </div>
            <div className="marketing-process">
              {process.map((step, index) => (
                <div className="marketing-step" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="marketing-band dark">
          <div className="marketing-inner">
            <div className="marketing-section-head">
              <div>
                <p className="marketing-eyebrow">Voor wie</p>
                <h2>Voor bedrijven waar een betere aanvraag direct geld waard is.</h2>
              </div>
              <p>
                Denk aan zakelijke dienstverleners, bouw en installatie, recruitment, zorgondersteuning,
                lokale servicebedrijven, SaaS/prototypes en specialisten met een concreet verkoopgesprek.
              </p>
            </div>
            <div className="marketing-grid three">
              <article className="marketing-card dark-card"><ShieldCheck size={24} /><h3>Geen black box</h3><p>Elke campagne heeft een hypothese, meetpunt en duidelijke volgende beslissing.</p></article>
              <article className="marketing-card dark-card"><ClipboardCheck size={24} /><h3>Leadkwaliteit boven volume</h3><p>We optimaliseren op complete, opvolgbare aanvragen in plaats van alleen goedkope formulieren.</p></article>
              <article className="marketing-card dark-card"><Sparkles size={24} /><h3>Snel live, strak bewaakt</h3><p>We combineren snelheid met review op claims, budget, tracking en commerciële logica.</p></article>
            </div>
          </div>
        </section>

        <section className="marketing-band white" id="pakketten">
          <div className="marketing-inner">
            <div className="marketing-section-head">
              <div>
                <p className="marketing-eyebrow">Pakketten</p>
                <h2>Kies het niveau dat past bij je groeifase.</h2>
              </div>
              <p>
                Elk pakket begint met een intake en eindigt met een route die je kunt meten. Maatwerk blijft
                mogelijk wanneer de propositie, koppelingen of markt daarom vragen.
              </p>
            </div>
            <div className="marketing-grid three">
              {packages.map((item) => (
                <article className="marketing-package" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.for}</p>
                  <div className="marketing-price">{item.price}</div>
                  <ul>
                    {item.items.map((include) => <li key={include}>{include}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <div className="marketing-final-cta">
              <div>
                <p className="marketing-eyebrow">Startpunt</p>
                <h2>Laat ons je groeiroute scherpte geven.</h2>
              </div>
              <Link className="marketing-button primary" href="/intake?source=marketing&campaign=agency-final">
                Start met intake <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
