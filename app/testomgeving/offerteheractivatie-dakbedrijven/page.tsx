import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MailCheck, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Offerteheractivatie Pilot | Snuushco Testomgeving",
  description:
    "Live testpagina voor de offerteheractivatie pilot voor Nederlandse dakbedrijven: oude/open offertes opvolgen en warme kansen terugkrijgen.",
  robots: {
    index: false,
    follow: false,
  },
};

const inclusions = [
  "14 dagen offerteheractivatie",
  "Tot 50 oude of open dakoffertes",
  "Segmentatie op waarde, ouderdom, status en bezwaar",
  "Persoonlijke conceptopvolging per segment",
  "Reactietriage: warm, later, verloren, bezwaar of opt-out",
  "Eindrapport met pipelinewaarde, reacties en vervolgstappen",
];

const process = [
  {
    title: "U deelt een export of voorbeelden",
    body: "CSV, Excel, PDF of 3-5 geanonimiseerde voorbeelden is genoeg voor de mini-audit. Geen CRM-migratie nodig.",
  },
  {
    title: "Wij segmenteren de offertes",
    body: "We scheiden recente, oudere, hoge waarde, onduidelijke status en bekende bezwaren zodat opvolging gecontroleerd blijft.",
  },
  {
    title: "We bereiden nette opvolging voor",
    body: "Berichten blijven binnen afgesproken grenzen. Geen zelfstandige prijs-, planning- of contractbeloftes namens het dakbedrijf.",
  },
  {
    title: "Warme reacties gaan terug naar uw team",
    body: "Uw team hoeft alleen te reageren op kansrijke of inhoudelijke reacties; opt-outs en verloren redenen worden apart vastgelegd.",
  },
  {
    title: "U krijgt een kort rapport",
    body: "Wat kwam terug, welke bezwaren kwamen vaak voor, welke kansen zijn warm en wat is logisch als vervolgstap?",
  },
];

const boundaries = [
  "Geen omzetgarantie; wel opvolging, triage en inzicht",
  "Geen outreach of klantdata zonder expliciet akkoord",
  "Geen echte betaling in testmodus; betaalflow blijft approval-gated",
  "AI alleen als ondersteunend hulpmiddel, netjes vermeld in privacy/disclaimer",
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
          <a href="#werkwijze">Werkwijze</a>
          <a href="#pilot">Pilot</a>
          <a href="#grenzen">Grenzen</a>
        </nav>
      </header>

      <main>
        <section className="hero segment-hero">
          <div className="hero-content">
            <p className="eyebrow">Live testpagina — offerteheractivatie voor dakbedrijven</p>
            <h1>Haal meer uit dakoffertes die nu blijven liggen.</h1>
            <p className="lead">
              Een compacte 14-daagse pilot voor dakbedrijven: oude of open offertes netjes opvolgen, reacties triëren en warme kansen terugbrengen naar het team — zonder CRM-migratie of extra druk op de planning.
            </p>
            <div className="hero-actions">
              <Link
                className="button"
                href="/intake?segment=bouw-techniek&source=testomgeving&campaign=offerteheractivatie-dakbedrijven&intent=mini-audit"
              >
                Vraag gratis mini-audit aan <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href="#pilot">Bekijk pilot van €750 ex btw</a>
            </div>
            <p className="muted">
              Testomgeving: noindex, geen outreach, geen echte betaling zonder afzonderlijk akkoord.
            </p>
          </div>
        </section>

        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Het lek</p>
                <h2>Veel offertes krijgen nooit een duidelijke ja of nee.</h2>
              </div>
              <p>
                Dakbedrijven hebben vaak genoeg aanvraagdruk, maar oude offertes verdwijnen tussen nieuw werk, planning en uitvoering. Eén teruggewonnen dakproject kan de pilot al ruimschoots rechtvaardigen.
              </p>
            </div>
            <div className="grid three">
              <article className="tile">
                <MailCheck color="#24455f" />
                <h3>Offertes blijven open</h3>
                <p>Na één of twee contactmomenten stopt opvolging vaak terwijl de klantvraag nog niet definitief verloren is.</p>
              </article>
              <article className="tile">
                <ClipboardCheck color="#24455f" />
                <h3>Geen nieuwe software</h3>
                <p>We werken bovenop export, mailbox of offertesoftware. Geen implementatieproject, geen datamigratie.</p>
              </article>
              <article className="tile">
                <Sparkles color="#24455f" />
                <h3>Warme kansen terug</h3>
                <p>Uw team krijgt alleen kansrijke reacties, bezwaren en concrete vervolgstappen terug.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="band" id="werkwijze">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Werkwijze</p>
                <h2>Geen softwaremigratie. Gewoon een kleine herstelronde.</h2>
              </div>
              <p>
                De pilot is bewust smal gehouden: maximaal 50 offertes, vaste looptijd, vaste prijs en duidelijke grenzen voor opvolging.
              </p>
            </div>
            <div className="grid two">
              {process.map((step, index) => (
                <article className="tile" key={step.title}>
                  <p className="eyebrow">Stap {index + 1}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
              <article className="tile warning">
                <ShieldCheck color="#a84f35" />
                <h3>Menselijke controle blijft leidend</h3>
                <p>
                  Conceptberichten, datagebruik en commerciële claims blijven review-gated. De testpagina activeert geen zelfstandige outreach.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band white" id="pilot">
          <div className="inner grid two">
            <article className="tile">
              <p className="eyebrow">Pilot</p>
              <h2>€750 ex btw</h2>
              <p className="lead">14 dagen offerteheractivatie voor maximaal 50 oude of open dakoffertes.</p>
              <ul>
                {inclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="actions">
                <Link
                  className="button"
                  href="/intake?segment=bouw-techniek&source=testomgeving&campaign=offerteheractivatie-dakbedrijven&intent=pilot"
                >
                  Test pilot-intake
                </Link>
                <a className="button secondary" href="mailto:snuushco@gmail.com?subject=Test%20offerteheractivatie%20dakbedrijven">
                  Test contact via mail
                </a>
              </div>
            </article>
            <article className="tile">
              <p className="eyebrow">Belofte zonder overclaim</p>
              <h3>Bij nul bruikbare reacties: éénmalig 14 dagen verlenging.</h3>
              <p>
                Geen omzetgarantie. Wel een duidelijke herstelronde, gestructureerde triage en concrete feedback over waarom offertes wel of niet terugkomen.
              </p>
              <div className="pill-row">
                <span className="pill">Vaste scope</span>
                <span className="pill">Vaste prijs</span>
                <span className="pill">Async per e-mail</span>
              </div>
            </article>
          </div>
        </section>

        <section className="band dark" id="grenzen">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Testgrenzen</p>
                <h2>Live genoeg om te testen. Veilig genoeg om nog niet te verkopen.</h2>
              </div>
              <p>
                Deze pagina staat klaar als testbare funnelbasis. Outreachmail, payment link en klantdataverwerking blijven aparte approval gates.
              </p>
            </div>
            <div className="grid two">
              {boundaries.map((item) => (
                <article className="tile" key={item}>
                  <CheckCircle2 color="#c69a43" />
                  <h3>{item}</h3>
                  <p>Controlepunt vóór commerciële activatie van deze productie.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band white">
          <div className="inner grid two">
            <article className="tile">
              <ShieldCheck color="#0f513f" />
              <h3>Privacy/disclaimer</h3>
              <p>
                Data wordt alleen gebruikt voor de mini-audit of pilot. Geanonimiseerde voorbeelden hebben de voorkeur bij de eerste beoordeling. We verkopen of delen geen klantdata.
              </p>
            </article>
            <article className="tile">
              <h3>AI disclosure</h3>
              <p>
                Snuushco kan gestructureerde templates, menselijke controle en ondersteunende software gebruiken, waaronder AI-hulpmiddelen. Er worden geen zelfstandige toezeggingen namens het dakbedrijf gedaan.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
