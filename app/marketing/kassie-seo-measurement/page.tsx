import type { Metadata } from "next";
import { kassieEventTaxonomy, kassieStaticMarketingRoutes, kassieToolSlugs } from "../../lib/kassie-seo";

export const metadata: Metadata = {
  title: "Kassie SEO & measurement dashboard template",
  description: "Interne weektemplate voor Kassie technische SEO, sitemap, tools en meettaxonomie.",
  alternates: { canonical: "https://kassieapp.nl/marketing/kassie-seo-measurement" },
  robots: { index: false, follow: false },
};

const weeklyChecks = [
  "Sitemap bevat alle Kassie canonical routes op kassieapp.nl en geen snuushco.nl Kassie-URL's.",
  "robots.txt verwijst naar kassieapp.nl/sitemap.xml en blokkeert /ops en /api/ops.",
  "Toproutes hebben unieke title, description, canonical en H1.",
  "Toolpagina's laden SoftwareApplication + BreadcrumbList JSON-LD.",
  "Kennisbank/pillar pagina's laden Article + FAQPage + BreadcrumbList JSON-LD.",
  "GA4 events worden gegroepeerd volgens de Kassie taxonomy en in /ops funnel getoond.",
  "Search Console/Bing inspectie: nieuwe of gewijzigde routes ingediend of als wachtend gemarkeerd.",
];

export default function Page() {
  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero">
        <p className="eyebrow">Interne marketingcontrol</p>
        <h1>Kassie weekly SEO & measurement dashboard</h1>
        <p className="lead">Template voor een wekelijkse KPI-review. Dit is bewust een lokale/ops controlpagina: publiceren, nieuwsbrieven en outreach blijven review-gated.</p>
      </section>
      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Wekelijkse technische checklist</h2>
          <ul>{weeklyChecks.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="kassie-card">
          <h2>KPI's om te rapporteren</h2>
          <div className="kassie-meta-grid">
            <span><strong>Indexatie:</strong> ingediende routes, geïndexeerde routes, crawlproblemen</span>
            <span><strong>Content:</strong> sessies per pillar/beroep/tool, CTR vanuit Search Console</span>
            <span><strong>Tools:</strong> tool views, tool used, contact clicks</span>
            <span><strong>Leads:</strong> nieuwsbrief intentie, intake starts, intake submissions</span>
            <span><strong>Revenue:</strong> checkout started, paid lead</span>
            <span><strong>Actie:</strong> volgende route, technische fix of reviewbesluit</span>
          </div>
        </article>
        <article className="kassie-card">
          <h2>Meet-taxonomie</h2>
          <table className="ops-table"><thead><tr><th>Event</th><th>Categorie</th><th>Waarom</th><th>Primaire KPI</th></tr></thead><tbody>{kassieEventTaxonomy.map((event) => <tr key={event.name}><td>{event.name}</td><td>{event.category}</td><td>{event.description}</td><td>{event.primaryMetric}</td></tr>)}</tbody></table>
        </article>
        <article className="kassie-card">
          <h2>Route-audit scope</h2>
          <p>Statische Kassie-routes: {kassieStaticMarketingRoutes.map((route) => route || "home").join(", ")}</p>
          <p>Toolroutes: {kassieToolSlugs.join(", ")}</p>
        </article>
      </section>
    </main>
  );
}
