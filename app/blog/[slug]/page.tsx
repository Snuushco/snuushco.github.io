import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKassieBlogPost, kassieBlogBaseUrl, kassieBlogPosts } from "../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return kassieBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getKassieBlogPost(slug);
  if (!post) return {};

  const url = `${kassieBlogBaseUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | Kassie`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "nl_NL",
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getKassieBlogPost(slug);
  if (!post) notFound();

  const url = `${kassieBlogBaseUrl}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: "nl-NL",
    datePublished: post.date,
    dateModified: post.updated,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Kassie" },
    publisher: { "@type": "Organization", name: "Kassie", url: kassieBlogBaseUrl },
    about: [post.category, "Peppol", "ViDA", "e-facturatie", "zzp administratie"],
    citation: post.sources.map((source) => source.href),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kassie", item: kassieBlogBaseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${kassieBlogBaseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main className="kassie-seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }} />
      <section className="kassie-seo-hero">
        <p className="eyebrow">{post.category} · {post.readingTime} · peildatum {new Intl.DateTimeFormat("nl-NL", { month: "long", year: "numeric" }).format(new Date(post.updated))}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.intro}</p>
        <div className="kassie-meta-grid">
          <span><strong>Gepubliceerd:</strong> {new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(new Date(post.date))}</span>
          <span><strong>Bron:</strong> {post.monitorSource}</span>
          <span><strong>Review-safe:</strong> geen fiscaal advies; controleer primaire bronnen bij twijfel.</span>
        </div>
        <div className="hero-actions">
          <a className="button" href="https://mijn.kassieapp.nl/signup">Start gratis met Kassie</a>
          <Link className="button secondary" href="/blog">Alle artikelen</Link>
        </div>
      </section>

      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Belangrijkste punten</h2>
          <ul>
            {post.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
          </ul>
        </article>

        {post.sections.map((section) => (
          <article className="kassie-card" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        ))}

        <article className="kassie-card">
          <h2>Bronnen en peildatum</h2>
          <p>
            Dit artikel is gebaseerd op monitor-output en primaire bronlinks met peildatum {new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(new Date(post.updated))}.
            Gebruik dit als praktische oriëntatie, niet als fiscaal of juridisch advies.
          </p>
          <ul>
            {post.sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer" target="_blank">{source.label}</a></li>)}
          </ul>
        </article>

        <article className="kassie-card">
          <h2>Verder lezen</h2>
          <ul>
            {post.related.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
          </ul>
        </article>
      </section>
    </main>
  );
}
