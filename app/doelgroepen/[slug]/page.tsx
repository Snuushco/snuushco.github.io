import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer, Header } from "../../page";
import { packages, segments } from "../../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return segments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug);
  return {
    title: segment ? `${segment.label} | Snuushco` : "Doelgroep | Snuushco",
    description: segment?.promise,
  };
}

export default async function SegmentPage({ params }: Props) {
  const { slug } = await params;
  const segment = segments.find((item) => item.slug === slug) ?? segments[0];
  return (
    <>
      <Header />
      <main>
        <section className="hero segment-hero">
          <div className="hero-content">
            <p className="eyebrow">{segment.packageName}</p>
            <h1>{segment.promise}</h1>
            <p className="lead">{segment.pain}</p>
            <div className="hero-actions">
              <Link className="button" href={`/intake?segment=${segment.slug}`}>{segment.cta} <ArrowRight size={18} /></Link>
              <Link className="button secondary" href="/#diensten">Bekijk pakketten</Link>
            </div>
          </div>
        </section>
        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Herkenbare aanvraagroute</p>
                <h2>Van losse aanvraag naar duidelijke opvolging.</h2>
              </div>
              <p>
                We richten je site in op de vragen,
                gegevens en beslismomenten die voor {segment.label.toLowerCase()} dagelijks tellen.
              </p>
            </div>
            <div className="grid three">
              <article className="tile"><h3>Voorbeelden</h3><p>{segment.examples.join(", ")}.</p></article>
              <article className="tile"><h3>Slimme intake</h3><p>Bezoekers leveren vooraf de gegevens aan die je normaal achteraf moet opvragen.</p></article>
              <article className="tile"><h3>Slimme opvolging</h3><p>{segment.followUp} als logische vervolgstap na de website.</p></article>
            </div>
          </div>
        </section>
        <section className="band">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Pakketten</p>
                <h2>Standaard waar het kan, premium waar het moet.</h2>
              </div>
              <p>Complexe integraties, portals, betalingen of gevoelige claims krijgen altijd review voor livegang. Die route krijgt een aparte prijsafspraak.</p>
            </div>
            <div className="grid two">
              {packages.slice(1).map((item) => (
                <article className="tile" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.for}</p>
                  <div className="price">{item.price}</div>
                </article>
              ))}
            </div>
            <div className="actions"><Link className="button" href={`/intake?segment=${segment.slug}`}>Doe de intake <CheckCircle2 size={18} /></Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
