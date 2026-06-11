import Link from "next/link";
import { ventureList } from "./data";

export const metadata = {
  title: "Venture testpagina's | Snuushco",
  description: "Interne testpagina's voor Volbloei, PowerPoot en PijlPost.",
  robots: { index: false, follow: false },
};

export default function VentureIndexPage() {
  return (
    <main className="venture-index-page">
      <div className="venture-index-shell">
        <p className="venture-eyebrow venture-eyebrow-blue">Snuushco testpages</p>
        <h1 className="venture-index-title">E-commerce venture landingspagina's</h1>
        <p className="venture-index-intro">
          Reviewomgeving voor de drie conceptpagina's. De formulieren zijn nog niet gekoppeld aan een backend en verzamelen dus geen persoonsgegevens.
        </p>
        <div className="venture-index-grid">
          {ventureList.map((venture) => (
            <Link key={venture.slug} href={`/testpages/ventures/${venture.slug}`} className="venture-index-card">
              <div className="venture-index-bar" style={{ backgroundColor: venture.palette.accent }} />
              <h2>{venture.brand}</h2>
              <p>{venture.headline}</p>
              <span>Bekijk testpagina →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
