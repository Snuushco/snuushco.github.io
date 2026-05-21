import { NextResponse } from "next/server";
import { z } from "zod";
import { createFulfillmentTask, saveIntake } from "../../lib/db";
import { buildFulfillment } from "../../lib/fulfillment";

const intakeSchema = z.object({
  company: z.string().min(2).max(120),
  email: z.string().email(),
  segment: z.string().min(2),
  market: z.string().min(2).max(120),
  goal: z.string(),
  pages: z.string(),
  monthly: z.string().optional(),
  features: z.string(),
  pain: z.string().min(5).max(2000),
  assets: z.string(),
  deadline: z.string(),
  consent: z.literal("on"),
  source: z.string().optional(),
  campaign: z.string().optional(),
  website: z.string().optional(),
});

const followUpAdvice: Record<string, string> = {
  "lokale-dienstverleners": "Aanvraagfilter of offertevoorbereider",
  "security-facilitair": "Intake, planningvoorbereiding of offertevoorbereiding",
  "recruitment-staffing": "Kandidaatintake of leadtriage",
  "administratie-finance": "Documentintake of inboxtriage",
  zorgondersteuning: "Intakevoorbereider met menselijke controle",
  "bouw-techniek": "Offertevoorbereiding of projectintake",
  "software-saas": "Demo-aanvragen kwalificeren of implementatievragen voorbereiden",
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
  if (data.deadline === "urgent" && data.assets !== "complete") score -= 20;
  return Math.max(0, Math.min(100, score));
}

function scoreFit(data: z.infer<typeof intakeSchema>) {
  let score = 30;
  if (data.goal === "better_leads" || data.goal === "automation") score += 25;
  if (data.pain.length > 40) score += 5;
  return Math.max(0, Math.min(100, score));
}

function classify(data: z.infer<typeof intakeSchema>) {
  const complexityScore = scoreComplexity(data);
  const readinessScore = scoreReadiness(data);
  const fitScore = scoreFit(data);
  const reviewReasons: string[] = [];

  if (data.features === "booking") reviewReasons.push("Booking, betaling of portal vraagt premium review");
  if (data.features === "integrations") reviewReasons.push("CRM, API of maatwerkkoppeling vraagt technische review");
  if (data.features === "regulated") reviewReasons.push("Gevoelige juridische, medische, financiele of HR informatie vraagt menselijke review");
  if (data.pages === "ten_plus") reviewReasons.push("Meer dan 7 pagina's vraagt een uitgebreidere planning");
  if (data.deadline === "urgent") reviewReasons.push("Deadline binnen 72 uur vraagt spoedreview");
  if (data.assets === "none" && (data.deadline === "week" || data.deadline === "urgent")) {
    reviewReasons.push("Onvolledige assets met korte deadline vraagt aangepaste planning");
  }

  let packageName = "Website Quickstart";
  let priceRange = "vanaf EUR 1.750 excl. btw";
  let route = "Standaardroute";

  if (complexityScore > 70 || reviewReasons.length > 0) {
    packageName = "Premium Maatwerk";
    priceRange = "vanaf EUR 9.500 excl. btw";
    route = "Review door specialist";
  } else if (complexityScore >= 46) {
    packageName = "Growth Website";
    priceRange = "vanaf EUR 6.500 excl. btw";
  } else if (complexityScore >= 21) {
    packageName = "Business Website";
    priceRange = "vanaf EUR 2.750 excl. btw";
  }

  const nextSteps = reviewReasons.length
    ? ["Standaard en maatwerkonderdelen scheiden", "Technische review uitvoeren", "Prijs en planning bevestigen"]
    : ["Projectbrief voorbereiden", "Content en paginastructuur klaarzetten", "Preview bouwen en via reviewronde opleveren"];

  return {
    package: packageName,
    priceRange,
    route,
    fitScore,
    complexityScore,
    readinessScore,
    reviewReasons,
    followUpAdvice: followUpAdvice[data.segment] ?? "Aanvragen beter voorbereiden voor opvolging",
    nextSteps,
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige intake", details: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ advice: null, leadStorage: "skipped" }, { status: 202 });
  }

  const advice = classify(parsed.data);
  const payload = {
    receivedAt: new Date().toISOString(),
    intake: parsed.data,
    advice,
    authorizationStatus: advice.reviewReasons.length ? "review_required" : "standard_build_ready",
  };
  let notification = "not_configured";

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
      `Vervolgadvies: ${advice.followUpAdvice}`,
      `Reviewredenen: ${advice.reviewReasons.length ? advice.reviewReasons.join("; ") : "geen"}`,
      "",
      `Pijnpunt: ${parsed.data.pain}`,
    ].join("\n");

    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message }),
      });
      notification = "telegram_sent";
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
      notification = "webhook_sent";
    } catch {
      return NextResponse.json({ advice, notification: "webhook_failed" }, { status: 202 });
    }
  }

  let leadId: string | null = null;
  let fulfillmentTaskId: string | null = null;
  try {
    leadId = await saveIntake({
      intake: parsed.data,
      advice,
      authorizationStatus: payload.authorizationStatus,
      notification,
    });
    if (leadId) {
      const fulfillment = buildFulfillment({
        leadId,
        intake: parsed.data,
        advice,
        authorizationStatus: payload.authorizationStatus,
      });
      fulfillmentTaskId = await createFulfillmentTask({
        leadId,
        taskType: fulfillment.taskType,
        status: fulfillment.status,
        priority: fulfillment.priority,
        packageName: advice.package,
        brief: fulfillment.brief,
        checklist: fulfillment.checklist,
      });
    }
  } catch {
    return NextResponse.json({ advice, notification, leadStorage: "failed" }, { status: 202 });
  }

  return NextResponse.json({
    advice,
    leadId,
    fulfillmentTaskId,
    notification,
    leadStorage: leadId ? "saved" : "not_configured",
  });
}
