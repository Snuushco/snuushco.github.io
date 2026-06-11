"use client";
import { useMemo, useState } from "react";

export default function InvoiceTool() {
  const [client, setClient] = useState("Voorbeeld Klant B.V.");
  const [desc, setDesc] = useState("Schilderwerk woonkamer");
  const [amount, setAmount] = useState("500");
  const [number, setNumber] = useState("2026-001");
  const [days, setDays] = useState("14");
  const base = Number(amount) || 0;
  const vat = base * 0.21;
  const total = base + vat;
  const ublPreview = useMemo(() => `<Invoice><ID>${number}</ID><AccountingCustomerParty>${client}</AccountingCustomerParty><InvoiceLine><Description>${desc}</Description><LineExtensionAmount currencyID="EUR">${base.toFixed(2)}</LineExtensionAmount></InvoiceLine><TaxTotal>${vat.toFixed(2)}</TaxTotal><LegalMonetaryTotal>${total.toFixed(2)}</LegalMonetaryTotal></Invoice>`, [number, client, desc, base, vat, total]);
  const required = ["Jouw bedrijfsgegevens", "Klantgegevens", "Uniek factuurnummer", "Factuurdatum", "Omschrijving", "Bedrag excl. btw", "Btw-tarief en btw-bedrag", "Totaalbedrag", "Betalingstermijn"];
  return <main className="kassie-seo-page"><section className="kassie-seo-hero"><p className="eyebrow">Gratis tool</p><h1>Factuurgenerator</h1><p className="lead">Maak een eenvoudig factuurconcept zonder login, inclusief factuureisen-checklist en UBL-preview. Controleer actuele eisen bij de Belastingdienst.</p></section><section className="kassie-tool"><label>Factuurnummer<input value={number} onChange={(e) => setNumber(e.target.value)} /></label><label>Klant<input value={client} onChange={(e) => setClient(e.target.value)} /></label><label>Omschrijving<input value={desc} onChange={(e) => setDesc(e.target.value)} /></label><label>Bedrag excl. btw<input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" /></label><label>Betalingstermijn dagen<input value={days} onChange={(e) => setDays(e.target.value)} inputMode="numeric" /></label><div className="invoice-preview"><h2>Factuurconcept</h2><p><strong>Factuur:</strong> {number}</p><p><strong>Aan:</strong> {client}</p><p><strong>Omschrijving:</strong> {desc}</p><p><strong>Excl. btw:</strong> €{base.toFixed(2)}</p><p><strong>BTW 21%:</strong> €{vat.toFixed(2)}</p><p><strong>Totaal:</strong> €{total.toFixed(2)}</p><p><strong>Betalingstermijn:</strong> {days} dagen</p><button className="button" onClick={() => window.print()}>Print/download als PDF</button></div><div className="kassie-result"><strong>Factuureisen-checklist</strong><ul>{required.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="invoice-preview"><h2>UBL-preview</h2><p className="small-note">Indicatieve preview voor structured-data begrip; nog geen juridisch volledige UBL-export.</p><pre>{ublPreview}</pre></div><p className="small-note">Review-safe: controleer klantgegevens, btw, factuurnummer en uitzonderingen voordat je definitief verzendt.</p></section></main>;
}
