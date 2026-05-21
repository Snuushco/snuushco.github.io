import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ops", "/ops/", "/ops/*", "/api/ops", "/api/ops/*"],
      },
    ],
    sitemap: "https://snuushco.nl/sitemap.xml",
    host: "https://snuushco.nl",
  };
}
