"use client";

import { useEffect, useMemo, useState } from "react";
import { trackKassieToolEvent } from "../../lib/client-analytics";

const emailEnabled = process.env.NEXT_PUBLIC_TOOL_EMAIL_RESULTS_ENABLED === "true";

function parseAmount(value: string) {
  return Number(value.replace(",", ".")) || 0;
}

function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function InvoiceTool() {
  const [seller, setSeller] = useState("Mijn ZZP Bedrijf");
  const [sellerEmail, setSellerEmail] = useState("info@example.nl");
  const [client, setClient] = useState("Voorbeeld Klant B.V.");
  const [clientEmail, setClientEmail] = useState("administratie@example.nl");
  const [invoiceNumber, setInvoiceNumber] = useState("2026-001");
  const [desc, setDesc] = useState("Werkzaamheden juni");
  const [amount, setAmount] = useState("500");
  const [vatRate, setVatRate] = useState("21");
  const [emailTo, setEmailTo] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  useEffect(() => {
    trackKassieToolEvent("tool_viewed", { tool: "factuurgenerator" });
  }, []);

  const totals = useMemo(() => {
    const excl = parseAmount(amount);
    const rate = parseAmount(vatRate) / 100;
    const vat = excl * rate;
    return { excl, vat, incl: excl + vat };
  }, [amount, vatRate]);

  const summary = `Factuur ${invoiceNumber}\nVan: ${seller} (${sellerEmail})\nAan: ${client} (${clientEmail})\nOmschrijving: ${desc}\nExcl. btw: ${money(totals.excl)}\nBTW ${vatRate}%: ${money(totals.vat)}\nTotaal: ${money(totals.incl)}`;

  function createUbl() {
    const today = new Date().toISOString().slice(0, 10);
    return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>${escapeXml(invoiceNumber)}</cbc:ID>
  <cbc:IssueDate>${today}</cbc:IssueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty><cac:Party><cac:PartyName><cbc:Name>${escapeXml(seller)}</cbc:Name></cac:PartyName><cac:Contact><cbc:ElectronicMail>${escapeXml(sellerEmail)}</cbc:ElectronicMail></cac:Contact></cac:Party></cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty><cac:Party><cac:PartyName><cbc:Name>${escapeXml(client)}</cbc:Name></cac:PartyName><cac:Contact><cbc:ElectronicMail>${escapeXml(clientEmail)}</cbc:ElectronicMail></cac:Contact></cac:Party></cac:AccountingCustomerParty>
  <cac:TaxTotal><cbc:TaxAmount currencyID="EUR">${totals.vat.toFixed(2)}</cbc:TaxAmount></cac:TaxTotal>
  <cac:LegalMonetaryTotal><cbc:LineExtensionAmount currencyID="EUR">${totals.excl.toFixed(2)}</cbc:LineExtensionAmount><cbc:TaxExclusiveAmount currencyID="EUR">${totals.excl.toFixed(2)}</cbc:TaxExclusiveAmount><cbc:TaxInclusiveAmount currencyID="EUR">${totals.incl.toFixed(2)}</cbc:TaxInclusiveAmount><cbc:PayableAmount currencyID="EUR">${totals.incl.toFixed(2)}</cbc:PayableAmount></cac:LegalMonetaryTotal>
  <cac:InvoiceLine><cbc:ID>1</cbc:ID><cbc:InvoicedQuantity unitCode="C62">1</cbc:InvoicedQuantity><cbc:LineExtensionAmount currencyID="EUR">${totals.excl.toFixed(2)}</cbc:LineExtensionAmount><cac:Item><cbc:Description>${escapeXml(desc)}</cbc:Description><cac:ClassifiedTaxCategory><cbc:ID>S</cbc:ID><cbc:Percent>${vatRate}</cbc:Percent><cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme></cac:ClassifiedTaxCategory></cac:Item><cac:Price><cbc:PriceAmount currencyID="EUR">${totals.excl.toFixed(2)}</cbc:PriceAmount></cac:Price></cac:InvoiceLine>
</Invoice>`;
  }

  function exportUbl() {
    downloadText(`kassie-factuur-${invoiceNumber}.xml`, createUbl(), "application/xml");
    trackKassieToolEvent("tool_exported", { tool: "factuurgenerator", export_type: "ubl_xml" });
  }

  async function sendEmail() {
    setEmailStatus("Versturen...");
    trackKassieToolEvent("tool_email_requested", { tool: "factuurgenerator", enabled: emailEnabled });
    const response = await fetch("/api/tools/email-result", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tool: "factuurgenerator", to: emailTo, subject: `Factuurconcept ${invoiceNumber}`, summary }),
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string; status?: string };
    setEmailStatus(data.ok ? "Verzonden." : data.message ?? "E-mail staat uit of kon niet worden verstuurd.");
  }

  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero">
        <p className="eyebrow">Gratis tool</p>
        <h1>Factuurgenerator</h1>
        <p className="lead">Maak een net factuurconcept, print/download als PDF en exporteer een UBL v1-bestand om je e-facturatiebasis te testen.</p>
      </section>

      <section className="kassie-tool tool-grid-wide" aria-label="Factuurgenerator formulier">
        <div className="tool-input-grid">
          <label>Jouw bedrijfsnaam<input value={seller} onChange={(e) => setSeller(e.target.value)} /></label>
          <label>Jouw e-mail<input value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} type="email" /></label>
          <label>Klantnaam<input value={client} onChange={(e) => setClient(e.target.value)} /></label>
          <label>Klant e-mail<input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" /></label>
          <label>Factuurnummer<input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} /></label>
          <label>Omschrijving<input value={desc} onChange={(e) => setDesc(e.target.value)} /></label>
          <label>Bedrag excl. btw<input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" /></label>
          <label>BTW-percentage<select value={vatRate} onChange={(e) => setVatRate(e.target.value)}><option value="21">21%</option><option value="9">9%</option><option value="0">0%</option></select></label>
        </div>

        <div className="invoice-preview printable-invoice" data-testid="invoice-preview">
          <div className="invoice-header"><div><p className="eyebrow">Conceptfactuur</p><h2>{invoiceNumber}</h2></div><strong>Kassie</strong></div>
          <div className="invoice-parties"><p><strong>Van</strong><br />{seller}<br />{sellerEmail}</p><p><strong>Aan</strong><br />{client}<br />{clientEmail}</p></div>
          <table className="tool-table"><tbody><tr><th>Omschrijving</th><td>{desc}</td></tr><tr><th>Excl. btw</th><td>{money(totals.excl)}</td></tr><tr><th>BTW {vatRate}%</th><td>{money(totals.vat)}</td></tr><tr><th>Totaal</th><td><strong>{money(totals.incl)}</strong></td></tr></tbody></table>
          <p className="small-note">Controleer factuureisen, nummering, btw-regime en klantgegevens voor verzending. Dit is een lead-magnet tool, geen fiscaal advies.</p>
        </div>

        <div className="tool-actions">
          <button className="button" onClick={() => { window.print(); trackKassieToolEvent("tool_exported", { tool: "factuurgenerator", export_type: "print_pdf" }); }}>Print/download PDF</button>
          <button className="button secondary" onClick={exportUbl}>Download UBL XML</button>
        </div>

        <div className="tool-email-box">
          <h2>E-mail resultaat</h2>
          <p className="small-note">Veilig standaard uit. Alleen actief als Resend en de tool-featureflag op de server zijn geconfigureerd.</p>
          <label>E-mailadres<input value={emailTo} onChange={(e) => setEmailTo(e.target.value)} type="email" placeholder="jij@bedrijf.nl" /></label>
          <button className="button secondary" disabled={!emailEnabled || !emailTo} onClick={sendEmail}>{emailEnabled ? "Mail mijn factuurconcept" : "E-mail staat veilig uit"}</button>
          {emailStatus ? <p className="small-note">{emailStatus}</p> : null}
        </div>
      </section>
    </main>
  );
}
