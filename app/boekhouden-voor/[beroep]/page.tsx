import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appBaseUrl, kassieBaseUrl, getProfessionDetail, professions } from "../../kassie/content";

type Props = { params: Promise<{ beroep: string }> };
export function generateStaticParams() { return professions.map((p) => ({ beroep: p.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { beroep } = await params;
  const item = professions.find((p) => p.slug === beroep);
  if (!item) return {};
  return { title: `Boekhouden voor ${item.label} | Kassie`, description: `Beroepsspecifieke administratie, btw, bonnen, facturen en weekroutine voor ${item.label}. Kassie helpt via WhatsApp en dashboard.`, alternates: { canonical: `${kassieBaseUrl}/boekhouden-voor/${item.slug}` }, openGraph: { title: `Boekhouden voor ${item.label} | Kassie`, description: `Praktische administratie voor ${item.label}: inkomsten, kosten, bewijs en facturen.`, url: `${kassieBaseUrl}/boekhouden-voor/${item.slug}` } };
}

export default async function Page({ params }: Props) {
  const { beroep } = await params;
  const item = professions.find((p) => p.slug === beroep);
  if (!item) notFound();
  const detail = getProfessionDetail(item.slug);
  const url = `${kassieBaseUrl}/boekhouden-voor/${item.slug}`;
  const schema = [{ "@context": "https://schema.org", "@type": "Article", headline: `Boekhouden voor ${item.label}`, description: `Administratiegids voor ${item.label}`, inLanguage: "nl-NL", dateModified: "2026-06-11", mainEntityOfPage: url, author: { "@type": "Organization", name: "Kassie" } }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: `Welke kosten zijn typisch voor ${item.label}?`, acceptedAnswer: { "@type": "Answer", text: detail.costs.join(", ") } }, { "@type": "Question", name: `Hoe factureer je als ${item.label}?`, acceptedAnswer: { "@type": "Answer", text: detail.invoice } }] }];
  return <main className="kassie-seo-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><section className="kassie-seo-hero"><p className="eyebrow">Boekhouden voor beroepen · peildatum juni 2026</p><h1>Boekhouden voor {item.label}</h1><p className="lead">Een praktische pagina voor {item.label}: inkomsten, kosten, btw-aandachtspunten, bewijsstukken en een weekroutine die je kunt volhouden.</p><div className="hero-actions"><a className="button" href={`${appBaseUrl}/signup`}>Start gratis</a><a className="button secondary" href="/boekhouden-zzp">Lees de complete gids</a></div></section><section className="kassie-seo-content"><article className="kassie-card"><h2>Kort antwoord</h2><p>Als {item.label} wil je per opdracht of klant kunnen uitleggen wat je hebt verdiend, welke kosten erbij horen en welk bewijs beschikbaar is. Kassie helpt door bonnen, opdrachten en vragen vanuit WhatsApp om te zetten naar reviewbare administratie-acties.</p></article><article className="kassie-card"><h2>Typische inkomsten</h2><ul>{detail.income.map((income) => <li key={income}>{income}</li>)}</ul><p>Voorbeeld factuurregel: <strong>{detail.invoice}</strong></p></article><article className="kassie-card"><h2>Typische kosten en bewijs</h2><ul>{detail.costs.map((cost) => <li key={cost}>{cost}</li>)}</ul><p>Bewaar per kostenpost datum, leverancier, bedrag, btw en zakelijk doel. Bij gemengd privé/zakelijk gebruik: leg je berekening vast.</p></article><article className="kassie-card"><h2>Weekroutine voor {item.label}</h2><p>{detail.routine}</p><p>Controleer daarnaast wekelijks openstaande facturen, ontbrekende bonnen en twijfelgevallen voor je boekhouder.</p></article><article className="kassie-card"><h2>Review-safe aandachtspunt</h2><p>{detail.warning}</p><p>Deze pagina is algemene informatie, geen persoonlijk fiscaal advies. Laat grensgevallen beoordelen.</p></article><article className="kassie-card"><h2>Interne links</h2><ul><li><a href="/btw-aangifte-zzp">BTW-aangifte als ZZP'er</a></li><li><a href="/aftrekposten-zzp">Aftrekposten en zakelijke kosten</a></li><li><a href="/tools/btw-calculator">BTW-calculator</a></li><li><a href="/bonnen-bewaren-zzp">Bonnen bewaren</a></li></ul></article></section></main>;
}
