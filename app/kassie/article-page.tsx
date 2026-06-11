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
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    inLanguage: "nl-NL",
    dateModified: "2026-06-11",
    citation: page.sources.map((source) => source.href),
  };

  return (
    <main className="kassie-seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema]) }} />
      <section className="kassie-seo-hero">
        <p className="eyebrow">Kassie kennisbank</p>
        <h1>{page.h1}</h1>
        <p className="lead">{page.description}</p>
        <div className="kassie-meta-grid">
          <span><strong>Zoekintentie:</strong> {page.intent}</span>
          <span><strong>Primaire term:</strong> {page.primaryKeyword}</span>
          <span><strong>Peildatum:</strong> juni 2026</span>
        </div>
        <p className="source-note">{page.reviewNote}</p>
        <div className="hero-actions">
          <a className="button" href={`${appBaseUrl}/signup`}>{page.cta}</a>
          <Link className="button secondary" href="/kassie">Terug naar Kassie</Link>
        </div>
      </section>
      <section className="kassie-seo-content">
        {page.sections.map((section) => (
          <article key={section.heading} className="kassie-card">
            <h2>{section.heading}</h2>
            {section.body.map((p) => <p key={p}>{p}</p>)}
          </article>
        ))}
        <article className="kassie-card">
          <h2>Bronnen en peildatum</h2>
          <p>Deze pagina is voorzichtig geschreven en verwijst naar primaire bronnen waar regels kunnen wijzigen.</p>
          <ul>
            {page.sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a></li>)}
          </ul>
        </article>
        <article className="kassie-card">
          <h2>Veelgestelde vragen</h2>
          {page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </article>
        <article className="kassie-card">
          <h2>Verder lezen</h2>
          <ul>{page.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </article>
      </section>
    </main>
  );
}
