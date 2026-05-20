import { NextResponse } from "next/server";
import { z } from "zod";

const intakeSchema = z.object({
  company: z.string().min(2).max(120),
  email: z.string().email(),
  segment: z.string().min(2),
  market: z.string().min(2).max(120),
  goal: z.string(),
  pages: z.string(),
  budget: z.string(),
  monthly: z.string(),
  features: z.string(),
  pain: z.string().min(5).max(2000),
  assets: z.string(),
  deadline: z.string(),
});

const upsells: Record<string, string> = {
  "lokale-dienstverleners": "Aanvraagfilter of offertevoorbereider",
  "security-facilitair": "Intake agent, planningvoorbereider of offertevoorbereider",
  "recruitment-staffing": "Kandidaat intake agent of lead triage agent",
  "administratie-finance": "Document intake agent of inbox triage agent",
  zorgondersteuning: "Intakevoorbereider met menselijke controle",
  "bouw-techniek": "Offertevoorbereider of projectintake agent",
  "software-saas-ai": "Workflow agent, ops agent of reporting agent",
};

function scoreComplexity(data: z.infer<typeof intakeSchema>) {
  let score = 0;
  if (data.pages === "one") score += 5;
  if (data.pages === "five_to_seven") score += 15;
  if (data.pages === "ten_plus") score += 30;
  if (data.pages === "unknown") score += 18;
  if (data.features === "content") score += 20;
  if (data.features === "booking") score += 30;
  if (data.features === "integrations") score += 35;
  if (data.features === "regulated") score += 45;
  if (data.deadline === "urgent") score += 25;
  return score;
}

function scoreReadiness(data: z.infer<typeof intakeSchema>) {
  let score = 40;
  if (data.assets === "complete") score += 35;
  if (data.assets === "partial") score += 18;
  if (data.assets === "none") score -= 10;
  if (data.budget === "3500_8500" || data.budget === "8500_plus") score += 20;
  if (data.deadline === "urgent" && data.assets !== "complete") score -= 20;
  return Math.max(0, Math.min(100, score));
}

function scoreFit(data: z.infer<typeof intakeSchema>) {
  let score = 30;
  if (data.goal === "better_leads" || data.goal === "automation") score += 25;
  if (data.monthly !== "none") score += 20;
  if (data.budget !== "under_1000") score += 20;
  if (data.pain.length > 40) score += 5;
  return Math.max(0, Math.min(100, score));
}

function classify(data: z.infer<typeof intakeSchema>) {
  const complexityScore = scoreComplexity(data);
  const readinessScore = scoreReadiness(data);
  const fitScore = scoreFit(data);
  const triggers: string[] = [];

  if (data.features === "booking") triggers.push("Booking, betaling of portal vraagt premium review");
  if (data.features === "integrations") triggers.push("CRM, API of maatwerkkoppeling vraagt technische review");
  if (data.features === "regulated") triggers.push("Gevoelige juridische, medische, financiele of HR workflow vraagt menselijke review");
  if (data.pages === "ten_plus") triggers.push("Meer dan 7 pagina's valt buiten standaard Business scope");
  if (data.deadline === "urgent") triggers.push("Deadline binnen 72 uur vraagt spoedreview");
  if (data.assets === "none" && (data.deadline === "week" || data.deadline === "urgent")) {
    triggers.push("Onvolledige assets met korte deadline vraagt aangepaste planning");
  }

  let packageName = "Website Quickstart";
  let priceRange = "vanaf EUR 950";
  let route = "Standaardroute";

  if (complexityScore > 70 || triggers.length > 0 || data.budget === "8500_plus") {
    packageName = "Premium Custom";
    priceRange = "vanaf EUR 9.500";
    route = "Premium review";
  } else if (complexityScore >= 46 || data.budget === "3500_8500") {
    packageName = "Growth Website";
    priceRange = "vanaf EUR 6.500";
  } else if (complexityScore >= 21 || data.budget === "1000_3500") {
    packageName = "Business Website";
    priceRange = "vanaf EUR 2.750";
  }

  const nextSteps = triggers.length
    ? ["Scope splitsen in standaard en premium onderdelen", "Technische review uitvoeren", "Prijs en planning bevestigen voor build"]
    : ["Build brief automatisch aanmaken", "Content en paginastructuur voorbereiden", "Preview bouwen en via reviewronde opleveren"];

  return {
    package: packageName,
    priceRange,
    route,
    fitScore,
    complexityScore,
    readinessScore,
    premiumTriggers: triggers,
    upsell: upsells[data.segment] ?? "AI Agent Intake",
    nextSteps,
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige intake", details: parsed.error.flatten() }, { status: 400 });
  }

  const advice = classify(parsed.data);
  const payload = {
    receivedAt: new Date().toISOString(),
    intake: parsed.data,
    advice,
    workflow: advice.premiumTriggers.length ? "human_review_required" : "standard_build_authorized",
  };

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.SNUUSHCO_TELEGRAM_CHAT_ID;
  if (telegramToken && telegramChatId) {
    const message = [
      "Nieuwe Snuushco intake",
      "",
      `Bedrijf: ${parsed.data.company}`,
      `E-mail: ${parsed.data.email}`,
      `Segment: ${parsed.data.segment}`,
      `Pakket: ${advice.package}`,
      `Route: ${advice.route}`,
      `Upsell: ${advice.upsell}`,
      `Premium triggers: ${advice.premiumTriggers.length ? advice.premiumTriggers.join("; ") : "geen"}`,
      "",
      `Pijnpunt: ${parsed.data.pain}`,
    ].join("\n");

    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message }),
      });
    } catch {
      return NextResponse.json({ advice, notification: "telegram_failed" }, { status: 202 });
    }
  }

  const webhookUrl = process.env.SNUUSHCO_INTAKE_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      return NextResponse.json({ advice, notification: "webhook_failed" }, { status: 202 });
    }
  }

  return NextResponse.json({
    advice,
    notification: telegramToken && telegramChatId ? "telegram_sent" : webhookUrl ? "webhook_sent" : "not_configured",
  });
}
