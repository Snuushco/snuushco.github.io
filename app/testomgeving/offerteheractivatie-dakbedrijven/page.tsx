import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Offerteheractivatie Pilot | Snuushco Testomgeving",
  description: "Live testpagina voor de offerteheractivatie pilot voor Nederlandse dakbedrijven.",
  robots: {
    index: false,
    follow: false,
  },
};

const steps = [
  "Upload 3–5 geanonimiseerde voorbeelden of een export",
  "Segmentatie van oude/open offertes",
  "Gecontroleerde opvolgberichten binnen afgesproken grenzen",
  "Reactietriage en warme kansen terug naar het team",
  "Eindrapport met pipelinewaarde, reacties en verliesredenen",
];

const checks = [
  "Geen CRM-migratie",
  "Geen omzetgarantie",
  "AI alleen als ondersteunend hulpmiddel disclosed",
  "Opt-outs worden gerespecteerd",
  "Geen zelfstandige prijs-, planning- of contractbeloftes",
];

export default function OfferteheractivatieTestPage() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/testomgeving">
          <span className="brand-mark">T</span>
          <span>Testomgeving</span>
        </Link>
        <nav className="nav">
          <Link href="/testomgeving">Overzicht</Link>
          <a href="#pilot">Pilot</a>
          <a href="#privacy">Privacy</a>
        </nav>
      </header>

      <main>
        <section className="hero segment-hero">
          <div className="hero-content">
            <p className="eyebrow">Testpagina — niet voor outreach zonder akkoord</p>
            <h1>Haal meer uit dakoffertes die nu blijven liggen.</h1>
            <p className="lead">
              Testvariant voor een 14-daagse offerteheractivatie pilot voor Nederlandse dakbedrijven: maximaal 50 oude/open offertes, nette opvolging en warme kansen terug.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/intake?product=offerteheractivatie-dakbedrijven">
                Test mini-audit intake <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href="#pilot">Bekijk pilotvoorwaarden</a>
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Probleem</p>
                <h2>Veel offertes krijgen nooit een duidelijke ja of nee.</h2>
              </div>
              <p>
                Dakbedrijven hebben vaak voldoende aanvraagdruk, maar oude offertes verdwijnen tussen planning, uitvoering en nieuw werk. Deze pilot test of een kleine async herstelronde genoeg waarde oplevert.
              </p>
            </div>
            <div className="grid three">
              <article className="tile"><h3>Open offertes</h3><p>Na één of twee contactmomenten stopt opvolging vaak terwijl de projectwaarde hoog is.</p></article>
              <article className="tile"><h3>Bovenop bestaande systemen</h3><p>Geen nieuwe CRM-implementatie. We werken met export, mailbox of geanonimiseerde voorbeelden.</p></article>
              <article className="tile"><h3>Warme kansen terug</h3><p>Het team krijgt alleen bruikbare reacties, bezwaren en concrete vervolgstappen terug.</p></article>
            </div>
          </div>
        </section>

        <section className="band" id="pilot">
          <div className="inner grid two">
            <article className="tile">
              <p className="eyebrow">Pilot</p>
              <h2>€750 ex btw</h2>
              <p className="muted">14 dagen offerteheractivatie voor maximaal 50 oude/open dakoffertes.</p>
              <ul>
                <li>Segmentatie en opvolgstrategie</li>
                <li>Persoonlijke conceptopvolging</li>
                <li>Reactietriage: warm, later, verloren, bezwaar, opt-out</li>
                <li>Eindrapport met redenen en vervolgstappen</li>
                <li>Bij nul bruikbare reacties: éénmalig 14 dagen verlenging</li>
              </ul>
              <div className="actions">
                <Link className="button" href="/intake?product=offerteheractivatie-dakbedrijven&intent=pilot">
                  Test start pilot
                </Link>
                <Link className="button secondary" href="/intake?product=offerteheractivatie-dakbedrijven&intent=mini-audit">
                  Test mini-audit
                </Link>
              </div>
            </article>
            <article className="tile">
              <ClipboardCheck color="#a84f35" />
              <h3>Werkwijze</h3>
              <ol>
                {steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </article>
          </div>
        </section>

        <section className="band dark" id="privacy">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Grenzen</p>
                <h2>Veilig testen voordat we prospects benaderen.</h2>
              </div>
              <p>
                Deze pagina is voor live QA. De outreachmail blijft apart ter goedkeuring. Betaling, intake en dataverwerking worden pas productie-klaar gezet na review.
              </p>
            </div>
            <div className="grid three">
              {checks.map((check) => (
                <article className="tile" key={check}>
                  <CheckCircle2 color="#c69a43" />
                  <h3>{check}</h3>
                  <p>Controlepunt voor de pilot voordat de funnel naar prospects gaat.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner grid two">
            <article className="tile">
              <ShieldCheck color="#0f513f" />
              <h3>Privacy/disclaimer tekst</h3>
              <p>
                We gebruiken gestructureerde templates, menselijke controle en ondersteunende software, waaronder AI-hulpmiddelen. Data wordt alleen gebruikt voor de mini-audit of pilot. Er worden geen zelfstandige toezeggingen namens het dakbedrijf gedaan.
              </p>
            </article>
            <article className="tile warning">
              <h3>Nog niet doen</h3>
              <p className="muted">
                Geen outreach, geen bulkmail, geen revenueclaim en geen klantdata verwerken voordat de intake, payment link, privacytekst en mails expliciet zijn goedgekeurd.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
