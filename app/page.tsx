import { ArrowRight, Bot, CheckCircle2, ClipboardCheck, FileSearch, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { packages, recurringPlans, segments } from "./data";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://snuushco.nl/#organization",
        name: "Snuushco",
        url: "https://snuushco.nl",
        description: "Snuushco bouwt websites, SEO + AI-SO vindbaarheid en aanvraagroutes voor dienstverleners die betere aanvragen willen en minder handmatig opvolgwerk.",
        logo: "https://snuushco.nl/brand/snuushco-logo-dark.jpg",
        sameAs: ["https://snuushco.com"],
        parentOrganization: {
          "@type": "Organization",
          name: "Praesidion Holding B.V.",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://snuushco.nl/#website",
        url: "https://snuushco.nl",
        name: "Snuushco",
        inLanguage: "nl-NL",
        publisher: {
          "@id": "https://snuushco.nl/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://snuushco.nl/#service",
        name: "Snuushco websites, SEO en aanvraagroutes",
        url: "https://snuushco.nl",
        areaServed: ["Nederland", "België"],
        serviceType: "Webdesign, SEO, AI Search Optimization, lead intake en aanvraagroute optimalisatie voor dienstverleners",
        provider: {
          "@id": "https://snuushco.nl/#organization",
        },
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
      },
      {
        "@type": "FAQPage",
        "@id": "https://snuushco.nl/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Voor wie is Snuushco bedoeld?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Snuushco is bedoeld voor dienstverleners die betere aanvragen willen ontvangen en minder tijd kwijt willen zijn aan handmatig opvolgwerk.",
            },
          },
          {
            "@type": "Question",
            name: "Wat levert Snuushco op?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Snuushco levert een website met een gerichte aanvraagroute, pakketadvies via intake en waar nodig extra review voor maatwerk, integraties of gevoelige claims.",
            },
          },
          {
            "@type": "Question",
            name: "Welke pakketten zijn er?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Snuushco biedt Website Quickstart, Business Website, Growth Website en Premium Maatwerk. De intake adviseert welk pakket past bij de aanvraag.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Websites voor dienstverleners</p>
            <h1>Meer goede aanvragen. Minder handmatig opvolgwerk.</h1>
            <p className="lead">
              Snuushco bouwt websites en aanvraagroutes die passen bij je branche,
              je klanten en je werkdag. Standaard waar het kan, premium maatwerk waar het moet.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/intake">Doe de intake <ArrowRight size={18} /></Link>
              <a className="button secondary" href="#doelgroepen">Bekijk doelgroepen</a>
            </div>
          </div>
        </section>
        <section id="diensten" className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Dienstenaanbod</p>
                <h2>Een compleet aanbod voor betere aanvragen.</h2>
              </div>
              <p>
                Elke aanvraag start met intake. Daarna krijg je een eerste pakketadvies,
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
        <section id="seo-ai-so" className="band seo-home-band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">SEO + AI Search Optimization</p>
                <h2>Gebouwd om gevonden te worden in Google én AI-antwoorden.</h2>
              </div>
              <p>
                Voor Snuushco en klantprojecten bouwen we vindbaarheid als systeem: technische SEO,
                servicepagina's per zoekintentie, structured data, interne links, llms.txt en content die
                ook door ChatGPT, Perplexity, Gemini en AI-overviews begrepen kan worden.
              </p>
            </div>
            <div className="grid three">
              <article className="tile"><Search color="#533afd" /><h3>SEO voor koopintentie</h3><p>Pagina's rond diensten, doelgroepen en regio's waar klanten concreet naar zoeken.</p></article>
              <article className="tile"><Bot color="#533afd" /><h3>AI-SO voor nieuwe zoekkanalen</h3><p>Entity-informatie, FAQ's, schema en AI-context zodat je aanbod beter citeerbaar wordt.</p></article>
              <article className="tile"><FileSearch color="#533afd" /><h3>Meetbare contentclusters</h3><p>Geen losse blogs, maar clusters met bewijs, CTA's en rapportage op aanvragen en leadkwaliteit.</p></article>
            </div>
            <div className="actions"><Link className="button" href="/seo-ai-so">Bekijk SEO + AI-SO <ArrowRight size={18} /></Link><Link className="button secondary" href="/marketing#seo-ai-so">Marketingaanbod</Link></div>
          </div>
        </section>
        <section id="beheer" className="band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Na livegang</p>
                <h2>Beheer en groei voor terugkerende verbetering.</h2>
              </div>
              <p>
                Een website is pas waardevol als aanvragen blijven binnenkomen en opvolging beter wordt.
                Daarom kun je na de build kiezen voor doorlopend beheer, intakeverbetering of managed growth.
              </p>
            </div>
            <div className="grid three">
              {recurringPlans.map((item) => (
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
                <p className="eyebrow">Herkenbaar per branche</p>
                <h2>Herkenbare pagina's voor herkenbare klanten.</h2>
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
                <p className="eyebrow">Werkwijze</p>
                <h2>Standaard waar veilig. Review waar nodig.</h2>
              </div>
              <p>
                De intake beoordeelt aanvragen, maakt de omvang zichtbaar en routeert gevoelige
                of complexe onderdelen naar menselijke review voordat er iets live gaat.
              </p>
            </div>
            <div className="grid three process">
              <article className="tile"><h3>Gerichte intake</h3><p>De klant vult branche, doel, gewenste omvang, urgentie en belangrijkste knelpunt in.</p></article>
              <article className="tile"><h3>Pakket en omvang</h3><p>De intake adviseert Quickstart, Business, Growth of Premium Maatwerk en markeert wat extra aandacht vraagt.</p></article>
              <article className="tile"><h3>Build en QA</h3><p>Standaardprojecten gaan naar build. Integraties, gevoelige claims en maatwerk krijgen review.</p></article>
            </div>
          </div>
        </section>
        <section className="band white">
          <div className="inner">
            <div className="grid three">
              <article className="tile"><ShieldCheck color="#0f513f" /><h3>Menselijke controle</h3><p>Gevoelige teksten, complexe koppelingen en uitzonderingen krijgen altijd review voordat ze live gaan.</p></article>
              <article className="tile"><SlidersHorizontal color="#24455f" /><h3>Premium maatwerk</h3><p>Portals, betalingen, API's, meertaligheid en complexe booking gaan naar aparte review.</p></article>
              <article className="tile"><ClipboardCheck color="#a84f35" /><h3>Betere opvolging</h3><p>Wanneer aanvragen veel tijd kosten, richten we extra hulp in voor triage, offertevoorbereiding, documenten of planning.</p></article>
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
      <Link href="/" className="brand" aria-label="Snuushco home">
        <img className="brand-logo" src="/brand/snuushco-logo-dark.jpg" alt="" aria-hidden="true" />
        <span className="brand-text">Snuushco</span>
      </Link>
      <nav className="nav" aria-label="Hoofdnavigatie">
        <Link href="/#diensten">Diensten</Link>
        <Link href="/seo-ai-so">SEO + AI-SO</Link>
        <Link href="/marketing">Marketing</Link>
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
      <div className="inner footer-inner">
        <div className="footer-brand">
          <img className="footer-logo" src="/brand/snuushco-logo-light.jpg" alt="Snuushco" />
          <p>Websites, SEO + AI-SO en aanvraagroutes met menselijke controle.</p>
        </div>
        <p><Link href="/marketing">Marketing</Link> · <Link href="/seo-ai-so">SEO + AI-SO</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/voorwaarden">Voorwaarden</Link></p>
      </div>
    </footer>
  );
}
