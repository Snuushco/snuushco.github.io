import { NextResponse } from "next/server";
import { z } from "zod";
import { maybeSendKassieOwnerNotification, saveKassieMarketingLead } from "../../../lib/db";

const newsletterSchema = z.object({
  email: z.string().email().max(160),
  name: z.string().max(120).optional().or(z.literal("")),
  consent: z.literal(true),
  website: z.string().optional(),
  source: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige nieuwsbrief-aanmelding" }, { status: 400 });
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ status: "accepted" }, { status: 202 });
  }

  const lead = await saveKassieMarketingLead({
    kind: "newsletter",
    email: parsed.data.email,
    name: parsed.data.name || undefined,
    consent: parsed.data.consent,
    source: parsed.data.source || "kassieapp.nl/newsletter-form",
    metadata: { inbox: "nieuwsbrief@kassieapp.nl", campaignSending: "disabled_by_default" },
  });

  if (!lead) {
    return NextResponse.json({ status: "not_configured", message: "Aanmelding ontvangen, maar DATABASE_URL is nog niet geconfigureerd." }, { status: 202 });
  }

  const resendStatus = await maybeSendKassieOwnerNotification({
    kind: "newsletter",
    email: parsed.data.email,
    name: parsed.data.name || undefined,
    consent: parsed.data.consent,
    source: parsed.data.source,
    leadId: lead.id,
  });

  return NextResponse.json({ status: "saved", leadId: lead.id, sending: resendStatus });
}
