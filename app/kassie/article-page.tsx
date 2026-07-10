import type { Metadata } from "next";
import Link from "next/link";
import { appBaseUrl, kassieBaseUrl } from "./content";
import type { ContentPage } from "./content";

export function buildArticleMetadata(page: ContentPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${kassieBaseUrl}/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `${kassieBaseUrl}/${page.slug}`, type: "article", locale: "nl_NL" },
  };
}

export function KassieArticlePage({ page }: { page: ContentPage }) {
  const url = `${kassieBaseUrl}/${page.slug}`;
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: page.h1, description: page.description, inLanguage: "nl-NL", dateModified: "2026-06-11", datePublished: "2026-06-11", mainEntityOfPage: url, author: { "@type": "Organization", name: "Kassie" }, publisher: { "@type": "Organization", name: "Kassie", url: kassieBaseUrl } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Kassie", item: kassieBaseUrl }, { "@type": "ListItem", position: 2, name: page.h1, item: url }] };
  const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: `${page.h1} aanpakken`, step: page.sections.slice(0, 4).map((section, index) => ({ "@type": "HowToStep", position: index + 1, name: section.heading, text: section.body.join(" ") })) };
  return <main className="kassie-seo-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema, howToSchema]) }} /><section className="kassie-seo-hero"><p className="eyebrow">Kassie kennisbank · geüpdatet juni 2026</p><h1>{page.h1}</h1><p className="lead">{page.description}</p><div className="kassie-meta-grid"><span><strong>Zoekintentie:</strong> {page.intent}</span><span><strong>Primaire term:</strong> {page.primaryKeyword}</span><span><strong>Peildatum:</strong> juni 2026</span></div><div className="hero-actions"><a className="button" href={`${appBaseUrl}/signup`}>{page.cta}</a><Link className="button secondary" href="/kassie">Terug naar Kassie</Link></div></section><section className="kassie-seo-content"><article className="kassie-card"><h2>Samenvatting voor snelle beslissers</h2><ul><li><strong>Kort antwoord:</strong> {page.sections[0]?.body[0]}</li><li><strong>Belangrijk:</strong> bewaar bewijs, context en peildatum bij fiscale/administratieve keuzes.</li><li><strong>Review-safe:</strong> Kassie zet concepten klaar en markeert twijfelgevallen voor menselijke controle.</li></ul></article>{page.sections.map((section) => <article key={section.heading} className="kassie-card"><h2>{section.heading}</h2>{section.body.map((p) => <p key={p}>{p}</p>)}</article>)}<article className="kassie-card"><h2>Veelgestelde vragen</h2>{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</article>{page.sources?.length ? <article className="kassie-card"><h2>Bronnen en peildatum</h2><p>Peildatum: juni 2026. Gebruik deze pagina als algemene oriëntatie en controleer actuele details bij primaire bronnen of je boekhouder.</p><ul>{page.sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer" target="_blank">{source.label}</a></li>)}</ul></article> : null}<article className="kassie-card"><h2>Verder lezen</h2><ul>{page.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></article></section></main>;
}
