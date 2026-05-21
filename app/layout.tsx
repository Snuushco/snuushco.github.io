import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://snuushco.nl"),
  title: "Snuushco | Websites die betere aanvragen opleveren",
  description:
    "Snuushco bouwt websites en aanvraagroutes voor dienstverleners die betere aanvragen willen en minder handmatig opvolgwerk.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "website laten maken",
    "aanvraagroute",
    "lead intake",
    "websites voor dienstverleners",
    "offerte aanvragen verbeteren",
    "Snuushco",
  ],
  openGraph: {
    title: "Snuushco",
    description: "Websites en aanvraagroutes voor dienstverleners.",
    url: "https://snuushco.nl",
    siteName: "Snuushco",
    locale: "nl_NL",
    type: "website",
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
      <body>{children}</body>
    </html>
  );
}
