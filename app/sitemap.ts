import type { MetadataRoute } from "next";
import { kassieBlogPosts } from "./blog/data";
import { comparisons, knowledgeTerms, pillarPages, professions, toolPages } from "./kassie/content";

const kassieSiteBaseUrl = "https://kassieapp.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: kassieSiteBaseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...pillarPages.map((page) => ({ url: `${kassieSiteBaseUrl}/${page.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...professions.map((item) => ({ url: `${kassieSiteBaseUrl}/boekhouden-voor/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.74 })),
    ...knowledgeTerms.map((item) => ({ url: `${kassieSiteBaseUrl}/kennisbank/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.66 })),
    ...comparisons.map((item) => ({ url: `${kassieSiteBaseUrl}/vergelijk/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...toolPages.map((item) => ({ url: `${kassieSiteBaseUrl}/tools/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.82 })),
    { url: `${kassieSiteBaseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.86 },
    ...kassieBlogPosts.map((post) => ({ url: `${kassieSiteBaseUrl}/blog/${post.slug}`, lastModified: new Date(post.updated), changeFrequency: "weekly" as const, priority: 0.78 })),
    { url: `${kassieSiteBaseUrl}/e-facturatie/vida-peppol-tijdlijn`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${kassieSiteBaseUrl}/marketing/kassie-operating-model`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.35 },
  ];
}
