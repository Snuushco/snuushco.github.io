"use client";

import { useEffect, useMemo, useState } from "react";
import { trackKassieToolEvent } from "../../lib/client-analytics";

function parseAmount(value: string) { return Number(value.replace(",", ".")) || 0; }
function money(value: number) { return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value); }

export default function HourlyRateTool() {
  const [targetIncome, setTargetIncome] = useState("48000");
  const [costs, setCosts] = useState("9000");
  const [weeksOff, setWeeksOff] = useState("6");
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState("24");
  const [bufferPercent, setBufferPercent] = useState("20");

  useEffect(() => { trackKassieToolEvent("tool_viewed", { tool: "uurtarief-calculator" }); }, []);

  const result = useMemo(() => {
    const workingWeeks = Math.max(1, 52 - parseAmount(weeksOff));
    const hours = Math.max(1, workingWeeks * parseAmount(billableHoursPerWeek));
    const revenueNeeded = (parseAmount(targetIncome) + parseAmount(costs)) * (1 + parseAmount(bufferPercent) / 100);
    return { workingWeeks, hours, revenueNeeded, hourlyRate: revenueNeeded / hours };
  }, [targetIncome, costs, weeksOff, billableHoursPerWeek, bufferPercent]);

  return <main className="kassie-seo-page"><section className="kassie-seo-hero"><p className="eyebrow">Gratis tool</p><h1>Uurtarief-calculator ZZP</h1><p className="lead">Reken terug van gewenst inkomen, kosten, vrije weken en factureerbare uren naar een realistisch minimumtarief.</p></section><section className="kassie-tool tool-grid-wide"><div className="tool-input-grid"><label>Gewenst jaarinkomen<input value={targetIncome} onChange={(e) => setTargetIncome(e.target.value)} inputMode="decimal" /></label><label>Zakelijke kosten per jaar<input value={costs} onChange={(e) => setCosts(e.target.value)} inputMode="decimal" /></label><label>Vrije/zieke/niet-werkweken<input value={weeksOff} onChange={(e) => setWeeksOff(e.target.value)} inputMode="decimal" /></label><label>Factureerbare uren per week<input value={billableHoursPerWeek} onChange={(e) => setBillableHoursPerWeek(e.target.value)} inputMode="decimal" /></label><label>Buffer voor belasting/risico (%)<input value={bufferPercent} onChange={(e) => setBufferPercent(e.target.value)} inputMode="decimal" /></label></div><div className="kassie-result" data-testid="uurtarief-result"><strong>Richttarief excl. btw: {money(result.hourlyRate)} per uur</strong><br />Benodigde jaaromzet: {money(result.revenueNeeded)}<br />Factureerbare uren: {Math.round(result.hours)} per jaar</div><p className="small-note">Dit is een commerciële rekenhulp. Werkelijke inkomstenbelasting, aftrekposten, pensioen en verzekeringen verschillen per situatie.</p><button className="button" onClick={() => trackKassieToolEvent("tool_completed", { tool: "uurtarief-calculator", hourly_rate: Math.round(result.hourlyRate), billable_hours: Math.round(result.hours) })}>Bewaar uurtarief-check als event</button></section></main>;
}
