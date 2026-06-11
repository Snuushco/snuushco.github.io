import Link from "next/link";
import { ventureList } from "./data";

export const metadata = {
  title: "Venture testpagina's | Snuushco",
  description: "Interne testpagina's voor Volbloei, PowerPoot en PijlPost.",
  robots: { index: false, follow: false },
};

export default function VentureIndexPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Snuushco testpages
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-6xl">
          E-commerce venture landingspagina's
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Reviewomgeving voor de drie conceptpagina's. De formulieren zijn nog niet gekoppeld aan een backend en verzamelen dus geen persoonsgegevens.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ventureList.map((venture) => (
            <Link
              key={venture.slug}
              href={`/testpages/ventures/${venture.slug}`}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15"
            >
              <div
                className="mb-6 h-3 w-20 rounded-full"
                style={{ backgroundColor: venture.palette.accent }}
              />
              <h2 className="text-2xl font-black">{venture.brand}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{venture.headline}</p>
              <span className="mt-6 inline-flex text-sm font-bold text-cyan-200">Bekijk testpagina →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
