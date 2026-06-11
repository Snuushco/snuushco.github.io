# Kassie marketing automation operating model

Canonical public host: https://kassieapp.nl

This document is the review-safe operating model for Kassie marketing automation. The source code may live in the Snuushco public-site repository, but Kassie URLs, canonical tags, review links and outbound identity must use kassieapp.nl. Do not use snuushco.nl for Kassie marketing links.

## 1. Autonomous allowed scope

Agents may autonomously do non-outreach work that is reversible, reviewable and measurable:

- improve public-site SEO foundations, metadata, sitemap entries and robots rules for kassieapp.nl;
- create or update review-only landing pages, knowledge pages, tools, draft newsletter pages and internal operating docs;
- create draft distribution assets for LinkedIn, email newsletters, communities and partner outreach;
- run local checks, builds, secret scans and read-only live verification;
- prepare commits/pushes/deploys for docs/config-safe changes when the task explicitly allows it;
- maintain a review queue with draft status, intended audience, source links and approval notes.

Agents must keep accounting, tax, legal, compliance and competitor claims review-safe. Use cautious wording, source dates and human-review notes when a claim could become stale or legally sensitive.

## 2. Hard gates: no autonomous sending or posting

Never send, publish, post or DM without explicit Guus approval in the task thread or current chat.

This hard gate applies to:

- newsletter sends;
- one-to-one outreach emails;
- LinkedIn posts, comments or DMs;
- community/forum posts or replies;
- WhatsApp, Telegram, Slack or other direct messages;
- paid ads, sponsored posts or boosted content;
- domain purchase, DNS sending-domain changes or real payment steps.

Allowed without approval: drafting the exact message, subject line, audience notes, source links and approval checklist in a review queue.

## 3. Email identities

Use these identities as the planned Kassie email separation:

| Identity | Intended use | Autonomous action allowed? |
| --- | --- | --- |
| contact@kassieapp.nl | General inbound contact and website replies | Draft only until mailbox/routing is confirmed |
| nieuwsbrief@kassieapp.nl | Opt-in newsletter sending | Draft/queue only; no send without approval |
| boekhouden@kassieapp.nl | Manual or reviewed partner/prospect outreach around bookkeeping/accounting topics | Draft/queue only; no send without approval |

Do not mix these identities with Snuushco-branded email for Kassie content. Do not use personal mailboxes for automated Kassie marketing sends.

## 4. Resend sending-domain requirements

Before any Resend-backed Kassie send can be enabled, the sending domain must be configured and verified for kassieapp.nl in Resend and DNS.

Minimum requirements:

1. A Resend account/project exists for Kassie or Snuushco-managed Kassie sending.
2. kassieapp.nl is added as a sending domain in Resend.
3. DNS records requested by Resend are added at the domain/DNS provider, typically SPF/Return-Path and DKIM records.
4. Domain verification is green in Resend.
5. Production environment variables are set in Vercel only after verification.
6. A test send is performed only to an internal/review recipient and logged in the review queue.
7. Newsletter recipients are opt-in only and unsubscribe handling is documented before any real newsletter send.

Current repository inspection did not find Resend code dependencies or Resend-related environment variables in the tracked source. The linked Vercel project environment list also did not show Resend-related variable names at inspection time.

## 5. Safe environment variable names

Use placeholders only in tracked files. Never commit real API keys, DNS tokens, SMTP passwords, subscriber lists or mailbox credentials.

Planned names:

- RESEND_API_KEY: server-side Resend API key; Vercel server environment only.
- KASSIE_EMAIL_FROM_CONTACT: expected value contact@kassieapp.nl after domain verification.
- KASSIE_EMAIL_FROM_NEWSLETTER: expected value nieuwsbrief@kassieapp.nl after domain verification.
- KASSIE_EMAIL_FROM_OUTREACH: expected value boekhouden@kassieapp.nl after domain verification.
- KASSIE_MARKETING_REVIEW_TO: internal review recipient for test sends and draft previews.
- KASSIE_EMAIL_SEND_MODE: keep as review-only until Guus explicitly approves a live-send mode.

Client-side code must not read RESEND_API_KEY. Browser-visible variables must not contain sending credentials.

## 6. Reply and inbox limitation

Resend is a sending API, not a complete shared inbox. Before publishing an address as a reliable reply channel, confirm inbound mail routing separately.

Required decisions before live use:

- where replies to contact@kassieapp.nl are received;
- where replies to nieuwsbrief@kassieapp.nl are received or whether that identity should be no-reply style with a separate contact link;
- where replies to boekhouden@kassieapp.nl are received and who reviews them;
- whether SPF/DKIM/DMARC alignment is acceptable after DNS setup;
- how bounces, complaints and unsubscribes are monitored.

If inbound routing is not confirmed, all public copy must avoid implying that the address is actively monitored.

## 7. Anti-spam rules

Kassie marketing must stay low-risk and permission-aware:

- send newsletters only to explicit opt-ins;
- include a clear unsubscribe path before any newsletter send;
- keep outreach one-to-one, relevant and manually reviewed;
- do not scrape, enrich or bulk-upload prospect lists without explicit approval and legal basis;
- do not use misleading subjects, fake urgency or hidden commercial intent;
- maintain suppression lists for unsubscribes, bounces and do-not-contact requests;
- throttle any approved sending and monitor bounce/complaint rates;
- keep a copy of the approved message, audience and approval note in the review queue.

Newsletter, LinkedIn and community drafts should include subtle CTAs where appropriate, plus a relevant backlink to https://kassieapp.nl or a specific Kassie blog/tool/page. CTAs must feel helpful rather than pushy, for example: "check je situatie", "bekijk de checklist", "laat Kassie meekijken" or "bewaar de gids".

## 8. Review queue shape

Every draft distribution item should be reviewable with this minimum data:

- channel: newsletter, LinkedIn, community, partner, outreach, website;
- identity: contact@kassieapp.nl, nieuwsbrief@kassieapp.nl, boekhouden@kassieapp.nl or not applicable;
- target audience and reason it is relevant;
- draft subject/headline and body;
- source URLs or claims to verify;
- risk notes: fiscal/legal/compliance/competitor/privacy;
- status: draft, needs review, approved for publish, approved for send, sent/published;
- approver and timestamp for any send/publish action.

A queued item is not approval. Approval must be explicit and scoped to the specific message/channel/audience.

## 9. Credential and DNS gate for Guus

Resend credentials and DNS records are the only blocked operational step at this stage if Guus wants real sending later.

Needed from Guus or a DNS/email operator:

- confirm the Resend account/project to use;
- add and verify kassieapp.nl as a Resend sending domain;
- provide or set RESEND_API_KEY in Vercel without exposing it in chat or git;
- confirm inbound mailbox/routing for contact@, nieuwsbrief@ and outreach@;
- approve the first internal test-send recipient before any send test.

Until those steps are done, keep implementation to docs, placeholders and review-only queues.
