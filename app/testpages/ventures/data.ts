export type VentureSlug = "volbloei" | "powerpoot" | "pijlpost";

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
  palette: {
    background: string;
    foreground: string;
    accent: string;
    secondary: string;
    card: string;
  };
  fontClass: string;
  note: string;
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
  },
};

export const ventureList = Object.values(venturePages);
