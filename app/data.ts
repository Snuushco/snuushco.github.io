export type Segment = {
  slug: string;
  label: string;
  promise: string;
  pain: string;
  cta: string;
  packageName: string;
  upsell: string;
  examples: string[];
};

export const segments: Segment[] = [
  { slug: "lokale-dienstverleners", label: "Lokale dienstverleners", promise: "Een website die lokaal vertrouwen wekt en betere aanvragen oplevert.", pain: "Je wilt geen prijszoekers blijven opvolgen terwijl serieuze klanten afhaken op een onduidelijke site.", cta: "Laat je website betere aanvragen binnenhalen", packageName: "Website met slimme aanvraagflow", upsell: "Aanvraagfilter of offertevoorbereider", examples: ["installateurs", "schoonmaakbedrijven", "hoveniers", "adviesbureaus"] },
  { slug: "security-facilitair", label: "Security en facilitaire dienstverlening", promise: "Een professionele website voor dienstverleners waar vertrouwen en continuiteit tellen.", pain: "Zakelijke opdrachtgevers sturen vaak vage aanvragen zonder locatie, diensttijden of scope.", cta: "Maak van vage aanvragen complete intakegegevens", packageName: "Zakelijke dienstensite met intakeflow", upsell: "Intake agent, planningvoorbereider of offertevoorbereider", examples: ["beveiliging", "schoonmaak", "receptiediensten", "objectbeheer"] },
  { slug: "recruitment-staffing", label: "Recruitment en staffing", promise: "Een website die kandidaten en opdrachtgevers sneller naar de juiste route stuurt.", pain: "Je verliest tijd aan incomplete kandidaatprofielen en losse aanvragen van opdrachtgevers.", cta: "Ontvang completere kandidaatprofielen voordat je opvolgt", packageName: "Recruitment website met kandidaatintake", upsell: "Kandidaat intake agent of lead triage agent", examples: ["uitzendbureaus", "recruiters", "detacheerders", "zorgpersoneel"] },
  { slug: "administratie-finance", label: "Administratie en finance support", promise: "Een website die vertrouwen opbouwt en nieuwe klanten direct de juiste informatie laat aanleveren.", pain: "Nieuwe klanten leveren vaak halve informatie aan, waardoor intake en documentverzameling blijven liggen.", cta: "Laat nieuwe klanten vanaf het begin complete informatie aanleveren", packageName: "Website met documentintake", upsell: "Document intake agent of inbox triage agent", examples: ["boekhouders", "administratiekantoren", "backoffice", "salarisadministratie"] },
  { slug: "zorgondersteuning", label: "Zorgondersteuning en welzijn", promise: "Een rustige, duidelijke website voor zorg en ondersteuning.", pain: "Bezoekers zoeken rust en duidelijkheid, terwijl intake zorgvuldig en met menselijke controle moet blijven.", cta: "Maak de eerste stap duidelijk, rustig en zorgvuldig", packageName: "Zorgvuldige intakewebsite", upsell: "Intakevoorbereider met menselijke controle", examples: ["zorgbemiddeling", "begeleiding", "welzijn", "praktijken"] },
  { slug: "bouw-techniek", label: "Bouw en techniek", promise: "Een website die serieuze projectaanvragen oplevert.", pain: "Projectaanvragen missen vaak foto's, planning, locatie of budget, terwijl offertes veel voorbereiding kosten.", cta: "Ontvang projectaanvragen waar je echt iets mee kunt", packageName: "Projectwebsite met aanvraagfilter", upsell: "Offertevoorbereider of projectintake agent", examples: ["aannemers", "installateurs", "onderhoud", "infra"] },
  { slug: "software-saas-ai", label: "Software, SaaS en AI bewuste bedrijven", promise: "Productized websites en AI workflows voor teams die sneller willen valideren.", pain: "Je zoekt geen vaag AI advies, maar werkende flows met duidelijke human approval gates.", cta: "Zet intake, proposal en delivery om in een werkende workflow", packageName: "Productized web and workflow build", upsell: "Workflow agent, ops agent of reporting agent", examples: ["softwareteams", "agencies", "consultants", "AI first teams"] },
];

export const packages = [
  { name: "Website Quickstart", price: "vanaf EUR 950", for: "Voor een duidelijke dienst, campagne of compacte bedrijfsintroductie.", includes: ["One page of compacte landingpage", "Slim aanvraagformulier", "Mobiel goed", "Basis SEO", "1 reviewronde"] },
  { name: "Business Website", price: "vanaf EUR 2.750", for: "Voor dienstverleners met meerdere diensten, regio's en professionele leadflow.", includes: ["5 tot 7 pagina's", "Diensten en regio's", "Branchecopy", "Leadtracking basis", "2 reviewrondes"] },
  { name: "Growth Website", price: "vanaf EUR 6.500", for: "Voor bedrijven waar leads hoge waarde hebben en opvolging sneller moet.", includes: ["Niche SEO structuur", "Kennisbankbasis", "Lead magnet", "Intake automation", "AI workflow voorbereiding"] },
  { name: "Premium Custom", price: "vanaf EUR 9.500", for: "Voor complexe projecten met integraties, portals, meertaligheid of maatwerklogica.", includes: ["Betaalde discovery", "Technische review", "Maatwerkplanning", "Change control", "Premium QA"] },
];
