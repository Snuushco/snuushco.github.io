# Kassie owned-media infrastructure

This branch adds storage and review infrastructure for Kassie newsletter opt-ins and contact messages. It does not send campaigns.

## What is implemented

- Kassie landing page section `#contact` with:
  - newsletter opt-in for `nieuwsbrief@kassieapp.nl` identity;
  - contact form for `contact@kassieapp.nl` follow-up;
  - explicit consent copy and honeypot spam field.
- API endpoints:
  - `POST /api/kassie/newsletter`
  - `POST /api/kassie/contact`
  - `POST /api/kassie/unsubscribe`
- Database table created lazily by `ensureSnuushcoTables()`:
  - `kassie_marketing_leads`
  - lead type, email, name, company, phone, topic, message, consent, source, review status, unsubscribe token and resend status.
- Internal `/ops` dashboard section: "Kassie nieuwsbrief en contact".
- Resend skeleton for owner notifications only. Campaign sending stays disabled unless explicitly enabled.
- Privacy text updated for Kassie contact/newsletter data and Resend as a gated processor.

## Required production configuration

Minimum to store leads:

```text
DATABASE_URL=<production postgres url>
```

Optional owner notification via Resend, still not campaigns:

```text
RESEND_API_KEY=<resend api key>
KASSIE_NEWSLETTER_FROM=nieuwsbrief@kassieapp.nl
KASSIE_CONTACT_TO=contact@kassieapp.nl
KASSIE_RESEND_SENDING_ENABLED=false
```

Set `KASSIE_RESEND_SENDING_ENABLED=true` only after all gates below are proven. Without this exact value, the code records leads but performs no Resend call.

## Resend/DNS/mailbox gates before any sending

1. Verify `kassieapp.nl` in Resend.
2. Add and verify required DNS records from Resend for the domain. Do not copy example DNS values; use the current Resend dashboard values.
3. Prove reply routing/mailbox access for:
   - `contact@kassieapp.nl`
   - `nieuwsbrief@kassieapp.nl`
4. Confirm unsubscribe behavior for newsletter contacts. The API can mark a stored token unsubscribed; a public unsubscribe email link/template must be wired before campaigns.
5. Keep distribution approval-gated: draft newsletters may be reviewed, but no campaign send/post/DM happens without Guus approval.
6. Only then set `KASSIE_RESEND_SENDING_ENABLED=true` if owner notifications are wanted.

## Review workflow

1. Open `/ops` with `SNUUSHCO_OPS_PASSWORD` configured.
2. Review the "Kassie nieuwsbrief en contact" table.
3. Treat every row as captured interest/review input, not permission to send bulk mail beyond the opt-in scope.
4. For newsletters, prepare a draft in the review-gated lane and include a subtle CTA/backlink to `https://kassieapp.nl` or a specific Kassie page.
