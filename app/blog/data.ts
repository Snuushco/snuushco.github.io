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
