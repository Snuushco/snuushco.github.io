"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { segments } from "../data";

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
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const segmentOptions = useMemo(() => segments, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    setStatus("done");
  }

  return (
    <div className="form-shell">
      <form className="form-panel" onSubmit={onSubmit}>
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
            <label htmlFor="pain">Welke aanvraag of taak kost nu het meeste tijd?</label>
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
              Je krijgt direct advies voor pakket, omvang, verwachte route en logische vervolgstap.
              Onderdelen die extra review nodig hebben worden duidelijk gemarkeerd.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">{advice.route}</p>
            <h3>{advice.package}</h3>
            <div className="price">{advice.priceRange}</div>
            <p className="muted">Logische vervolgstap: {advice.followUpAdvice}</p>
            <div className="pill-row">
              <span className="pill">Fit {advice.fitScore}</span>
              <span className="pill">Complexiteit {advice.complexityScore}</span>
              <span className="pill">Readiness {advice.readinessScore}</span>
            </div>
            {advice.reviewReasons.length > 0 && (
              <>
                <h3>Premium review nodig</h3>
                <ul>{advice.reviewReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
              </>
            )}
            <h3>Volgende stappen</h3>
            <ul>{advice.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul>
          </>
        )}
      </aside>
    </div>
  );
}
