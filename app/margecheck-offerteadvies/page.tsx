import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Footer, Header } from "../page";
import TrackingPixel from "../tracking-pixel";
import CashflowLabSuitabilityForm from "./suitability-form";

export const metadata: Metadata = {
  title: "Margecheck + Offerteadvies voor beveiligingsbedrijven | Cashflow Lab",
  description:
    "Founder-pilot voor kleine beveiligingsbedrijven: één kostenprofiel en één concrete offerte handmatig doorgerekend voor € 99 excl. btw.",
  alternates: {
    canonical: "https://snuushco.nl/margecheck-offerteadvies",
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Cashflow Lab Margecheck + Offerteadvies — € 99 excl. btw",
    description:
      "Handmatige margecheck voor één kostenprofiel en één concrete beveiligingsofferte. Maximaal 3 founder-pilots.",
    url: "https://snuushco.nl/margecheck-offerteadvies",
    type: "website",
  },
};

const included = [
  "PDF met bevindingen en concrete aandachtspunten",
  "Rekensamenvatting van het gekozen kostenprofiel en de offerte",
  "Drie scenario’s: basis, tegenvaller en bijsturing",
  "Bespreking van 30 minuten",
  "Eén ronde voor feitelijke correcties",
];

export default async function CashflowLabPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const checkoutCancelled = params.checkout === "geannuleerd";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cashflow Lab Margecheck + Offerteadvies",
    serviceType: "Handmatige margecheck en offerteadvies voor kleine beveiligingsbedrijven",
    provider: {
      "@type": "Organization",
      name: "Snuushco",
    },
    offers: {
      "@type": "Offer",
      price: "99.00",
      priceCurrency: "EUR",
      description: "Founder-pilot, exclusief btw en vooraf te betalen",
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackingPixel
        eventName="landing_view"
        metadata={{ landing: "margecheck-offerteadvies", offer: "cashflow-lab-founder-pilot" }}
      />
      <Header />
      <main className="cashflow-page">
        <section className="cashflow-hero">
          <div className="inner cashflow-hero-grid">
            <div>
              <p className="eyebrow">Cashflow Lab · founder-pilot</p>
              <h1>Weet wat één beveiligingsofferte met je marge doet.</h1>
              <p className="lead">
                Voor kleine beveiligingsbedrijven die één concrete zakelijke offerte willen toetsen
                voordat prijs, inzet en aannames definitief worden. Geen losse tool of download, maar
                een handmatige margecheck met bespreking.
              </p>
              <div className="hero-actions">
                <a className="button" href="#geschiktheidscheck">
                  Doe de korte check <ArrowRight size={18} />
                </a>
                <a className="button secondary" href="#inhoud">Bekijk wat je krijgt</a>
              </div>
              <p className="cashflow-capacity">Maximaal 3 founder-pilots beschikbaar.</p>
            </div>

            <aside className="cashflow-offer-card" aria-label="Pilotprijs en levering">
              <span>Vaste pilotprijs</span>
              <div className="cashflow-price">€ 99</div>
              <p><strong>excl. btw · vooraf</strong></p>
              <ul>
                <li><CheckCircle2 size={18} /> Eén kostenprofiel</li>
                <li><CheckCircle2 size={18} /> Eén concrete offerte</li>
                <li><CalendarClock size={18} /> Binnen 2 werkdagen*</li>
              </ul>
              <small>
                *Na complete intake én door de betaalprovider bevestigde betaling.
              </small>
            </aside>
          </div>
        </section>

        <section id="inhoud" className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Afgebakend resultaat</p>
                <h2>Van aannames naar een bespreekbare marge-inschatting.</h2>
              </div>
              <p>
                We rekenen jouw aangeleverde kostenprofiel en offerte handmatig door, benoemen welke
                aannames het verschil maken en zetten drie scenario’s naast elkaar. Jij houdt de
                beslissing en de controle.
              </p>
            </div>
            <div className="cashflow-included-grid">
              {included.map((item, index) => (
                <article className="cashflow-included-card" key={item}>
                  {index === 0 ? <FileCheck2 /> : index === 3 ? <MessageSquareText /> : <CheckCircle2 />}
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band cashflow-process-band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Zo werkt de pilot</p>
                <h2>Eerst een voorlopige zelfcheck, dan pas betalen.</h2>
              </div>
              <p>
                De eerste check verzamelt bewust nog geen financiële cijfers, offertes, documenten
                of gegevens van medewerkers en klanten.
              </p>
            </div>
            <div className="grid three cashflow-steps">
              <article className="tile">
                <span>1</span>
                <h3>Korte check</h3>
                <p>Bevestig doelgroep, concrete offerte en vaste scope met alleen zakelijke contactgegevens.</p>
              </article>
              <article className="tile">
                <span>2</span>
                <h3>Betaling en complete intake</h3>
                <p>
                  Betaal veilig via Stripe. Daarna volgt de complete intake voor de benodigde,
                  van persoonsgegevens ontdane kosten- en offerte-input.
                </p>
              </article>
              <article className="tile">
                <span>3</span>
                <h3>Oplevering en bespreking</h3>
                <p>
                  Je ontvangt het PDF-resultaat binnen 2 werkdagen nadat zowel de complete intake
                  als de providerbevestigde betaling binnen zijn.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner cashflow-fit-grid">
            <article className="cashflow-fit-card cashflow-fit-card-positive">
              <p className="eyebrow">Dit past</p>
              <h2>Een kleine, concrete B2B-casus.</h2>
              <ul>
                <li>Klein beveiligingsbedrijf</li>
                <li>Eén concreet kostenprofiel</li>
                <li>Eén zakelijke beveiligingsofferte</li>
                <li>Behoefte aan inzicht in aannames en scenario’s</li>
                <li>Bereid om input compleet en zonder persoonsgegevens aan te leveren</li>
              </ul>
            </article>
            <article className="cashflow-fit-card cashflow-fit-card-negative">
              <p className="eyebrow">Dit past niet</p>
              <h2>Geen advies buiten de rekenscope.</h2>
              <ul>
                <li>Meerdere offertes, vestigingen of kostenprofielen</li>
                <li>Cao-, juridisch, fiscaal of boekhoudkundig advies</li>
                <li>Controle van personeelsdossiers of klantdocumenten</li>
                <li>Een winstgarantie of besluit namens jouw bedrijf</li>
                <li>Een Excel-model, validator of los downloadproduct</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="band dark cashflow-guardrail-band">
          <div className="inner cashflow-guardrail-grid">
            <ShieldCheck size={42} />
            <div>
              <p className="eyebrow">Duidelijke grens</p>
              <h2>Praktische beslisondersteuning, geen garantie.</h2>
              <p>
                De uitkomst is gebaseerd op de informatie en aannames die jij aanlevert. Cashflow Lab
                geeft geen cao-, juridisch, fiscaal, boekhoudkundig of ander gereguleerd advies en
                garandeert geen winst, marge of commercieel resultaat. Laat specialistische vragen
                beoordelen door een bevoegde adviseur.
              </p>
            </div>
          </div>
        </section>

        <section id="geschiktheidscheck" className="band white cashflow-check-section">
          <div className="inner cashflow-check-grid">
            <div className="cashflow-check-copy">
              <p className="eyebrow">Reserveer veilig</p>
              <h2>Founder-pilot voor € 99 excl. btw.</h2>
              <p>
                Na een passende voorlopige zelfcheck ga je naar een dedicated Stripe Checkout. De definitieve
                scopecontrole volgt op de complete intake; bij mismatch betalen we volledig terug. De prijs en het product
                staan uitsluitend op de server vast; het formulier kan die niet aanpassen.
              </p>
              <div className="cashflow-refund-note">
                <strong>Volledige terugbetaling bij mismatch.</strong>
                <p>
                  Blijkt bij de complete intake dat scope of capaciteit toch niet past, dan betalen we
                  de reservering volledig terug. Het werk start pas na complete intake én bevestigde betaling.
                </p>
              </div>
              <p className="cashflow-merchant-note">
                Verkoop en betaling verlopen via Snuushco; Stripe Checkout toont Snuushco als verkoper.
              </p>
            </div>
            <CashflowLabSuitabilityForm checkoutCancelled={checkoutCancelled} />
          </div>
        </section>

        <section className="band cashflow-final-band">
          <div className="inner cashflow-final-row">
            <div>
              <p className="eyebrow">Nog even nalezen?</p>
              <h2>Scope, gegevens en terugbetaling staan vooraf vast.</h2>
            </div>
            <div className="actions">
              <Link className="button secondary" href="/voorwaarden">Voorwaarden</Link>
              <Link className="button secondary" href="/privacy">Privacy</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
