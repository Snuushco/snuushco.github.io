import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  tool: z.string().min(2).max(80),
  to: z.string().email().max(180),
  subject: z.string().min(3).max(140),
  summary: z.string().min(10).max(6000),
});

const emailEnabled = process.env.TOOL_EMAIL_RESULTS_ENABLED === "true";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Ongeldige aanvraag" }, { status: 400 });
  }

  if (!emailEnabled || !resendApiKey || !resendFrom) {
    return NextResponse.json(
      {
        ok: false,
        status: "disabled",
        message:
          "E-mailresultaten staan veilig uit. Zet TOOL_EMAIL_RESULTS_ENABLED=true, RESEND_API_KEY en RESEND_FROM_EMAIL om dit te activeren.",
      },
      { status: 202 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: parsed.data.to,
      subject: parsed.data.subject,
      text: `${parsed.data.summary}\n\n--\nGegenereerd via de gratis Kassie-tool ${parsed.data.tool}. Controleer bedragen en fiscale keuzes altijd zelf of met je boekhouder.`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, status: "provider_failed" }, { status: 202 });
  }

  const data = (await response.json().catch(() => ({}))) as { id?: string };
  return NextResponse.json({ ok: true, status: "sent", providerId: data.id ?? null });
}
