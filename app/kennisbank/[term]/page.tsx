import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { kassieBaseUrl, knowledgeTerms } from "../../kassie/content";

type Props = { params: Promise<{ term: string }> };

export function generateStaticParams() {
  return knowledgeTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const item = knowledgeTerms.find((t) => t.slug === term);
  return item
    ? {
        title: `${item.title}: betekenis voor ZZP'ers | Kassie`,
        description: item.summary,
        alternates: { canonical: `${kassieBaseUrl}/kennisbank/${item.slug}` },
      }
    : {};
}

export default async function Page({ params }: Props) {
  const { term } = await params;
  const item = knowledgeTerms.find((t) => t.slug === term);
  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Wat is ${item.title}?`, acceptedAnswer: { "@type": "Answer", text: item.summary } },
      { "@type": "Question", name: `Waar let je op bij ${item.title}?`, acceptedAnswer: { "@type": "Answer", text: item.commonMistake } },
    ],
  };

  return (
    <main className="kassie-seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="kassie-seo-hero">
        <p className="eyebrow">Kennisbank</p>
        <h1>{item.title}</h1>
        <p className="lead">{item.summary}</p>
        <p className="source-note">Peildatum: juni 2026. Gebruik deze uitleg als oriëntatie; fiscale of juridische toepassing blijft afhankelijk van actuele bronnen en jouw situatie.</p>
      </section>
      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Kort antwoord</h2>
          <p>{item.summary}</p>
          <p>Voor ZZP'ers is vooral belangrijk dat je bewijs, context en datum vastlegt. Kassie helpt om losse administratie-acties reviewbaar te maken.</p>
        </article>
        <article className="kassie-card">
          <h2>Praktisch gebruik</h2>
          <p>{item.practicalUse}</p>
        </article>
        <article className="kassie-card">
          <h2>Veelgemaakte fout</h2>
          <p>{item.commonMistake}</p>
        </article>
        <article className="kassie-card">
          <h2>Bronnen</h2>
          <p>Controleer actuele voorwaarden, bedragen en uitzonderingen altijd bij primaire bronnen of je boekhouder.</p>
          <ul>{item.sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a></li>)}</ul>
        </article>
        <article className="kassie-card">
          <h2>Verder lezen</h2>
          <ul>
            <li><a href="/boekhouden-zzp">Boekhouden voor ZZP'ers</a></li>
            <li><a href="/btw-aangifte-zzp">BTW-aangifte doen</a></li>
            <li><a href="/factureren-zzp">Factureren als ZZP'er</a></li>
          </ul>
        </article>
      </section>
    </main>
  );
}
