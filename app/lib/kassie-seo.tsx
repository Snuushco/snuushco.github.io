import Link from "next/link";
import { appBaseUrl, kassieBaseUrl, toolPages } from "../kassie/content";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type SoftwareApplicationInput = {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
  applicationSubCategory?: string;
};

export const kassieStaticMarketingRoutes = [
  "",
  "boekhouden-zzp",
  "btw-aangifte-zzp",
  "e-facturatie-peppol-vida",
  "aftrekposten-zzp",
  "factureren-zzp",
  "zzp-starten-administratie",
  "e-facturatie/vida-peppol-tijdlijn",
  "marketing/kassie-operating-model",
  "marketing/kassie-seo-measurement",
  "marketing/search-console-bing-checklist",
] as const;

export const kassieToolSlugs = toolPages.map((tool) => tool.slug);

export const kassieDisallowedPaths = ["/ops", "/ops/", "/ops/*", "/api/ops", "/api/ops/*"] as const;

export const kassieEventTaxonomy = [
  { name: "landing_view", category: "page", description: "Bezoek aan een Snuushco/Kassie landingspagina.", primaryMetric: "sessies per bron/campagne" },
  { name: "kassie_tool_view", category: "tool", description: "Bezoek aan een gratis Kassie toolpagina.", primaryMetric: "tool landing views" },
  { name: "kassie_tool_used", category: "tool", description: "Gebruiker wijzigt of gebruikt een gratis tool zoals btw-calculator of factuurgenerator.", primaryMetric: "tool usage rate" },
  { name: "newsletter_signup", category: "lead", description: "Review-gated nieuwsbriefinschrijving of intentie om updates te ontvangen.", primaryMetric: "nieuwsbrief leads" },
  { name: "contact_click", category: "lead", description: "Klik op mailto, contact of signup CTA richting Kassie/Snuushco.", primaryMetric: "contact intent" },
  { name: "intake_started", category: "lead", description: "Snuushco intakeformulier gestart.", primaryMetric: "intake starts" },
  { name: "intake_submitted", category: "lead", description: "Snuushco intakeformulier verzonden.", primaryMetric: "intake submissions" },
  { name: "checkout_started", category: "revenue", description: "Checkout gestart vanuit een lead of pakketkeuze.", primaryMetric: "checkout starts" },
  { name: "paid_lead", category: "revenue", description: "Betaalde lead/checkout afgerond via webhook of bevestiging.", primaryMetric: "paid conversions" },
] as const;

export type KassieEventName = (typeof kassieEventTaxonomy)[number]["name"];

function absoluteUrl(href: string) {
  if (href.startsWith("https://")) return href;
  return `${kassieBaseUrl}${href.startsWith("/") ? href : `/${href}`}`;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildSoftwareApplicationSchema(input: SoftwareApplicationInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${input.url}#software-application`,
    name: input.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: input.applicationSubCategory ?? "BookkeepingSoftware",
    operatingSystem: "Web, WhatsApp",
    url: input.url,
    description: input.description,
    featureList: input.featureList,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Gratis tool zonder login; Kassie productinformatie en betaalde pakketten apart beoordelen.",
    },
    publisher: {
      "@type": "Organization",
      name: "Kassie",
      url: kassieBaseUrl,
    },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="kassie-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            {index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function buildKassieProductSoftwareSchema() {
  return buildSoftwareApplicationSchema({
    name: "Kassie",
    url: kassieBaseUrl,
    description: "Kassie helpt praktische ondernemers met bonnen, facturen, btw-overzicht en boekhouding via WhatsApp en webdashboard.",
    featureList: ["Bonnen bewaren", "Facturen maken", "BTW-overzicht", "WhatsApp administratie", "Boekhouder-review"],
  });
}

export function buildToolSoftwareSchema(tool: { slug: string; title: string; description: string }) {
  return buildSoftwareApplicationSchema({
    name: `Kassie ${tool.title}`,
    url: `${kassieBaseUrl}/tools/${tool.slug}`,
    description: tool.description,
    featureList: ["Gratis zonder login", "Review-safe uitleg", "Kassie lead magnet", "Mobiel bruikbaar"],
    applicationSubCategory: "FinancialCalculator",
  });
}

export function buildContactActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${kassieBaseUrl}#website`,
    url: kassieBaseUrl,
    name: "Kassie",
    potentialAction: {
      "@type": "RegisterAction",
      target: `${appBaseUrl}/signup`,
      name: "Start gratis met Kassie",
    },
  };
}
