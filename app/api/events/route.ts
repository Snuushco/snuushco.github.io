import { NextResponse } from "next/server";
import { z } from "zod";
import { saveConversionEvent } from "../../lib/db";

const eventSchema = z.object({
  eventName: z.enum(["intake_started", "intake_submitted", "checkout_started", "paid_lead", "landing_view"]),
  leadId: z.string().optional().nullable(),
  sessionId: z.string().optional().nullable(),
  source: z.string().max(120).optional().nullable(),
  campaign: z.string().max(120).optional().nullable(),
  path: z.string().max(500).optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldig event" }, { status: 400 });
  }

  try {
    const eventId = await saveConversionEvent(parsed.data);
    return NextResponse.json({ ok: true, eventId, storage: eventId ? "saved" : "not_configured" });
  } catch {
    return NextResponse.json({ ok: false, storage: "failed" }, { status: 202 });
  }
}
