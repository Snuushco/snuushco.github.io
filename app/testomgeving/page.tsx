import Link from "next/link";
import { ArrowRight, Beaker, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

const environments = [
  {
    name: "Offerteheractivatie dakbedrijven",
    status: "Klaar voor funneltest",
    href: "/testomgeving/offerteheractivatie-dakbedrijven",
    description:
      "Test de â‚¬750-pilotpositionering, privacy-disclaimer, intake-CTA en betaal-CTA voordat er outreach uitgaat.",
    checks: ["Landing copy", "Mini-audit CTA", "Betaalpilot CTA", "Privacygrenzen"],
  },
  {
    name: "Snuushco intakeflow",
    status: "Bestaande productieflow",
    href: "/intake",
    description:
      "Controleer aanvraagroute, pakketadvies, reviewgrenzen en opvolgmetadata voor websiteproducties.",
    checks: ["Formulier", "Pakketadvies", "Leadregistratie", "Checkout-route"],
  },
  {
    name: "Ops dashboard",
    status: "Afgeschermd",
    href: "/ops",
    description:
      "Controleer leads, taken en conversie-events. Alleen toegankelijk via ops-login.",
    checks: ["Login", "Leadoverzicht", "Taken", "Export"],
  },
];

export const metadata = {
  title: "Snuushco Testomgeving",
  description: "Interne live testomgeving voor Snuushco producties en validatiefunnels.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestomgevingPage() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>Snuushco</span>
        </Link>
        <nav className="nav">
          <Link href="/testomgeving/offerteheractivatie-dakbedrijven">Offerteheractivatie</Link>
          <Link href="/intake">Intake</Link>
          <Link href="/ops">Ops</Link>
        </nav>
      </header>

      <main>
        <section className="band dark">
          <div className="inner">
            <p className="eyebrow">Live testomgeving</p>
            <h1>Snuushco testomgeving voor nieuwe producties.</h1>
            <p className="lead">
              Centrale plek om validatiefunnels, intakeflows en betaalroutes live te controleren voordat we ze inzetten richting prospects of klanten.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/testomgeving/offerteheractivatie-dakbedrijven">
                Test offerteheractivatie <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/intake">
                Test bestaande intake
              </Link>
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Producties</p>
                <h2>Testbare omgevingen en funnels.</h2>
              </div>
              <p>
                Iedere kaart heeft een duidelijke status, testdoel en controlepunten. Externe acties zoals outreach, betalingen of klantcommunicatie blijven approval-gated.
              </p>
            </div>
            <div className="grid three">
              {environments.map((item) => (
                <article className="tile" key={item.name}>
                  <Beaker color="#24455f" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="pill-row"><span className="pill">{item.status}</span></div>
                  <ul>
                    {item.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                  <Link className="button ghost" href={item.href}>
                    Open test <ExternalLink size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="inner grid two">
            <article className="tile">
              <ShieldCheck color="#0f513f" />
              <h3>Niet indexeren, niet adverteren</h3>
              <p>
                Deze omgeving is bedoeld voor live QA. Metadata staat op noindex. Outreach en betaalpromotie starten pas na expliciet akkoord.
              </p>
            </article>
            <article className="tile">
              <CheckCircle2 color="#0f513f" />
              <h3>Acceptance checks</h3>
              <p>
                Voor elke productie controleren we copy, mobiel beeld, CTA's, privacytekst, betaalroute, intakevelden en tracking voordat prospects benaderd worden.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

