import type { MetadataRoute } from "next";
import { kassieDisallowedPaths } from "./lib/kassie-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...kassieDisallowedPaths],
      },
    ],
    sitemap: ["https://snuushco.nl/sitemap.xml", "https://kassieapp.nl/sitemap.xml"],
  };
}
