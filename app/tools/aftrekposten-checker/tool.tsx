"use client";

import { useEffect, useMemo, useState } from "react";
import { trackKassieToolEvent } from "../../lib/client-analytics";

type Item = { key: string; label: string; category: string; rule: string };

const items: Item[] = [
  { key: "software", label: "Boekhoudsoftware, Kassie, agenda- en projecttools", category: "Software", rule: "Vaak zakelijk aftrekbaar als je het voor je onderneming gebruikt." },
  { key: "phone", label: "Telefoon- en internetkosten", category: "Communicatie", rule: "Zakelijk deel onderbouwen; privédeel niet zomaar volledig aftrekken." },
  { key: "transport", label: "Zakelijke kilometers of OV", category: "Reizen", rule: "Leg datum, ritdoel en kilometers vast." },
  { key: "education", label: "Vakliteratuur, cursus of bijscholing", category: "Ontwikkeling", rule: "Moet passen bij bestaande of toekomstige werkzaamheden." },
  { key: "workspace", label: "Werkruimte thuis of kantoor", category: "Werkplek", rule: "Werkruimte thuis kent strenge voorwaarden; check bron of boekhouder." },
  { key: "tools", label: "Gereedschap, laptop, apparatuur", category: "Middelen", rule: "Let op investeringsdrempels, afschrijving en privégebruik." },
];

export default function DeductionCheckerTool() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ software: true, phone: true, transport: false, education: false, workspace: false, tools: false });
  const [hasProof, setHasProof] = useState(true);
  const [mixedUse, setMixedUse] = useState(true);

  useEffect(() => { trackKassieToolEvent("tool_viewed", { tool: "aftrekposten-checker" }); }, []);

  const chosen = useMemo(() => items.filter((item) => selected[item.key]), [selected]);

  return <main className="kassie-seo-page"><section className="kassie-seo-hero"><p className="eyebrow">Gratis tool</p><h1>Aftrekposten-checker</h1><p className="lead">Maak een reviewlijst van mogelijke zakelijke kosten en welke bewijsstukken je nodig hebt. Voorzichtig geformuleerd, geen fiscaal advies.</p></section><section className="kassie-tool tool-grid-wide"><div className="tool-checklist">{items.map((item) => <label className="checkbox-row" key={item.key}><input type="checkbox" checked={selected[item.key]} onChange={(e) => setSelected({ ...selected, [item.key]: e.target.checked })} /><span><strong>{item.label}</strong><br /><small>{item.category}</small></span></label>)}</div><div className="tool-input-grid"><label className="checkbox-row"><input type="checkbox" checked={hasProof} onChange={(e) => setHasProof(e.target.checked)} /> Ik heb bonnen/facturen of bankbewijs</label><label className="checkbox-row"><input type="checkbox" checked={mixedUse} onChange={(e) => setMixedUse(e.target.checked)} /> Er is mogelijk deels privégebruik</label></div><div className="kassie-result" data-testid="aftrekposten-result"><strong>{chosen.length} mogelijke posten geselecteerd</strong><br />Bewijsstatus: {hasProof ? "basisbewijs aanwezig" : "eerst bewijs verzamelen"}<br />Privégebruik: {mixedUse ? "splits zakelijk/privé" : "zakelijk gebruik lijkt volledig"}</div><div className="tool-checklist"><h2>Reviewlijst</h2><ul>{chosen.map((item) => <li key={item.key}><strong>{item.category}:</strong> {item.rule}</li>)}</ul><p className="small-note">Regelingen zoals zelfstandigenaftrek, startersaftrek, MKB-winstvrijstelling, KIA en thuiswerkruimte hebben voorwaarden en peildata. Laat twijfelgevallen controleren.</p></div><button className="button" onClick={() => trackKassieToolEvent("tool_completed", { tool: "aftrekposten-checker", selected_count: chosen.length, has_proof: hasProof, mixed_use: mixedUse })}>Bewaar aftrekposten-check als event</button></section></main>;
}
