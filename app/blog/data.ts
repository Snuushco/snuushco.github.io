export const kassieBlogBaseUrl = "https://kassieapp.nl";

export type KassieBlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  monitorSource: string;
  category: string;
  readingTime: string;
  intro: string;
  keyTakeaways: string[];
  sections: { heading: string; body: string[] }[];
  sources: { label: string; href: string }[];
  related: { label: string; href: string }[];
};

export const kassieBlogPosts: KassieBlogPost[] = [
  {
    slug: "belgie-e-facturatie-tolerantieperiode-voorbij-2026",
    title: "België na de tolerantieperiode: e-facturatie is nu echt dagelijkse praktijk",
    description: "België meldt dat de algemene tolerantieperiode voor verplichte gestructureerde B2B e-facturatie voorbij is. Voor Nederlandse zzp’ers is dit vooral een praktisch waarschuwingssignaal, geen Nederlands fiscaal advies.",
    date: "2026-06-30",
    updated: "2026-06-30",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 30 juni 2026",
    category: "E-facturatie",
    readingTime: "3 min",
    intro: "De Belgische overheid meldt dat de algemene tolerantieperiode rond verplichte gestructureerde B2B e-facturatie voorbij is. Voor Nederlandse zzp’ers betekent dit niet dat Nederland vandaag dezelfde plicht heeft, maar het laat wel zien dat Peppol, UBL en gestructureerde facturen in de praktijk dichterbij komen. Dit artikel is een praktische signalering en geen fiscaal of juridisch advies.",
    keyTakeaways: [
      "België verplicht sinds 1 januari 2026 gestructureerde B2B e-facturen tussen Belgische btw-plichtige ondernemingen.",
      "De Belgische overheid meldt dat de algemene tolerantieperiode voorbij is; voor self-billing liep volgens de monitor nog een specifieke tolerantie tot en met 30 juni 2026.",
      "Voor Nederlandse ondernemers is dit vooral relevant bij Belgische klanten, leveranciers of softwareketens die Peppol/UBL al actiever gebruiken.",
      "Er is in deze monitor geen nieuw Nederlands besluit gevonden dat een algemene binnenlandse B2B e-facturatieplicht voor zzp’ers per direct invoert."
    ],
    sections: [
      {
        heading: "Wat is het nieuwe signaal?",
        body: [
          "Het nieuwe signaal komt uit België: de overheid communiceert dat de algemene tolerantieperiode voor verplichte gestructureerde elektronische B2B-facturen voorbij is. Daarmee verschuift het onderwerp van voorbereiding naar dagelijkse uitvoering bij Belgische btw-plichtige ondernemingen.",
          "De monitor noemt daarnaast dat voor self-billing nog een specifieke tolerantie tot en met 30 juni 2026 liep. Gebruik dit als broncheckpunt wanneer je met Belgische self-billing-afspraken te maken hebt; de precieze gevolgen hangen af van de transactie en betrokken partijen."
        ]
      },
      {
        heading: "Waarom dit voor Nederlandse zzp’ers relevant is",
        body: [
          "Nederland heeft volgens deze monitor geen nieuw algemeen binnenlands B2B-mandaat aangekondigd. Toch kan België als voorloper invloed hebben op Nederlandse ondernemers die leveren aan Belgische zakelijke klanten, werken met internationale platforms of software gebruiken die voor meerdere landen tegelijk wordt aangepast.",
          "De praktische vraag is dus niet: ‘moet iedere Nederlandse zzp’er nu verplicht e-factureren?’ De betere vraag is: ‘kan mijn administratie al gestructureerde factuurdata leveren als een klant, leverancier of softwareketen daarom vraagt?’"
        ]
      },
      {
        heading: "Koppeling met ViDA en Peppol",
        body: [
          "Tegelijk werkt de Europese Commissie verder aan ViDA. Het 2026-werkprogramma noemt stappen rond e-invoicing-standaarden, digitale rapportage en de centrale VIES-architectuur. Dat verandert niet alles morgen, maar het bevestigt wel de richting: facturen worden steeds meer gestructureerde data in plaats van alleen pdf’s.",
          "Peppol en UBL blijven daarbij belangrijke begrippen. Ook de Nederlandse Peppolautoriteit publiceerde recent nieuwe SI-UBL 2/NLCIUS- en Peppol BIS 3-validatie-informatie. Voor ondernemers zit de actie vooral bij softwarekeuze, datakwaliteit en tijdig testen."
        ]
      },
      {
        heading: "Praktische check zonder paniek",
        body: [
          "Controleer of je boekhoud- of facturatiesoftware UBL kan maken, Peppol ondersteunt of een duidelijke planning heeft. Vraag ook wat er gebeurt bij ontbrekende btw-nummers, adressen, referenties of foutieve factuurregels.",
          "Werk je met België of andere internationale klanten? Leg dan afspraken over factuurvorm, referenties en ontvangstkanaal expliciet vast. Laat fiscale twijfelgevallen altijd controleren door je boekhouder of adviseur."
        ]
      }
    ],
    sources: [
      { label: "België — verplichte gestructureerde B2B e-facturen sinds 2026", href: "https://efacture.belgium.be/nl/article/gestructureerde-elektronische-facturen-tussen-ondernemingen-verplicht-sinds-2026" },
      { label: "België — einde van de algemene tolerantieperiode", href: "https://efacture.belgium.be/nl/news/einde-van-de-algemene-tolerantieperiode-voor-e-facturering" },
      { label: "EU — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" },
      { label: "EU — ViDA implementation work programme 2026", href: "https://taxation-customs.ec.europa.eu/document/download/c6153542-8b34-4308-b7e4-9e65e55eb79d_en?filename=ViDA%20implementation-Work%20program.pdf" },
      { label: "Nederlandse Peppolautoriteit — mei-release SI-UBL 2 en Peppol BIS 3", href: "https://peppolautoriteit.nl/actueel/nieuws/2026/05/22/mei-release-van-si-ubl-2-en-peppol-bis-3-gepubliceerd" }
    ],
    related: [
      { label: "ViDA en Peppol tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" },
      { label: "E-facturatie, Peppol & ViDA uitgelegd", href: "/e-facturatie" },
      { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }
    ]
  },
  {
    slug: "peppol-ubl-validatieregels-augustus-2026",
    title: "Nieuwe Peppol/UBL-validatieregels vanaf augustus 2026",
    description: "De Nederlandse Peppolautoriteit heeft mei 2026-releases van SI-UBL 2/NLCIUS en Peppol BIS 3 gepubliceerd. Wat betekent dit voorzichtig vertaald voor zzp’ers?",
    date: "2026-06-29",
    updated: "2026-06-29",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 29 juni 2026",
    category: "E-facturatie",
    readingTime: "3 min",
    intro: "De Nederlandse Peppolautoriteit meldt dat de mei 2026-releases van SI-UBL 2/NLCIUS en Peppol BIS 3 zijn gepubliceerd en vanaf 17 augustus 2026 verplicht worden voor validatie-artefacten. Voor ondernemers is dit vooral een software- en ketensignaal: zorg dat je factuursoftware en Peppol-koppeling actueel blijven. Dit artikel is geen fiscaal of juridisch advies.",
    keyTakeaways: [
      "De Nederlandse Peppolautoriteit publiceerde nieuwe SI-UBL 2/NLCIUS- en Peppol BIS 3-validatieartefacten in mei 2026.",
      "Volgens de bron worden deze artefacten vanaf 17 augustus 2026 verplicht voor validatie binnen de betreffende standaarden.",
      "Voor zzp’ers is dit meestal geen handmatige actie, maar wel een controlepunt voor factuursoftware, boekhoudpakketten en Peppol-serviceproviders.",
      "Er is in deze monitor geen nieuw Nederlands besluit gevonden dat een algemene binnenlandse B2B e-facturatieplicht op korte termijn definitief maakt."
    ],
    sections: [
      {
        heading: "Wat is het nieuwe signaal?",
        body: [
          "Het concrete nieuwe signaal komt van de Nederlandse Peppolautoriteit: de mei 2026-releases van SI-UBL 2/NLCIUS en Peppol BIS 3 zijn gepubliceerd. In de bron staat dat deze validatie-artefacten vanaf 17 augustus 2026 verplicht worden.",
          "Validatieregels bepalen of een gestructureerde factuur technisch en inhoudelijk volgens de afgesproken standaard is opgebouwd. Dat klinkt technisch, maar ondernemers merken het vooral wanneer software facturen weigert, foutmeldingen geeft of ontbrekende gegevens vraagt."
        ]
      },
      {
        heading: "Wat betekent dit voor zzp’ers en kleine ondernemers?",
        body: [
          "Voor de meeste ondernemers betekent dit niet dat zij zelf SI-UBL- of Peppol-documentatie hoeven te lezen. De praktische vraag is: wordt je boekhoud- of facturatiesoftware tijdig bijgewerkt en kan je leverancier uitleggen hoe Peppol/UBL-validatie wordt afgehandeld?",
          "Werk je met Belgische klanten, grotere opdrachtgevers of partijen die al Peppol vragen, dan is het extra verstandig om te testen of je factuurdata compleet is: KvK- en btw-gegevens, adressen, factuurregels, btw-codes en referenties."
        ]
      },
      {
        heading: "Koppeling met ViDA en België",
        body: [
          "De EU werkt ondertussen door aan ViDA. De monitor noemt het implementatieprogramma 2026 en de bredere Europese tijdlijn voor digitale rapportage, waaronder 1 juli 2030 voor bepaalde grensoverschrijdende B2B-transacties.",
          "België is sinds 1 januari 2026 een dichtbij praktijkvoorbeeld van verplichte gestructureerde B2B e-facturatie tussen btw-plichtige ondernemingen. Dat is geen bewijs dat Nederland dezelfde route of datum kiest, maar wel een signaal dat gestructureerde facturen normaler worden."
        ]
      },
      {
        heading: "Praktische check zonder paniek",
        body: [
          "Vraag je softwareleverancier of de mei 2026 SI-UBL 2/NLCIUS- en Peppol BIS 3-updates vóór 17 augustus 2026 zijn verwerkt. Bewaar het antwoord als interne broncheck als je hierover klanten informeert.",
          "Gebruik dit moment ook om ontbrekende klantdata op te ruimen. Een Peppol-ready proces begint niet bij een pdf, maar bij correcte gestructureerde gegevens die zonder herstelwerk door validatie komen."
        ]
      }
    ],
    sources: [
      { label: "Nederlandse Peppolautoriteit — mei-release van SI-UBL 2 en Peppol BIS 3 gepubliceerd", href: "https://www.peppolautoriteit.nl/actueel/nieuws/2026/05/22/mei-release-van-si-ubl-2-en-peppol-bis-3-gepubliceerd" },
      { label: "Nederlandse Peppolautoriteit — actueel", href: "https://www.peppolautoriteit.nl/" },
      { label: "Europese Commissie — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" },
      { label: "Europese Commissie — ViDA implementation work programme 2026", href: "https://taxation-customs.ec.europa.eu/document/download/c6153542-8b34-4308-b7e4-9e65e55eb79d_en?filename=ViDA%20implementation-Work%20program.pdf" },
      { label: "België — e-facturatie startpagina", href: "https://efactuur.belgium.be/nl" },
      { label: "België — gestructureerde elektronische facturen tussen ondernemingen verplicht sinds 2026", href: "https://efactuur.belgium.be/nl/article/gestructureerde-elektronische-facturen-tussen-ondernemingen-verplicht-sinds-2026" }
    ],
    related: [
      { label: "ViDA en Peppol tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" },
      { label: "E-facturatie, Peppol & ViDA uitgelegd", href: "/e-facturatie-peppol-vida" },
      { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }
    ]
  },
  {
    slug: "vida-implementatie-werkprogramma-2026-e-facturatie",
    title: "EU ViDA-werkprogramma 2026: e-facturatie blijft in beweging",
    description: "De Europese Commissie heeft een ViDA-implementatieprogramma voor 2026 gepubliceerd. Wat betekent dat voorzichtig vertaald voor zzp’ers en kleine ondernemers?",
    date: "2026-06-26",
    updated: "2026-06-26",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 26 juni 2026",
    category: "E-facturatie",
    readingTime: "3 min",
    intro: "De Europese Commissie heeft een werkprogramma voor de implementatie van ViDA in 2026 gepubliceerd. Voor Nederlandse zzp’ers verandert dit niet direct de dagelijkse factuurpraktijk, maar het bevestigt wel dat de EU verder werkt aan digitale btw-rapportage, e-facturatie en technische standaarden. Dit artikel is review-safe: geen fiscaal of juridisch advies, wel bronnen en praktische voorbereiding.",
    keyTakeaways: [
      "De Commissie werkt in 2026 aan verdere technische en uitvoerende stappen voor ViDA, waaronder digital reporting en e-invoicing-standaarden.",
      "Voor grensoverschrijdende B2B-transacties noemt de EU 1 juli 2030 als belangrijk moment voor digitale rapportageverplichtingen.",
      "Er is in deze monitor geen nieuw Nederlands besluit gevonden dat direct een algemene binnenlandse B2B e-facturatieplicht voor zzp’ers bevestigt.",
      "België is sinds 1 januari 2026 een dichtbij voorbeeld van verplichte gestructureerde B2B e-facturatie; de exacte impact voor Nederlandse ondernemers met Belgische relaties vraagt broncheck per situatie."
    ],
    sections: [
      {
        heading: "Wat is het nieuwe signaal?",
        body: [
          "Het nieuwe signaal is het ViDA-implementatie werkprogramma voor 2026 van de Europese Commissie. Daarin beschrijft de Commissie werkzaamheden voor de verdere uitwerking van VAT in the Digital Age, waaronder digitale rapportage, elektronische facturatie en onderdelen van de centrale VIES-architectuur.",
          "Voor ondernemers is vooral de richting relevant: facturen en btw-rapportages worden steeds meer gestructureerde data. Dat betekent niet dat iedere Nederlandse zzp’er vandaag al een nieuwe verplichting heeft, maar wel dat voorbereiding op UBL, Peppol en nette klantdata verstandig blijft."
        ]
      },
      {
        heading: "Wat verandert er nu concreet voor Nederlandse zzp’ers?",
        body: [
          "Op basis van de vandaag gecontroleerde bronnen is er geen nieuw Nederlands besluit gevonden dat direct een algemene verplichting voor alle binnenlandse B2B-facturen oplegt. Nationale regels en praktische ingangsdata moeten uit Nederlandse wetgeving, Kamerstukken of officiële uitvoeringsinformatie blijken.",
          "De EU-informatie noemt wel de bredere ViDA-route en onder meer 1 juli 2030 als moment voor digitale rapportageverplichtingen rond bepaalde grensoverschrijdende B2B-transacties. Zie dit daarom als koerssignaal, niet als persoonlijk fiscaal advies."
        ]
      },
      {
        heading: "Waarom België belangrijk blijft om te volgen",
        body: [
          "België verplicht sinds 1 januari 2026 gestructureerde elektronische facturen voor B2B-transacties tussen btw-plichtige ondernemingen. Dat maakt België een concreet voorbeeld dicht bij Nederland.",
          "Voor Nederlandse ondernemers met Belgische klanten of leveranciers kan dit relevant zijn, maar de exacte gevolgen hangen af van de transactie, btw-status en contractafspraken. Markeer dit intern als broncheck nodig wanneer je hierover klantadvies of commerciële claims maakt."
        ]
      },
      {
        heading: "Praktische voorbereiding zonder paniek",
        body: [
          "Zet de basis op orde: volledige klantgegevens, btw-nummers waar nodig, gestructureerde factuurregels, duidelijke btw-keuzes en een proces dat ontbrekende gegevens terugvraagt in plaats van stilzwijgend te gokken.",
          "Controleer daarnaast of je facturatietool UBL kan exporteren en of Peppol-verzending of -ontvangst op de roadmap staat. Dat is nuttig, ook als de Nederlandse verplichting nog niet definitief is uitgewerkt."
        ]
      }
    ],
    sources: [
      { label: "Europese Commissie — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" },
      { label: "Europese Commissie — ViDA implementation Work programme for 2026", href: "https://taxation-customs.ec.europa.eu/document/download/c6153542-8b34-4308-b7e4-9e65e55eb79d_en?filename=ViDA%20implementation-Work%20program.pdf" },
      { label: "Belgische e-invoicing overheidssite", href: "https://einvoice.belgium.be/en" },
      { label: "FPS Finance België — e-invoicing", href: "https://finance.belgium.be/en/enterprises/vat/e-invoicing" }
    ],
    related: [
      { label: "ViDA en Peppol tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" },
      { label: "E-facturatie, Peppol & ViDA uitgelegd", href: "/e-facturatie-peppol-vida" },
      { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }
    ]
  },
  {
    slug: "vida-peppol-nederland-stand-van-zaken-juni-2026",
    title: "ViDA en Peppol in Nederland: stand van zaken voor zzp’ers",
    description: "Wat de recente ViDA-monitoring betekent voor Nederlandse zzp’ers en kleine ondernemers: EU-tijdlijn, Nederlands onderzoek, Peppol en wat je nu praktisch kunt voorbereiden.",
    date: "2026-06-24",
    updated: "2026-06-24",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 24 juni 2026",
    category: "E-facturatie",
    readingTime: "4 min",
    intro: "De dagelijkse Kassie-monitor vond vandaag geen nieuw officieel Nederlands besluit over verplichte binnenlandse B2B e-facturatie. Wel bevestigen de gecontroleerde bronnen dat ViDA, digitale rapportage en Peppol steeds relevanter worden. Voor zzp’ers is dit dus geen paniekmoment, maar wel een goed moment om facturatie alvast gestructureerd in te richten.",
    keyTakeaways: [
      "Er is nog geen generieke Nederlandse verplichting voor alle binnenlandse B2B-facturen gemeld in de gecontroleerde bronnen van 24 juni 2026.",
      "EU ViDA loopt gefaseerd door richting digitale rapportage en e-facturatie; voor grensoverschrijdende B2B-transacties wordt 1 juli 2030 als belangrijk moment genoemd.",
      "Nederland onderzoekt de nationale implementatie. In de EY-samenvatting wordt Peppol genoemd als logische infrastructuurkandidaat, maar definitieve Nederlandse beleidskeuzes moeten nog blijken.",
      "Praktische voorbereiding: zorg dat klantgegevens, factuurregels, btw-codes en UBL/Peppol-ondersteuning op orde komen."
    ],
    sections: [
      {
        heading: "Wat is vandaag nieuw?",
        body: [
          "Kort antwoord: geen nieuw officieel besluit dat direct om wijziging van de Kassie-tijdlijn vraagt. De monitor bevestigt vooral de bestaande richting: e-facturatie en digitale btw-rapportage worden belangrijker, maar Nederland moet de nationale uitwerking nog verder concretiseren.",
          "Dat onderscheid is belangrijk. Een ondernemer hoeft vandaag niet te doen alsof elke Nederlandse B2B-factuur morgen via Peppol moet, maar kan wel voorkomen dat facturatie straks uit losse pdf’s, onvolledige klantdata en handmatige correcties bestaat."
        ]
      },
      {
        heading: "Wat betekent ViDA voor Nederlandse ondernemers?",
        body: [
          "ViDA staat voor VAT in the Digital Age: Europese modernisering van btw-regels, e-facturatie en digitale rapportage. De EU-informatie noemt 1 juli 2030 als belangrijk moment voor digitale rapportage bij bepaalde grensoverschrijdende B2B-transacties.",
          "Voor Nederlandse zzp’ers is vooral relevant dat de richting duidelijk is: facturen worden steeds meer gestructureerde data in plaats van alleen pdf’s. Nationale verplichtingen voor binnenlandse transacties hangen af van Nederlandse wetgeving en beleidskeuzes."
        ]
      },
      {
        heading: "Waarom komt Peppol steeds terug?",
        body: [
          "Peppol is een netwerk en afsprakenstelsel voor gestructureerde uitwisseling van e-facturen en andere zakelijke documenten. In de monitor is Peppol relevant omdat het in de EY-samenvatting wordt genoemd als aanbevolen of logische infrastructuurkandidaat voor Nederlandse e-facturatie en rapportage.",
          "Dat betekent niet automatisch dat elke ondernemer vandaag verplicht op Peppol moet zitten. Het betekent wel dat software en administratie die UBL/Peppol-ready zijn waarschijnlijk minder herstelwerk nodig hebben wanneer regels of klantvragen veranderen."
        ]
      },
      {
        heading: "Wat kun je nu al praktisch voorbereiden?",
        body: [
          "Begin bij de basis: volledige klantgegevens, correcte btw-nummers waar nodig, vaste factuurregels, duidelijke omschrijvingen, unieke factuurnummers en een systeem dat bedragen en btw niet alleen als tekst in een pdf bewaart.",
          "Gebruik daarnaast een review-safe proces: laat software concepten maken, maar markeer ontbrekende gegevens en twijfelgevallen zichtbaar. Zeker bij internationale klanten of afwijkende btw-afspraken blijft menselijke controle nodig."
        ]
      }
    ],
    sources: [
      { label: "Europese Commissie — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" },
      { label: "Rijksoverheid — rapport ViDA e-facturatie en digitale rapportage", href: "https://www.rijksoverheid.nl/documenten/2026/01/26/rapport-e-facturatie-en-rapportage" },
      { label: "Rijksoverheid — aanbiedingsbrief rapport ViDA", href: "https://www.rijksoverheid.nl/documenten/2026/03/10/aanbiedingsbrief-rapport-vida-efacturatie-en-digitale-rapportage" },
      { label: "EY Tax News — samenvatting rapport/Kamerbrief", href: "https://taxnews.ey.com/news/2026-0624-dutch-parliament-receives-government-solicited-ey-prepared-report-on-vat-in-the-digital-age-vida-e-invoicing-and-digital-reporting" }
    ],
    related: [
      { label: "ViDA en Peppol tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" },
      { label: "E-facturatie, Peppol & ViDA uitgelegd", href: "/e-facturatie-peppol-vida" },
      { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }
    ]
  },
  {
    slug: "belgische-b2b-e-facturatie-2026-nederlandse-zzpers",
    title: "Belgische B2B e-facturatie vanaf 2026: wat Nederlandse zzp’ers moeten weten",
    description: "België verplicht gestructureerde B2B e-facturatie vanaf 1 januari 2026. Dit is relevant voor Nederlandse ondernemers met Belgische zakelijke klanten of leveranciers.",
    date: "2026-06-24",
    updated: "2026-06-24",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 24 juni 2026",
    category: "E-facturatie",
    readingTime: "3 min",
    intro: "De monitor bevestigt opnieuw dat België vanaf 1 januari 2026 gestructureerde elektronische facturatie verplicht voor quasi alle B2B-handelingen tussen Belgische btw-plichtige ondernemingen. Voor Nederlandse zzp’ers is vooral de praktische vraag belangrijk: wanneer krijg je hiermee te maken en hoe voorkom je gedoe bij Belgische klanten?",
    keyTakeaways: [
      "De Belgische verplichting geldt volgens de Belgische overheidsinformatie vanaf 1 januari 2026 voor quasi alle B2B-handelingen tussen Belgische btw-plichtige ondernemingen.",
      "Nederlandse ondernemers kunnen indirect druk ervaren wanneer Belgische klanten of partners gestructureerde facturen vragen.",
      "Een pdf is niet hetzelfde als een gestructureerde e-factuur; UBL/Peppol-ready facturatie voorkomt later herstelwerk.",
      "Controleer grensgevallen met je boekhouder, zeker bij btw, vestigingsplaats en internationale factuurafspraken."
    ],
    sections: [
      {
        heading: "Waarom is België relevant voor Nederlandse zzp’ers?",
        body: [
          "Ook als Nederland nog geen generieke binnenlandse B2B-verplichting heeft, kunnen Nederlandse ondernemers met Belgische relaties eerder vragen krijgen over gestructureerde e-facturen. Klanten willen hun eigen administratie compliant en efficiënt houden.",
          "Dat speelt vooral wanneer je structureel aan Belgische zakelijke klanten levert, met Belgische leveranciers werkt of administratief onderdeel bent van een keten waarin e-facturatie standaard wordt."
        ]
      },
      {
        heading: "PDF versus echte e-factuur",
        body: [
          "Een pdf-factuur is leesbaar voor mensen. Een gestructureerde e-factuur bevat de factuurdata — zoals bedragen, btw, klantgegevens en regels — in een formaat dat systemen kunnen verwerken.",
          "Daarom is ‘ik stuur toch al pdf’s per mail’ niet hetzelfde als e-facturatie-ready zijn. De kern is dat je factuurgegevens als nette data beschikbaar zijn."
        ]
      },
      {
        heading: "Wat zet je nu klaar?",
        body: [
          "Controleer of je facturatietool UBL of Peppol ondersteunt of kan exporteren. Leg klantgegevens zorgvuldig vast, inclusief btw-nummers waar relevant. Houd factuuromschrijvingen, bedragen en btw-codes gestructureerd bij.",
          "Werk review-safe: wanneer btw-regels, landcodes of klantgegevens ontbreken, moet je proces dat als vraag tonen in plaats van stilzwijgend een verkeerde factuur te maken."
        ]
      }
    ],
    sources: [
      { label: "Belgische overheid — vanaf wanneer e-facturering verplicht", href: "https://einvoice.belgium.be/nl/article/vanaf-wanneer-e-facturering-verplicht" },
      { label: "Europese Commissie — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" }
    ],
    related: [
      { label: "Factureren als zzp’er", href: "/factureren-zzp" },
      { label: "E-facturatie, Peppol & ViDA uitgelegd", href: "/e-facturatie-peppol-vida" },
      { label: "Factuurgenerator", href: "/tools/factuurgenerator" }
    ]
  },
  {
    slug: "peppol-ready-worden-zonder-paniek-checklist",
    title: "Peppol-ready worden zonder paniek: checklist voor kleine ondernemers",
    description: "Een praktische checklist om facturen, klantdata en reviewmomenten klaar te zetten voor UBL/Peppol en toekomstige e-facturatie-eisen.",
    date: "2026-06-24",
    updated: "2026-06-24",
    monitorSource: "Kassie marketing monitor Peppol/ViDA — 24 juni 2026",
    category: "Checklist",
    readingTime: "4 min",
    intro: "De monitor laat zien dat er vandaag geen nieuw Nederlands besluit is, maar de richting blijft duidelijk: facturatie wordt meer data-gedreven. Deze checklist vertaalt Peppol/ViDA-nieuws naar praktische administratie-acties voor ondernemers die niet willen wachten tot de verplichting definitief is.",
    keyTakeaways: [
      "Maak factuurdata gestructureerd: klant, btw, regels, bedragen, factuurnummer en betaalstatus.",
      "Controleer of je software UBL kan maken en Peppol ondersteunt of op termijn kan koppelen.",
      "Bewaar niet alleen de factuur, maar ook context: afspraak, opdracht, levering en btw-keuze.",
      "Laat fiscale of internationale twijfelgevallen bewust reviewen; automatiseer ze niet blind."
    ],
    sections: [
      {
        heading: "Stap 1 — Zet klantdata netjes neer",
        body: [
          "E-facturatie valt of staat met goede stamgegevens. Zorg dat klantnaam, adres, land, btw-nummer waar nodig, contactgegevens en betaalafspraken niet verspreid staan over mails, notities en oude facturen.",
          "Voor ondernemers die veel via WhatsApp werken, is dit precies waar een simpele intake handig is: stuur de klantgegevens één keer door en laat software ontbrekende velden terugvragen."
        ]
      },
      {
        heading: "Stap 2 — Maak factuurregels data in plaats van losse tekst",
        body: [
          "Een factuurregel moet meer zijn dan een zinnetje in een pdf. Denk aan omschrijving, aantal, eenheid, bedrag, btw-tarief en eventueel project of opdracht. Dan kun je later makkelijker UBL of Peppol ondersteunen.",
          "Dit helpt ook vóórdat er een verplichting is: je boekhouder kan sneller controleren en btw-aangifte wordt minder zoekwerk."
        ]
      },
      {
        heading: "Stap 3 — Bewaar bewijs en beslissingen",
        body: [
          "Leg vast waarom een factuur is gemaakt, welke afspraak eraan voorafging en welke btw-keuze is gebruikt. Bij twijfel over verlegde btw, buitenlandse klanten of vrijstellingen hoort een reviewmoment.",
          "Kassie’s uitgangspunt blijft: concepten automatisch klaarzetten, maar onzekere fiscale claims niet als zekerheid verkopen."
        ]
      },
      {
        heading: "Stap 4 — Test je software op UBL/Peppol",
        body: [
          "Vraag niet alleen ‘kan ik facturen mailen?’, maar: kan ik UBL exporteren, kan ik via Peppol verzenden of ontvangen, en wat gebeurt er als klantgegevens ontbreken?",
          "Als je software dit nog niet volledig ondersteunt, kun je alsnog voorbereiden door data netjes vast te leggen en periodiek te controleren waar de gaten zitten."
        ]
      }
    ],
    sources: [
      { label: "Europese Commissie — VAT in the Digital Age", href: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en" },
      { label: "Peppol", href: "https://peppol.org" },
      { label: "Belgische overheid — verplichte B2B e-facturatie", href: "https://einvoice.belgium.be/nl/article/vanaf-wanneer-e-facturering-verplicht" }
    ],
    related: [
      { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" },
      { label: "UBL uitgelegd", href: "/kennisbank/ubl" },
      { label: "BTW-aangifte doen als zzp’er", href: "/btw-aangifte-zzp" }
    ]
  }
];

export function getKassieBlogPost(slug: string) {
  return kassieBlogPosts.find((post) => post.slug === slug);
}
