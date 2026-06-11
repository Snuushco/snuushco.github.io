import type { ReactNode } from "react";
import { Breadcrumbs, JsonLd, buildBreadcrumbSchema, buildToolSoftwareSchema } from "../lib/kassie-seo";
import { kassieBaseUrl, toolPages } from "../kassie/content";
import TrackingPixel from "../tracking-pixel";

type ToolShellProps = {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function KassieToolShell({ slug, title, description, children }: ToolShellProps) {
  const tool = toolPages.find((item) => item.slug === slug) ?? { slug, title, description };
  const breadcrumbItems = [
    { name: "Kassie", href: "/" },
    { name: "Tools", href: "/tools/btw-calculator" },
    { name: title, href: `/tools/${slug}` },
  ];

  return (
    <main className="kassie-seo-page">
      <JsonLd data={[buildToolSoftwareSchema(tool), buildBreadcrumbSchema(breadcrumbItems)]} />
      <TrackingPixel eventName="kassie_tool_view" metadata={{ tool: slug, url: `${kassieBaseUrl}/tools/${slug}` }} />
      <section className="kassie-seo-hero">
        <Breadcrumbs items={breadcrumbItems} />
        <p className="eyebrow">Gratis tool</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </section>
      {children}
    </main>
  );
}
