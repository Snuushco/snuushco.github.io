import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snuushco | Websites die betere aanvragen opleveren",
  description:
    "Snuushco bouwt websites en aanvraagroutes voor dienstverleners die betere aanvragen willen en minder handmatig opvolgwerk.",
  openGraph: {
    title: "Snuushco",
    description: "Websites en aanvraagroutes voor dienstverleners.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
