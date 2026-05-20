import { ArrowRight, CheckCircle2, ShieldCheck, SlidersHorizontal, Workflow } from "lucide-react";
import Link from "next/link";
import { packages, segments } from "./data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Websites en AI workflows voor dienstverleners</p>
            <h1>Meer goede aanvragen. Minder handmatig opvolgwerk.</h1>
            <p className="lead">
              Snuushco bouwt websites en slimme intakeflows die passen bij je branche,
              je klanten en je werkdag. Standaard waar het kan, premium maatwerk waar het moet.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/intake">Start pakketadvies <ArrowRight size={18} /></Link>
              <a className="button secondary" href="#doelgroepen">Bekijk doelgroepen</a>
            </div>
          </div>
        </section>
        <section id="diensten" className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Dienstenaanbod</p>
                <h2>Een compleet aanbod zonder vage AI-taal.</h2>
              </div>
              <p>
                Elke aanvraag start met intake. Daarna bepalen we automatisch welk pakket past,
                welke onderdelen standaard zijn en welke onderdelen premium maatwerk vragen.
              </p>
            </div>
            <div className="grid two">
              {packages.map((item) => (
                <article className="tile" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.for}</p>
                  <div className="price">{item.price}</div>
                  <ul>{item.includes.map((include) => <li key={include}>{include}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="doelgroepen" className="band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Doelgroep eerst</p>
                <h2>Je moet meteen voelen: dit is voor mij bedoeld.</h2>
              </div>
              <p>
                We publiceren vanuit herkenbare problemen: vage aanvragen, incomplete profielen,
                offertes die te veel voorbereiding kosten en intake die blijft hangen in losse mailtjes.
              </p>
            </div>
            <div className="grid three">
              {segments.map((segment) => (
                <Link className="segment-link" href={`/doelgroepen/${segment.slug}`} key={segment.slug}>
                  <strong>{segment.label}</strong>
                  <span>{segment.cta}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section id="werkwijze" className="band dark">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Geautoriseerde workflow</p>
                <h2>Automatisch waar veilig. Review waar nodig.</h2>
              </div>
              <p>
                De workflow classificeert aanvragen, maakt scope zichtbaar en routeert gevoelige
                of complexe onderdelen naar menselijke review voordat er iets live gaat.
              </p>
            </div>
            <div className="grid three process">
              <article className="tile"><h3>Slimme intake</h3><p>De klant vult branche, doel, scope, budget, urgentie en automatiseringskansen in.</p></article>
              <article className="tile"><h3>Pakket en scope</h3><p>De flow kiest Quickstart, Business, Growth of Premium Custom en markeert out-of-scope.</p></article>
              <article className="tile"><h3>Build en QA</h3><p>Standaardprojecten gaan naar build. Integraties, gevoelige claims en maatwerk krijgen review.</p></article>
            </div>
          </div>
        </section>
        <section className="band white">
          <div className="inner">
            <div className="grid three">
              <article className="tile"><ShieldCheck color="#0f513f" /><h3>Menselijke controle</h3><p>Geen autonome externe AI-acties zonder goedgekeurde workflow en duidelijke grenzen.</p></article>
              <article className="tile"><SlidersHorizontal color="#24455f" /><h3>Premium maatwerk</h3><p>Portals, betalingen, API's, meertaligheid en complexe booking gaan naar aparte review.</p></article>
              <article className="tile"><Workflow color="#a84f35" /><h3>AI agent upsell</h3><p>Wanneer intake tijd kost, koppelen we de juiste agent: triage, offerte, document of planning.</p></article>
            </div>
            <div className="actions"><Link className="button" href="/intake">Start de intake <CheckCircle2 size={18} /></Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Snuushco home"><span className="brand-mark">S</span><span>Snuushco</span></Link>
      <nav className="nav" aria-label="Hoofdnavigatie">
        <Link href="/#diensten">Diensten</Link>
        <Link href="/#doelgroepen">Doelgroepen</Link>
        <Link href="/#werkwijze">Werkwijze</Link>
        <Link href="/intake">Intake</Link>
      </nav>
      <Link className="button" href="/intake">Start intake <ArrowRight size={18} /></Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div><strong>Snuushco</strong><p>Websites, slimme intake en AI workflows met menselijke controle.</p></div>
        <p>Snuushco is in opbouw. Complexe of gevoelige workflows krijgen altijd review voor livegang.</p>
      </div>
    </footer>
  );
}
