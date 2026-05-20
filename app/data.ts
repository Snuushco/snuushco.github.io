export type Segment = {
  slug: string;
  label: string;
  promise: string;
  pain: string;
  cta: string;
  packageName: string;
  followUp: string;
  examples: string[];
};

export const segments: Segment[] = [
  { slug: "lokale-dienstverleners", label: "Lokale dienstverleners", promise: "Een website die lokaal vertrouwen wekt en betere aanvragen oplevert.", pain: "Je wilt minder prijszoekers nabellen en meer aanvragen krijgen van mensen die serieus willen starten.", cta: "Laat je website betere aanvragen binnenhalen", packageName: "Website met gerichte aanvraagroute", followUp: "Aanvragen filteren en offertevragen voorbereiden", examples: ["installateurs", "schoonmaakbedrijven", "hoveniers", "adviesbureaus"] },
  { slug: "security-facilitair", label: "Security en facilitaire dienstverlening", promise: "Een professionele website voor dienstverleners waar vertrouwen, bereikbaarheid en continuiteit tellen.", pain: "Zakelijke opdrachtgevers sturen vaak aanvragen zonder locatie, diensttijden, type dienst of gewenste startdatum.", cta: "Ontvang aanvragen met direct bruikbare gegevens", packageName: "Zakelijke dienstensite met intake", followUp: "Aanvragen triageren, planning voorbereiden en offertes versnellen", examples: ["beveiliging", "schoonmaak", "receptiediensten", "objectbeheer"] },
  { slug: "recruitment-staffing", label: "Recruitment en staffing", promise: "Een website die kandidaten en opdrachtgevers sneller naar de juiste route stuurt.", pain: "Je verliest tijd aan incomplete kandidaatprofielen en losse aanvragen van opdrachtgevers.", cta: "Ontvang completere kandidaatprofielen voordat je opvolgt", packageName: "Recruitment website met kandidaatintake", followUp: "Kandidaatintake en leadtriage voor snellere opvolging", examples: ["uitzendbureaus", "recruiters", "detacheerders", "zorgpersoneel"] },
  { slug: "administratie-finance", label: "Administratie en finance support", promise: "Een website die vertrouwen opbouwt en nieuwe klanten direct de juiste informatie laat aanleveren.", pain: "Nieuwe klanten leveren vaak halve informatie aan, waardoor intake en documentverzameling blijven liggen.", cta: "Laat nieuwe klanten vanaf het begin complete informatie aanleveren", packageName: "Website met documentintake", followUp: "Documenten verzamelen, klantvragen ordenen en dossiers voorbereiden", examples: ["boekhouders", "administratiekantoren", "backoffice", "salarisadministratie"] },
  { slug: "zorgondersteuning", label: "Zorgondersteuning en welzijn", promise: "Een rustige, duidelijke website voor zorg en ondersteuning.", pain: "Bezoekers zoeken rust en duidelijkheid, terwijl intake zorgvuldig en met menselijke controle moet blijven.", cta: "Maak de eerste stap duidelijk, rustig en zorgvuldig", packageName: "Zorgvuldige intakewebsite", followUp: "Aanvragen voorbereiden met menselijke controle op gevoelige informatie", examples: ["zorgbemiddeling", "begeleiding", "welzijn", "praktijken"] },
  { slug: "bouw-techniek", label: "Bouw en techniek", promise: "Een website die serieuze projectaanvragen oplevert.", pain: "Projectaanvragen missen vaak foto's, planning, locatie of randvoorwaarden, terwijl offertes veel voorbereiding kosten.", cta: "Ontvang projectaanvragen waar je echt iets mee kunt", packageName: "Projectwebsite met aanvraagfilter", followUp: "Projectinformatie verzamelen en offertevoorbereiding versnellen", examples: ["aannemers", "installateurs", "onderhoud", "infra"] },
  { slug: "software-saas", label: "Software en SaaS bedrijven", promise: "Een website die je aanbod duidelijk maakt en betere demo of implementatieaanvragen oplevert.", pain: "Bezoekers snappen vaak niet meteen wat je product oplost, voor wie het bedoeld is en welke stap logisch is.", cta: "Maak van interesse een duidelijke aanvraag", packageName: "Productwebsite met aanvraagroute", followUp: "Demo-aanvragen kwalificeren en implementatievragen voorbereiden", examples: ["softwareteams", "SaaS bedrijven", "agencies", "consultants"] },
];

export const packages = [
  { name: "Website Quickstart", price: "vanaf EUR 1.750 excl. btw", for: "Voor een duidelijke dienst, campagne of compacte bedrijfsintroductie.", includes: ["One page of compacte landingpage", "Gericht aanvraagformulier", "Mobiel goed", "Basis SEO", "1 reviewronde"] },
  { name: "Business Website", price: "vanaf EUR 2.750 excl. btw", for: "Voor dienstverleners met meerdere diensten, regio's en professionele leadflow.", includes: ["5 tot 7 pagina's", "Diensten en regio's", "Branchecopy", "Leadtracking basis", "2 reviewrondes"] },
  { name: "Growth Website", price: "vanaf EUR 6.500 excl. btw", for: "Voor bedrijven waar leads hoge waarde hebben en opvolging sneller moet.", includes: ["Niche SEO structuur", "Kennisbankbasis", "Lead magnet", "Gerichte aanvraagroute", "Voorbereid op latere koppelingen"] },
  { name: "Premium Maatwerk", price: "vanaf EUR 9.500 excl. btw", for: "Voor complexe projecten met integraties, portals, meertaligheid of maatwerklogica.", includes: ["Betaalde discovery", "Technische review", "Maatwerkplanning", "Change control", "Premium QA"] },
];

export const recurringPlans = [
  { name: "Website Care", price: "EUR 195 per maand excl. btw", for: "Voor bedrijven die hun website technisch netjes en actueel willen houden.", includes: ["Updates en kleine tekstwijzigingen", "Formulier- en uptimecheck", "Maandelijkse health note"] },
  { name: "Intake & Lead Support", price: "EUR 495 per maand excl. btw", for: "Voor bedrijven die aanvragen beter willen opvolgen en maandelijks willen verbeteren.", includes: ["Alles uit Website Care", "Leadflow review", "Verbeterlijst voor intake en opvolging"] },
  { name: "Managed Growth", price: "EUR 950 per maand excl. btw", for: "Voor bedrijven waar betere aanvragen directe commerciële waarde hebben.", includes: ["Alles uit Intake & Lead Support", "Nieuwe landings- of contentblokken", "Maandelijkse conversiereview"] },
];
