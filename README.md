# Snuushco

Production site and intake workflow for Snuushco.

## Workflows

The public intake scores every submission and returns:

1. recommended package
2. price range
3. fit, complexity and readiness scores
4. premium triggers
5. next steps
6. AI workflow upsell

The API route does not send mail or perform external actions unless `SNUUSHCO_INTAKE_WEBHOOK_URL` is configured in the deployment environment. Sensitive or complex projects route to human review.
