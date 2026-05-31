import type { Metadata } from "next";
import { AnalyticsScripts } from "./analytics";
import "./globals.css";

export const metadata: Metadata = {
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
