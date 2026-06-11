import { NextResponse } from "next/server";
import { z } from "zod";
import { maybeSendKassieOwnerNotification, saveKassieMarketingLead } from "../../../lib/db";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  company: z.string().max(140).optional().or(z.literal("")),
  phone: z.string().max(60).optional().or(z.literal("")),
  topic: z.string().min(2).max(120),
  message: z.string().min(10).max(2500),
  consent: z.literal(true),
  website: z.string().optional(),
  source: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldig contactbericht" }, { status: 400 });
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ status: "accepted" }, { status: 202 });
  }

  const lead = await saveKassieMarketingLead({
    kind: "contact",
    email: parsed.data.email,
    name: parsed.data.name,
    company: parsed.data.company || undefined,
    phone: parsed.data.phone || undefined,
    topic: parsed.data.topic,
    message: parsed.data.message,
    consent: parsed.data.consent,
    source: parsed.data.source || "kassieapp.nl/contact-form",
    metadata: { inbox: "contact@kassieapp.nl", campaignSending: "disabled_by_default" },
  });

  if (!lead) {
    return NextResponse.json({ status: "not_configured", message: "Bericht ontvangen, maar DATABASE_URL is nog niet geconfigureerd." }, { status: 202 });
  }

  const resendStatus = await maybeSendKassieOwnerNotification({
    kind: "contact",
    email: parsed.data.email,
    name: parsed.data.name,
    company: parsed.data.company || undefined,
    phone: parsed.data.phone || undefined,
    topic: parsed.data.topic,
    message: parsed.data.message,
    consent: parsed.data.consent,
    source: parsed.data.source,
    leadId: lead.id,
  });

  return NextResponse.json({ status: "saved", leadId: lead.id, sending: resendStatus });
}
