import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const kassieStaticRoutes = [
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
];

const toolRoutes = ["factuurgenerator", "btw-calculator", "peppol-ready-check", "uurtarief-calculator", "aftrekposten-checker"];
const publicPages = [
  "app/kassie/page.tsx",
  ...kassieStaticRoutes.filter(Boolean).map((route) => `app/${route}/page.tsx`),
  ...toolRoutes.map((route) => `app/tools/${route}/page.tsx`),
];

for (const page of publicPages) {
  check(exists(page), `Missing public route file: ${page}`);
}

const seoHelpers = read("app/lib/kassie-seo.tsx");
check(seoHelpers.includes("BreadcrumbList"), "BreadcrumbList helper missing");
check(seoHelpers.includes("SoftwareApplication"), "SoftwareApplication helper missing");
check(seoHelpers.includes("kassieEventTaxonomy"), "Event taxonomy missing");
check(seoHelpers.includes("newsletter_signup") && seoHelpers.includes("contact_click"), "Newsletter/contact events missing from taxonomy");

const articlePage = read("app/kassie/article-page.tsx");
check(articlePage.includes("buildBreadcrumbSchema"), "Article pages missing BreadcrumbList schema");
check(articlePage.includes("FAQPage") && articlePage.includes("Article"), "Article pages missing Article/FAQ schema");

const kassiePage = read("app/kassie/page.tsx");
check(kassiePage.includes("buildKassieProductSoftwareSchema"), "Kassie product page missing SoftwareApplication schema");
check(kassiePage.includes("buildContactActionSchema"), "Kassie product page missing contact/register action schema");

for (const tool of toolRoutes) {
  const page = read(`app/tools/${tool}/page.tsx`);
  check(page.includes(`https://kassieapp.nl/tools/${tool}`), `Tool ${tool} missing kassieapp.nl canonical`);
  check(page.includes("KassieToolShell"), `Tool ${tool} missing shared schema/tracking shell`);
}

const sitemap = read("app/sitemap.ts");
check(sitemap.includes("kassieStaticMarketingRoutes"), "Sitemap does not use shared Kassie route list");
check(sitemap.includes("kassieSiteBaseUrl"), "Sitemap missing Kassie base URL");
check(!sitemap.includes("snuushcoBaseUrl}/tools"), "Sitemap appears to put Kassie tools on snuushco.nl");

const robots = read("app/robots.ts");
check(robots.includes("kassieDisallowedPaths"), "Robots does not use shared disallow list");
check(robots.includes("https://kassieapp.nl/sitemap.xml"), "Robots missing kassieapp.nl sitemap");

const apiEvents = read("app/api/events/route.ts");
for (const event of ["kassie_tool_view", "kassie_tool_used", "newsletter_signup", "contact_click"]) {
  check(apiEvents.includes(event), `API event schema missing ${event}`);
}

const clientAnalytics = read("app/lib/client-analytics.ts");
check(clientAnalytics.includes("trackMarketingEvent"), "Client analytics missing server-backed tracker");
check(clientAnalytics.includes("eventCategoryMap"), "Client analytics missing event category map");

const opsPage = read("app/ops/page.tsx");
for (const column of ["Tool view", "Tool gebruikt", "Nieuwsbrief", "Contact"]) {
  check(opsPage.includes(column), `Ops funnel missing column ${column}`);
}

if (failures.length) {
  console.error("Kassie SEO validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Kassie SEO validation passed: ${publicPages.length} public route files, ${toolRoutes.length} tools, ${kassieStaticRoutes.length} static Kassie routes checked.`);
