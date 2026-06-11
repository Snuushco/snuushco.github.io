import type { Metadata } from "next";
import { KassieToolShell } from "../tool-shell";

export const metadata: Metadata = {
  title: "Peppol-ready-check | Kassie",
  description: "Gratis Kassie tool voor ZZP'ers. Review-safe, zonder login.",
  alternates: { canonical: "https://kassieapp.nl/tools/peppol-ready-check" },
};

export default function Page() {
  return (
    <KassieToolShell slug="peppol-ready-check" title="Peppol-ready-check" description="Deze toolpagina staat klaar als SEO- en leadmagnet-landingspagina. De interactieve versie volgt achter dezelfde URL zodat indexatie en interne links nu al kunnen starten.">
      <section className="kassie-seo-content"><article className="kassie-card"><h2>Wat deze tool doet</h2><p>Geeft ondernemers een snelle, praktische check zonder login. Resultaten worden later optioneel per e-mail verstuurd voor leadcapture.</p></article><article className="kassie-card"><h2>Review-safe uitgangspunt</h2><p>Fiscale of wettelijke conclusies worden voorzichtig geformuleerd en verwijzen naar actuele primaire bronnen of boekhoudkundige review.</p></article></section>
    </KassieToolShell>
  );
}
