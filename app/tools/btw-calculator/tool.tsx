"use client";

import { useEffect, useMemo, useState } from "react";
import { trackKassieToolEvent } from "../../lib/client-analytics";

function parseAmount(value: string) {
  return Number(value.replace(",", ".")) || 0;
}

function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);
}

export default function BtwCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("21");
  const [mode, setMode] = useState("ex");
  const [yearRevenue, setYearRevenue] = useState("18000");
  const [mainlyPrivateCustomers, setMainlyPrivateCustomers] = useState(true);
  const [largeBusinessCosts, setLargeBusinessCosts] = useState(false);

  useEffect(() => {
    trackKassieToolEvent("tool_viewed", { tool: "btw-calculator" });
  }, []);

  const result = useMemo(() => {
    const a = parseAmount(amount);
    const r = parseAmount(rate) / 100;
    const excl = mode === "ex" ? a : r === 0 ? a : a / (1 + r);
    const vat = excl * r;
    const incl = excl + vat;
    return { excl, vat, incl };
  }, [amount, rate, mode]);

  const kor = useMemo(() => {
    const revenue = parseAmount(yearRevenue);
    const underLimit = revenue <= 20000;
    const attention: string[] = [];
    if (underLimit) attention.push("Je zit op basis van dit bedrag onder de bekende KOR-omzetgrens van €20.000 per kalenderjaar.");
    else attention.push("Je zit boven €20.000 omzet; de KOR ligt dan meestal niet voor de hand.");
    if (mainlyPrivateCustomers) attention.push("Bij vooral particuliere klanten kan geen btw rekenen commercieel aantrekkelijk zijn.");
    else attention.push("Bij zakelijke klanten maakt btw vaak minder uit, omdat zij btw kunnen aftrekken.");
    if (largeBusinessCosts) attention.push("Let op: met KOR kun je btw op zakelijke kosten meestal niet aftrekken.");
    return { underLimit, attention };
  }, [yearRevenue, mainlyPrivateCustomers, largeBusinessCosts]);

  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero">
        <p className="eyebrow">Gratis tool</p>
        <h1>BTW-calculator</h1>
        <p className="lead">Bereken inclusief/exclusief btw en krijg een KOR-check op hoofdlijnen. Geen persoonlijk belastingadvies; peildatum juni 2026.</p>
      </section>
      <section className="kassie-tool tool-grid-wide">
        <div className="tool-input-grid">
          <label>Bedrag<input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" /></label>
          <label>BTW-percentage<select value={rate} onChange={(e) => setRate(e.target.value)}><option value="21">21%</option><option value="9">9%</option><option value="0">0%</option></select></label>
          <label>Invoer is<select value={mode} onChange={(e) => setMode(e.target.value)}><option value="ex">exclusief btw</option><option value="in">inclusief btw</option></select></label>
          <label>Verwachte jaaromzet<input value={yearRevenue} onChange={(e) => setYearRevenue(e.target.value)} inputMode="decimal" /></label>
        </div>
        <div className="kassie-result" data-testid="btw-result">
          <strong>Excl. btw:</strong> {money(result.excl)}<br />
          <strong>BTW:</strong> {money(result.vat)}<br />
          <strong>Incl. btw:</strong> {money(result.incl)}
        </div>
        <div className="tool-checklist">
          <h2>KOR-check op hoofdlijnen</h2>
          <label className="checkbox-row"><input type="checkbox" checked={mainlyPrivateCustomers} onChange={(e) => setMainlyPrivateCustomers(e.target.checked)} /> Ik werk vooral voor particuliere klanten</label>
          <label className="checkbox-row"><input type="checkbox" checked={largeBusinessCosts} onChange={(e) => setLargeBusinessCosts(e.target.checked)} /> Ik verwacht veel zakelijke kosten/investeringen met btw</label>
          <ul>{kor.attention.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="small-note">KOR-regels, uitzonderingen en gevolgen kunnen wijzigen. Controleer altijd de actuele Belastingdienst-voorwaarden en bespreek twijfel met je boekhouder.</p>
        </div>
        <button className="button" onClick={() => trackKassieToolEvent("tool_completed", { tool: "btw-calculator", vat_rate: rate, kor_under_limit: kor.underLimit })}>Bewaar mijn check als event</button>
      </section>
    </main>
  );
}
