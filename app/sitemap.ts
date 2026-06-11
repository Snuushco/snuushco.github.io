import type { MetadataRoute } from "next";
import { segments } from "./data";
import { comparisons, knowledgeTerms, pillarPages, professions, toolPages } from "./kassie/content";

const snuushcoBaseUrl = "https://snuushco.nl";
const kassieSiteBaseUrl = "https://kassieapp.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: snuushcoBaseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${snuushcoBaseUrl}/intake`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${snuushcoBaseUrl}/website-laten-maken/dienstverleners`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${snuushcoBaseUrl}/marketing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${snuushcoBaseUrl}/seo-ai-so`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.98,
    },
    {
      url: "https://kassieapp.nl",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${snuushcoBaseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${snuushcoBaseUrl}/voorwaarden`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const segmentRoutes: MetadataRoute.Sitemap = segments.map((segment) => ({
    url: `${snuushcoBaseUrl}/doelgroepen/${segment.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const kassieRoutes: MetadataRoute.Sitemap = [
    ...pillarPages.map((page) => ({ url: `${kassieSiteBaseUrl}/${page.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...professions.map((item) => ({ url: `${kassieSiteBaseUrl}/boekhouden-voor/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.72 })),
    ...knowledgeTerms.map((item) => ({ url: `${kassieSiteBaseUrl}/kennisbank/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.65 })),
    ...comparisons.map((item) => ({ url: `${kassieSiteBaseUrl}/vergelijk/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.68 })),
    ...toolPages.map((item) => ({ url: `${kassieSiteBaseUrl}/tools/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${kassieSiteBaseUrl}/e-facturatie/vida-peppol-tijdlijn`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${kassieSiteBaseUrl}/marketing/kassie-operating-model`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.4 },
  ];

  return [...staticRoutes, ...segmentRoutes, ...kassieRoutes];
}
