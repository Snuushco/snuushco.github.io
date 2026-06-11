export type VentureSlug = "volbloei" | "powerpoot" | "pijlpost";

type VenturePalette = {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  card: string;
};

type VentureProduct = {
  eyebrow: string;
  title: string;
  description: string;
  includes: string[];
};

type VenturePackage = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  highlights: string[];
};

type VentureStep = {
  title: string;
  text: string;
};

export type VenturePage = {
  slug: VentureSlug;
  brand: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  usps: string[];
  waitlistTitle: string;
  waitlistText: string;
  buttonText: string;
  microcopy: string;
  palette: VenturePalette;
  fontClass: string;
  note: string;
  product: VentureProduct;
  packages: VenturePackage[];
  steps: VentureStep[];
  proofTitle: string;
  proofPoints: string[];
  intentQuestion: string;
};

export const venturePages: Record<VentureSlug, VenturePage> = {
  volbloei: {
    slug: "volbloei",
    brand: "Volbloei",
    metaTitle: "Volbloei — Voor de vrouw in volle bloei | Binnenkort",
    metaDescription:
      "Eerlijke ondersteuning voor vrouwen in en na de overgang. Zonder taboes, zonder poespas. Schrijf je in en ontvang als eerste toegang.",
    headline: "Je bent niet over de top. Je staat erop.",
    subheadline:
      "Volbloei is er voor vrouwen die middenin het leven staan — en voor alles wat deze fase met zich meebrengt. Eerlijke producten, heldere informatie, discreet thuisbezorgd. Binnenkort beschikbaar.",
    usps: [
      "Samengesteld voor deze levensfase, zonder omwegen of vaagheden.",
      "Heldere informatie van vrouw tot vrouw, geen medisch doolhof.",
      "Discreet en automatisch thuisbezorgd, precies wanneer jij het nodig hebt.",
    ],
    waitlistTitle: "Wees er als eerste bij.",
    waitlistText:
      "Laat je e-mailadres achter en ontvang voorrang bij de lancering, plus onze gids met eerlijke antwoorden op de vragen die niemand hardop stelt.",
    buttonText: "Houd mij op de hoogte",
    microcopy: "Jouw gegevens blijven van jou. Geen spam, uitschrijven kan altijd.",
    palette: {
      background: "#FAF6F0",
      foreground: "#3D2B3D",
      accent: "#C96F4A",
      secondary: "#8A9B7E",
      card: "rgba(255,255,255,0.68)",
    },
    fontClass: "font-serif",
    note: "Concept-testpagina zonder productclaims; bedoeld voor review voordat er een echte waitlist of domein aan wordt gekoppeld.",
    product: {
      eyebrow: "Concept starterbox",
      title: "Een rustige maandbox voor overgang, slaap en dagelijks comfort.",
      description:
        "De testversie draait om een kleine, discrete startbox met niet-medische comfortproducten en een heldere gids. Geen wonderclaims, wel herkenning, rust en gemak.",
      includes: ["Comfortselectie", "Kleine gids", "Discreet verpakt", "Maandelijks opzegbaar"],
    },
    packages: [
      {
        name: "Kennismaken",
        price: "€19",
        cadence: "eenmalige startbox",
        description: "Laagdrempelige testbox met gids en kleine comfortselectie.",
        highlights: ["Eerst proberen", "Geen abonnement", "Reviewprijs conceptfase"],
      },
      {
        name: "Maandritme",
        price: "€29",
        cadence: "per maand",
        description: "Voor wie structureel gemak en rustige herhaling wil.",
        highlights: ["Discreet thuis", "Pauzeren kan", "Voor vroege testers"],
      },
    ],
    steps: [
      { title: "Kies je ritme", text: "Eenmalig proberen of maandelijks gemak." },
      { title: "Ontvang discreet", text: "Geen schreeuwerige verpakking of medisch gedoe." },
      { title: "Geef feedback", text: "De eerste testers bepalen welke box echt waardevol is." },
    ],
    proofTitle: "Waarom dit testbaar is",
    proofPoints: ["Duidelijke doelgroep", "Klein startassortiment", "Lage voorraad nodig", "Claimarm en review-safe"],
    intentQuestion: "Zou jij een discrete Volbloei-startbox willen proberen?",
  },
  powerpoot: {
    slug: "powerpoot",
    brand: "PowerPoot",
    metaTitle: "PowerPoot — Sportvoeding voor honden | Binnenkort",
    metaDescription:
      "Sportvoeding voor de atleet aan de lijn. Functionele snacks en supplementen voor actieve honden. Schrijf je in en train mee vanaf dag één.",
    headline: "Jouw hond is een atleet. Voed hem zo.",
    subheadline:
      "PowerPoot maakt sportvoeding voor honden die rennen, springen, zwemmen en nooit genoeg krijgen. Functionele snacks en supplementen, ontwikkeld voor actieve honden. Binnenkort verkrijgbaar.",
    usps: [
      "Ontwikkeld voor actieve honden — van dagelijkse renners tot agility-toppers.",
      "Functionele ingrediënten, zorgvuldig samengesteld.",
      "Elke maand vers thuisbezorgd.",
    ],
    waitlistTitle: "Sta vooraan bij de start.",
    waitlistText:
      "Schrijf je in en ontvang als eerste bericht bij de lancering — plus een exclusieve lanceringskorting voor de eerste honderd teams.",
    buttonText: "Zet ons team op de lijst",
    microcopy: "Geen spam. Alleen de lancering en je korting. Uitschrijven kan altijd.",
    palette: {
      background: "#1A1A1A",
      foreground: "#FFFFFF",
      accent: "#FF5A1F",
      secondary: "#C8F31D",
      card: "rgba(255,255,255,0.10)",
    },
    fontClass: "font-sans",
    note: "Concept-testpagina; formulier is bewust nog niet gekoppeld zodat er geen persoonsgegevens worden verzameld vóór akkoord.",
    product: {
      eyebrow: "Performance snackdrop",
      title: "Functionele beloningssnacks voor sportieve honden en actieve teams.",
      description:
        "De eerste test richt zich op actieve hondenbezitters die bewust trainen: snackmomenten rond beweging, herstel en beloning, zonder medische claims.",
      includes: ["Trainingssnacks", "Teamkorting", "Activiteitsprofiel", "Verse drop"],
    },
    packages: [
      {
        name: "Sprint Pack",
        price: "€24",
        cadence: "per maand",
        description: "Voor actieve huishonden en weekendtraining.",
        highlights: ["Snackfocus", "Brievenbusproof waar mogelijk", "Makkelijk testen"],
      },
      {
        name: "Pro Team",
        price: "€39",
        cadence: "per maand",
        description: "Voor agility, canicross en fanatieke trainingsschema's.",
        highlights: ["Meer volume", "Trainingsritme", "Vroege teamkorting"],
      },
    ],
    steps: [
      { title: "Vertel je sport", text: "Agility, canicross, zwemmen of gewoon veel rennen." },
      { title: "Kies je pack", text: "Klein starten of direct meer trainingsvolume." },
      { title: "Train en beoordeel", text: "Feedback bepaalt smaak, formaat en frequentie." },
    ],
    proofTitle: "Waarom dit testbaar is",
    proofPoints: ["Sterke niche", "Duidelijk gebruiksmoment", "Community-test mogelijk", "Prijsbereidheid meetbaar"],
    intentQuestion: "Zou jij PowerPoot willen testen met jouw actieve hond?",
  },
  pijlpost: {
    slug: "pijlpost",
    brand: "PijlPost",
    metaTitle: "PijlPost — Verse tips & flights automatisch op de mat | Binnenkort",
    metaDescription:
      "Tips, flights en shafts automatisch thuisbezorgd. Schrijf je in voor de lancering.",
    headline: "Nooit meer gooien met versleten tips.",
    subheadline:
      "PijlPost bezorgt verse tips, flights en shafts automatisch bij je thuis. Door de brievenbus, precies op tijd. Jij hoeft alleen nog te gooien. Binnenkort van start.",
    usps: [
      "Elke maand verse tips, flights en shafts door de brievenbus.",
      "Afgestemd op jouw speelfrequentie — van huiskamer tot clubavond.",
      "Maandelijks opzegbaar, geen gedoe.",
    ],
    waitlistTitle: "Gooi je e-mailadres erin.",
    waitlistText:
      "Schrijf je in en ontvang bericht zodra we live gaan — de eerste inschrijvers krijgen hun eerste maand met lanceringskorting.",
    buttonText: "Zet mij op de lijst",
    microcopy: "Alleen bericht bij de lancering. Geen spam, uitschrijven kan altijd.",
    palette: {
      background: "#F5F0E6",
      foreground: "#1E4D3B",
      accent: "#D6362B",
      secondary: "#C9A227",
      card: "rgba(255,255,255,0.72)",
    },
    fontClass: "font-sans",
    note: "Concept-testpagina. De first-mover claim is hier bewust nog niet opgenomen tot de extra marktcheck is afgerond.",
    product: {
      eyebrow: "Brievenbus dartdrop",
      title: "Verse tips, flights en shafts precies voordat je misgrijpt.",
      description:
        "De snelste validatietest: een compacte maanddrop voor darters die verbruiksartikelen vergeten tot het te laat is. Klein, licht en makkelijk handmatig te fulfilen.",
      includes: ["Tips", "Flights", "Shafts", "Door de brievenbus"],
    },
    packages: [
      {
        name: "Casual",
        price: "€9",
        cadence: "per maand",
        description: "Voor thuis en af en toe een avondje gooien.",
        highlights: ["Klein pakket", "Lage instap", "Brievenbuspost"],
      },
      {
        name: "Clubavond",
        price: "€14",
        cadence: "per maand",
        description: "Voor wekelijkse darters die altijd reserve willen hebben.",
        highlights: ["Meer verbruik", "Mix van essentials", "Maandelijks opzegbaar"],
      },
    ],
    steps: [
      { title: "Kies je frequentie", text: "Thuisgooier of vaste clubavond." },
      { title: "Ontvang je drop", text: "Klein pakket door de brievenbus." },
      { title: "Blijf gooien", text: "Geen versleten tips of vergeten flights meer." },
    ],
    proofTitle: "Waarom dit testbaar is",
    proofPoints: ["Goedkoop te fulfilen", "Licht en klein", "Eenvoudige pre-order test", "Duidelijke maandwaarde"],
    intentQuestion: "Zou jij PijlPost voor je volgende dartavond willen proberen?",
  },
};

export const ventureList = Object.values(venturePages);
