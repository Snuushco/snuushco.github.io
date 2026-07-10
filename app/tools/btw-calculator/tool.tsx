"use client";
import { useMemo, useState } from "react";

export default function BtwCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("21");
  const [mode, setMode] = useState("ex");
  const [quarterRevenue, setQuarterRevenue] = useState("7500");
  const result = useMemo(() => {
    const a = Number(amount) || 0;
    const r = (Number(rate) || 0) / 100;
    const excl = mode === "ex" ? a : a / (1 + r);
    const vat = excl * r;
    const incl = excl + vat;
    return { excl, vat, incl };
  }, [amount, rate, mode]);
  const estimatedYear = (Number(quarterRevenue) || 0) * 4;
  const checklist = ["Verkoopfacturen compleet", "Inkoopfacturen en bonnen gekoppeld", "Creditnota's verwerkt", "Buitenlandse facturen gecontroleerd", "KOR/verlegde btw twijfel gemarkeerd", "Openstaande vragen voor boekhouder verzameld"];
  return <main className="kassie-seo-page"><section className="kassie-seo-hero"><p className="eyebrow">Gratis tool</p><h1>BTW-calculator</h1><p className="lead">Bereken snel bedrag exclusief btw, btw-bedrag en bedrag inclusief btw. Inclusief kwartaalcheck op hoofdlijnen; geen persoonlijk belastingadvies.</p></section><section className="kassie-tool"><label>Bedrag<input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" /></label><label>BTW-percentage<select value={rate} onChange={(e) => setRate(e.target.value)}><option value="21">21%</option><option value="9">9%</option><option value="0">0%</option></select></label><label>Invoer is<select value={mode} onChange={(e) => setMode(e.target.value)}><option value="ex">exclusief btw</option><option value="in">inclusief btw</option></select></label><div className="kassie-result"><strong>Excl. btw:</strong> €{result.excl.toFixed(2)}<br/><strong>BTW:</strong> €{result.vat.toFixed(2)}<br/><strong>Incl. btw:</strong> €{result.incl.toFixed(2)}</div><label>Omzet dit kwartaal voor grove KOR-check<input value={quarterRevenue} onChange={(e) => setQuarterRevenue(e.target.value)} inputMode="decimal" /></label><div className="invoice-preview"><h2>Kwartaalcheck</h2><p>Grove jaarindicatie op basis van dit kwartaal: <strong>€{estimatedYear.toFixed(0)}</strong>. Controleer de actuele KOR-voorwaarden bij de Belastingdienst; deze tool beslist niets automatisch.</p><ul>{checklist.map((item) => <li key={item}>{item}</li>)}</ul></div><p className="small-note">Vraag je boekhouder bij KOR, buitenlandse btw, suppletie, gemengde kosten of oude correcties.</p></section></main>;
}
