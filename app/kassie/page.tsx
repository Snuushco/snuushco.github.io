import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeEuro, CheckCircle2, ClipboardList, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, Header } from "../page";
import TrackingPixel from "../tracking-pixel";

export const metadata: Metadata = {
  title: "Kassie | Betaal- en aanvraagflow voor dienstverleners",
  description:
    "Kassie is een compacte betaal- en aanvraaglanding voor dienstverleners: duidelijk aanbod, gerichte intake en een nette route naar akkoord of betaling.",
  alternates: {
    canonical: "/kassie",
  },
  openGraph: {
    title: "Kassie | Snuushco",
    description: "Een simpele, nette route van interesse naar aanvraag, akkoord of betaling.",
    url: "https://snuushco.nl/kassie",
    type: "website",
    locale: "nl_NL",
  },
};

const useCases = [
  "Losse diensten met vaste vanafprijs",
  "Intake vóór offerte of kennismaking",
  "Aanbetaling of akkoord voor start",
  "Campagnes waar snelheid belangrijker is dan een complete website",
];

const steps = [
  {
    title: "Aanbod scherp maken",
    copy: "We brengen één dienst, pakket of campagne terug naar een heldere belofte, vanafprijs en vervolgstap.",
  },
  {
    title: "Intake en triage",
    copy: "De bezoeker levert de informatie aan die jij nodig hebt om te bepalen of het past, urgent is of review vraagt.",
  },
  {
    title: "Akkoord of betaling",
    copy: "Waar logisch koppelen we door naar betaling, aanbetaling of een nette akkoordroute. Geen losse chaos in mail of app.",
  },
];

export default function KassieLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://snuushco.nl/kassie#service",
    name: "Kassie",
    url: "https://snuushco.nl/kassie",
    provider: {
      "@type": "Organization",
      name: "Snuushco",
      url: "https://snuushco.nl",
    },
    areaServed: ["Nederland", "België"],
    serviceType: "Betaal- en aanvraaglanding voor dienstverleners",
    description:
      "Kassie helpt dienstverleners een losse dienst, actie of pakket snel om te zetten naar een duidelijke aanvraag-, akkoord- of betaalflow.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackingPixel eventName="landing_view" metadata={{ landing: "kassie" }} />
      <Header />
      <main>
        <section className="hero kassie-hero">
          <div className="hero-content">
            <p className="eyebrow">Kassie by Snuushco</p>
            <h1>Van interesse naar aanvraag, akkoord of betaling — zonder omwegen.</h1>
            <p className="lead">
              Kassie is een compacte landingpage voor dienstverleners die één aanbod snel
              verkoopklaar willen maken: duidelijk uitgelegd, goed uitgevraagd en klaar voor opvolging.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/intake?source=kassie&campaign=kassie">
                Start met Kassie <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href="#werking">Bekijk hoe het werkt</a>
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Waarom Kassie</p>
                <h2>Voor aanbiedingen die te belangrijk zijn voor een losse app of rommelige mailthread.</h2>
              </div>
              <p>
                Niet elke dienst heeft meteen een volledige website nodig. Soms wil je één aanbod strak neerzetten,
                snel testen en bezoekers zonder frictie naar de juiste vervolgstap sturen.
              </p>
            </div>
            <div className="grid four kassie-card-grid">
              <article className="tile"><BadgeEuro /><h3>Prijs of vanafprijs</h3><p>Maak meteen duidelijk wat iemand kan verwachten, zonder commerciële mist.</p></article>
              <article className="tile"><ClipboardList /><h3>Gerichte vragen</h3><p>Vraag alleen uit wat nodig is voor inschatting, akkoord of vervolggesprek.</p></article>
              <article className="tile"><MessageSquareText /><h3>Betere opvolging</h3><p>Iedere aanvraag komt binnen met context, urgentie en gewenste vervolgstap.</p></article>
              <article className="tile"><ShieldCheck /><h3>Controle waar nodig</h3><p>Complexe of gevoelige aanvragen blijven eerst langs menselijke review gaan.</p></article>
            </div>
          </div>
        </section>

        <section id="werking" className="band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Werkwijze</p>
                <h2>Een kleine funnel, strak genoeg om serieus mee te verkopen.</h2>
              </div>
              <p>
                Kassie is bedoeld als snelle commerciële route: geen maanden projectscope,
                wel genoeg kwaliteit om live verkeer niet te verspillen.
              </p>
            </div>
            <div className="grid three process">
              {steps.map((step) => (
                <article className="tile" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band dark">
          <div className="inner kassie-split">
            <div>
              <p className="eyebrow">Geschikt voor</p>
              <h2>Een productized service, actie, intake of betaalbare eerste stap.</h2>
              <p className="muted">
                Denk aan een quickscan, spoedklus, adviesgesprek, intakepakket, onderhoudsaanbod,
                aanbetaling of tijdelijke campagne. Kassie maakt de route helder voordat jij opvolgt.
              </p>
              <div className="hero-actions">
                <Link className="button" href="/intake?source=kassie&campaign=kassie-fit">
                  Check of Kassie past <CheckCircle2 size={18} />
                </Link>
              </div>
            </div>
            <div className="kassie-panel">
              <Sparkles />
              <h3>Typische Kassie-usecases</h3>
              <ul>
                {useCases.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
