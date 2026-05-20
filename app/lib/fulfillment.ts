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
    "Controleer bedrijfsnaam, doelgroep en primaire actie",
    "Maak compacte paginastructuur",
    "Schrijf hero, dienstenblok en contactflow",
    "Koppel intakeformulier en basis SEO",
    "Voer mobiele QA en previewcheck uit",
  ],
  "Business Website": [
    "Maak sitemap voor 5 tot 7 pagina's",
    "Werk diensten, doelgroep en regio uit",
    "Schrijf conversiegerichte branchecopy",
    "Controleer leadflow en trackingbasis",
    "Plan twee reviewrondes",
  ],
  "Growth Website": [
    "Maak SEO structuur en contentclusters",
    "Bepaal lead magnet en aanvraagroute",
    "Werk opvolging en interne handoff uit",
    "Controleer koppelingen die later nodig zijn",
    "Plan uitgebreide QA voor conversie en performance",
  ],
  "Premium Maatwerk": [
    "Scheid standaardonderdelen van maatwerk",
    "Plan betaalde discovery",
    "Controleer technische risico's en afhankelijkheden",
    "Maak change control en opleverplanning",
    "Laat prijs en scope bevestigen voor build",
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
