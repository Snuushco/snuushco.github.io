import type { Metadata } from "next";
import Link from "next/link";
import { appBaseUrl, kassieBaseUrl } from "./content";
import type { ContentPage } from "./content";

const defaultPublishedDate = "2026-06-11";

function formatUpdatedMonth(date: string) {
  return new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" }).format(
    new Date(`${date}T12:00:00Z`),
  );
}

export function buildArticleMetadata(page: ContentPage): Metadata {
  const url = `${kassieBaseUrl}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "article",
      locale: "nl_NL",
      images: [
        {
          url: `${kassieBaseUrl}/brand/kassie-og.jpg`,
          alt: "Kassie helpt zzp'ers hun administratie controleerbaar bij te houden",
        },
      ],
    },
  };
}

export function KassieArticlePage({ page }: { page: ContentPage }) {
  const url = `${kassieBaseUrl}/${page.slug}`;
  const updated = page.updated ?? defaultPublishedDate;
  const updatedLabel = formatUpdatedMonth(updated);
  const howToSteps = page.checklist
    ? page.checklist.items.map((item, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: item.title,
        text: item.checks.join(" "),
      }))
    : page.sections.slice(0, 4).map((section, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: section.heading,
        text: section.body.join(" "),
      }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    inLanguage: "nl-NL",
    dateModified: updated,
    datePublished: defaultPublishedDate,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Kassie" },
    publisher: { "@type": "Organization", name: "Kassie", url: kassieBaseUrl },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kassie", item: kassieBaseUrl },
      { "@type": "ListItem", position: 2, name: page.h1, item: url },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${page.h1} uitvoeren`,
    ...(page.checklist ? { totalTime: "PT15M" } : {}),
    step: howToSteps,
  };

  return (
    <main className={`kassie-seo-page${page.checklist ? " has-print-checklist" : ""}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema, howToSchema]),
        }}
      />

      <section className="kassie-seo-hero">
        <p className="eyebrow">Kassie kennisbank · geüpdatet {updatedLabel}</p>
        <h1>{page.h1}</h1>
        <p className="lead">{page.description}</p>
        <div className="kassie-meta-grid">
          <span><strong>Zoekintentie:</strong> {page.intent}</span>
          <span><strong>Primaire term:</strong> {page.primaryKeyword}</span>
          <span><strong>Peildatum:</strong> {updatedLabel}</span>
        </div>
        <div className="hero-actions">
          <a className="button" href={`${appBaseUrl}/signup`}>{page.cta}</a>
          <Link className="button secondary" href="/">Terug naar Kassie</Link>
        </div>
      </section>

      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Samenvatting voor snelle beslissers</h2>
          <ul>
            <li><strong>Kort antwoord:</strong> {page.sections[0]?.body[0]}</li>
            <li><strong>Belangrijk:</strong> bewaar bewijs en zakelijke context bij iedere administratiekeuze.</li>
            <li><strong>Review-safe:</strong> Kassie zet concepten klaar en houdt twijfelgevallen zichtbaar voor menselijke controle.</li>
          </ul>
        </article>

        {page.checklist ? (
          <article className="kassie-card kassie-print-checklist" id="weekchecklist">
            <div className="kassie-checklist-heading">
              <div>
                <p className="eyebrow">Gratis · zonder e-mailgate</p>
                <h2>{page.checklist.title}</h2>
              </div>
              <span className="kassie-checklist-duration">15 minuten</span>
            </div>
            <p>{page.checklist.intro}</p>

            <ol className="kassie-checklist-steps">
              {page.checklist.items.map((item) => (
                <li key={item.title}>
                  <div className="kassie-checklist-step-heading">
                    <span>{item.time}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <ul className="kassie-checklist-ticks">
                    {item.checks.map((check) => (
                      <li key={check}><span aria-hidden="true">□</span>{check}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="kassie-review-box">
              <h3>Zet apart voor review</h3>
              <ul className="kassie-checklist-ticks">
                {page.checklist.reviewItems.map((item) => (
                  <li key={item}><span aria-hidden="true">□</span>{item}</li>
                ))}
              </ul>
              <p>Noteer alleen het bedrag, het beschikbare bewijs en je open vraag. Laat fiscale twijfel beoordelen door je boekhouder of een andere deskundige.</p>
            </div>

            <div className="kassie-checklist-actions">
              <a className="button kassie-download-link" href={page.checklist.downloadHref} download>
                Download checklist (.md)
              </a>
              <p>Printtip: kies in je browser <strong>Afdrukken</strong> en bewaar desgewenst als pdf. De printweergave toont alleen de checklist.</p>
            </div>
          </article>
        ) : null}

        {page.sections.map((section) => (
          <article key={section.heading} className="kassie-card">
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        ))}

        <article className="kassie-card">
          <h2>Veelgestelde vragen</h2>
          {page.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </article>

        {page.sources?.length ? (
          <article className="kassie-card">
            <h2>Bronnen en peildatum</h2>
            <p>Peildatum: {updatedLabel}. Gebruik deze pagina als praktische oriëntatie en controleer actuele fiscale details bij primaire bronnen of je boekhouder.</p>
            <ul>
              {page.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} rel="noopener noreferrer" target="_blank">{source.label}</a>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <article className="kassie-card">
          <h2>Verder lezen</h2>
          <ul>
            {page.links.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
