"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type CheckoutResponse = {
  error?: string;
  url?: string;
};

export default function CashflowLabSuitabilityForm({ checkoutCancelled = false }: { checkoutCancelled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "notice">(
    checkoutCancelled ? "notice" : "idle",
  );
  const [message, setMessage] = useState(
    checkoutCancelled
      ? "De Stripe-betaalpagina is geannuleerd. Er is niets afgeschreven; je kunt de check opnieuw indienen."
      : "",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams(window.location.search);
    const payload = {
      company: formData.get("company"),
      businessEmail: formData.get("businessEmail"),
      isSmallSecurityCompany: formData.get("isSmallSecurityCompany"),
      hasConcreteB2BQuote: formData.get("hasConcreteB2BQuote"),
      acceptsFixedScope: formData.get("acceptsFixedScope"),
      canProvideSanitizedIntake: formData.get("canProvideSanitizedIntake"),
      source: searchParams.get("utm_source") ?? searchParams.get("source") ?? "direct",
      campaign: searchParams.get("utm_campaign") ?? searchParams.get("campaign") ?? "founder-pilot-2026-07",
      privacyAcknowledged: formData.get("privacyAcknowledged") === "on",
      termsAccepted: formData.get("termsAccepted") === "on",
      website: formData.get("website") || undefined,
    };

    if (
      payload.isSmallSecurityCompany !== "yes" ||
      payload.hasConcreteB2BQuote !== "yes" ||
      payload.acceptsFixedScope !== "yes" ||
      payload.canProvideSanitizedIntake !== "yes"
    ) {
      setStatus("error");
      setMessage(
        "Deze pilot is alleen voor kleine beveiligingsbedrijven met één concrete B2B-offerte die binnen de vaste scope past.",
      );
      return;
    }

    try {
      const response = await fetch("/api/cashflow-lab/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as CheckoutResponse;

      if (!response.ok) {
        setStatus("error");
        setMessage(
          data.error ??
            "De betaalpagina kon niet worden geopend. Er is niets afgeschreven.",
        );
        return;
      }

      if (data.url) {
        const checkoutUrl = new URL(data.url);
        if (
          checkoutUrl.protocol === "https:" &&
          (checkoutUrl.hostname === "checkout.stripe.com" ||
            checkoutUrl.hostname.endsWith(".stripe.com"))
        ) {
          window.location.assign(checkoutUrl.toString());
          return;
        }
      }

      setStatus("error");
      setMessage("De betaalpagina kon niet veilig worden geopend. Er is niets afgeschreven.");
    } catch {
      setStatus("error");
      setMessage("De betaalpagina is tijdelijk niet bereikbaar. Er is niets afgeschreven.");
    }
  }

  return (
    <form className="cashflow-form" onSubmit={onSubmit} aria-busy={status === "submitting"}>
      <div className="cashflow-form-heading">
        <p className="eyebrow">Korte geschiktheidscheck</p>
        <h2>Past deze afgebakende pilot?</h2>
        <p>
          Alleen als ieder antwoord <strong>ja</strong> is, opent de beveiligde Stripe-betaalpagina.
          De controle wordt ook op de server uitgevoerd.
        </p>
      </div>

      <div className="cashflow-field-grid">
        <div className="field">
          <label htmlFor="cashflow-company">Bedrijfsnaam</label>
          <input
            id="cashflow-company"
            name="company"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
            placeholder="Naam beveiligingsbedrijf"
          />
        </div>
        <div className="field">
          <label htmlFor="cashflow-email">E-mailadres voor deze zakelijke reservering</label>
          <input
            id="cashflow-email"
            name="businessEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="naam@bedrijf.nl"
          />
        </div>
      </div>
      <input className="spam-check" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset className="cashflow-question">
        <legend>Ben je een klein beveiligingsbedrijf en bevoegd om deze pilot te reserveren?</legend>
        <div className="cashflow-radio-row">
          <label><input type="radio" name="isSmallSecurityCompany" value="yes" required /> Ja</label>
          <label><input type="radio" name="isSmallSecurityCompany" value="no" required /> Nee</label>
        </div>
      </fieldset>

      <fieldset className="cashflow-question">
        <legend>Heb je één concrete zakelijke beveiligingsofferte die je wilt laten toetsen?</legend>
        <div className="cashflow-radio-row">
          <label><input type="radio" name="hasConcreteB2BQuote" value="yes" required /> Ja</label>
          <label><input type="radio" name="hasConcreteB2BQuote" value="no" required /> Nee</label>
        </div>
      </fieldset>

      <fieldset className="cashflow-question">
        <legend>Past de vaste scope: één kostenprofiel, één offerte en één feitelijke correctieronde?</legend>
        <div className="cashflow-radio-row">
          <label><input type="radio" name="acceptsFixedScope" value="yes" required /> Ja</label>
          <label><input type="radio" name="acceptsFixedScope" value="no" required /> Nee</label>
        </div>
      </fieldset>

      <fieldset className="cashflow-question">
        <legend>Kun je na betaling een complete, van persoonsgegevens ontdane intake aanleveren?</legend>
        <div className="cashflow-radio-row">
          <label><input type="radio" name="canProvideSanitizedIntake" value="yes" required /> Ja</label>
          <label><input type="radio" name="canProvideSanitizedIntake" value="no" required /> Nee</label>
        </div>
      </fieldset>

      <div className="cashflow-data-warning" id="cashflow-data-warning">
        <LockKeyhole size={19} aria-hidden="true" />
        <p>
          <strong>Deel hier geen cijfers, offerte-inhoud, documenten of medewerker- en klantgegevens.</strong>{" "}
          Deze eerste check vraagt alleen bedrijfsnaam, zakelijk e-mailadres en geschiktheidsantwoorden.
        </p>
      </div>

      <label className="consent field cashflow-consent">
        <input name="privacyAcknowledged" type="checkbox" required />
        <span>
          Ik heb de <Link href="/privacy">privacyverklaring</Link> gelezen en vul in deze eerste check
          geen persoonsgegevens van medewerkers of klanten en geen financiële cijfers in.
        </span>
      </label>
      <label className="consent field cashflow-consent">
        <input name="termsAccepted" type="checkbox" required />
        <span>
          Ik accepteer de <Link href="/voorwaarden">voorwaarden</Link>, de vaste pilotscope en betaling
          vooraf van € 99 excl. btw.
        </span>
      </label>

      <button className="button cashflow-checkout-button" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Geschiktheid controleren…" : "Controleer en ga naar Stripe"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="cashflow-payment-note">
        Btw wordt apart berekend. Je ontvangt via Stripe een betaalbewijs/factuur. Alleen een door Stripe
        bevestigde betaling activeert de reservering.
      </p>
      {message && (
        <p
          className={`${status === "error" ? "form-error" : "cashflow-form-notice"} cashflow-form-message`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
