type IntakeData = {
  company: string;
  email: string;
  segment: string;
  market: string;
  goal: string;
  pages: string;
  features: string;
  pain: string;
  assets: string;
  deadline: string;
};

type AdviceData = {
  package: string;
  priceRange: string;
  route: string;
  fitScore: number;
  complexityScore: number;
  readinessScore: number;
  reviewReasons: string[];
  followUpAdvice: string;
  nextSteps: string[];
};

const segmentLabels: Record<string, string> = {
  "lokale-dienstverleners": "Lokale dienstverleners",
  "security-facilitair": "Security en facilitaire dienstverlening",
  "recruitment-staffing": "Recruitment en staffing",
  "administratie-finance": "Administratie en finance support",
  zorgondersteuning: "Zorgondersteuning en welzijn",
  "bouw-techniek": "Bouw en techniek",
  "software-saas": "Software en SaaS bedrijven",
};

const packageChecklist: Record<string, string[]> = {
  "Website Quickstart": [
    "Bevestig primaire doelgroep, hoofdaanbod en gewenste aanvraag",
    "Controleer logo, huisstijl, contactgegevens en bestaande assets",
    "Maak compacte paginastructuur: hero, probleem, aanbod, bewijs, aanvraag",
    "Schrijf doelgroepgerichte homepagecopy zonder interne vaktaal",
    "Koppel gericht aanvraagformulier en Telegram/ops leadregistratie",
    "Controleer basis SEO: title, description, H1, lokale termen en indexeerbaarheid",
    "Voer mobiele QA, formuliercheck, performancecheck en previewcheck uit",
    "Zet oplevermail klaar met previewlink en concrete reviewvraag",
  ],
  "Business Website": [
    "Bevestig diensten, regio's, primaire doelgroep en offertecriteria",
    "Maak sitemap voor 5 tot 7 pagina's met duidelijke klantreis",
    "Werk per dienst de klantvraag, bewijsvoering en gewenste vervolgstap uit",
    "Schrijf conversiegerichte branchecopy per pagina",
    "Richt leadflow in met pakketadvies, ops registratie en betaal/startroute",
    "Controleer trackingbasis, metadata, interne links en mobiele scanbaarheid",
    "Plan reviewronde 1 op inhoud en reviewronde 2 op details",
    "Zet livegang-checklist klaar: domein, forms, SEO, legal, redirects en analytics",
  ],
  "Growth Website": [
    "Bevestig groeidoel, leadwaarde, niches en belangrijkste conversieroutes",
    "Maak SEO structuur met contentclusters, landingspagina's en interne linkroute",
    "Bepaal lead magnet, aanvraagroute en kwalificatievragen",
    "Werk opvolging en interne handoff uit voor sales en productie",
    "Inventariseer latere koppelingen zonder deze stilzwijgend in scope te trekken",
    "Maak contentproductieplanning voor launch en eerste uitbreidingsronde",
    "Plan uitgebreide QA voor copy, conversie, performance, mobiel en technische SEO",
    "Zet maandelijkse optimalisatienotitie klaar met meetpunten en backlog",
  ],
  "Premium Maatwerk": [
    "Scheid standaard websiteonderdelen van maatwerkonderdelen",
    "Plan betaalde discovery of technische review voordat build start",
    "Inventariseer integraties, portals, meertaligheid, datastromen en afhankelijkheden",
    "Controleer technische risico's, privacy-impact en beheerverantwoordelijkheid",
    "Maak scopevoorstel met acceptatiecriteria, fasering en change control",
    "Laat prijs, planning en beslismoment expliciet bevestigen voor productie",
    "Zet premium QA-plan klaar: security, rechten, data, foutafhandeling en rollback",
  ],
};

export function buildFulfillment(input: {
  leadId: string;
  intake: IntakeData;
  advice: AdviceData;
  authorizationStatus: string;
}) {
  const isReview = input.authorizationStatus === "review_required";
  const taskType = isReview ? "premium_review" : "standard_build";
  const status = isReview ? "review_required" : "awaiting_payment";
  const priority = input.intake.deadline === "urgent" ? "urgent" : isReview ? "high" : "normal";

  const brief = {
    leadId: input.leadId,
    company: input.intake.company,
    email: input.intake.email,
    segment: segmentLabels[input.intake.segment] ?? input.intake.segment,
    market: input.intake.market,
    package: input.advice.package,
    priceRange: input.advice.priceRange,
    route: input.advice.route,
    authorizationStatus: input.authorizationStatus,
    primaryGoal: input.intake.goal,
    requestedScope: {
      pages: input.intake.pages,
      features: input.intake.features,
      assets: input.intake.assets,
      deadline: input.intake.deadline,
    },
    clientPain: input.intake.pain,
    followUpAdvice: input.advice.followUpAdvice,
    reviewReasons: input.advice.reviewReasons,
    scores: {
      fit: input.advice.fitScore,
      complexity: input.advice.complexityScore,
      readiness: input.advice.readinessScore,
    },
    nextAction: isReview
      ? "Voer premium review uit voordat prijs en planning definitief worden bevestigd."
      : "Wacht op pakketbetaling en zet daarna de build klaar voor productie.",
  };

  const checklist = [
    ...(packageChecklist[input.advice.package] ?? packageChecklist["Website Quickstart"]),
    ...input.advice.nextSteps,
  ];

  return { taskType, status, priority, brief, checklist };
}
