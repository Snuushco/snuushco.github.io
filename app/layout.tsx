import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snuushco | Websites en AI workflows voor betere aanvragen",
  description:
    "Snuushco bouwt websites, slimme intakeflows en AI workflows voor dienstverleners die betere aanvragen willen en minder handmatig werk.",
  openGraph: {
    title: "Snuushco",
    description: "Websites, slimme intake en AI workflows voor dienstverleners.",
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
