export const kassieBaseUrl = "https://kassieapp.nl";
export const appBaseUrl = "https://mijn.kassieapp.nl";

export type SourceLink = { label: string; href: string };

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  cta: string;
  reviewNote: string;
  sources: SourceLink[];
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  links: { label: string; href: string }[];
};

type ProfessionProfile = {
  slug: string;
  label: string;
  examples: string[];
  costs: string[];
  btw: string;
  routine: string[];
};

export type KnowledgeTerm = {
  slug: string;
  title: string;
  summary: string;
  practicalUse: string;
  commonMistake: string;
  sources: SourceLink[];
};

const belastingdienst = "https://www.belastingdienst.nl/wps/wcm/connect/nl/ondernemers/ondernemers";
const kvk = "https://www.kvk.nl/starten/";
const rijksoverheidEFacturatie = "https://www.rijksoverheid.nl/onderwerpen/digitalisering/e-factureren";
const euVida = "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en";
const peppol = "https://peppol.org/";

const fiscalReviewNote =
  "Peildatum: juni 2026. Deze pagina is bedoeld als praktische oriëntatie voor ondernemers. Controleer bedragen, voorwaarden en uitzonderingen altijd bij de Belastingdienst, KVK, Rijksoverheid of je boekhouder voordat je fiscale keuzes maakt.";

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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "Belastingdienst: administratie bijhouden", href: `${belastingdienst}/administratie-bijhouden` },
      { label: "KVK: administratie voor ondernemers", href: `${kvk}administratie/` },
    ],
    sections: [
      {
        heading: "Wat moet je als ZZP'er bijhouden?",
        body: [
          "Je administratie bestaat uit verkoopfacturen, inkoopfacturen, bonnen, bankmutaties, btw-overzichten en bewijsstukken voor zakelijke kosten.",
          "De Belastingdienst verwacht vooral dat je administratie controleerbaar is. Dat betekent: documenten zijn leesbaar, terugvindbaar en logisch gekoppeld aan je zakelijke activiteiten.",
          "Kassie helpt door losse berichten, foto's en opdrachten om te zetten naar overzichtelijke administratie-acties. Jij ziet wat er klaarstaat en houdt de laatste controle.",
        ],
      },
      {
        heading: "De simpele weekroutine",
        body: [
          "Plan één vast moment per week: bonnen doorsturen, nieuwe facturen maken, betaalstatus controleren en vragen markeren voor later.",
          "Wacht je tot het einde van het kwartaal, dan moet je vaak reconstrueren waarom een betaling, rit of aankoop zakelijk was. Dat kost meer tijd en vergroot de kans op fouten.",
          "Een goede routine is klein: vijf tot twintig minuten, maar wel elke week. Kassie is daarop ingericht: korte acties, duidelijke concepten en geen boekhoudjargon als dat niet nodig is.",
        ],
      },
      {
        heading: "Wanneer schakel je een boekhouder in?",
        body: [
          "Bij simpele verkoopfacturen en standaard bonnen kun je veel zelf voorbereiden. Bij auto van de zaak, internationale klanten, personeel, investeringen of twijfel over btw is meekijken verstandig.",
          "Kassie is review-safe: automatiseren waar het kan, maar fiscale twijfel zichtbaar maken in plaats van doen alsof software alles zeker weet.",
        ],
      },
      {
        heading: "Hoe Kassie helpt",
        body: [
          "Je hoeft niet eerst grootboektaal te leren. Je stuurt een berichtje of foto; Kassie zet klant, bedrag, btw en omschrijving klaar waar dat kan.",
          "Daarna controleer je het concept. Zo blijft je administratie praktisch voor jou én bruikbaar voor je boekhouder.",
        ],
      },
    ],
    faqs: [
      { question: "Moet ik als ZZP'er boekhoudsoftware gebruiken?", answer: "Nee, maar je moet wel een controleerbare administratie hebben. Software maakt dat meestal veiliger en sneller." },
      { question: "Hoe vaak moet ik mijn administratie bijwerken?", answer: "Wekelijks is praktisch. Btw-aangifte en jaarwerk worden veel makkelijker als bonnen en facturen niet blijven liggen." },
      { question: "Vervangt Kassie mijn boekhouder?", answer: "Nee. Kassie helpt met verzamelen, voorbereiden en controleren. Fiscale twijfelgevallen blijven geschikt voor een boekhouder of adviseur." },
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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "Belastingdienst: btw-aangifte doen", href: `${belastingdienst}/btw-aangifte-doen-en-betalen` },
      { label: "Belastingdienst: kleineondernemersregeling", href: `${belastingdienst}/kleineondernemersregeling` },
    ],
    sections: [
      {
        heading: "Wat geef je door bij btw-aangifte?",
        body: [
          "Bij btw-aangifte geef je aan hoeveel btw je aan klanten hebt gerekend en hoeveel btw je zelf zakelijk hebt betaald.",
          "Het verschil betaal je of krijg je terug. De precieze rubrieken hangen af van je situatie, bijvoorbeeld binnenland, EU, buiten EU, verlegd of vrijgesteld.",
          "Gebruik deze pagina als uitleg op hoofdlijnen en controleer je eigen aangiftetijdvak in het ondernemersportaal of bij je boekhouder.",
        ],
      },
      {
        heading: "Wat heb je nodig per periode?",
        body: [
          "Verkoopfacturen, inkoopfacturen, bonnen, creditnota's, bankmutaties en correcties over de periode horen bij elkaar.",
          "Kassie houdt concepten en bewijsstukken bij elkaar zodat de kwartaalcontrole minder zoekwerk wordt.",
          "Werk je met buitenlandse klanten of leveranciers, noteer dan extra zorgvuldig wat de prestatie was, waar de klant zit en welke btw-regel je toepast.",
        ],
      },
      {
        heading: "Veelgemaakte fouten",
        body: [
          "Privébonnen meenemen, buitenlandse facturen verkeerd behandelen, creditnota's vergeten, de KOR verkeerd inschatten of pas beginnen vlak voor de deadline.",
          "Bij twijfel hoort een boekhouder of fiscalist mee te kijken; Kassie positioneert zich als review-safe administratiehulp, niet als magische belastingadviseur.",
        ],
      },
      {
        heading: "Kwartaalstress voorkomen",
        body: [
          "Maak elke week je btw-map compleet. Daardoor zie je eerder of een bon ontbreekt, een klant nog niet betaalde of een factuur moet worden gecorrigeerd.",
          "Kassie zet die kleine acties klaar, zodat aangifte vooral controleren wordt in plaats van zoeken.",
        ],
      },
    ],
    faqs: [
      { question: "Wanneer moet ik btw-aangifte doen?", answer: "Veel ondernemers doen per kwartaal aangifte. Controleer je eigen tijdvak en deadlines in het portaal van de Belastingdienst." },
      { question: "Is de KOR voor mij interessant?", answer: "Dat hangt af van je omzet, klanten en aftrekbare btw. Gebruik de Belastingdienst-informatie als startpunt en laat twijfelgevallen beoordelen." },
      { question: "Kan Kassie mijn btw-aangifte automatisch indienen?", answer: "Kassie helpt met voorbereiden en controleren. Indienen en fiscale keuzes moeten passen bij jouw situatie en blijven reviewbaar." },
    ],
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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "EU: VAT in the Digital Age", href: euVida },
      { label: "Rijksoverheid: e-factureren", href: rijksoverheidEFacturatie },
      { label: "Peppol: official network information", href: peppol },
    ],
    sections: [
      {
        heading: "Peildatum: juni 2026",
        body: [
          "EU ViDA stuurt richting verplichte e-facturatie en digitale rapportage voor grensoverschrijdende B2B-transacties per 1 juli 2030.",
          "Voor Nederland wordt binnenlandse B2B-e-facturatie via Peppol onderzocht en voorbereid. Een definitief Nederlands invoeringspad moet apart worden vastgesteld.",
          "Daarom gebruikt Kassie voor dit onderwerp altijd bronverwijzingen en peildatumtaal. Geen paniekmarketing, wel tijdig voorbereiden.",
        ],
      },
      {
        heading: "Wat is Peppol?",
        body: [
          "Peppol is een netwerk om elektronische facturen gestructureerd tussen systemen te versturen.",
          "Een pdf per e-mail is handig voor mensen, maar geen echte gestructureerde e-factuur voor systemen. Een UBL-factuur bevat factuurdata die boekhoudsystemen kunnen lezen.",
        ],
      },
      {
        heading: "Waarom nu al opletten?",
        body: [
          "Belgische B2B e-facturatie is sinds 2026 een praktisch aandachtspunt voor ondernemers die met Belgische klanten of leveranciers werken.",
          "Nederlandse ondernemers kunnen daardoor al vragen krijgen over Peppol, UBL of e-factuuradressen voordat er een brede Nederlandse binnenlandse verplichting is.",
        ],
      },
      {
        heading: "Wat kun je nu doen zonder dure migratie?",
        body: [
          "Zorg dat je klantgegevens, btw-nummers, factuurnummers, btw-regels en artikelomschrijvingen netjes vastlegt. Slechte data maakt e-facturatie later lastig.",
          "Gebruik een Peppol-ready-check om te zien waar je proces nog op pdf, losse mail of handwerk leunt.",
        ],
      },
    ],
    faqs: [
      { question: "Is e-facturatie nu al verplicht in Nederland?", answer: "Niet generiek voor alle binnenlandse B2B-facturen. Voor overheden en specifieke situaties gelden al regels; toekomstige uitbreiding wordt voorbereid." },
      { question: "Is een pdf-factuur hetzelfde als e-facturatie?", answer: "Nee. Een echte e-factuur is gestructureerd, bijvoorbeeld UBL via een netwerk zoals Peppol." },
      { question: "Moet ik als kleine ondernemer nu al overstappen?", answer: "Niet blind. Begin met goede factuurdata en controleer wanneer jouw klanten of branche om e-facturen vragen." },
    ],
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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "Belastingdienst: zakelijke kosten", href: `${belastingdienst}/zakelijke-kosten` },
      { label: "Belastingdienst: ondernemersaftrek", href: `${belastingdienst}/ondernemersaftrek` },
    ],
    sections: [
      {
        heading: "Eerst: bewijs en zakelijkheid",
        body: [
          "Een kostenpost is pas bruikbaar als hij zakelijk is en je bewijs kunt tonen. Bewaar datum, leverancier, bedrag, btw en waarom de uitgave bij je onderneming hoort.",
          "Kassie maakt dit praktisch door foto's en documenten aan je administratie te koppelen, zodat je later niet hoeft te raden waar een bon voor was.",
        ],
      },
      {
        heading: "Veelvoorkomende categorieën",
        body: [
          "Denk aan gereedschap, software, zakelijke kilometers, kantoorbenodigdheden, vakliteratuur, werkkleding met duidelijke functie en deels zakelijke abonnementen.",
          "Niet elke uitgave is volledig aftrekbaar. Gemengde kosten, privégebruik en drempels vragen extra controle.",
        ],
      },
      {
        heading: "Regelingen zijn geen automatisme",
        body: [
          "Zelfstandigenaftrek, startersaftrek en MKB-winstvrijstelling hebben voorwaarden die jaarlijks kunnen wijzigen.",
          "Daarom noemt Kassie zulke regelingen voorzichtig en met broncheck, in plaats van bedragen of rechten te beloven zonder jouw context.",
        ],
      },
      {
        heading: "Review-safe werken",
        body: [
          "Gebruik content als oriëntatie, niet als persoonlijk fiscaal advies.",
          "Bij twijfel markeert Kassie claims voor boekhoudkundige review in plaats van automatisch te doen alsof alles zeker is.",
        ],
      },
    ],
    faqs: [
      { question: "Kan ik elke bon aftrekken?", answer: "Nee. De kosten moeten zakelijk zijn, passen bij je onderneming en voldoende onderbouwd zijn." },
      { question: "Waar check ik actuele regels?", answer: "Controleer primaire bronnen zoals de Belastingdienst of vraag je boekhouder." },
      { question: "Waarom geeft Kassie geen vaste aftrekbedragen op deze pagina?", answer: "Omdat voorwaarden en bedragen kunnen wijzigen en jouw situatie uitmaakt. Kassie houdt het review-safe en verwijst naar primaire bronnen." },
    ],
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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "Belastingdienst: factuureisen", href: `${belastingdienst}/facturen-maken` },
      { label: "Rijksoverheid: e-factureren", href: rijksoverheidEFacturatie },
    ],
    sections: [
      {
        heading: "Wat staat er op een factuur?",
        body: [
          "Denk aan jouw bedrijfsgegevens, klantgegevens, factuurdatum, uniek factuurnummer, omschrijving, bedragen, btw en totaalbedrag.",
          "Controleer actuele factuureisen bij de Belastingdienst voor uitzonderingen, vrijstellingen, verlegde btw en buitenlandse situaties.",
        ],
      },
      {
        heading: "Maak de omschrijving controleerbaar",
        body: [
          "Een factuurregel zoals 'werkzaamheden' is vaak te vaag. Schrijf liever wat je leverde, over welke periode en voor welk project.",
          "Dat helpt je klant, je eigen administratie en een eventuele controle achteraf.",
        ],
      },
      {
        heading: "Van bericht naar concept",
        body: [
          "Met Kassie kun je een opdracht in gewone taal sturen. Kassie zet een factuurconcept klaar dat jij controleert.",
          "Dat past bij ondernemers die wel overzicht willen, maar niet in boekhoudsoftware willen wonen.",
        ],
      },
      {
        heading: "E-facturatie komt dichterbij",
        body: [
          "Factureren verschuift van pdf naar gestructureerde data zoals UBL/Peppol.",
          "Daarom krijgt de gratis factuurgenerator een UBL-route als onderscheidende lead magnet, zonder te doen alsof elke ondernemer vandaag al verplicht is overgestapt.",
        ],
      },
    ],
    faqs: [
      { question: "Mag ik facturen in Word of Excel maken?", answer: "Dat kan, zolang nummering, gegevens en administratie controleerbaar zijn. Software voorkomt sneller fouten." },
      { question: "Wat is UBL?", answer: "UBL is een gestructureerd factuurformaat dat systemen kunnen lezen." },
      { question: "Moet elk factuurnummer opeenvolgend zijn?", answer: "Je factuurnummers moeten uniek zijn en een logisch controleerbaar systeem volgen. Voorkom losse reeksen zonder uitleg." },
    ],
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
    reviewNote: fiscalReviewNote,
    sources: [
      { label: "KVK: starten als ondernemer", href: kvk },
      { label: "Belastingdienst: starten met ondernemen", href: `${belastingdienst}/starten-met-ondernemen` },
    ],
    sections: [
      {
        heading: "Regel de basis",
        body: [
          "Na je KVK-inschrijving wil je direct helder hebben hoe je facturen maakt, bonnen bewaart en btw bijhoudt.",
          "Wacht niet tot de eerste aangifte; begin met een simpele routine vanaf je eerste opdracht.",
          "Leg vanaf dag één vast welke rekening, map, app en bestandsnaam je gebruikt. Simpel is beter dan perfect maar onuitvoerbaar.",
        ],
      },
      {
        heading: "Werk niet vanuit losse mapjes",
        body: [
          "Foto's in je galerij, pdf's in mail en bedragen in notities worden snel onoverzichtelijk.",
          "Kassie maakt van berichten en foto's een administratieflow met controle. Zo kan je boekhouder later zien waar een bedrag vandaan komt.",
        ],
      },
      {
        heading: "Eerste weekroutine",
        body: [
          "Vrijdagmiddag: bonnen doorsturen, openstaande facturen controleren, nieuwe opdrachten factureren en vragen verzamelen.",
          "Twintig minuten per week voorkomt uren herstelwerk. Zeker als je net start, is routine belangrijker dan een ingewikkeld systeem.",
        ],
      },
      {
        heading: "Start review-safe",
        body: [
          "Heb je auto, voorraad, buitenlandse klanten, personeel of hoge investeringen? Markeer dat direct als aandachtspunt.",
          "Kassie helpt je zulke punten zichtbaar te maken, maar de fiscale keuze zelf moet passen bij actuele regels en jouw situatie.",
        ],
      },
    ],
    faqs: [
      { question: "Heb ik meteen een boekhouder nodig?", answer: "Niet altijd, maar bij twijfel over btw, personeel, auto of internationale klanten is advies verstandig." },
      { question: "Moet ik een zakelijke rekening openen?", answer: "Het is niet altijd wettelijk verplicht, maar praktisch vaak verstandig om privé en zakelijk te scheiden." },
      { question: "Wanneer begin ik met bonnen bewaren?", answer: "Vanaf je eerste zakelijke voorbereiding. Ook startkosten kunnen relevant zijn, maar laat twijfelgevallen beoordelen." },
    ],
    links: [{ label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }, { label: "BTW-aangifte", href: "/btw-aangifte-zzp" }, { label: "Zakelijke rekening", href: "/kennisbank/zakelijke-rekening" }],
  },
];

const detailedProfessionProfiles: ProfessionProfile[] = [
  {
    slug: "kapper",
    label: "kapper",
    examples: ["knipbeurten op locatie", "kleurbehandelingen", "verkoop van haarproducten"],
    costs: ["scharen en tondeuses", "verf en verzorgingsproducten", "stoelhuur of salonruimte", "handdoeken en werkkleding"],
    btw: "Kappersdiensten vallen meestal in het lage btw-tarief, terwijl productverkoop anders kan uitpakken. Controleer tarief en combinaties bij je boekhouder.",
    routine: ["Zet contante en pinbetalingen dezelfde dag in je overzicht.", "Fotografeer inkoopbonnen van producten direct.", "Splits dienstomzet en productverkoop zodat btw-controle eenvoudiger blijft."],
  },
  {
    slug: "schoonheidsspecialist",
    label: "schoonheidsspecialist",
    examples: ["gezichtsbehandelingen", "productenverkoop", "cadeaubonnen"],
    costs: ["cosmetica en verbruiksproducten", "apparatuur", "behandelruimte", "hygiëneartikelen"],
    btw: "Behandelingen en productverkoop kunnen verschillend worden verwerkt. Cadeaubonnen en vooruitbetalingen vragen extra aandacht.",
    routine: ["Koppel elke behandeling aan betaling en klantafspraak.", "Bewaar productinkoop per leverancier.", "Controleer wekelijks openstaande cadeaubonnen of vooruitbetalingen."],
  },
  {
    slug: "fotograaf",
    label: "fotograaf",
    examples: ["bruiloftsshoot", "zakelijke portretten", "licentie voor beeldgebruik"],
    costs: ["camera en lenzen", "bewerkingssoftware", "reiskosten", "studiohuur", "online galerij"],
    btw: "Let op verschil tussen dienst, licentie, printverkoop en klanten buiten Nederland. Internationaal werk kan btw-technisch afwijken.",
    routine: ["Maak per opdracht een map met offerte, factuur, reiskosten en licentieafspraak.", "Factureer aanbetalingen en restbetaling herkenbaar.", "Bewaar grote apparatuur als investering met aankoopbewijs."],
  },
  {
    slug: "videograaf",
    label: "videograaf",
    examples: ["eventvideo", "social clips", "montage-abonnement"],
    costs: ["camera's en audio", "montagesoftware", "muzieklicenties", "opslag", "huur van licht"],
    btw: "Diensten, licenties en doorbelaste kosten moeten duidelijk op de factuur staan. Buitenlandse opdrachtgevers vragen extra btw-check.",
    routine: ["Leg per project draaidagen, montage-uren en licenties vast.", "Koppel huurapparatuur aan het juiste project.", "Controleer maandelijks abonnementen voor software en cloudopslag."],
  },
  {
    slug: "klusjesman",
    label: "klusjesman",
    examples: ["kleine reparaties", "montage", "onderhoud op locatie"],
    costs: ["gereedschap", "materiaal", "buskosten", "werkkleding", "parkeerkosten"],
    btw: "Arbeid, materiaal en werkzaamheden aan woningen kunnen verschillende aandachtspunten hebben. Gebruik geen btw-aanname zonder broncheck.",
    routine: ["Bewaar materiaalbonnen per klus.", "Noteer kilometers en parkeerkosten meteen.", "Factureer arbeid en materiaal duidelijk gescheiden als dat helpt voor controle."],
  },
  {
    slug: "schilder",
    label: "schilder",
    examples: ["binnenschilderwerk", "buitenschilderwerk", "materiaal doorbelasten"],
    costs: ["verf", "kwasten en rollers", "steigerhuur", "schuurmateriaal", "bescherming"],
    btw: "Voor schilderwerk aan woningen kunnen specifieke btw-regels gelden. Leeftijd van woning en type werk zijn relevant; controleer dit altijd actueel.",
    routine: ["Maak per project een materialenlijst met bonnen.", "Noteer start- en einddatum van het werk.", "Bewaar foto's of opdrachtbevestiging bij grotere klussen."],
  },
  {
    slug: "stukadoor",
    label: "stukadoor",
    examples: ["wanden stucen", "plafondwerk", "reparatiewerk"],
    costs: ["gips en profielen", "gereedschap", "steiger of lift", "transport", "afvalkosten"],
    btw: "Net als bij ander woningwerk kunnen tariefdetails afhangen van soort werk en object. Laat twijfelgevallen controleren.",
    routine: ["Koppel materiaalinkoop aan de juiste klantopdracht.", "Bewaar foto's van meerwerk en akkoord.", "Factureer meerwerk apart herkenbaar."],
  },
  {
    slug: "elektricien",
    label: "elektricien",
    examples: ["groepenkast vervangen", "storingen", "laadpaalvoorbereiding"],
    costs: ["kabels en schakelmateriaal", "meetapparatuur", "certificering", "bus en kilometers", "veiligheidsmiddelen"],
    btw: "Bij installatiewerk zijn materiaal, arbeid, veiligheidseisen en eventuele onderaanneming belangrijk. Btw-verlegging kan in ketensituaties spelen.",
    routine: ["Bewaar meetrapporten of opleverdocumenten bij de factuur.", "Splits materiaal en arbeid in je projectnotities.", "Markeer onderaanneming of zakelijke klanten voor btw-verleggingscheck."],
  },
  {
    slug: "loodgieter",
    label: "loodgieter",
    examples: ["lekkage oplossen", "sanitair plaatsen", "cv-onderhoud"],
    costs: ["leidingen en koppelingen", "gereedschap", "voorrijkosten", "spoedritten", "onderdelen"],
    btw: "Spoedwerk, onderhoud, materiaal en onderaanneming moeten controleerbaar op facturen staan. Pas verleggingsregels alleen toe na check.",
    routine: ["Registreer spoedritten en voorrijkosten meteen.", "Bewaar onderdeelbonnen per werkbon.", "Controleer elke week welke klussen nog niet gefactureerd zijn."],
  },
  {
    slug: "hovenier",
    label: "hovenier",
    examples: ["tuinaanleg", "onderhoudsabonnement", "beplanting leveren"],
    costs: ["planten en materialen", "machines", "brandstof", "aanhanger", "afvalverwerking"],
    btw: "Dienstverlening, levering van planten/materialen en abonnementen kunnen anders worden geadministreerd. Zorg dat opdracht en factuur duidelijk zijn.",
    routine: ["Koppel planten- en materiaalbonnen aan de tuinopdracht.", "Noteer machinehuur en brandstof per periode.", "Factureer onderhoudsabonnementen op vaste momenten."],
  },
];

const fallbackProfessionSlugs = ["rijinstructeur", "personal-trainer", "dietist", "fysiotherapeut", "coach", "virtual-assistant", "tekstschrijver", "vertaler", "webdesigner", "developer", "marketeer", "consultant", "interim-professional", "koerier", "taxichauffeur", "kunstenaar", "muzikant", "docent", "kraamverzorgende", "zzp-zorg"];

const formatProfessionLabel = (slug: string) => slug.replace(/-/g, " ").replace("dietist", "diëtist").replace("zzp zorg", "zzp'er in de zorg");

export const professions: ProfessionProfile[] = [
  ...detailedProfessionProfiles,
  ...fallbackProfessionSlugs.map((slug) => ({
    slug,
    label: formatProfessionLabel(slug),
    examples: ["opdrachten op locatie", "terugkerende klantafspraken", "losse materiaalkosten of abonnementen"],
    costs: ["software", "kilometers", "materiaal", "opleiding", "apparatuur"],
    btw: "Controleer btw-tarief, vrijstellingen en buitenlandse klanten altijd voor jouw beroep en situatie.",
    routine: ["Bewaar bonnen direct.", "Factureer afgerond werk wekelijks.", "Markeer fiscale twijfel voor je boekhouder."],
  })),
];

const defaultKnowledgeSources: SourceLink[] = [{ label: "Belastingdienst voor ondernemers", href: belastingdienst }];

export const knowledgeTerms: KnowledgeTerm[] = [
  { slug: "kor", title: "KOR", summary: "De kleineondernemersregeling is een btw-regeling voor ondernemers met beperkte omzet. Check altijd de actuele voorwaarden bij de Belastingdienst.", practicalUse: "Nuttig als je weinig omzet hebt en weinig btw op kosten terugvraagt, maar het kan onhandig zijn bij zakelijke klanten of investeringen.", commonMistake: "Alleen naar omzet kijken en niet naar aftrekbare btw, klanttype of toekomstige groei.", sources: [{ label: "Belastingdienst: kleineondernemersregeling", href: `${belastingdienst}/kleineondernemersregeling` }] },
  { slug: "urencriterium", title: "Urencriterium", summary: "Het urencriterium bepaalt of je voor bepaalde ondernemersaftrekken in aanmerking kunt komen. Bewijs je uren zorgvuldig.", practicalUse: "Houd niet alleen declarabele uren bij, maar ook acquisitie, administratie en voorbereiding als ze zakelijk zijn.", commonMistake: "Achteraf uren reconstrueren zonder agenda, opdrachtbewijs of notities.", sources: [{ label: "Belastingdienst: urencriterium", href: `${belastingdienst}/urencriterium` }] },
  { slug: "voorlopige-aanslag", title: "Voorlopige aanslag", summary: "Een voorlopige aanslag spreidt verwachte inkomstenbelasting of bijdrage over het jaar.", practicalUse: "Handig om belastingdruk niet pas na afloop van het jaar te voelen.", commonMistake: "De voorlopige aanslag niet aanpassen als omzet of winst sterk verandert.", sources: defaultKnowledgeSources },
  { slug: "zakelijke-rekening", title: "Zakelijke rekening", summary: "Een aparte zakelijke rekening maakt controle, btw en overzicht eenvoudiger, ook als het niet altijd wettelijk verplicht is.", practicalUse: "Gebruik hem voor klantbetalingen, zakelijke kosten en reserveringen.", commonMistake: "Privé en zakelijk door elkaar laten lopen en later bankregels handmatig moeten uitleggen.", sources: [{ label: "KVK: zakelijke rekening", href: "https://www.kvk.nl/geldzaken/zakelijke-rekening-openen/" }] },
  { slug: "bewaarplicht", title: "Bewaarplicht", summary: "Administratie moet meerdere jaren controleerbaar bewaard blijven. Digitale bonnen moeten leesbaar en terugvindbaar blijven.", practicalUse: "Bewaar facturen, bonnen, bankgegevens, contracten en relevante correspondentie op een vaste plek.", commonMistake: "Alleen een foto bewaren zonder context, datum of koppeling aan de zakelijke uitgave.", sources: [{ label: "Belastingdienst: administratie bewaren", href: `${belastingdienst}/administratie-bijhouden/administratie-bewaren` }] },
  { slug: "kilometervergoeding", title: "Kilometervergoeding", summary: "Zakelijke kilometers kunnen relevant zijn voor je administratie. Leg datum, rit, doel en afstand vast.", practicalUse: "Een rittenoverzicht maakt zakelijke reiskosten beter controleerbaar.", commonMistake: "Alleen tankbonnen bewaren terwijl ritdoel en afstand ontbreken.", sources: defaultKnowledgeSources },
  { slug: "mkb-winstvrijstelling", title: "MKB-winstvrijstelling", summary: "De MKB-winstvrijstelling is een fiscale regeling met voorwaarden en percentages die kunnen wijzigen.", practicalUse: "Neem deze mee in je inkomstenbelastingplanning, maar controleer actuele percentages.", commonMistake: "Denken dat je zelf een vaste aftrekpost kunt invullen zonder actuele regels te checken.", sources: defaultKnowledgeSources },
  { slug: "btw-verleggen", title: "BTW verleggen", summary: "Bij btw verleggen breng jij geen btw in rekening, maar wordt de btw door de afnemer aangegeven. Dit vraagt correcte factuurtekst.", practicalUse: "Komt voor in specifieke branches, bij onderaanneming of internationale situaties.", commonMistake: "Btw verleggen zonder te controleren of de regeling echt geldt.", sources: defaultKnowledgeSources },
  { slug: "margeregeling", title: "Margeregeling", summary: "De margeregeling kan gelden bij handel in gebruikte goederen. Dit is foutgevoelig en vraagt broncheck.", practicalUse: "Relevant voor ondernemers die gebruikte goederen inkopen en doorverkopen.", commonMistake: "Gewone btw-regels toepassen op margegoederen of andersom.", sources: defaultKnowledgeSources },
  { slug: "herinvesteringsreserve", title: "Herinvesteringsreserve", summary: "Een herinvesteringsreserve kan spelen bij verkoop van bedrijfsmiddelen en geplande herinvestering.", practicalUse: "Bespreek dit bij grotere verkoop van bedrijfsmiddelen ruim voor de jaarafsluiting.", commonMistake: "Achteraf pas bedenken dat je wilde herinvesteren zonder onderbouwing.", sources: defaultKnowledgeSources },
  { slug: "factuurnummer", title: "Factuurnummer", summary: "Factuurnummers moeten uniek zijn en een logisch controleerbaar systeem volgen.", practicalUse: "Gebruik één vaste reeks per administratiejaar of een duidelijk gedocumenteerd systeem.", commonMistake: "Losse Word- of Excel-facturen maken waardoor nummers ontbreken of dubbel voorkomen.", sources: [{ label: "Belastingdienst: facturen maken", href: `${belastingdienst}/facturen-maken` }] },
  { slug: "icp-opgave", title: "ICP-opgave", summary: "De ICP-opgave hoort bij intracommunautaire prestaties binnen de EU.", practicalUse: "Relevant als je goederen of diensten levert aan ondernemers in andere EU-landen.", commonMistake: "EU-klanten factureren zonder btw-nummer, prestatie en aangifteplicht goed te controleren.", sources: defaultKnowledgeSources },
  { slug: "zelfstandigenaftrek", title: "Zelfstandigenaftrek", summary: "Zelfstandigenaftrek is een ondernemersaftrek met voorwaarden, waaronder vaak het urencriterium.", practicalUse: "Neem dit mee in je winstplanning, maar check ieder jaar de actuele voorwaarden.", commonMistake: "De aftrek alvast rekenen zonder urenadministratie of ondernemersstatus te onderbouwen.", sources: defaultKnowledgeSources },
  { slug: "startersaftrek", title: "Startersaftrek", summary: "Startersaftrek kan onder voorwaarden bovenop zelfstandigenaftrek spelen voor startende ondernemers.", practicalUse: "Relevant in je eerste ondernemersjaren, maar niet automatisch voor iedere starter.", commonMistake: "Aannemen dat inschrijving bij KVK genoeg is voor alle startersregelingen.", sources: defaultKnowledgeSources },
  { slug: "zakelijke-kosten", title: "Zakelijke kosten", summary: "Zakelijke kosten zijn uitgaven die je voor je onderneming maakt en kunt onderbouwen.", practicalUse: "Bewaar bon, factuur, betaalbewijs en zakelijke reden bij elkaar.", commonMistake: "Privé-uitgaven zakelijk boeken omdat ze toevallig tijdens werk zijn gemaakt.", sources: [{ label: "Belastingdienst: zakelijke kosten", href: `${belastingdienst}/zakelijke-kosten` }] },
  { slug: "btw-tarief", title: "BTW-tarief", summary: "Het btw-tarief hangt af van je product, dienst en situatie. Controleer uitzonderingen altijd bij de bron.", practicalUse: "Leg per product of dienst vast welk tarief je gebruikt en waarom.", commonMistake: "Een tarief kopiëren van een collega zonder te checken of jouw dienst hetzelfde is.", sources: defaultKnowledgeSources },
  { slug: "factuurdatum", title: "Factuurdatum", summary: "De factuurdatum bepaalt mede in welke periode omzet en btw worden meegenomen.", practicalUse: "Factureer afgerond werk op tijd en voorkom losse concepten zonder datum.", commonMistake: "Facturen achteraf dateren zonder aansluiting op opdracht of levering.", sources: [{ label: "Belastingdienst: facturen maken", href: `${belastingdienst}/facturen-maken` }] },
  { slug: "creditnota", title: "Creditnota", summary: "Een creditnota corrigeert een eerdere factuur en moet logisch gekoppeld zijn aan het origineel.", practicalUse: "Gebruik dit bij retouren, korting achteraf of foutieve facturen.", commonMistake: "Een factuur verwijderen in plaats van zichtbaar corrigeren.", sources: defaultKnowledgeSources },
  { slug: "debiteuren", title: "Debiteuren", summary: "Debiteuren zijn klanten die jouw factuur nog moeten betalen.", practicalUse: "Controleer wekelijks openstaande bedragen en stuur vriendelijke herinneringen op tijd.", commonMistake: "Omzet tellen maar niet bewaken of het geld ook binnenkomt.", sources: defaultKnowledgeSources },
  { slug: "crediteuren", title: "Crediteuren", summary: "Crediteuren zijn leveranciers die jij nog moet betalen.", practicalUse: "Houd vervaldatums en betaalbewijzen bij zodat kosten en btw controleerbaar blijven.", commonMistake: "Een bon boeken maar later niet meer weten of die betaald is.", sources: defaultKnowledgeSources },
  { slug: "ubl", title: "UBL", summary: "UBL is een gestructureerd factuurformaat dat boekhoudsystemen kunnen lezen.", practicalUse: "Handig als klanten e-facturen vragen of wanneer je richting Peppol wilt werken.", commonMistake: "Denken dat een pdf automatisch een e-factuur is.", sources: [{ label: "Rijksoverheid: e-factureren", href: rijksoverheidEFacturatie }] },
  { slug: "peppol", title: "Peppol", summary: "Peppol is een netwerk voor het uitwisselen van gestructureerde elektronische documenten, zoals e-facturen.", practicalUse: "Relevant als klanten of overheden facturen via een e-factuurnetwerk willen ontvangen.", commonMistake: "Peppol zien als alleen een pdf-kanaal in plaats van gestructureerde data.", sources: [{ label: "Peppol", href: peppol }, { label: "Rijksoverheid: e-factureren", href: rijksoverheidEFacturatie }] },
  { slug: "vida", title: "ViDA", summary: "ViDA staat voor VAT in the Digital Age: Europese btw-modernisering met onder meer e-facturatie en digitale rapportage.", practicalUse: "Volg dit als je B2B of internationaal factureert, maar gebruik altijd actuele brondata.", commonMistake: "Doen alsof alle Nederlandse ondernemers vandaag al dezelfde verplichting hebben.", sources: [{ label: "EU: VAT in the Digital Age", href: euVida }] },
  { slug: "kleine-investering", title: "Kleine investering", summary: "Investeringen en gewone kosten worden fiscaal niet altijd hetzelfde behandeld.", practicalUse: "Bewaar aanschafbewijs, ingebruikname en zakelijk gebruik bij grotere aankopen.", commonMistake: "Dure apparatuur direct als gewone kosten behandelen zonder afschrijvingscheck.", sources: defaultKnowledgeSources },
  { slug: "afschrijving", title: "Afschrijving", summary: "Afschrijving verdeelt de kosten van een bedrijfsmiddel over meerdere jaren.", practicalUse: "Relevant bij laptops, machines, camera's, bus of andere duurzame bedrijfsmiddelen.", commonMistake: "Alle grote aankopen in één keer boeken zonder te controleren of afschrijven nodig is.", sources: defaultKnowledgeSources },
  { slug: "btw-nummer", title: "BTW-nummer", summary: "Je btw-nummer gebruik je voor btw-aangifte en communicatie met de Belastingdienst; op facturen gebruik je het juiste identificatienummer volgens actuele regels.", practicalUse: "Controleer welk nummer op je factuur hoort en bewaar klant-btw-nummers bij EU-leveringen.", commonMistake: "Een verkeerd nummer op facturen zetten of EU-btw-nummers niet controleren.", sources: defaultKnowledgeSources },
  { slug: "kvk-nummer", title: "KVK-nummer", summary: "Je KVK-nummer identificeert je onderneming in het Handelsregister.", practicalUse: "Zet het waar nodig op facturen, offertes en zakelijke communicatie.", commonMistake: "Wel starten met factureren maar bedrijfsgegevens niet consistent gebruiken.", sources: [{ label: "KVK: Handelsregister", href: "https://www.kvk.nl/inschrijven-en-wijzigen/" }] },
  { slug: "offerte", title: "Offerte", summary: "Een offerte legt prijs, scope, voorwaarden en geldigheid van je aanbod vast.", practicalUse: "Maak duidelijk wat wel en niet inbegrepen is, zeker bij meerwerk.", commonMistake: "Mondelinge afspraken niet vastleggen en later discussie krijgen over factuurregels.", sources: [{ label: "KVK: offertes", href: "https://www.kvk.nl/geldzaken/offerte-maken/" }] },
  { slug: "aanbetaling", title: "Aanbetaling", summary: "Een aanbetaling is een deelbetaling vooraf en moet goed gekoppeld zijn aan opdracht en factuur.", practicalUse: "Gebruik dit bij grotere projecten of maatwerk, met duidelijke voorwaarden.", commonMistake: "Aanbetalingen ontvangen zonder factuur- of btw-controle.", sources: defaultKnowledgeSources },
  { slug: "privegebruik", title: "Privégebruik", summary: "Privégebruik betekent dat een zakelijke aankoop of voorziening ook privé wordt gebruikt.", practicalUse: "Leg verhouding en onderbouwing vast als kosten gemengd zijn.", commonMistake: "Gemengde kosten volledig zakelijk boeken zonder uitleg.", sources: defaultKnowledgeSources },
  { slug: "btw-vrijgesteld", title: "BTW-vrijgesteld", summary: "Sommige prestaties zijn vrijgesteld van btw, maar dat heeft gevolgen voor facturatie en aftrek.", practicalUse: "Relevant in onder meer zorg, onderwijs en bepaalde culturele activiteiten; check jouw situatie.", commonMistake: "Vrijstelling en KOR door elkaar halen.", sources: defaultKnowledgeSources },
  { slug: "omzetbelasting", title: "Omzetbelasting", summary: "Omzetbelasting is de formele naam voor btw die ondernemers berekenen en aangeven.", practicalUse: "Gebruik het als kapstok voor verkoop-btw, voorbelasting en aangifteperioden.", commonMistake: "Btw als eigen omzet zien in plaats van af te dragen belasting.", sources: defaultKnowledgeSources },
  { slug: "voorbelasting", title: "Voorbelasting", summary: "Voorbelasting is btw die je op zakelijke kosten betaalt en mogelijk mag aftrekken.", practicalUse: "Bewaar inkoopfacturen met juiste gegevens om aftrek te onderbouwen.", commonMistake: "Btw terugvragen op kosten die niet zakelijk zijn of waarvoor geen correcte factuur is.", sources: defaultKnowledgeSources },
  { slug: "inkoopfactuur", title: "Inkoopfactuur", summary: "Een inkoopfactuur is een factuur van een leverancier voor jouw zakelijke kosten of inkopen.", practicalUse: "Koppel hem aan betaling, project en btw-periode.", commonMistake: "Alleen een bankbetaling bewaren zonder factuur of bon.", sources: defaultKnowledgeSources },
  { slug: "verkoopfactuur", title: "Verkoopfactuur", summary: "Een verkoopfactuur is de factuur die jij aan je klant stuurt voor geleverde diensten of producten.", practicalUse: "Gebruik duidelijke regels, juiste gegevens en een logisch factuurnummer.", commonMistake: "Te laat factureren en daardoor omzet, btw en cashflow uit het oog verliezen.", sources: [{ label: "Belastingdienst: facturen maken", href: `${belastingdienst}/facturen-maken` }] },
  { slug: "bankkoppeling", title: "Bankkoppeling", summary: "Een bankkoppeling helpt betalingen automatisch aan facturen en kosten te matchen.", practicalUse: "Handig om openstaande posten en betaalde kosten sneller te controleren.", commonMistake: "Automatische matches blind vertrouwen zonder uitzonderingen te bekijken.", sources: defaultKnowledgeSources },
  { slug: "kasboek", title: "Kasboek", summary: "Een kasboek houdt contante inkomsten en uitgaven bij.", practicalUse: "Nuttig als je contant geld ontvangt of betaalt, bijvoorbeeld op locatie of in een salon.", commonMistake: "Contante betalingen later uit geheugen proberen te reconstrueren.", sources: defaultKnowledgeSources },
  { slug: "jaarrekening", title: "Jaarrekening", summary: "Een jaarrekening of jaaroverzicht vat de financiële positie en resultaten van je onderneming samen.", practicalUse: "Voor veel ZZP'ers is vooral een goede winstberekening en aangiftevoorbereiding belangrijk.", commonMistake: "Jaarwerk zien als los project in plaats van resultaat van je wekelijkse administratie.", sources: defaultKnowledgeSources },
  { slug: "inkomstenbelasting", title: "Inkomstenbelasting", summary: "Inkomstenbelasting betaal je over je belastbare inkomen, waaronder winst uit onderneming als je ondernemer bent.", practicalUse: "Reserveer gedurende het jaar geld en voorkom verrassingen na de aangifte.", commonMistake: "Alle ontvangen omzet als vrij besteedbaar zien.", sources: defaultKnowledgeSources },
  { slug: "reserveren-belasting", title: "Belasting reserveren", summary: "Belasting reserveren betekent dat je geld apart zet voor btw, inkomstenbelasting en eventuele bijdragen.", practicalUse: "Gebruik aparte potjes of rekeningregels zodat je niet wordt verrast door deadlines.", commonMistake: "Pas reserveren nadat de aanslag of btw-deadline binnenkomt.", sources: defaultKnowledgeSources },
].map((term) => ({ ...term, sources: term.sources.length ? term.sources : defaultKnowledgeSources }));

export const comparisons = ["moneybird", "e-boekhouden", "snelstart", "rompslomp", "tellow"].map((slug) => ({ slug, name: slug === "e-boekhouden" ? "e-Boekhouden" : slug.charAt(0).toUpperCase() + slug.slice(1) }));
export const toolPages = [{ slug: "factuurgenerator", title: "Gratis factuurgenerator", description: "Maak een eenvoudige ZZP-factuur zonder login en download het resultaat." }, { slug: "btw-calculator", title: "BTW-calculator", description: "Bereken bedragen inclusief/exclusief btw en krijg een KOR-check op hoofdlijnen." }, { slug: "peppol-ready-check", title: "Peppol-ready-check", description: "Check of je facturatie klaar is voor e-facturatie via UBL/Peppol." }, { slug: "uurtarief-calculator", title: "Uurtarief-calculator ZZP", description: "Schat welk uurtarief past bij inkomen, kosten en reserveringen." }, { slug: "aftrekposten-checker", title: "Aftrekposten-checker", description: "Loop veelvoorkomende zakelijke kosten en fiscale aandachtspunten langs." }];

export const approvalAssets = {
  linkedin: [
    "ViDA klinkt ver weg, maar Belgische B2B e-facturatie is al praktisch relevant. Nederlandse ondernemers met Belgische klanten kunnen dit dus nu al merken.",
    "Boekhouden moet niet beginnen met menu's en grootboektaal. Een ondernemer wil sturen: 'maak factuur voor klus X'. Daarna controle. Klaar.",
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
    "5 minuten ZZP-administratie #3 — factuurnummers moeten uniek en logisch controleerbaar zijn. Gebruik geen losse Word-bestanden zonder overzicht.",
    "5 minuten ZZP-administratie #4 — Belgische B2B e-facturatie is praktisch relevant. Heb je Belgische klanten? Check of je proces klaar is."
  ],
  outreachProspects: [
    "ZZP Nederland — gastartikel over Peppol zonder paniekmarketing",
    "Higherlevel.nl kennisbank/community — praktische uitleg e-facturatie voor kleine ondernemers",
    "Boekhouders.nl/blogs — artikelvoorstel: wat klanten gaan vragen over ViDA",
    "KVK-gerelateerde startersplatforms — starter-administratie checklist",
    "Brancheverenigingen voor vakmensen — boekhouden per beroep als praktische gids"
  ],
  outreachPitch: "Voorstel gastbijdrage: 'Wat Nederlandse ZZP'ers nu al moeten weten over Peppol en e-facturatie'. Praktisch, zonder paniekmarketing, met actuele EU- en Rijksoverheid-bronnen."
};

function ensureUnique(label: string, slugs: string[]) {
  const seen = new Set<string>();
  const duplicates = slugs.filter((slug) => (seen.has(slug) ? true : (seen.add(slug), false)));
  if (duplicates.length) throw new Error(`Duplicate ${label} slugs: ${duplicates.join(", ")}`);
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validateMarketingContent() {
  ensureUnique("pillar", pillarPages.map((page) => page.slug));
  ensureUnique("profession", professions.map((item) => item.slug));
  ensureUnique("knowledge", knowledgeTerms.map((item) => item.slug));

  const thinPillars = pillarPages.filter((page) => page.sections.length < 4 || wordCount(page.sections.flatMap((section) => section.body).join(" ")) < 120 || page.sources.length < 1 || !page.reviewNote.includes("Peildatum"));
  if (thinPillars.length) throw new Error(`Thin or unsourced pillar pages: ${thinPillars.map((page) => page.slug).join(", ")}`);

  const thinProfessions = professions.slice(0, 10).filter((item) => item.examples.length < 3 || item.costs.length < 4 || item.routine.length < 3 || wordCount(`${item.btw} ${item.examples.join(" ")} ${item.costs.join(" ")} ${item.routine.join(" ")}`) < 35);
  if (thinProfessions.length) throw new Error(`First 10 profession pages need unique examples/costs/btw/routine: ${thinProfessions.map((item) => item.slug).join(", ")}`);

  if (knowledgeTerms.length < 40) throw new Error(`Knowledgebase target is at least 40 terms; found ${knowledgeTerms.length}`);
  const unsourcedKnowledge = knowledgeTerms.filter((term) => term.sources.length < 1 || !term.practicalUse || !term.commonMistake);
  if (unsourcedKnowledge.length) throw new Error(`Knowledge terms need source/practicalUse/commonMistake: ${unsourcedKnowledge.map((term) => term.slug).join(", ")}`);
}

validateMarketingContent();
