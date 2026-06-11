"use client";

import { useEffect, useMemo, useState } from "react";
import { trackKassieToolEvent } from "../../lib/client-analytics";

const checks = [
  { key: "ubl", label: "Ik kan UBL/XML-facturen maken of exporteren", help: "PDF is niet genoeg voor echte e-facturatie." },
  { key: "data", label: "Mijn klant-, btw- en factuurgegevens staan gestructureerd in mijn administratie", help: "Peppol werkt beter als stamgegevens kloppen." },
  { key: "numbering", label: "Mijn factuurnummers zijn uniek, opvolgend en controleerbaar", help: "Losse Word-bestanden geven snel risico." },
  { key: "software", label: "Mijn boekhoudsoftware of boekhouder kan Peppol/UBL verwerken", help: "Vraag expliciet naar ontvangen én versturen." },
  { key: "process", label: "Ik weet welke klanten e-facturen willen of gaan eisen", help: "Overheid en grotere organisaties lopen vaak voorop." },
];

export default function PeppolReadyTool() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({ ubl: false, data: false, numbering: true, software: false, process: false });

  useEffect(() => {
    trackKassieToolEvent("tool_viewed", { tool: "peppol-ready-check" });
  }, []);

  const score = useMemo(() => checks.filter((check) => answers[check.key]).length, [answers]);
  const readiness = score >= 4 ? "Sterk op weg" : score >= 2 ? "Basis aanwezig, nog gaten" : "Nog niet Peppol-ready";

  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero"><p className="eyebrow">Gratis tool</p><h1>Peppol-ready-check</h1><p className="lead">Check in twee minuten of je facturatie klaar is voor UBL/Peppol en welke stap je eerst moet nemen.</p></section>
      <section className="kassie-tool tool-grid-wide">
        <div className="tool-checklist">
          {checks.map((check) => <label className="checkbox-row" key={check.key}><input type="checkbox" checked={answers[check.key]} onChange={(e) => setAnswers({ ...answers, [check.key]: e.target.checked })} /><span><strong>{check.label}</strong><br /><small>{check.help}</small></span></label>)}
        </div>
        <div className="kassie-result" data-testid="peppol-result"><strong>{readiness}</strong><br />Score: {score}/{checks.length}</div>
        <div className="tool-checklist"><h2>Advies</h2><ul>{checks.filter((check) => !answers[check.key]).slice(0, 3).map((check) => <li key={check.key}>Regel eerst: {check.label.toLowerCase()}.</li>)}</ul><p className="small-note">Peppol/ViDA-regels ontwikkelen door. Gebruik dit als praktische voorbereiding, niet als juridisch advies.</p></div>
        <button className="button" onClick={() => trackKassieToolEvent("tool_completed", { tool: "peppol-ready-check", score, readiness })}>Bewaar Peppol-check als event</button>
      </section>
    </main>
  );
}
