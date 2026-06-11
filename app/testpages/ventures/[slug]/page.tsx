import Link from "next/link";
import { notFound } from "next/navigation";
import { venturePages, type VentureSlug } from "../data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(venturePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const venture = venturePages[slug as VentureSlug];

  if (!venture) {
    return {};
  }

  return {
    title: venture.metaTitle,
    description: venture.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function VentureLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = venturePages[slug as VentureSlug];

  if (!venture) {
    notFound();
  }

  return (
    <main
      className="min-h-screen overflow-hidden px-5 py-6 md:px-10 md:py-10"
      style={{ backgroundColor: venture.palette.background, color: venture.palette.foreground }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <nav className="flex items-center justify-between gap-4 text-sm">
          <Link href="/testpages/ventures" className="font-bold opacity-70 transition hover:opacity-100">
            ← Alle testpagina's
          </Link>
          <span className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] opacity-70">
            Concept / niet live
          </span>
        </nav>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div
              className="mb-10 inline-flex rounded-full px-5 py-2 text-sm font-black uppercase tracking-[0.24em]"
              style={{ backgroundColor: venture.palette.card, color: venture.palette.accent }}
            >
              {venture.brand}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl lg:text-8xl">
              {venture.headline}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 opacity-85 md:text-2xl">
              {venture.subheadline}
            </p>
            <div className="mt-8 grid gap-3">
              {venture.usps.map((usp) => (
                <div
                  key={usp}
                  className="rounded-2xl border px-5 py-4 text-base font-semibold leading-7 shadow-sm backdrop-blur"
                  style={{ backgroundColor: venture.palette.card, borderColor: `${venture.palette.foreground}22` }}
                >
                  {usp}
                </div>
              ))}
            </div>
          </div>

          <aside
            className="rounded-[2rem] border p-6 shadow-2xl backdrop-blur md:p-8"
            style={{ backgroundColor: venture.palette.card, borderColor: `${venture.palette.foreground}22` }}
          >
            <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: venture.palette.accent }}>
              Binnenkort
            </p>
            <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">{venture.waitlistTitle}</h2>
            <p className="mt-4 text-lg leading-8 opacity-85">{venture.waitlistText}</p>
            <form className="mt-8 grid gap-3" aria-label={`${venture.brand} testformulier`}>
              <input
                type="email"
                placeholder="jij@example.nl"
                aria-label="E-mailadres"
                className="w-full rounded-full border bg-white px-5 py-4 text-base text-slate-950 outline-none ring-0 transition focus:border-transparent focus:ring-4"
                style={{ borderColor: `${venture.palette.foreground}33` }}
                disabled
              />
              <button
                type="button"
                disabled
                className="rounded-full px-6 py-4 text-base font-black text-white opacity-90"
                style={{ backgroundColor: venture.palette.accent }}
              >
                {venture.buttonText}
              </button>
            </form>
            <p className="mt-4 text-sm leading-6 opacity-70">{venture.microcopy}</p>
            <p className="mt-6 rounded-2xl border p-4 text-sm leading-6 opacity-75" style={{ borderColor: `${venture.palette.foreground}22` }}>
              {venture.note}
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
