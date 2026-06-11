export const kassieBaseUrl = "https://kassieapp.nl";
export const appBaseUrl = "https://mijn.kassieapp.nl";

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  cta: string;
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  links: { label: string; href: string }[];
};

export const pillarPages: ContentPage[] = [
  {
    slug: "boekhouden-zzp",
    title: "Boekhouden voor ZZP'ers: complete gids | Kassie",
    description: "Praktische gids voor ZZP-boekhouding: bonnen, facturen, btw, deadlines en hoe Kassie dit eenvoudiger maakt via WhatsApp.",
    h1: "Boekhouden voor ZZP'ers: complete gids",
    primaryKeyword: "boekhouden zzp",
    secondaryKeywords: ["zzp administratie", "boekhouding zzp", "administratie bijhouden"],
    intent: "ZZP'er wil weten wat er minimaal nodig is voor een kloppende administratie.",
    cta: "Start gratis met Kassie",
    sections: [
      { heading: "Wat moet je als ZZP'er bijhouden?", body: ["Je administratie bestaat uit verkoopfacturen, inkoopfacturen, bonnen, bankmutaties, btw-overzichten en bewijsstukken voor zakelijke kosten.", "De Belastingdienst verwacht vooral dat je administratie controleerbaar is. Kassie helpt door losse berichten, foto's en opdrachten om te zetten naar overzichtelijke administratie-acties."] },
      { heading: "De simpelste werkweek", body: ["Stuur nieuwe bonnen direct door, maak facturen zodra werk klaar is en controleer wekelijks openstaande bedragen.", "Zo voorkom je dat je aan het einde van het kwartaal moet reconstrueren wat er is gebeurd."] },
      { heading: "Hoe Kassie helpt", body: ["Je hoeft niet eerst boekhoudtaal te leren. Je stuurt een berichtje of foto; Kassie zet klant, bedrag, btw en omschrijving klaar waar dat kan.", "Jij blijft controleur: concepten worden zichtbaar, reviewbaar en pas definitief na akkoord."] },
    ],
    faqs: [
      { question: "Moet ik als ZZP'er boekhoudsoftware gebruiken?", answer: "Nee, maar je moet wel een controleerbare administratie hebben. Software maakt dat meestal veiliger en sneller." },
      { question: "Hoe vaak moet ik mijn administratie bijwerken?", answer: "Wekelijks is praktisch. Btw-aangifte en jaarwerk worden veel makkelijker als bonnen en facturen niet blijven liggen." },
    ],
    links: [{ label: "BTW-aangifte doen als ZZP'er", href: "/btw-aangifte-zzp" }, { label: "Factureren als ZZP'er", href: "/factureren-zzp" }, { label: "BTW-calculator", href: "/tools/btw-calculator" }],
  },
  {
    slug: "btw-aangifte-zzp",
    title: "BTW-aangifte doen als ZZP'er | Kassie",
    description: "Wat is btw-aangifte, wanneer doe je aangifte en welke fouten maken ZZP'ers vaak? Praktisch uitgelegd met Kassie.",
    h1: "BTW-aangifte doen als ZZP'er",
    primaryKeyword: "btw aangifte zzp",
    secondaryKeywords: ["btw aangifte doen", "btw kwartaal", "btw berekenen"],
    intent: "ZZP'er wil weten hoe btw-aangifte werkt en wat er nodig is per kwartaal.",
    cta: "Bereken je btw",
    sections: [
      { heading: "Wat is btw-aangifte?", body: ["Bij btw-aangifte geef je aan hoeveel btw je aan klanten hebt gerekend en hoeveel btw je zelf zakelijk hebt betaald.", "Het verschil betaal je of krijg je terug. Raadpleeg altijd de actuele Belastingdienst-informatie voor je persoonlijke situatie."] },
      { heading: "Wat heb je nodig?", body: ["Alle verkoopfacturen, inkoopfacturen, bonnen en correcties over de periode.", "Kassie houdt concepten en bewijsstukken bij elkaar zodat de kwartaalcontrole minder zoekwerk wordt."] },
      { heading: "Veelgemaakte fouten", body: ["Privébonnen meenemen, buitenlandse facturen verkeerd behandelen, creditnota's vergeten of te laat beginnen.", "Bij twijfel hoort een boekhouder of fiscalist mee te kijken; Kassie positioneert zich als review-safe administratiehulp, niet als magische belastingadviseur."] },
    ],
    faqs: [{ question: "Wanneer moet ik btw-aangifte doen?", answer: "Veel ondernemers doen per kwartaal aangifte. Controleer je eigen tijdvak in het portaal van de Belastingdienst." }, { question: "Is de KOR voor mij interessant?", answer: "Dat hangt af van je omzet, klanten en aftrekbare btw. Gebruik een checklist en laat twijfelgevallen beoordelen." }],
    links: [{ label: "BTW-calculator", href: "/tools/btw-calculator" }, { label: "KOR uitgelegd", href: "/kennisbank/kor" }, { label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }],
  },
  {
    slug: "e-facturatie-peppol-vida",
    title: "E-facturatie, Peppol & ViDA uitgelegd | Kassie",
    description: "Heldere uitleg over e-facturatie, Peppol en ViDA voor Nederlandse ZZP'ers en kleine ondernemers. Peildatum: juni 2026.",
    h1: "E-facturatie, Peppol & ViDA uitgelegd",
    primaryKeyword: "e-facturatie verplicht",
    secondaryKeywords: ["Peppol Nederland", "ViDA", "UBL factuur"],
    intent: "Ondernemer wil weten wat e-facturatie betekent en wanneer actie nodig is.",
    cta: "Doe de Peppol-ready-check",
    sections: [
      { heading: "Peildatum: juni 2026", body: ["EU ViDA stuurt richting verplichte e-facturatie en digitale rapportage voor grensoverschrijdende B2B-transacties per 1 juli 2030.", "Voor Nederland wordt binnenlandse B2B-e-facturatie via Peppol onderzocht en voorbereid. Een definitief Nederlands invoeringspad moet apart worden vastgesteld."] },
      { heading: "Wat is Peppol?", body: ["Peppol is een netwerk om elektronische facturen gestructureerd tussen systemen te versturen.", "Een pdf per e-mail is handig voor mensen, maar geen echte gestructureerde e-factuur voor systemen."] },
      { heading: "Waarom nu al opletten?", body: ["België verplicht B2B e-facturatie al sinds 1 januari 2026. Nederlandse ondernemers met Belgische klanten kunnen daardoor nu al vragen krijgen.", "Kassie gebruikt dit thema als autoriteitshub: rustig uitleggen, primaire bronnen tonen, concepten reviewen en geen paniekmarketing over nog niet definitieve Nederlandse regels."] },
      { heading: "Wat kun je zonder stress doen?", body: ["Breng in kaart hoe je nu factureert: Word/PDF, boekhoudpakket, UBL-export, Peppol-aansluiting en buitenlandse klanten.", "Wacht niet op paniekposts, maar volg de tijdlijn op kassieapp.nl en laat fiscale uitzonderingen of internationale situaties controleren door je boekhouder."] },
    ],
    faqs: [{ question: "Is e-facturatie nu al verplicht in Nederland?", answer: "Niet generiek voor alle binnenlandse B2B-facturen. Voor overheden en specifieke situaties gelden al regels; toekomstige uitbreiding wordt voorbereid." }, { question: "Is een pdf-factuur hetzelfde als e-facturatie?", answer: "Nee. Een echte e-factuur is gestructureerd, bijvoorbeeld UBL via een netwerk zoals Peppol." }],
    links: [{ label: "ViDA tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" }, { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }, { label: "Factuurgenerator", href: "/tools/factuurgenerator" }],
  },
  {
    slug: "aftrekposten-zzp",
    title: "Aftrekposten en belastingvoordeel voor ZZP'ers | Kassie",
    description: "Overzicht van veelvoorkomende aftrekposten en zakelijke kosten voor ZZP'ers, met voorzichtige uitleg en broncheck-regel.",
    h1: "Aftrekposten en belastingvoordeel voor ZZP'ers",
    primaryKeyword: "aftrekposten zzp",
    secondaryKeywords: ["zelfstandigenaftrek", "zakelijke kosten", "mkb-winstvrijstelling"],
    intent: "ZZP'er wil begrijpen welke kosten en regelingen mogelijk relevant zijn.",
    cta: "Bekijk de aftrekposten-checker",
    sections: [{ heading: "Eerst: bewijs en zakelijkheid", body: ["Een kostenpost is pas bruikbaar als hij zakelijk is en je bewijs kunt tonen.", "Bewaar bonnen direct. Kassie maakt dit praktisch door foto's en documenten aan je administratie te koppelen."] }, { heading: "Veelvoorkomende categorieën", body: ["Denk aan gereedschap, software, zakelijke kilometers, kantoorbenodigdheden, vakliteratuur en deels zakelijke abonnementen.", "Regelingen zoals zelfstandigenaftrek, startersaftrek en MKB-winstvrijstelling hebben voorwaarden die jaarlijks kunnen wijzigen."] }, { heading: "Review-safe werken", body: ["Gebruik content als oriëntatie, niet als persoonlijk fiscaal advies.", "Bij twijfel markeert Kassie claims voor boekhoudkundige review in plaats van automatisch te doen alsof alles zeker is."] }],
    faqs: [{ question: "Kan ik elke bon aftrekken?", answer: "Nee. De kosten moeten zakelijk zijn en passen bij je onderneming." }, { question: "Waar check ik actuele regels?", answer: "Controleer primaire bronnen zoals de Belastingdienst of vraag je boekhouder." }],
    links: [{ label: "Urencriterium", href: "/kennisbank/urencriterium" }, { label: "Zakelijke kosten", href: "/kennisbank/zakelijke-kosten" }, { label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }],
  },
  {
    slug: "factureren-zzp",
    title: "Factureren als ZZP'er: eisen en voorbeelden | Kassie",
    description: "Praktisch overzicht voor facturen maken als ZZP'er: verplichte gegevens, btw, nummering, voorbeelden en e-facturatie.",
    h1: "Factureren als ZZP'er: eisen en voorbeelden",
    primaryKeyword: "factuur maken zzp",
    secondaryKeywords: ["factuureisen", "zzp factuur voorbeeld", "UBL factuur"],
    intent: "Ondernemer wil snel een correcte factuur maken.",
    cta: "Maak gratis een factuur",
    sections: [{ heading: "Wat staat er op een factuur?", body: ["Denk aan jouw bedrijfsgegevens, klantgegevens, factuurdatum, uniek factuurnummer, omschrijving, bedragen, btw en totaalbedrag.", "Controleer actuele factuureisen bij de Belastingdienst voor uitzonderingen en buitenlandse situaties."] }, { heading: "Van bericht naar concept", body: ["Met Kassie kun je een opdracht in gewone taal sturen. Kassie zet een factuurconcept klaar dat jij controleert.", "Dat past bij ondernemers die wel overzicht willen, maar niet in boekhoudsoftware willen wonen."] }, { heading: "E-facturatie komt dichterbij", body: ["Factureren verschuift van pdf naar gestructureerde data zoals UBL/Peppol.", "Daarom krijgt de gratis factuurgenerator een UBL-route als onderscheidende lead magnet."] }],
    faqs: [{ question: "Mag ik facturen in Word of Excel maken?", answer: "Dat kan, zolang nummering, gegevens en administratie controleerbaar zijn. Software voorkomt sneller fouten." }, { question: "Wat is UBL?", answer: "UBL is een gestructureerd factuurformaat dat systemen kunnen lezen." }],
    links: [{ label: "Factuurgenerator", href: "/tools/factuurgenerator" }, { label: "E-facturatie uitgelegd", href: "/e-facturatie-peppol-vida" }, { label: "Factuurnummer", href: "/kennisbank/factuurnummer" }],
  },
  {
    slug: "zzp-starten-administratie",
    title: "Starten als ZZP'er: administratie vanaf dag 1 | Kassie",
    description: "Wat regel je administratief als je start als ZZP'er? KVK, facturen, btw, bonnen, zakelijke rekening en simpele weekroutine.",
    h1: "Starten als ZZP'er: administratie vanaf dag 1",
    primaryKeyword: "zzp starten administratie",
    secondaryKeywords: ["kvk inschrijven boekhouding", "starter zzp administratie"],
    intent: "Starter wil weten wat hij direct goed moet inrichten.",
    cta: "Start je administratie simpel",
    sections: [{ heading: "Regel de basis", body: ["Na je KVK-inschrijving wil je direct helder hebben hoe je facturen maakt, bonnen bewaart en btw bijhoudt.", "Wacht niet tot de eerste aangifte; begin met een simpele routine vanaf je eerste opdracht."] }, { heading: "Werk niet vanuit losse mapjes", body: ["Foto's in je galerij, pdf's in mail en bedragen in notities worden snel onoverzichtelijk.", "Kassie maakt van berichten en foto's een administratieflow met controle." ] }, { heading: "Eerste weekroutine", body: ["Vrijdagmiddag: bonnen doorsturen, openstaande facturen controleren, nieuwe opdrachten factureren en vragen verzamelen.", "Twintig minuten per week voorkomt uren herstelwerk." ] }],
    faqs: [{ question: "Heb ik meteen een boekhouder nodig?", answer: "Niet altijd, maar bij twijfel over btw, personeel, auto of internationale klanten is advies verstandig." }, { question: "Moet ik een zakelijke rekening openen?", answer: "Het is niet altijd wettelijk verplicht, maar praktisch vaak verstandig om privé en zakelijk te scheiden." }],
    links: [{ label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }, { label: "BTW-aangifte", href: "/btw-aangifte-zzp" }, { label: "Zakelijke rekening", href: "/kennisbank/zakelijke-rekening" }],
  },
];

export const professions = ["kapper", "schoonheidsspecialist", "fotograaf", "videograaf", "klusjesman", "schilder", "stukadoor", "elektricien", "loodgieter", "hovenier", "rijinstructeur", "personal-trainer", "dietist", "fysiotherapeut", "coach", "virtual-assistant", "tekstschrijver", "vertaler", "webdesigner", "developer", "marketeer", "consultant", "interim-professional", "koerier", "taxichauffeur", "kunstenaar", "muzikant", "docent", "kraamverzorgende", "zzp-zorg"].map((slug) => ({ slug, label: slug.replace(/-/g, " ").replace("dietist", "diëtist").replace("zzp zorg", "zzp'er in de zorg") }));

export const knowledgeTerms = [
  ["kor", "KOR", "De kleineondernemersregeling is een btw-regeling voor ondernemers met beperkte omzet. Check altijd de actuele voorwaarden bij de Belastingdienst."], ["urencriterium", "Urencriterium", "Het urencriterium bepaalt of je voor bepaalde ondernemersaftrekken in aanmerking kunt komen. Bewijs je uren zorgvuldig."], ["voorlopige-aanslag", "Voorlopige aanslag", "Een voorlopige aanslag spreidt verwachte inkomstenbelasting of bijdrage over het jaar."], ["zakelijke-rekening", "Zakelijke rekening", "Een aparte zakelijke rekening maakt controle, btw en overzicht eenvoudiger, ook als het niet altijd wettelijk verplicht is."], ["bewaarplicht", "Bewaarplicht", "Administratie moet meerdere jaren controleerbaar bewaard blijven. Digitale bonnen moeten leesbaar en terugvindbaar blijven."], ["kilometervergoeding", "Kilometervergoeding", "Zakelijke kilometers kunnen relevant zijn voor je administratie. Leg datum, rit, doel en afstand vast."], ["mkb-winstvrijstelling", "MKB-winstvrijstelling", "De MKB-winstvrijstelling is een fiscale regeling met voorwaarden en percentages die kunnen wijzigen."], ["btw-verleggen", "BTW verleggen", "Bij btw verleggen brengt de btw naar de afnemer. Dit vraagt correcte factuurtekst."], ["margeregeling", "Margeregeling", "De margeregeling kan gelden bij handel in gebruikte goederen. Dit is foutgevoelig en vraagt broncheck."], ["herinvesteringsreserve", "Herinvesteringsreserve", "Een herinvesteringsreserve kan spelen bij verkoop van bedrijfsmiddelen en geplande herinvestering."], ["factuurnummer", "Factuurnummer", "Factuurnummers moeten uniek en opeenvolgend zijn zodat je administratie controleerbaar blijft."], ["icp-opgave", "ICP-opgave", "De ICP-opgave hoort bij intracommunautaire prestaties binnen de EU."], ["zelfstandigenaftrek", "Zelfstandigenaftrek", "Zelfstandigenaftrek is een ondernemersaftrek met voorwaarden, waaronder vaak het urencriterium."], ["startersaftrek", "Startersaftrek", "Startersaftrek kan bovenop zelfstandigenaftrek spelen voor startende ondernemers die aan voorwaarden voldoen."], ["bijtelling", "Bijtelling", "Bijtelling speelt als je een zakelijke auto ook privé gebruikt boven de toegestane grens."], ["investeringsaftrek", "Investeringsaftrek", "Investeringsaftrek kan relevant zijn bij zakelijke investeringen boven drempels."], ["zakelijke-kosten", "Zakelijke kosten", "Zakelijke kosten zijn kosten die je maakt voor je onderneming en met bewijs kunt onderbouwen."], ["prive-opname", "Privé-opname", "Een privé-opname is geld of waarde die je uit je onderneming naar privé haalt; het is geen bedrijfskostenpost."], ["balans", "Balans", "De balans laat bezittingen, schulden en eigen vermogen op een moment zien."], ["ubl", "UBL", "UBL is een gestructureerd factuurformaat dat software kan lezen en verwerken."],
].map(([slug, title, summary]) => ({ slug, title, summary }));
export const comparisons = ["moneybird", "e-boekhouden", "snelstart", "rompslomp", "tellow"].map((slug) => ({ slug, name: slug === "e-boekhouden" ? "e-Boekhouden" : slug.charAt(0).toUpperCase() + slug.slice(1) }));
export const toolPages = [{ slug: "factuurgenerator", title: "Gratis factuurgenerator", description: "Maak een eenvoudige ZZP-factuur zonder login en download het resultaat." }, { slug: "btw-calculator", title: "BTW-calculator", description: "Bereken bedragen inclusief/exclusief btw en krijg een KOR-check op hoofdlijnen." }, { slug: "peppol-ready-check", title: "Peppol-ready-check", description: "Check of je facturatie klaar is voor e-facturatie via UBL/Peppol." }, { slug: "uurtarief-calculator", title: "Uurtarief-calculator ZZP", description: "Schat welk uurtarief past bij inkomen, kosten en reserveringen." }, { slug: "aftrekposten-checker", title: "Aftrekposten-checker", description: "Loop veelvoorkomende zakelijke kosten en fiscale aandachtspunten langs." }];
export const approvalAssets = {
  linkedin: [
    "ViDA klinkt ver weg, maar België verplicht B2B e-facturatie al sinds 2026. Nederlandse ondernemers met Belgische klanten merken dit dus nu al. Check de rustige tijdlijn: https://kassieapp.nl/e-facturatie/vida-peppol-tijdlijn",
    "E-facturatie hoeft geen paniekproject te zijn. Begin met weten welke facturen je maakt, of je UBL kunt exporteren en welke klanten Peppol gaan vragen. Praktische uitleg: https://kassieapp.nl/e-facturatie-peppol-vida",
    "Boekhouden moet niet beginnen met menus en grootboektaal. Een ondernemer wil sturen: 'maak factuur voor klus X'. Daarna controle. Klaar.",
    "Een pdf-factuur is handig voor mensen. Een echte e-factuur is data die systemen begrijpen. Dat verschil gaat de komende jaren belangrijk worden.",
    "Kassie bouwen we bewust review-safe: automatiseren wat kan, maar fiscale twijfel markeren in plaats van doen alsof software alles zeker weet.",
    "De beste boekhoudflow is niet: meer schermen. Het is: minder vergeten. Bon sturen, concept controleren, door.",
    "Als je als ZZP'er pas bij de btw-aangifte je bonnen zoekt, heb je geen administratieprobleem maar een routineprobleem.",
    "Peppol is geen spannend compliancewoord. Het is vooral de verschuiving van factuur als pdf naar factuur als bruikbare data.",
    "We bouwen Kassie voor ondernemers die wel controle willen, maar niet in een boekhoudpakket willen wonen.",
    "Kwartaalstress los je niet op met een mooier dashboard. Je lost het op door elke week kleine administratie-acties weg te werken.",
    "Concurrenten laten je vaak zelf boekhouden. Kassie begint bij wat ondernemers al doen: appen, foto's sturen en kort zeggen wat er moet gebeuren.",
    "E-facturatie gaat niet alleen over grote bedrijven. Als kleine ondernemer wil je straks niet ontdekken dat je factuurproces vijf jaar achterloopt.",
    "Boekhoudsoftware moet eerlijk zijn: automatiseren waar het kan, review vragen waar het moet. Zeker bij fiscale claims."
  ],
  newsletters: [
    "5 minuten ZZP-administratie #1 — check openstaande facturen, bewaar losse bonnen direct, en lees waarom Peppol meer is dan een pdf per mail.",
    "5 minuten ZZP-administratie #2 — maak deze week je btw-map compleet: verkoopfacturen, bonnen, creditnota's en bankmutaties bij elkaar.",
    "5 minuten ZZP-administratie #3 — factuurnummers moeten uniek en opeenvolgend zijn. Gebruik geen losse Word-bestanden zonder overzicht.",
    "5 minuten ZZP-administratie #4 — Belgische B2B e-facturatie is al verplicht. Heb je Belgische klanten? Check of je proces klaar is via https://kassieapp.nl/tools/peppol-ready-check",
    "ViDA/Peppol update — wat is vastgesteld, wat is nog verwachting en welke bron moet je volgen? Bewaar de tijdlijn: https://kassieapp.nl/e-facturatie/vida-peppol-tijdlijn"
  ],
  outreachProspects: [
    "ZZP Nederland — gastartikel over Peppol zonder paniekmarketing",
    "Higherlevel.nl kennisbank/community — praktische uitleg e-facturatie voor kleine ondernemers",
    "Boekhouders.nl/blogs — artikelvoorstel: wat klanten gaan vragen over ViDA",
    "KVK-gerelateerde startersplatforms — starter-administratie checklist",
    "Brancheverenigingen voor vakmensen — boekhouden per beroep als praktische gids"
  ],
  outreachPitch: "Voorstel gastbijdrage: 'Wat Nederlandse ZZP'ers nu al moeten weten over Peppol en e-facturatie'. Praktisch, zonder paniekmarketing, met Belgische B2B-verplichting als actuele aanleiding."
};

export const vidaPeppolAuthorityHub = {
  peildatum: "juni 2026",
  sources: [
    {
      name: "Europese Commissie — VAT in the Digital Age (ViDA)",
      url: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en",
      use: "Primaire EU-bron voor vastgesteld ViDA-beleid, mijlpalen en digitale rapportage/e-facturatie op EU-niveau.",
    },
    {
      name: "Raad van de Europese Unie — ViDA persberichten en besluitvorming",
      url: "https://www.consilium.europa.eu/",
      use: "Check of er formele Raad-besluiten, uitstel of definitieve tekstwijzigingen zijn.",
    },
    {
      name: "Rijksoverheid / Ministerie van Financiën — Kamerbrieven e-facturatie",
      url: "https://www.rijksoverheid.nl/ministeries/ministerie-van-financien/documenten/kamerstukken",
      use: "Nederlandse beleidslijn: kabinetsreactie, invoeringspad, consultaties en beslisnota's.",
    },
    {
      name: "Tweede Kamer — dossiers, brieven en commissiedebatten",
      url: "https://www.tweedekamer.nl/kamerstukken",
      use: "Parlementaire voortgang, vragen en stukken rond e-facturatie, ViDA, Peppol en btw-rapportage.",
    },
    {
      name: "Forum Standaardisatie — Peppol en e-facturatiestandaarden",
      url: "https://www.forumstandaardisatie.nl/",
      use: "Nederlandse standaardisatiecontext: verplicht/open standaarden, adoptie en overheidsgebruik.",
    },
    {
      name: "Peppol International / OpenPeppol",
      url: "https://peppol.org/",
      use: "Netwerk-, specificatie- en adoption-updates die uitleg op Kassie kunnen aanscherpen.",
    },
    {
      name: "NPa / Nederlandse Peppolautoriteit",
      url: "https://www.rijksoverheid.nl/onderwerpen/digitale-overheid/peppol",
      use: "Nederlandse Peppol-inrichting, overheidscontext en praktische aansluitinformatie.",
    },
    {
      name: "Belastingdienst — factuureisen en btw",
      url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/factuureisen",
      use: "Altijd checken voor actuele Nederlandse factuureisen; Kassie-content mag fiscale uitzonderingen niet als zekerheid presenteren.",
    },
    {
      name: "Belgische overheid / FOD Financiën — B2B e-facturatie",
      url: "https://financien.belgium.be/",
      use: "Praktische trigger voor Nederlandse ondernemers met Belgische klanten en leveranciers.",
    },
  ],
  monitorQueries: [
    "site:rijksoverheid.nl e-facturatie Peppol ViDA Nederland",
    "site:tweedekamer.nl e-facturatie Peppol ViDA OR btw digitale rapportage",
    "site:belastingdienst.nl e-facturatie factuureisen Peppol UBL",
    "site:forumstandaardisatie.nl Peppol e-facturatie standaard",
    "site:peppol.org Netherlands Peppol e-invoicing update",
    "site:taxation-customs.ec.europa.eu VAT in the Digital Age e-invoicing timeline",
    "site:financien.belgium.be B2B e-invoicing 2026 Peppol",
  ],
  triggerCriteria: [
    "Nieuwe Kamerbrief, kabinetsreactie, consultatie of wetsvoorstel over Nederlandse B2B e-facturatie.",
    "Wijziging in EU/ViDA-tijdlijn, scope, uitzonderingen of digitale rapportageverplichting.",
    "Nieuwe of gewijzigde Belastingdienst-uitleg over factuureisen, UBL/e-facturen of grensoverschrijdende btw.",
    "Peppol/OpenPeppol-specificatie of Nederlandse Peppolautoriteit-update die impact heeft op kleine ondernemers of boekhoudsoftware.",
    "Belgische B2B-e-facturatie update die relevant is voor Nederlandse ondernemers met Belgische klanten.",
    "Nieuws dat veel paniekclaims veroorzaakt; Kassie reageert alleen met broncheck, peildatum en praktische acties.",
  ],
  articleTemplate: [
    "Titel: Wat verandert er rond [ViDA/Peppol/e-facturatie] en wat betekent dit voor ZZP'ers?",
    "Peildatum + bronblok: noem datum, primaire bron-URL's en markeer wat vastgesteld is versus verwachting.",
    "Kern in 3 bullets: 1) wat is nieuw, 2) wie merkt dit nu, 3) wat hoeft vandaag nog niet.",
    "Praktische checklist: facturen/UBL/export/klanten buitenland/boekhouder-vraag.",
    "Geen paniek: leg uit dat Nederland nog eigen invoeringsbesluiten kan nemen en dat Kassie review-safe werkt.",
    "CTA: verwijs naar https://kassieapp.nl/tools/peppol-ready-check en de tijdlijn op kassieapp.nl.",
    "Reviewregel: fiscale of juridische zekerheid nooit claimen zonder broncheck door Guus/boekhouder.",
  ],
  linkedinDraftTemplate: [
    "Hook: [nieuw bronfeit] klinkt groot, maar voor de meeste ZZP'ers is de eerste stap simpel.",
    "Bron: [naam bron + datum], peildatum [datum].",
    "Duiding: wat is vastgesteld / wat is nog niet definitief voor Nederland.",
    "Praktische actie: check of je factuurproces UBL/Peppol kan en waar Belgische klanten om vragen.",
    "CTA: rustige uitleg op https://kassieapp.nl/e-facturatie/vida-peppol-tijdlijn — concept, pas posten na review.",
  ],
  newsletterDraftTemplate: [
    "Onderwerp: ViDA/Peppol update zonder paniek: dit is nu relevant",
    "Intro: in 4 zinnen wat er is veranderd en welke bron dat bevestigt.",
    "Voor wie: ZZP'ers met Belgische klanten, ondernemers die nu facturen in Word/PDF maken, boekhouders met kleine klanten.",
    "Actie deze week: bewaar facturen gestructureerd, check UBL-export, vraag boekhouder/softwareleverancier naar Peppol.",
    "Lees verder: https://kassieapp.nl/e-facturatie-peppol-vida en https://kassieapp.nl/tools/peppol-ready-check.",
    "Reviewgate: niet verzenden voordat Guus bron, toon en CTA heeft goedgekeurd.",
  ],
  timelineUpdateInstructions: [
    "Voeg alleen mijlpalen toe met primaire bron, datum en status: vastgesteld / aangekondigd / verwacht / vervallen.",
    "Werk metadata-description en peildatum bij wanneer een nieuw besluit de pagina wijzigt.",
    "Update de pillarpage-sectie in app/kassie/content.ts als de ondernemersactie verandert.",
    "Gebruik uitsluitend kassieapp.nl-links voor CTA's, sitemap en draftprompts.",
    "Laat oude verwachtingen niet staan als feit; markeer ze als ingehaald of verwijder ze met bronvermelding in de commit.",
  ],
  cronPrompt: "Monitor wekelijks ViDA, Peppol en e-facturatie bronnen voor Kassie. Gebruik alleen kassieapp.nl als publieke Kassie-host. Geef bron-URL's, triggerclassificatie, voorgestelde tijdlijnwijziging, artikelconcept, LinkedIn-concept en nieuwsbriefblok terug ter review. Niet posten, niet mailen, niet DM'en, niet publiceren en geen bestanden aanpassen zonder expliciete Guus-goedkeuring.",
};
