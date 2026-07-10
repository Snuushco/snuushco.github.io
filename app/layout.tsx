import type { Metadata } from "next";
import { headers } from "next/headers";
import { AnalyticsScripts } from "./analytics";
import "./globals.css";

const snuushcoMetadata: Metadata = {
  metadataBase: new URL("https://snuushco.nl"),
  title: "Snuushco | Websites, SEO en AI-SO die betere aanvragen opleveren",
  description:
    "Snuushco bouwt websites, SEO + AI-SO vindbaarheid en aanvraagroutes voor dienstverleners die betere aanvragen willen en minder handmatig opvolgwerk.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "website laten maken",
    "SEO bureau Nederland",
    "AI Search Optimization bureau",
    "AI-SO bureau",
    "ChatGPT vindbaarheid verbeteren",
    "aanvraagroute",
    "lead intake",
    "websites voor dienstverleners",
    "offerte aanvragen verbeteren",
    "Snuushco",
  ],
  openGraph: {
    title: "Snuushco",
    description: "Websites, SEO + AI-SO en aanvraagroutes voor dienstverleners.",
    url: "https://snuushco.nl",
    siteName: "Snuushco",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/brand/snuushco-logo-dark.jpg", width: 1024, height: 1024, alt: "Snuushco" }],
  },
  icons: {
    icon: "/brand/snuushco-logo-dark.jpg",
    apple: "/brand/snuushco-logo-dark.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const kassieMetadata: Metadata = {
  metadataBase: new URL("https://kassieapp.nl"),
  title: "Kassie | Slim boekhouden via WhatsApp",
  description:
    "Kassie maakt boekhouden begrijpelijk voor praktische ondernemers. Stuur een bon, opdracht of vraag via WhatsApp. Kassie zet het klaar, jij controleert, klaar.",
  alternates: {
    canonical: "https://kassieapp.nl",
  },
  keywords: [
    "boekhouden via WhatsApp",
    "boekhoud app zzp",
    "bonnen app",
    "facturen maken zzp",
    "btw administratie zzp",
    "Kassie",
  ],
  openGraph: {
    title: "Kassie | Slim boekhouden via WhatsApp",
    description: "Overzichtelijk, betrouwbaar en gemaakt voor praktische ondernemers.",
    url: "https://kassieapp.nl",
    siteName: "Kassie",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/brand/kassie-og.jpg", alt: "Kassie slim boekhouden" }],
  },
  icons: {
    icon: "/brand/kassie-profile.png",
    apple: "/brand/kassie-profile.png",
  },
  robots: snuushcoMetadata.robots,
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host")?.toLowerCase().split(":")[0] ?? "";
  return host === "kassieapp.nl" ? kassieMetadata : snuushcoMetadata;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
