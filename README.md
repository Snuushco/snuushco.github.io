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

## Kassie lead-magnet tools

The public Kassie tools under `/tools/*` are functional without login and track lightweight conversion events through `/api/events`:

- `/tools/factuurgenerator`: invoice preview, print/PDF via browser print, UBL XML v1 export.
- `/tools/btw-calculator`: inclusive/exclusive VAT calculator plus KOR-oriented checklist/disclaimer.
- `/tools/peppol-ready-check`: interactive UBL/Peppol readiness score.
- `/tools/uurtarief-calculator`: hourly-rate calculator based on income, costs, weeks and billable hours.
- `/tools/aftrekposten-checker`: review-safe deduction checklist.

Emailing tool results is intentionally off by default. To enable it safely in production, set all of:

- `NEXT_PUBLIC_TOOL_EMAIL_RESULTS_ENABLED=true` (shows the client button)
- `TOOL_EMAIL_RESULTS_ENABLED=true` (allows the server route)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Without those env vars the UI shows a disabled state and `/api/tools/email-result` returns `status: disabled`; it never sends a real email.
