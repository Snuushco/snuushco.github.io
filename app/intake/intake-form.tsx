"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { segments } from "../data";
import { sendGoogleEvent, type SnuushcoEventName } from "../lib/client-analytics";

type Advice = {
  package: string;
  priceRange: string;
  route: string;
  fitScore: number;
  complexityScore: number;
  readinessScore: number;
  reviewReasons: string[];
  followUpAdvice: string;
  nextSteps: string[];
};

export default function IntakeForm() {
  const searchParams = useSearchParams();
  const initialSegment = searchParams.get("segment") ?? "lokale-dienstverleners";
  const source = searchParams.get("utm_source") ?? searchParams.get("source") ?? "";
  const campaign = searchParams.get("utm_campaign") ?? searchParams.get("campaign") ?? "";
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "error">("idle");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [started, setStarted] = useState(false);

  const segmentOptions = useMemo(() => segments, []);

  function track(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}, trackedLeadId = leadId) {
    sendGoogleEvent(eventName, metadata);
    const payload = JSON.stringify({
      eventName,
      leadId: trackedLeadId,
      source,
      campaign,
      path: window.location.pathname,
      metadata,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
      return;
    }

    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }

  function markStarted() {
    if (started) return;
    setStarted(true);
    track("intake_started", { segment: initialSegment });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const data = await response.json();
    setAdvice(data.advice);
    setLeadId(data.leadId ?? null);
    track("intake_submitted", { packageName: data.advice?.package, route: data.advice?.route }, data.leadId ?? null);
    setStatus("done");
  }

  async function startCheckout() {
    if (!advice) return;
    setCheckoutStatus("loading");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        packageName: advice.package,
        leadId,
        email: document.querySelector<HTMLInputElement>("#email")?.value,
        company: document.querySelector<HTMLInputElement>("#company")?.value,
      }),
    });

    if (!response.ok) {
      setCheckoutStatus("error");
      return;
    }

    const data = await response.json();
    if (data.url) {
      track("checkout_started", { packageName: advice.package });
      window.location.href = data.url;
      return;
    }

    setCheckoutStatus("error");
  }

  return (
    <div className="form-shell">
      <form className="form-panel" onSubmit={onSubmit} onFocusCapture={markStarted}>
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="campaign" value={campaign} />
        <div className="spam-check" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="company">Bedrijfsnaam</label>
            <input id="company" name="company" required placeholder="Bijvoorbeeld Janssen Installatie" />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required placeholder="naam@bedrijf.nl" />
          </div>
          <div className="field">
            <label htmlFor="segment">Doelgroep</label>
            <select id="segment" name="segment" defaultValue={initialSegment}>
              {segmentOptions.map((segment) => (
                <option value={segment.slug} key={segment.slug}>{segment.label}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="market">Land of regio</label>
            <input id="market" name="market" required placeholder="Nederland, Limburg, Benelux" />
          </div>
          <div className="field">
            <label htmlFor="goal">Primair doel</label>
            <select id="goal" name="goal">
              <option value="better_leads">Meer goede aanvragen</option>
              <option value="trust">Meer vertrouwen uitstralen</option>
              <option value="recruitment">Kandidaten of sollicitaties</option>
              <option value="automation">Minder handmatig opvolgwerk</option>
              <option value="custom">Maatwerk of complex project</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="pages">Gewenste omvang</label>
            <select id="pages" name="pages">
              <option value="one">One page of compact</option>
              <option value="five_to_seven">5 tot 7 pagina's</option>
              <option value="ten_plus">10 plus pagina's</option>
              <option value="unknown">Nog onbekend</option>
            </select>
          </div>
          <div className="field full">
            <label htmlFor="features">Wat is nodig?</label>
            <select id="features" name="features">
              <option value="standard">Formulier, diensten, SEO en contactflow</option>
              <option value="content">Kennisbank, lead magnet of veel content</option>
              <option value="booking">Booking, betaling of portal</option>
              <option value="integrations">CRM, API of maatwerkkoppelingen</option>
              <option value="regulated">Juridisch, medisch, financieel of HR gevoelig onderwerp</option>
            </select>
          </div>
          <div className="field full">
            <label htmlFor="pain">Welke aanvraag kost nu het meeste tijd om goed op te volgen?</label>
            <textarea id="pain" name="pain" required placeholder="Bijvoorbeeld: projectinformatie nabellen, kandidaatprofielen compleet krijgen, documenten opvragen..." />
          </div>
          <div className="field">
            <label htmlFor="assets">Assets beschikbaar</label>
            <select id="assets" name="assets">
              <option value="complete">Logo, teksten en foto's zijn compleet</option>
              <option value="partial">Deels aanwezig</option>
              <option value="none">Nog niet aanwezig</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="deadline">Deadline</label>
            <select id="deadline" name="deadline">
              <option value="month">Deze maand</option>
              <option value="quarter">Dit kwartaal</option>
              <option value="week">Deze week</option>
              <option value="urgent">Binnen 72 uur</option>
            </select>
          </div>
          <label className="consent field full">
            <input name="consent" type="checkbox" required />
            <span>Ik ga ermee akkoord dat Snuushco mijn ingevulde gegevens gebruikt om deze aanvraag te beoordelen en op te volgen.</span>
          </label>
        </div>
        <button className="button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Bezig met beoordelen" : "Ontvang pakketadvies"} <Send size={17} />
        </button>
      </form>

      <aside className={`form-panel ${advice?.reviewReasons.length ? "warning" : "result"}`}>
        {!advice ? (
          <>
            <h3>Wat deze intake doet</h3>
            <p className="muted">
              Je krijgt direct advies voor pakket, omvang, verwachte aanpak en logische vervolgstap.
              Onderdelen die extra review nodig hebben worden duidelijk gemarkeerd.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">{advice.route}</p>
            <h3>{advice.package}</h3>
            <div className="price">{advice.priceRange}</div>
            <p className="muted">Dit is een eerste advies op basis van je antwoorden, geen bindende offerte.</p>
            <p className="muted">Logische vervolgstap: {advice.followUpAdvice}</p>
            <div className="pill-row">
              <span className="pill">Fit {advice.fitScore}</span>
              <span className="pill">Complexiteit {advice.complexityScore}</span>
              <span className="pill">Readiness {advice.readinessScore}</span>
            </div>
            {advice.reviewReasons.length > 0 && (
              <>
                <h3>Extra review nodig</h3>
                <ul>{advice.reviewReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
              </>
            )}
            <h3>Volgende stappen</h3>
            <ul>{advice.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul>
            <button className="button checkout-button" type="button" onClick={startCheckout} disabled={checkoutStatus === "loading"}>
              {checkoutStatus === "loading" ? "Betaalpagina openen" : advice.package === "Premium Maatwerk" ? "Start betaalde discovery" : "Reserveer dit pakket"}
            </button>
            {checkoutStatus === "error" && <p className="form-error">Betaalpagina kon niet worden geopend. We hebben je aanvraag wel ontvangen.</p>}
          </>
        )}
      </aside>
    </div>
  );
}
