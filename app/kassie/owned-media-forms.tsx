"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

type SubmitState = "idle" | "loading" | "success" | "error";

async function postJson(url: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const payload = {
    ...data,
    consent: data.consent === "on",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("request_failed");
  return response.json() as Promise<{ status: string; sending?: string }>;
}

export function KassieOwnedMediaForms() {
  const [newsletter, setNewsletter] = useState<SubmitState>("idle");
  const [contact, setContact] = useState<SubmitState>("idle");

  async function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletter("loading");
    try {
      await postJson("/api/kassie/newsletter", event.currentTarget);
      event.currentTarget.reset();
      setNewsletter("success");
    } catch {
      setNewsletter("error");
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContact("loading");
    try {
      await postJson("/api/kassie/contact", event.currentTarget);
      event.currentTarget.reset();
      setContact("success");
    } catch {
      setContact("error");
    }
  }

  return (
    <section id="contact" className="vo-section vo-owned-media">
      <div className="vo-container">
        <div className="vo-section-head">
          <p>Contact en updates</p>
          <h2>Stel een vraag of ontvang praktische administratie-updates.</h2>
        </div>

        <div className="vo-owned-grid">
          <form className="vo-owned-card" onSubmit={submitNewsletter}>
            <div className="vo-owned-card-head">
              <Mail size={24} />
              <div>
                <h3>Nieuwsbrief</h3>
                <p>Voor korte tips over bonnen, facturen, btw en Peppol. Geen campagnes zonder review.</p>
              </div>
            </div>
            <label>
              Naam optioneel
              <input name="name" autoComplete="name" placeholder="Je naam" />
            </label>
            <label>
              E-mailadres
              <input name="email" type="email" autoComplete="email" placeholder="jij@bedrijf.nl" required />
            </label>
            <input className="spam-check" name="website" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="source" value="kassie-home-newsletter" />
            <label className="vo-checkline">
              <input name="consent" type="checkbox" required />
              <span>Ik geef toestemming om mijn e-mailadres te bewaren voor Kassie updates. Afmelden kan altijd.</span>
            </label>
            <button className="vo-button vo-button-primary" disabled={newsletter === "loading"} type="submit">
              {newsletter === "loading" ? "Opslaan..." : "Aanmelden"} <ArrowRight size={16} />
            </button>
            {newsletter === "success" && <p className="vo-form-ok">Aanmelding opgeslagen voor review. Er is geen campagne verzonden.</p>}
            {newsletter === "error" && <p className="vo-form-error">Opslaan lukte niet. Probeer later opnieuw of mail contact@kassieapp.nl.</p>}
          </form>

          <form className="vo-owned-card" onSubmit={submitContact}>
            <div className="vo-owned-card-head">
              <MessageCircle size={24} />
              <div>
                <h3>Contact</h3>
                <p>Berichten komen binnen voor contact@kassieapp.nl en worden eerst intern beoordeeld.</p>
              </div>
            </div>
            <div className="vo-owned-two">
              <label>
                Naam
                <input name="name" autoComplete="name" placeholder="Je naam" required />
              </label>
              <label>
                E-mailadres
                <input name="email" type="email" autoComplete="email" placeholder="jij@bedrijf.nl" required />
              </label>
            </div>
            <div className="vo-owned-two">
              <label>
                Bedrijf optioneel
                <input name="company" autoComplete="organization" placeholder="Bedrijfsnaam" />
              </label>
              <label>
                Telefoon optioneel
                <input name="phone" autoComplete="tel" placeholder="06..." />
              </label>
            </div>
            <label>
              Onderwerp
              <input name="topic" placeholder="Vraag over Kassie, boekhouder, Peppol..." required />
            </label>
            <label>
              Bericht
              <textarea name="message" placeholder="Waar kunnen we mee helpen?" required />
            </label>
            <input className="spam-check" name="website" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="source" value="kassie-home-contact" />
            <label className="vo-checkline">
              <input name="consent" type="checkbox" required />
              <span>Ik geef toestemming om mijn bericht op te slaan en te gebruiken voor opvolging.</span>
            </label>
            <button className="vo-button vo-button-primary" disabled={contact === "loading"} type="submit">
              {contact === "loading" ? "Versturen..." : "Bericht opslaan"} <ArrowRight size={16} />
            </button>
            {contact === "success" && <p className="vo-form-ok">Bericht opgeslagen voor review. Er is geen marketingmail verzonden.</p>}
            {contact === "error" && <p className="vo-form-error">Opslaan lukte niet. Mail eventueel direct naar contact@kassieapp.nl.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
