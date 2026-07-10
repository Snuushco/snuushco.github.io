import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appBaseUrl, kassieBaseUrl, toolPages } from "../../kassie/content";

type Props = { params: Promise<{ tool: string }> };
const dedicatedToolRoutes = new Set(["factuurgenerator", "btw-calculator", "peppol-ready-check", "uurtarief-calculator", "aftrekposten-checker"]);
export function generateStaticParams() { return toolPages.filter((tool) => !dedicatedToolRoutes.has(tool.slug)).map((tool) => ({ tool: tool.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const item = toolPages.find((t) => t.slug === tool);
  return item ? { title: `${item.title} | Kassie`, description: item.description, alternates: { canonical: `${kassieBaseUrl}/tools/${item.slug}` }, openGraph: { title: `${item.title} | Kassie`, description: item.description, url: `${kassieBaseUrl}/tools/${item.slug}` } } : {};
}

export default async function Page({ params }: Props) {
  const { tool } = await params;
  const item = toolPages.find((t) => t.slug === tool);
  if (!item) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: item.title,
    description: item.description,
    url: `${kassieBaseUrl}/tools/${item.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
  const checklist = [
    "Vul de gegevens zo concreet mogelijk in.",
    "Controleer bedrag, btw, periode en bewijsstuk.",
    "Markeer twijfelgevallen voor je boekhouder.",
    "Bewaar de uitkomst bij je administratie.",
  ];
  return <main className="kassie-seo-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><section className="kassie-seo-hero"><p className="eyebrow">Gratis Kassie tool</p><h1>{item.title}</h1><p className="lead">{item.description}</p><div className="hero-actions"><a className="button" href={`${appBaseUrl}/signup`}>Start gratis met Kassie</a><a className="button secondary" href="/boekhouden-zzp">Lees de ZZP-gids</a></div></section><section className="kassie-seo-content"><article className="kassie-card"><h2>Wat levert deze tool op?</h2><p>Deze tool is bedoeld als praktische voorbereiding, niet als persoonlijk fiscaal advies. Je krijgt een checklist en structuur die helpt om administratie reviewbaar te maken.</p></article><article className="kassie-card"><h2>Checklist</h2><ul>{checklist.map((line) => <li key={line}>{line}</li>)}</ul></article><article className="kassie-card"><h2>Wanneer boekhouder vragen?</h2><p>Vraag beoordeling bij buitenlandse btw, KOR, correcties over eerdere periodes, gemengde privé/zakelijke kosten of bedragen met grote impact.</p></article><article className="kassie-card"><h2>Verder lezen</h2><ul><li><a href="/boekhouden-zzp">Boekhouden voor ZZP'ers</a></li><li><a href="/btw-aangifte-zzp">BTW-aangifte doen</a></li><li><a href="/factureren-zzp">Factureren als ZZP'er</a></li></ul></article></section></main>;
}
