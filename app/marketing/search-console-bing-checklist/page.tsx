import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Console en Bing checklist | Kassie",
  description: "Review-safe indieningschecklist voor Kassie routes als directe Search Console/Bing auth ontbreekt.",
  alternates: { canonical: "https://kassieapp.nl/marketing/search-console-bing-checklist" },
  robots: { index: false, follow: false },
};

const submissionSteps = [
  "Controleer live status 200 op https://kassieapp.nl en representatieve nieuwe routes.",
  "Open https://kassieapp.nl/robots.txt en bevestig dat de sitemapregel naar https://kassieapp.nl/sitemap.xml verwijst.",
  "Open https://kassieapp.nl/sitemap.xml en bevestig dat nieuwe Kassie-routes alleen kassieapp.nl canonical URL's gebruiken.",
  "Google Search Console: property kassieapp.nl openen, sitemap /sitemap.xml opnieuw indienen, daarna 3-5 representatieve URL's via URL Inspection aanvragen.",
  "Bing Webmaster Tools: kassieapp.nl property openen, sitemap opnieuw indienen, daarna URL Submission gebruiken voor prioriteitsroutes.",
  "Noteer datum, account, ingediende routes, status en eventuele coverage/crawl errors in het weekly SEO dashboard.",
];

const priorityRoutes = [
  "https://kassieapp.nl/boekhouden-zzp",
  "https://kassieapp.nl/btw-aangifte-zzp",
  "https://kassieapp.nl/e-facturatie-peppol-vida",
  "https://kassieapp.nl/tools/btw-calculator",
  "https://kassieapp.nl/tools/factuurgenerator",
  "https://kassieapp.nl/boekhouden-voor/kapper",
  "https://kassieapp.nl/kennisbank/kor",
  "https://kassieapp.nl/vergelijk/moneybird",
];

export default function Page() {
  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero">
        <p className="eyebrow">Ops checklist</p>
        <h1>Search Console en Bing submission checklist</h1>
        <p className="lead">Gebruik deze checklist wanneer directe Google/Bing auth niet beschikbaar is voor de agent. Dit is een handmatige review/ops stap, geen autonome outreach.</p>
      </section>
      <section className="kassie-seo-content">
        <article className="kassie-card"><h2>Indienstappen</h2><ol>{submissionSteps.map((step) => <li key={step}>{step}</li>)}</ol></article>
        <article className="kassie-card"><h2>Prioriteitsroutes voor inspectie</h2><ul>{priorityRoutes.map((route) => <li key={route}><a href={route}>{route}</a></li>)}</ul></article>
        <article className="kassie-card"><h2>Rapportageveld</h2><p>Plak in de weekrapportage: datum, sitemapstatus, URL-inspectieresultaten, indexing/crawl blockers, volgende actie en eigenaar.</p></article>
      </section>
    </main>
  );
}
