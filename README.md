# Snuushco

Production site and intake flow for Snuushco.

## Intake flow

The public intake scores every submission and returns:

1. recommended package
2. price range
3. fit, complexity and readiness scores
4. review reasons
5. next steps
6. follow-up advice

The API route does not send mail or perform external actions unless `SNUUSHCO_INTAKE_WEBHOOK_URL` is configured in the deployment environment. Sensitive or complex projects route to human review.

## Kassie marketing automation

Kassie public marketing must use `https://kassieapp.nl` as the canonical host, even when the source lives in this Snuushco repository. The review-safe operating rules for autonomous marketing work, email identities, Resend setup, anti-spam gates and the no-autosend/no-autopost policy are documented in `docs/kassie-marketing-automation-operating-model.md`.

Tracked environment examples live in `.env.example` and contain placeholders only. Real Resend/API/DNS credentials must be configured outside git.
