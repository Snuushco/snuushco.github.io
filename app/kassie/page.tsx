import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock3,
  FileText,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import TrackingPixel from "../tracking-pixel";

const appBaseUrl = "https://backoffice-platform-murex.vercel.app";
const kassieMarketingUrl = "https://kassieapp.nl";

export const metadata: Metadata = {
  title: "Kassie | Slim boekhouden via WhatsApp",
  description:
    "Kassie maakt boekhouden begrijpelijk voor praktische ondernemers. Stuur een bon, opdracht of vraag via WhatsApp. Kassie zet het klaar, jij controleert, klaar.",
  alternates: {
    canonical: kassieMarketingUrl,
  },
  openGraph: {
    title: "Kassie | Slim boekhouden via WhatsApp",
    description: "Overzichtelijk, betrouwbaar en gemaakt voor praktische ondernemers.",
    url: kassieMarketingUrl,
    type: "website",
    locale: "nl_NL",
    images: [{ url: "/brand/kassie-og.jpg", alt: "Kassie slim boekhouden" }],
  },
};

const steps = [
  {
    title: "App een bon of opdracht",
    description: "Maak een foto of stuur een kort bericht. Kassie begrijpt wat je bedoelt.",
    icon: MessageCircle,
  },
  {
    title: "Kassie zet alles klaar",
    description: "Klant, bedrag, btw en omschrijving worden ingevuld waar dat kan.",
    icon: Sparkles,
  },
  {
    title: "Jij controleert en verstuurt",
    description: "Je ziet precies wat er gebeurt. Akkoord? Dan is je factuur klaar.",
    icon: CheckCircle2,
  },
];

const benefits = [
  "Geen boekhoudtaal nodig",
  "Werkt vanuit WhatsApp",
  "Facturen en bonnen op een plek",
  "Btw en bedragen duidelijk zichtbaar",
  "Voor salon, bouw, transport, zorg en service",
  "Rustig dashboard zonder overbodige rommel",
];

const useCases = [
  {
    title: "Factuur maken",
    text: "App: maak factuur voor Janssen, 6 uur werk, materiaal 84 euro.",
    icon: FileText,
  },
  {
    title: "Bon bewaren",
    text: "Stuur een foto van je tankbon of bouwmarktbon. Kassie zet hem bij je administratie.",
    icon: ReceiptText,
  },
  {
    title: "Openstaand bedrag zien",
    text: "Vraag gewoon: wat staat er nog open? Kassie geeft direct overzicht.",
    icon: Banknote,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Gratis proberen",
    description: "Voor zzp'ers die Kassie rustig willen testen met bonnen en facturen.",
    points: ["30 dagen proberen", "WhatsApp bonnen sturen", "Facturen klaarzetten", "Geen creditcard nodig"],
  },
  {
    name: "Kassie Pro",
    price: "Vanaf €19 p/m",
    description: "Voor praktische ondernemers die hun administratie structureel via WhatsApp willen bijhouden.",
    points: ["Onbeperkt bonnen uploaden", "Facturen en klanten beheren", "Btw-bedragen duidelijk zichtbaar", "Dashboard voor overzicht"],
  },
  {
    name: "Team",
    price: "Op aanvraag",
    description: "Voor groeiende bedrijven met meerdere mensen, rollen of administratiestromen.",
    points: ["Meerdere gebruikers", "Werkstromen per team", "Hulp bij inrichting", "Maatwerk koppelingen mogelijk"],
  },
];

export default function KassiePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${kassieMarketingUrl}#app`,
    name: "Kassie",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, WhatsApp",
    url: kassieMarketingUrl,
    description:
      "Kassie helpt praktische ondernemers met bonnen, facturen en boekhouding via WhatsApp.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TrackingPixel eventName="landing_view" metadata={{ landing: "vakoffice-kassie" }} />
      <main className="vakoffice-page">
        <header className="vo-header">
          <div className="vo-container vo-header-inner">
            <Link href="/" className="vo-brand" aria-label="Kassie home">
              <img className="vo-brand-mark vo-profile-img" src="/brand/kassie-profile.jpg" alt="Kassie" />
              <div>
                <div className="vo-brand-title">Kassie</div>
                <div className="vo-brand-subtitle">Boekhouden via WhatsApp</div>
              </div>
            </Link>

            <nav className="vo-nav" aria-label="Kassie navigatie">
              <a href="#hoe-het-werkt">Hoe het werkt</a>
              <a href="#voor-wie">Voor wie</a>
              <a href="#prijzen">Prijzen</a>
            </nav>

            <div className="vo-header-actions">
              <a href={`${appBaseUrl}/login`} className="vo-login">Inloggen</a>
              <a href={`${appBaseUrl}/register`} className="vo-button vo-button-primary">
                Start gratis <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </header>

        <section className="vo-hero">
          <div className="vo-container vo-hero-grid">
            <div>
              <div className="vo-badge">
                <MessageCircle size={16} />
                Voor vakmensen, makers en dienstverleners die geen zin hebben in boekhouding
              </div>

              <h1>App Kassie. Je factuur is bijna klaar.</h1>

              <p className="vo-lead">
                Kassie maakt boekhouden begrijpelijk. Jij stuurt een bon, opdracht of vraag via WhatsApp.
                Kassie zet het klaar, jij controleert, klaar.
              </p>

              <div className="vo-actions">
                <a href={`${appBaseUrl}/register`} className="vo-button vo-button-primary vo-button-large">
                  Probeer Kassie gratis <ArrowRight size={20} />
                </a>
                <a href="#hoe-het-werkt" className="vo-button vo-button-secondary vo-button-large">
                  Bekijk de flow
                </a>
              </div>

              <div className="vo-trust-row">
                <span><CheckCircle2 size={16} /> Geen creditcard</span>
                <span><CheckCircle2 size={16} /> 30 dagen proberen</span>
                <span><CheckCircle2 size={16} /> Werkt op mobiel</span>
              </div>

              <div className="vo-kassie-banner-card">
                <img src="/brand/kassie-banner.jpg" alt="Kassie slim boekhouden: overzichtelijk, betrouwbaar en voor ondernemers" />
              </div>

              <div className="vo-kassie-profile-strip" aria-label="Kassie profiel">
                <img src="/brand/kassie-profile.jpg" alt="Kassie" />
                <div>
                  <strong>Kassie</strong>
                  <span>Je herkenbare boekhoudassistent in WhatsApp en op het web.</span>
                </div>
              </div>
            </div>

            <div className="vo-phone-shell" aria-label="WhatsApp voorbeeldgesprek met Kassie">
              <div className="vo-phone">
                <div className="vo-phone-head">
                  <img className="vo-avatar vo-profile-img" src="/brand/kassie-profile.jpg" alt="Kassie" />
                  <div>
                    <div className="vo-phone-title">Kassie</div>
                    <div className="vo-phone-status">online via WhatsApp</div>
                  </div>
                </div>

                <div className="vo-chat">
                  <div className="vo-message vo-message-user">
                    Maak factuur voor Van Dijk. 5 uur werk, 2 stopcontacten vervangen, materiaal 63 euro.
                  </div>
                  <div className="vo-message vo-message-kassie">
                    Ik heb de factuur klaargezet. Totaal: 488,84 euro incl. btw. Klantgegevens gevonden. Wil je versturen?
                  </div>
                  <div className="vo-message vo-message-user small">Ja, verstuur maar.</div>
                  <div className="vo-message vo-message-kassie">
                    Klaar. Factuur verzonden en opgeslagen in je administratie.
                  </div>
                </div>

                <div className="vo-phone-card">
                  <div>
                    <span>Vandaag geregeld</span>
                    <strong>3 facturen</strong>
                  </div>
                  <div className="vo-progress"><span /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hoe-het-werkt" className="vo-section">
          <div className="vo-container">
            <div className="vo-section-head">
              <p>Hoe het werkt</p>
              <h2>Geen cursus. Geen boekhoudboek. Gewoon doen.</h2>
            </div>

            <div className="vo-cards three">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="vo-card">
                    <div className="vo-card-top">
                      <div className="vo-icon"><Icon size={24} /></div>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="voor-wie" className="vo-section vo-dark">
          <div className="vo-container vo-split">
            <div>
              <p className="vo-kicker">Voor wie</p>
              <h2>Voor ondernemers die liever werken dan administreren.</h2>
              <p>
                Kappers, stukadoors, timmerlieden, beautysalons, chauffeurs, schilders, installateurs, schoonmakers en andere ondernemers.
                Kassie houdt de taal simpel en de acties logisch.
              </p>
            </div>

            <div className="vo-benefits">
              {benefits.map((benefit) => (
                <div key={benefit} className="vo-benefit">
                  <CheckCircle2 size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="vo-section">
          <div className="vo-container">
            <div className="vo-section-row">
              <div className="vo-section-head">
                <p>Dagelijks gebruik</p>
                <h2>Dit moet elke ondernemer direct herkennen.</h2>
              </div>
              <a href={`${appBaseUrl}/register`} className="vo-button vo-button-primary">
                Start met Kassie <ArrowRight size={16} />
              </a>
            </div>

            <div className="vo-kassie-wide-banner">
              <img src="/brand/kassie-support-banner.jpg" alt="Kassie helpt met facturen, overzicht en checklist" />
            </div>

            <div className="vo-cards three">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="vo-card">
                    <div className="vo-plain-icon"><Icon size={28} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="vo-feature-strip">
          <div className="vo-container vo-strip-grid">
            <div className="vo-strip-item">
              <Clock3 size={28} />
              <div><h3>Snel aan de slag</h3><p>Account aanmaken, bedrijfsgegevens invullen, eerste factuur sturen.</p></div>
            </div>
            <div className="vo-strip-item">
              <Upload size={28} />
              <div><h3>Bonnen zonder gedoe</h3><p>Foto sturen is genoeg. Kassie zet het netjes klaar.</p></div>
            </div>
            <div className="vo-strip-item">
              <ShieldCheck size={28} />
              <div><h3>Controle blijft bij jou</h3><p>Kassie helpt, maar verstuurt niets zonder dat jij het ziet.</p></div>
            </div>
          </div>
        </section>

        <section id="prijzen" className="vo-section">
          <div className="vo-container">
            <div className="vo-section-row">
              <div className="vo-section-head">
                <p>Prijzen</p>
                <h2>Eerst proberen. Daarna pas kiezen.</h2>
              </div>
              <a href={`${appBaseUrl}/register`} className="vo-button vo-button-primary">
                Start gratis <ArrowRight size={16} />
              </a>
            </div>

            <div className="vo-cards three">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className="vo-card vo-price-card">
                  <div>
                    <p className="vo-price-eyebrow">{plan.name}</p>
                    <h3>{plan.price}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <ul>
                    {plan.points.map((point) => (
                      <li key={point}><CheckCircle2 size={18} /> {point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vo-final-cta">
          <div className="vo-container">
            <h2>Klaar om minder tijd kwijt te zijn aan administratie?</h2>
            <p>
              Begin met een simpele test: maak een account aan, stuur een bon en laat Kassie het zware werk doen.
            </p>
            <div className="vo-actions center">
              <a href={`${appBaseUrl}/register`} className="vo-button vo-button-primary vo-button-large">
                Probeer gratis <ArrowRight size={20} />
              </a>
              <a href={`${appBaseUrl}/login`} className="vo-button vo-button-secondary vo-button-large">
                Ik heb al een account
              </a>
            </div>
          </div>
        </section>

        <footer className="vo-footer">
          <div className="vo-container vo-footer-inner">
            <span>Kassie</span>
            <span>Boekhouden via WhatsApp voor praktische ondernemers.</span>
            <span>© 2026 Kassie</span>
          </div>
        </footer>
      </main>
    </>
  );
}
