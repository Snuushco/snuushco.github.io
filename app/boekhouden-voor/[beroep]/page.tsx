import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appBaseUrl, kassieBaseUrl, professions } from "../../kassie/content";

type Props = { params: Promise<{ beroep: string }> };

export function generateStaticParams() {
  return professions.map((p) => ({ beroep: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { beroep } = await params;
  const item = professions.find((p) => p.slug === beroep);
  if (!item) return {};

  return {
    title: `Boekhouden voor ${item.label} | Kassie`,
    description: `Praktische administratie, btw, bonnen, kosten en weekroutine voor ${item.label}. Kassie helpt via WhatsApp en dashboard.`,
    alternates: { canonical: `${kassieBaseUrl}/boekhouden-voor/${item.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { beroep } = await params;
  const item = professions.find((p) => p.slug === beroep);
  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Boekhouden voor ${item.label}`,
    description: `Administratiegids voor ${item.label} met voorbeelden, kosten, btw-aandachtspunten en routine.`,
    inLanguage: "nl-NL",
    dateModified: "2026-06-11",
  };

  return (
    <main className="kassie-seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="kassie-seo-hero">
        <p className="eyebrow">Boekhouden voor beroepen</p>
        <h1>Boekhouden voor {item.label}</h1>
        <p className="lead">Een praktische pagina voor {item.label}: welke bonnen, facturen, btw-aandachtspunten en weekroutine horen bij je administratie?</p>
        <p className="source-note">Peildatum: juni 2026. Voorbeelden zijn praktisch bedoeld; btw-tarieven, vrijstellingen en aftrekbaarheid blijven afhankelijk van actuele regels en jouw situatie.</p>
        <div className="hero-actions">
          <a className="button" href={`${appBaseUrl}/signup`}>Start gratis</a>
          <a className="button secondary" href="/boekhouden-zzp">Lees de complete gids</a>
        </div>
      </section>
      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Herkenbare administratie</h2>
          <p>Als {item.label} heb je vaak terugkerende opdrachten, kosten en klantafspraken. Kassie zet bonnen, opdrachten en factuurconcepten vanuit WhatsApp klaar zodat jij niet achteraf alles hoeft te reconstrueren.</p>
          <ul>{item.examples.map((example) => <li key={example}>{example}</li>)}</ul>
        </article>
        <article className="kassie-card">
          <h2>Typische kosten en bewijs</h2>
          <p>Bewaar kosten direct bij de juiste opdracht of periode. Bij {item.label} komen vaak deze kosten terug:</p>
          <ul>{item.costs.map((cost) => <li key={cost}>{cost}</li>)}</ul>
        </article>
        <article className="kassie-card">
          <h2>BTW-aandachtspunt</h2>
          <p>{item.btw}</p>
          <p>Gebruik dit als signaal, niet als fiscaal advies. Kassie maakt twijfel zichtbaar zodat jij of je boekhouder kunt controleren voordat iets definitief wordt verwerkt.</p>
        </article>
        <article className="kassie-card">
          <h2>Weekroutine voor {item.label}</h2>
          <ul>{item.routine.map((step) => <li key={step}>{step}</li>)}</ul>
          <p>Een korte vaste routine voorkomt kwartaalstress en maakt je administratie beter controleerbaar.</p>
        </article>
        <article className="kassie-card">
          <h2>Interne links</h2>
          <ul>
            <li><a href="/btw-aangifte-zzp">BTW-aangifte als ZZP'er</a></li>
            <li><a href="/aftrekposten-zzp">Aftrekposten en zakelijke kosten</a></li>
            <li><a href="/tools/btw-calculator">BTW-calculator</a></li>
          </ul>
        </article>
      </section>
    </main>
  );
}
