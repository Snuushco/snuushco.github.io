import type { Metadata } from "next";
import Link from "next/link";
import { kassieBlogBaseUrl, kassieBlogPosts } from "./data";

export const metadata: Metadata = {
  title: "Kassie blog: e-facturatie, Peppol en zzp-administratie",
  description: "Actuele Kassie artikelen op basis van de Peppol/ViDA monitor en praktische administratievragen voor zzp’ers.",
  alternates: { canonical: `${kassieBlogBaseUrl}/blog` },
  openGraph: {
    title: "Kassie blog",
    description: "Praktische updates over e-facturatie, Peppol, ViDA en zzp-administratie.",
    url: `${kassieBlogBaseUrl}/blog`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function BlogIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Kassie blog",
    url: `${kassieBlogBaseUrl}/blog`,
    inLanguage: "nl-NL",
    publisher: { "@type": "Organization", name: "Kassie", url: kassieBlogBaseUrl },
    blogPost: kassieBlogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${kassieBlogBaseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated,
    })),
  };

  return (
    <main className="kassie-seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="kassie-seo-hero">
        <p className="eyebrow">Kassie blog · monitor-gestuurd</p>
        <h1>Actuele updates over Peppol, ViDA en simpele zzp-administratie</h1>
        <p className="lead">
          Artikelen op basis van de Kassie marketing monitor. Publicatie is praktisch en review-safe:
          geen fiscale zekerheid, wel bronnen, peildatum en concrete stappen voor ondernemers.
        </p>
        <div className="hero-actions">
          <a className="button" href="https://mijn.kassieapp.nl/signup">Start gratis met Kassie</a>
          <Link className="button secondary" href="/e-facturatie/vida-peppol-tijdlijn">Bekijk de ViDA-tijdlijn</Link>
        </div>
      </section>
      <section className="kassie-seo-content">
        {kassieBlogPosts.map((post) => (
          <article className="kassie-card" key={post.slug}>
            <p className="eyebrow">{post.category} · {post.readingTime} · {new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(new Date(post.date))}</p>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p className="small-note">Bron: {post.monitorSource}</p>
            <Link href={`/blog/${post.slug}`}>Lees artikel →</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
