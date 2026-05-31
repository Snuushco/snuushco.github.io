import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, FileSearch, LineChart, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, Header } from "../page";
import TrackingPixel from "../tracking-pixel";

export const metadata: Metadata = {
  title: "SEO en AI Search Optimization bureau Nederland | Snuushco",
  description:
    "Snuushco bouwt SEO en AI-SO vindbaarheid voor MKB-dienstverleners: topische contentclusters, structured data, llms.txt en landingspagina's die aanvragen opleveren.",
  alternates: { canonical: "/seo-ai-so" },
  keywords: [
    "SEO bureau Nederland",
    "AI Search Optimization bureau",
    "AI-SO bureau",
    "ChatGPT vindbaarheid verbeteren",
    "SEO voor MKB dienstverleners",
    "Snuushco SEO AI-SO",
  ],
  openGraph: {
    title: "SEO + AI-SO Engine | Snuushco",
    description:
      "Word beter vindbaar in Google, ChatGPT, Perplexity, Gemini en AI-overviews met een commerciële SEO + AI-SO route.",
    url: "https://snuushco.nl/seo-ai-so",
    type: "website",
    locale: "nl_NL",
    images: [{ url: "/brand/snuushco-logo-dark.jpg", width: 1024, height: 1024, alt: "Snuushco" }],
  },
};

const pillars = [
  { icon: Search, title: "SEO voor zoekintentie", text: "Pagina's rond concrete diensten, doelgroepen, regio's en koopintentie — niet rond vrijblijvende blogvulling." },
  { icon: Bot, title: "AI-SO voor AI-antwoorden", text: "Bedrijf, diensten, prijzen, bewijs en FAQ's worden zo gestructureerd dat AI-systemen je aanbod beter begrijpen." },
  { icon: FileSearch, title: "Entity en bewijslaag", text: "Schema, interne links, llms.txt, cases, vergelijkingspagina's en bronvermeldingen maken je propositie verifieerbaar." },
  { icon: LineChart, title: "Rapportage op aanvragen", text: "We sturen op vindbaarheid, citatiekans, leadkwaliteit en intakeconversie — niet op ijdele rankings alleen." },
];

const searches = [
  "website laten maken voor dienstverleners",
  "SEO bureau voor MKB dienstverleners",
  "AI Search Optimization bureau Nederland",
  "ChatGPT vindbaarheid bedrijf verbeteren",
  "landingspagina laten maken voor leadgeneratie",
  "aanvraagformulier website verbeteren",
];

export default function SeoAiSoPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://snuushco.nl/seo-ai-so#service",
        name: "SEO en AI Search Optimization",
        alternateName: ["AI-SO", "AI Search Optimization bureau", "SEO + AI-SO Engine"],
        url: "https://snuushco.nl/seo-ai-so",
        serviceType: "SEO, AI Search Optimization, structured data, contentclusters en leadgeneratie",
        areaServed: ["Nederland", "België"],
        provider: { "@id": "https://snuushco.nl/#organization" },
        audience: { "@type": "BusinessAudience", audienceType: "MKB-dienstverleners" },
        offers: {
          "@type": "Offer",
          name: "SEO + AI-SO Engine",
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", description: "vanaf €1.450 p/m" },
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://snuushco.nl/seo-ai-so#faq",
        mainEntity: [
          { "@type": "Question", name: "Wat is AI-SO?", acceptedAnswer: { "@type": "Answer", text: "AI-SO staat voor AI Search Optimization: je website, bedrijfsinformatie en bewijs zo structureren dat AI-systemen zoals ChatGPT, Perplexity, Gemini en AI-overviews je aanbod kunnen begrijpen, vergelijken en noemen." } },
          { "@type": "Question", name: "Is dit een garantie op top 3 posities?", acceptedAnswer: { "@type": "Answer", text: "Nee. Geen bureau kan organische top 3 posities garanderen. Snuushco bouwt wel de technische, inhoudelijke en commerciële basis die nodig is om kansrijk te concurreren op relevante zoekopdrachten." } },
          { "@type": "Question", name: "Voor wie is SEO + AI-SO bedoeld?", acceptedAnswer: { "@type": "Answer", text: "Voor MKB-dienstverleners waar betere vindbaarheid direct kan leiden tot betere aanvragen, zoals bouw, techniek, recruitment, administratie, zorgondersteuning, security, facilitair en software/SaaS." } },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <TrackingPixel eventName="landing_view" metadata={{ landing: "seo-ai-so" }} />
      <Header />
      <main className="marketing-page seo-page">
        <section className="marketing-hero seo-hero">
          <div className="marketing-orb marketing-orb-one" />
          <div className="marketing-orb marketing-orb-two" />
          <div className="marketing-hero-inner">
            <div className="marketing-hero-copy">
              <p className="marketing-eyebrow">SEO bureau + AI Search Optimization</p>
              <h1>Maak Snuushco zichtbaar waar klanten nu zoeken.</h1>
              <p className="marketing-lead">
                We bouwen de SEO + AI-SO basis waarmee je bedrijf kansrijk wordt voor Google, ChatGPT,
                Perplexity, Gemini en AI-overviews. Niet met generieke content, maar met servicepagina's,
                schema, llms.txt, interne links en bewijs dat naar aanvragen leidt.
              </p>
              <div className="marketing-actions">
                <Link className="marketing-button primary" href="/intake?source=seo-ai-so&campaign=service-page">
                  Start SEO + AI-SO intake <ArrowRight size={18} />
                </Link>
                <a className="marketing-button secondary" href="#zoekopdrachten">Bekijk zoekopdrachten</a>
              </div>
              <div className="marketing-proof-row">
                <span><strong>Google</strong> technische SEO + contentclusters</span>
                <span><strong>AI</strong> ChatGPT, Perplexity, Gemini, AI-overviews</span>
                <span><strong>MKB</strong> gericht op aanvraagkwaliteit</span>
              </div>
            </div>
            <aside className="marketing-dashboard seo-radar" aria-label="SEO en AI-SO radar">
              <div className="dashboard-topline"><span>Visibility system</span><span className="status-dot">Indexeerbaar</span></div>
              <div className="seo-radar-logo"><img src="/brand/snuushco-logo-dark.jpg" alt="Snuushco" /></div>
              <div className="dashboard-card-list">
                <div><CheckCircle2 size={16} /> Structured data en entity-profiel</div>
                <div><Bot size={16} /> AI-context via llms.txt en FAQ's</div>
                <div><Sparkles size={16} /> Landingspagina's per koopintentie</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="marketing-band white">
          <div className="marketing-inner">
            <div className="marketing-section-head">
              <div><p className="marketing-eyebrow">Wat we opleveren</p><h2>Een vindbaarheidssysteem dat machines én mensen begrijpen.</h2></div>
              <p>Topposities ontstaan niet uit één truc. Ze vragen een duidelijke propositie, sterke pagina's, technische indexeerbaarheid, autoriteit en meetbare opvolging.</p>
            </div>
            <div className="marketing-grid four">
              {pillars.map((pillar) => { const Icon = pillar.icon; return <article className="marketing-card" key={pillar.title}><Icon size={26} /><h3>{pillar.title}</h3><p>{pillar.text}</p></article>; })}
            </div>
          </div>
        </section>

        <section className="marketing-band ai-so" id="zoekopdrachten">
          <div className="marketing-inner split">
            <div>
              <p className="marketing-eyebrow">Zoekopdrachten waarop we bouwen</p>
              <h2>Niet alleen “Snuushco”, maar specifieke commerciële intentie.</h2>
              <p className="marketing-body">De eerste fase richt zich op branded vindbaarheid plus dienst-specifieke pagina's waar kopers concreet naar zoeken. Top 3 kunnen we niet beloven; de site krijgt wel de structuur die nodig is om daarvoor te concurreren.</p>
            </div>
            <div className="seo-query-list">
              {searches.map((query) => <span key={query}>{query}</span>)}
            </div>
          </div>
        </section>

        <section className="marketing-band dark">
          <div className="marketing-inner">
            <div className="marketing-section-head">
              <div><p className="marketing-eyebrow">Eerlijke ambitie</p><h2>Top 3 is het doel; controleerbare verbetering is de route.</h2></div>
              <p>We publiceren alsof een klantproject live gaat: duidelijke metadata, structured data, sitemap, interne links, AI-context en landingspagina's met aanvraag-CTA's. Daarna moet autoriteit groeien met cases, backlinks, reviews en consistente publicatie.</p>
            </div>
            <Link className="marketing-button primary" href="/marketing#seo-ai-so">Bekijk het marketingaanbod <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
