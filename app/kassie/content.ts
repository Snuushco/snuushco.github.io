export const kassieBaseUrl = "https://kassieapp.nl";
export const appBaseUrl = "https://mijn.kassieapp.nl";

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  updated?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  cta: string;
  sections: { heading: string; body: string[] }[];
  checklist?: {
    title: string;
    intro: string;
    downloadHref: string;
    items: { time: string; title: string; checks: string[] }[];
    reviewItems: string[];
  };
  faqs: { question: string; answer: string }[];
  links: { label: string; href: string }[];
  sources?: { label: string; href: string }[];
};

const belastingdienst = "https://www.belastingdienst.nl";
const kvk = "https://www.kvk.nl";
const ecVida = "https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en";
const peppol = "https://peppol.org";

export const pillarPages: ContentPage[] = [
  {
    slug: "boekhouden-zzp",
    title: "Boekhouden voor ZZP'ers: complete gids | Kassie",
    description: "Praktische gids voor ZZP-boekhouding: bonnen, facturen, btw, deadlines, bewijs en een simpele weekroutine via WhatsApp.",
    h1: "Boekhouden voor ZZP'ers: complete gids",
    primaryKeyword: "boekhouden zzp",
    secondaryKeywords: ["zzp administratie", "boekhouding zzp", "administratie bijhouden", "bonnen bewaren zzp"],
    intent: "ZZP'er wil weten wat minimaal nodig is voor een controleerbare administratie en hoe je dit zonder boekhoudtaal bijhoudt.",
    cta: "Start gratis met Kassie",
    sections: [
      { heading: "Kort antwoord", body: ["Als ZZP'er moet je administratie laten zien wat je hebt verdiend, welke kosten zakelijk zijn, hoeveel btw je moet aangeven en welke bewijsstukken daarbij horen. De basis bestaat uit verkoopfacturen, inkoopfacturen, bonnen, bankmutaties, ritten/uren waar relevant en duidelijke context per transactie.", "Kassie helpt door losse WhatsApp-berichten, foto's en opdrachten om te zetten naar reviewbare administratie-acties. Jij blijft controleur: concepten worden zichtbaar voordat iets definitief wordt verwerkt."] },
      { heading: "De administratie die je minimaal op orde wilt hebben", body: ["Bewaar per verkoopfactuur klant, datum, factuurnummer, omschrijving, btw-tarief, bedrag en betaalstatus. Bewaar per kostenpost het bewijsstuk, zakelijk doel, datum, leverancier en betaalwijze.", "Voor controleerbaarheid is niet alleen het bedrag belangrijk, maar ook waarom de kosten zakelijk zijn. Een losse foto in je galerij is kwetsbaar; een bon met context in je administratie is veel sterker."] },
      { heading: "Praktische weekroutine", body: ["Werk wekelijks twintig minuten: stuur nieuwe bonnen door, factureer afgerond werk, controleer openstaande facturen, label twijfelgevallen en kijk kort naar je btw-positie.", "Door dit ritme voorkom je kwartaalstress. De meeste administratieve fouten ontstaan niet door ingewikkelde regels, maar doordat bewijs en context pas maanden later worden gezocht."] },
      { heading: "Wanneer vraag je een boekhouder?", body: ["Vraag hulp bij buitenlandse klanten, personeel, auto van de zaak, investeringen, KOR-keuzes, correcties over eerdere jaren of kosten waarvan het zakelijke karakter twijfelachtig is.", "Kassie is review-safe ingericht: waar informatie onzeker is, hoort een concept of waarschuwing te ontstaan in plaats van een automatische fiscale conclusie."] },
      { heading: "Belangrijkste punten", body: ["Bewijs direct vastleggen is belangrijker dan achteraf perfect categoriseren. Facturen moeten uniek en terugvindbaar zijn. Btw-aangifte wordt eenvoudiger wanneer verkoop, inkoop en correcties per periode klaarstaan.", "Gebruik deze pagina als praktische oriëntatie. Controleer actuele wettelijke details altijd bij primaire bronnen of je boekhouder."] },
    ],
    faqs: [
      { question: "Moet ik als ZZP'er boekhoudsoftware gebruiken?", answer: "Nee, maar je moet wel een controleerbare administratie hebben. Software maakt bewijs, btw en facturen meestal sneller terugvindbaar." },
      { question: "Hoe vaak moet ik mijn administratie bijwerken?", answer: "Wekelijks is praktisch. Dan blijven bonnen, facturen en betaalstatussen nog herkenbaar." },
      { question: "Is een foto van een bon genoeg?", answer: "Een digitale bon kan bruikbaar zijn als hij leesbaar en terugvindbaar blijft. Voeg wel context toe: datum, leverancier, zakelijk doel en betaling." },
      { question: "Kan Kassie mijn boekhouder vervangen?", answer: "Kassie helpt met voorbereiding en routine, maar fiscale twijfelgevallen horen door een boekhouder of fiscalist beoordeeld te worden." },
    ],
    links: [{ label: "BTW-aangifte doen als ZZP'er", href: "/btw-aangifte-zzp" }, { label: "Factureren als ZZP'er", href: "/factureren-zzp" }, { label: "Bonnen bewaren", href: "/bonnen-bewaren-zzp" }, { label: "BTW-calculator", href: "/tools/btw-calculator" }],
    sources: [{ label: "Belastingdienst — administratie bijhouden", href: belastingdienst }, { label: "KVK — administratie voor ondernemers", href: kvk }],
  },
  {
    slug: "btw-aangifte-zzp",
    title: "BTW-aangifte doen als ZZP'er | Kassie",
    description: "Wat is btw-aangifte, wanneer doe je aangifte, welke bewijsstukken heb je nodig en welke fouten maken ZZP'ers vaak?",
    h1: "BTW-aangifte doen als ZZP'er",
    primaryKeyword: "btw aangifte zzp",
    secondaryKeywords: ["btw aangifte doen", "btw kwartaal", "btw berekenen", "btw correctie"],
    intent: "ZZP'er wil weten hoe btw-aangifte werkt en wat per kwartaal klaar moet staan.",
    cta: "Bereken je btw",
    sections: [
      { heading: "Kort antwoord", body: ["Bij btw-aangifte geef je aan hoeveel btw je aan klanten hebt berekend en hoeveel zakelijke btw je zelf hebt betaald. Het verschil betaal je of krijg je terug. De aangifte vraagt dus om verkoopfacturen, inkoopfacturen, bonnen, creditnota's en eventuele correcties per periode.", "Kassie helpt om die bewijsstukken gedurende het kwartaal te verzamelen, zodat je niet pas op de deadline hoeft te reconstrueren wat er gebeurd is."] },
      { heading: "Wat heb je nodig per aangifteperiode?", body: ["Zet verkoopfacturen, betaalde en ontvangen bedragen, inkoopfacturen, bonnen, buitenlandse facturen, creditnota's en eventuele privécorrecties bij elkaar.", "Maak twijfelgevallen zichtbaar: bijvoorbeeld KOR, verlegde btw, EU-diensten, gemengde privé/zakelijke kosten of correcties over eerdere tijdvakken."] },
      { heading: "Veelgemaakte fouten", body: ["Te laat beginnen, privébonnen meenemen, buitenlandse facturen verkeerd behandelen, creditnota's vergeten, pdf's zonder context bewaren of aannemen dat de KOR alle btw-vragen oplost.", "Bij meerdere jaren terug corrigeren of twijfel over suppletie is algemene content niet genoeg. Vraag dan je boekhouder of de Belastingdienst om beoordeling."] },
      { heading: "Kwartaalroutine", body: ["Week 1-11: bonnen direct doorsturen en facturen op betaalstatus houden. Week 12: controleer ontbrekende bewijsstukken, btw-tarieven, creditnota's en vraag twijfelgevallen uit. Laat daarna pas aangifte doen of klaarzetten.", "Dit maakt de btw-aangifte een controleproces in plaats van een zoekactie."] },
    ],
    faqs: [
      { question: "Wanneer moet ik btw-aangifte doen?", answer: "Veel ondernemers doen per kwartaal aangifte. Controleer je eigen tijdvak en deadline in het portaal van de Belastingdienst." },
      { question: "Is de KOR voor mij interessant?", answer: "Dat hangt af van omzet, klanten, aftrekbare btw en toekomstplannen. Laat twijfel beoordelen." },
      { question: "Wat doe ik met buitenlandse facturen?", answer: "Controleer land, btw-verlegging en of een ICP-opgave of andere regel speelt. Dit is foutgevoelig." },
      { question: "Kan Kassie mijn btw-aangifte automatisch indienen?", answer: "Kassie is bedoeld om bewijs en concepten klaar te zetten. Definitieve aangifte en twijfelgevallen blijven reviewwerk." },
    ],
    links: [{ label: "BTW-calculator", href: "/tools/btw-calculator" }, { label: "KOR uitgelegd", href: "/kennisbank/kor" }, { label: "BTW verleggen", href: "/kennisbank/btw-verleggen" }, { label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }],
    sources: [{ label: "Belastingdienst — btw", href: belastingdienst }],
  },
  {
    slug: "e-facturatie-peppol-vida",
    title: "E-facturatie, Peppol & ViDA uitgelegd | Kassie",
    description: "Heldere uitleg over e-facturatie, Peppol, UBL en ViDA voor Nederlandse ZZP'ers en kleine ondernemers. Peildatum: juni 2026.",
    h1: "E-facturatie, Peppol & ViDA uitgelegd",
    primaryKeyword: "e-facturatie verplicht",
    secondaryKeywords: ["Peppol Nederland", "ViDA", "UBL factuur", "e-factuur zzp"],
    intent: "Ondernemer wil weten wat e-facturatie betekent, wanneer actie nodig is en hoe je je voorbereidt zonder paniek.",
    cta: "Doe de Peppol-ready-check",
    sections: [
      { heading: "Kort antwoord", body: ["E-facturatie betekent dat een factuur als gestructureerde data wordt verstuurd en verwerkt, niet alleen als pdf voor mensen. UBL is een veelgebruikt formaat; Peppol is een netwerk om e-facturen veilig tussen systemen uit te wisselen.", "ViDA is Europese btw-modernisering die digitale rapportage en e-facturatie belangrijker maakt. Voor Nederlandse ZZP'ers is het verstandig nu al te zorgen dat facturen en klantgegevens gestructureerd zijn."] },
      { heading: "Peildatum: juni 2026", body: ["EU ViDA stuurt richting verplichte e-facturatie en digitale rapportage voor grensoverschrijdende B2B-transacties per 1 juli 2030. Nationale invoering kan per land verschillen.", "België verplicht B2B e-facturatie al sinds 1 januari 2026. Nederlandse ondernemers met Belgische zakelijke klanten kunnen daarom nu al vragen krijgen over gestructureerde facturen."] },
      { heading: "PDF is niet hetzelfde als e-factuur", body: ["Een pdf is leesbaar voor mensen, maar software moet bedragen, btw, regels en klantgegevens vaak alsnog herkennen. Een e-factuur bevat die velden direct als data.", "Dat maakt foutcontrole, verwerking door boekhouders en uitwisseling via netwerken zoals Peppol makkelijker."] },
      { heading: "Hoe bereid je je praktisch voor?", body: ["Zorg voor correcte klantgegevens, btw-nummers waar nodig, vaste factuurregels, unieke factuurnummers en software die UBL/Peppol kan ondersteunen of exporteren.", "Kassie kan hierin onderscheidend zijn door factuurconcepten in gewone taal te starten en de onderliggende data gestructureerd klaar te zetten."] },
    ],
    faqs: [
      { question: "Is e-facturatie nu al verplicht in Nederland?", answer: "Niet generiek voor alle binnenlandse B2B-facturen. Voor overheden en specifieke situaties gelden al regels; toekomstige uitbreiding moet per regelgeving worden vastgesteld." },
      { question: "Is een pdf-factuur hetzelfde als e-facturatie?", answer: "Nee. Een echte e-factuur is gestructureerde data, bijvoorbeeld UBL via Peppol." },
      { question: "Wat is Peppol?", answer: "Peppol is een netwerk en afsprakenstelsel waarmee organisaties e-facturen en andere documenten gestructureerd kunnen uitwisselen." },
      { question: "Moet een ZZP'er nu al iets doen?", answer: "Voorbereiden is verstandig: zorg dat je factuurgegevens kloppen en dat je software UBL/Peppol kan ondersteunen zodra dat relevant wordt." },
    ],
    links: [{ label: "ViDA tijdlijn", href: "/e-facturatie/vida-peppol-tijdlijn" }, { label: "Peppol-ready-check", href: "/tools/peppol-ready-check" }, { label: "Factuurgenerator", href: "/tools/factuurgenerator" }, { label: "UBL", href: "/kennisbank/ubl" }],
    sources: [{ label: "Europese Commissie — VAT in the Digital Age", href: ecVida }, { label: "Peppol", href: peppol }, { label: "Belastingdienst", href: belastingdienst }],
  },
  {
    slug: "aftrekposten-zzp",
    title: "Aftrekposten en zakelijke kosten voor ZZP'ers | Kassie",
    description: "Overzicht van zakelijke kosten, aftrekposten, bewijs en twijfelgevallen voor ZZP'ers, met broncheck en review-safe uitleg.",
    h1: "Aftrekposten en zakelijke kosten voor ZZP'ers",
    primaryKeyword: "aftrekposten zzp",
    secondaryKeywords: ["zelfstandigenaftrek", "zakelijke kosten", "mkb-winstvrijstelling", "bonnen bewaren"],
    intent: "ZZP'er wil begrijpen welke kosten mogelijk aftrekbaar zijn en welk bewijs nodig is.",
    cta: "Bekijk de aftrekposten-checker",
    sections: [
      { heading: "Kort antwoord", body: ["Zakelijke kosten zijn kosten die je maakt voor je onderneming en die je met bewijs kunt onderbouwen. Aftrekposten en ondernemersregelingen hebben voorwaarden die kunnen wijzigen. Daarom is bewijs plus actuele broncheck belangrijker dan een algemene lijst met voorbeelden.", "Kassie helpt door bonnen en context direct vast te leggen en twijfelgevallen niet automatisch als zeker te behandelen."] },
      { heading: "Bewijs en zakelijkheid", body: ["Bewaar factuur of bon, datum, leverancier, bedrag, btw en waarom de uitgave zakelijk is. Bij gemengd gebruik, zoals telefoon, auto of thuiswerk, is context extra belangrijk.", "Een boekhouder wil later kunnen zien waarom iets zakelijk is geboekt. Dat maakt je administratie reviewbaar."] },
      { heading: "Veelvoorkomende categorieën", body: ["Denk aan gereedschap, software, vakliteratuur, kilometers, kantoorbenodigdheden, zakelijke abonnementen, apparatuur en opleidingskosten die direct met je onderneming samenhangen.", "Regelingen zoals zelfstandigenaftrek, startersaftrek en MKB-winstvrijstelling hebben voorwaarden. Gebruik actuele bronnen en laat grensgevallen beoordelen."] },
      { heading: "Zeker, twijfel of boekhouder vragen", body: ["Een duidelijke zakelijke softwarefactuur is meestal eenvoudiger te beoordelen dan een gemengde lunch, reis of telefoonrekening. Werk daarom met labels: zeker, twijfel, boekhouder vragen.", "Dat is precies de review-safe gedachte: automatiseren waar het kan en waarschuwen waar het moet."] },
    ],
    faqs: [
      { question: "Kan ik elke bon aftrekken?", answer: "Nee. De kosten moeten zakelijk zijn, passen bij je onderneming en bewijsbaar zijn." },
      { question: "Waar check ik actuele regels?", answer: "Controleer primaire bronnen zoals de Belastingdienst of vraag je boekhouder." },
      { question: "Wat doe ik met deels privé kosten?", answer: "Leg het zakelijke deel en de berekening vast. Bij twijfel: laten beoordelen." },
      { question: "Helpt Kassie met bewijs?", answer: "Ja, Kassie is bedoeld om bonnen, context en reviewstatus bij elkaar te houden." },
    ],
    links: [{ label: "Urencriterium", href: "/kennisbank/urencriterium" }, { label: "Zakelijke kosten", href: "/kennisbank/zakelijke-kosten" }, { label: "Bewaarplicht", href: "/kennisbank/bewaarplicht" }, { label: "Aftrekposten-checker", href: "/tools/aftrekposten-checker" }],
    sources: [{ label: "Belastingdienst — ondernemersaftrek en kosten", href: belastingdienst }],
  },
  {
    slug: "factureren-zzp",
    title: "Factureren als ZZP'er: eisen, voorbeelden en UBL | Kassie",
    description: "Praktisch overzicht voor facturen maken als ZZP'er: verplichte gegevens, btw, nummering, betaling, voorbeelden en e-facturatie.",
    h1: "Factureren als ZZP'er: eisen en voorbeelden",
    primaryKeyword: "factuur maken zzp",
    secondaryKeywords: ["factuureisen", "zzp factuur voorbeeld", "UBL factuur", "factuurnummer"],
    intent: "Ondernemer wil snel een correcte factuur maken en weten wat verplicht is.",
    cta: "Maak gratis een factuur",
    sections: [
      { heading: "Kort antwoord", body: ["Een factuur moet controleerbaar laten zien wie levert, aan wie, wanneer, wat geleverd is, welk bedrag geldt, welk btw-tarief is toegepast en welk uniek factuurnummer de factuur heeft. Voor uitzonderingen en internationale situaties moet je actuele factuureisen controleren.", "Kassie wil factureren starten in gewone taal: jij beschrijft opdracht of klant, Kassie zet een concept klaar en jij controleert voordat je verstuurt."] },
      { heading: "Wat staat er op een factuur?", body: ["Gebruik bedrijfsgegevens, klantgegevens, factuurdatum, uniek opeenvolgend factuurnummer, omschrijving, aantallen/uren, bedragen, btw, totaal, betalingstermijn en eventueel btw-verleggings- of vrijstellingsinformatie.", "Bewaar ook de afspraak of offertecontext, zodat later duidelijk is waarom deze factuur zo is opgesteld."] },
      { heading: "Voorbeeldroutine", body: ["Na afronding van werk stuur je: klant, omschrijving, uren/bedrag, materiaal en eventueel btw-afspraak. Kassie zet een conceptfactuur klaar. Jij controleert klantnaam, btw, factuurnummer en betalingstermijn.", "Deze flow voorkomt dat facturen blijven liggen omdat je eerst een volledig formulier moet invullen."] },
      { heading: "E-facturatie komt dichterbij", body: ["Factureren verschuift steeds meer van pdf naar gestructureerde data zoals UBL en Peppol. Daarom is het slim om factuurregels nu al netjes te structureren.", "De factuurgenerator moet daarom niet alleen een printbare factuur maken, maar ook een checklist/UBL-preview geven."] },
    ],
    faqs: [
      { question: "Mag ik facturen in Word of Excel maken?", answer: "Dat kan, zolang nummering, gegevens en administratie controleerbaar zijn. Software voorkomt sneller fouten." },
      { question: "Wat is UBL?", answer: "UBL is een gestructureerd factuurformaat dat systemen kunnen lezen." },
      { question: "Moet mijn factuurnummer opeenvolgend zijn?", answer: "Factuurnummers moeten uniek en controleerbaar zijn. Opeenvolgende nummering is in de praktijk belangrijk." },
      { question: "Kan Kassie de factuur automatisch versturen?", answer: "De bedoeling is eerst concept en controle. Verzenden hoort pas na akkoord." },
    ],
    links: [{ label: "Factuurgenerator", href: "/tools/factuurgenerator" }, { label: "E-facturatie uitgelegd", href: "/e-facturatie-peppol-vida" }, { label: "Factuurnummer", href: "/kennisbank/factuurnummer" }, { label: "Factuureisen", href: "/kennisbank/factuureisen" }],
    sources: [{ label: "Belastingdienst — factuureisen", href: belastingdienst }],
  },
  {
    slug: "zzp-starten-administratie",
    title: "Starten als ZZP'er: administratie vanaf dag 1 | Kassie",
    description: "Wat regel je administratief als je start als ZZP'er? KVK, facturen, btw, bonnen, zakelijke rekening en simpele weekroutine.",
    h1: "Starten als ZZP'er: administratie vanaf dag 1",
    primaryKeyword: "zzp starten administratie",
    secondaryKeywords: ["kvk inschrijven boekhouding", "starter zzp administratie", "eerste factuur zzp"],
    intent: "Starter wil weten wat hij direct goed moet inrichten zonder boekhoudjargon.",
    cta: "Start je administratie simpel",
    sections: [
      { heading: "Kort antwoord", body: ["Vanaf dag 1 wil je facturen, bonnen, btw, betaalstatus en zakelijke context apart en terugvindbaar vastleggen. Start niet met losse mapjes, maar met een routine die je volhoudt.", "Kassie is bedoeld voor starters die liever appen wat er gebeurt dan meteen een boekhoudpakket leren."] },
      { heading: "Eerste 30 dagen", body: ["Leg bedrijfsgegevens, factuurnummering, zakelijke rekening of betaalstructuur, bonnenbewaring en btw-tijdvak vast. Maak je eerste factuur met duidelijke klantgegevens, omschrijving en betalingstermijn.", "Vraag bij KOR, buitenlandse klanten, auto, personeel of investeringen vroeg advies. Achteraf herstellen kost meer tijd dan vooraf kiezen."] },
      { heading: "Werk niet vanuit losse mapjes", body: ["Foto's in je galerij, pdf's in mail en bedragen in notities worden snel onoverzichtelijk. Bewaar bewijs met context en koppel het aan factuur, klant of periode.", "Een simpele vrijdagroutine voorkomt dat administratie een kwartaalklus wordt."] },
      { heading: "Eerste weekroutine", body: ["Vrijdagmiddag: bonnen doorsturen, openstaande facturen controleren, nieuwe opdrachten factureren en vragen verzamelen.", "Twintig minuten per week voorkomt uren herstelwerk rond btw-aangifte of jaarwerk."] },
    ],
    faqs: [
      { question: "Heb ik meteen een boekhouder nodig?", answer: "Niet altijd, maar bij btw, internationale klanten, auto, personeel of grote investeringen is advies verstandig." },
      { question: "Moet ik een zakelijke rekening openen?", answer: "Het is niet altijd wettelijk verplicht, maar praktisch vaak verstandig om privé en zakelijk te scheiden." },
      { question: "Wanneer maak ik mijn eerste factuur?", answer: "Zodra werk is afgerond of volgens afspraak. Wacht niet tot het kwartaal." },
      { question: "Wat moet ik bewaren?", answer: "Facturen, bonnen, bankmutaties, contracten/offertes en context bij zakelijke kosten." },
    ],
    links: [{ label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }, { label: "BTW-aangifte", href: "/btw-aangifte-zzp" }, { label: "Zakelijke rekening", href: "/kennisbank/zakelijke-rekening" }, { label: "Administratie-routine", href: "/administratie-routine-zzp" }],
    sources: [{ label: "KVK — starten als ondernemer", href: kvk }, { label: "Belastingdienst", href: belastingdienst }],
  },
  {
    slug: "boekhouder-samenwerken-zzp",
    title: "Samenwerken met je boekhouder als ZZP'er | Kassie",
    description: "Hoe lever je administratie netjes aan je boekhouder aan? Checklist voor bonnen, facturen, btw, vragen en review-safe automatisering.",
    h1: "Samenwerken met je boekhouder als ZZP'er",
    primaryKeyword: "boekhouder samenwerken zzp",
    secondaryKeywords: ["administratie aanleveren boekhouder", "boekhouder machtigen", "boekhouder zzp"],
    intent: "ZZP'er wil minder heen-en-weer met de boekhouder en beter voorbereide administratie aanleveren.",
    cta: "Bereid je boekhouding voor",
    sections: [
      { heading: "Kort antwoord", body: ["Een boekhouder kan sneller en beter werken als facturen, bonnen, bankmutaties, btw-vragen en twijfelgevallen overzichtelijk klaarstaan. Het doel is niet alles zelf fiscaal beslissen, maar bewijs en vragen goed voorbereiden.", "Kassie positioneert zich als voorbereiding: gewone taal en WhatsApp aan de voorkant, reviewbare concepten voor ondernemer en boekhouder aan de achterkant."] },
      { heading: "Wat lever je aan?", body: ["Verkoopfacturen, inkoopfacturen, bonnen, bankmutaties, uren/ritten waar relevant, contracten/offertes, btw-vragen en een lijst met twijfelgevallen.", "Voeg per twijfelgeval toe: wat is gebeurd, welk bedrag, welk bewijs, waarom twijfel en welke beslissing nodig is."] },
      { heading: "Minder correctiewerk", body: ["Veel correctiewerk ontstaat door ontbrekende bonnen, onduidelijke privé/zakelijke kosten en facturen zonder context. Door dit direct te labelen wordt jaarwerk rustiger.", "Een review-safe flow voorkomt dat software fiscale keuzes verstopt." ] },
      { heading: "Wanneer boekhouder betrekken?", body: ["Bij KOR, suppletie, buitenlandse btw, investeringen, auto, personeel, juridische structuur en grote correcties. Kassie kan signaleren, maar niet alle beoordeling vervangen."] },
    ],
    faqs: [
      { question: "Wat wil een boekhouder meestal ontvangen?", answer: "Facturen, bonnen, bankmutaties, contracten/offertes en duidelijke vragen per twijfelgeval." },
      { question: "Kan Kassie samenwerken met een boekhouder?", answer: "De positionering is voorbereiding en review: Kassie zet klaar, de ondernemer en boekhouder controleren." },
      { question: "Wanneer is boekhoudadvies nodig?", answer: "Bij fiscale grensgevallen, internationale situaties en structurele keuzes." },
    ],
    links: [{ label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }, { label: "Boekhouder-overdracht-checklist", href: "/tools/boekhouder-overdracht-checklist" }, { label: "Bewaarplicht", href: "/kennisbank/bewaarplicht" }],
  },
  {
    slug: "whatsapp-boekhouden",
    title: "Boekhouden via WhatsApp voor ZZP'ers | Kassie",
    description: "Waarom administratie makkelijker wordt als je bonnen, opdrachten en vragen in gewone taal kunt sturen via WhatsApp.",
    h1: "Boekhouden via WhatsApp voor ZZP'ers",
    primaryKeyword: "boekhouden via WhatsApp",
    secondaryKeywords: ["whatsapp boekhouding", "bonnen appen", "ai boekhouden zzp"],
    intent: "Ondernemer zoekt een lichtere manier om administratie bij te houden zonder in boekhoudsoftware te wonen.",
    cta: "Probeer de WhatsApp-flow",
    sections: [
      { heading: "Kort antwoord", body: ["Boekhouden via WhatsApp betekent dat je administratie begint bij wat je toch al doet: een bon fotograferen, kort zeggen wat er gebeurd is of vragen wat nog openstaat. Software zet daar vervolgens een conceptactie van die jij controleert.", "Dat past bij ondernemers die overzicht willen zonder eerst grootboektaal of uitgebreide formulieren te leren."] },
      { heading: "Voorbeelden", body: ["'Maak een factuur voor De Vries, 6 uur schilderwerk en 84 euro materiaal.' 'Hier is mijn tankbon voor klantbezoek.' 'Welke facturen staan nog open?' Zulke berichten zijn begrijpelijk en actiegericht.", "Kassie moet daarachter klant, bedrag, btw, bewijs en reviewstatus structureren."] },
      { heading: "Niet blind automatiseren", body: ["WhatsApp is de ingang, niet de controle. Fiscale twijfel, ontbrekende gegevens en onlogische bedragen moeten zichtbaar worden voordat iets definitief is.", "Daarmee blijft de flow snel én review-safe." ] },
    ],
    faqs: [
      { question: "Is WhatsApp veilig genoeg voor boekhouding?", answer: "Gebruik WhatsApp als invoer en zorg dat bewijs daarna gestructureerd en controleerbaar in de administratie staat." },
      { question: "Moet ik nog controleren?", answer: "Ja. Kassie hoort concepten klaar te zetten; jij controleert voor definitieve verwerking." },
      { question: "Voor wie is dit handig?", answer: "Voor ZZP'ers die veel onderweg zijn en administratie willen bijhouden zodra iets gebeurt." },
    ],
    links: [{ label: "Administratie-routine", href: "/administratie-routine-zzp" }, { label: "Factureren", href: "/factureren-zzp" }, { label: "Bonnen bewaren", href: "/bonnen-bewaren-zzp" }],
  },
  {
    slug: "administratie-routine-zzp",
    title: "Wekelijkse administratie checklist ZZP: klaar in 15 minuten | Kassie",
    description: "Houd je administratie als zzp'er in 15 minuten per week bij met een gratis printbare checklist voor facturen, bonnen, bank, openstaande posten en btw-bewijs.",
    h1: "Wekelijkse administratie checklist voor zzp'ers",
    updated: "2026-07-10",
    primaryKeyword: "wekelijkse administratie checklist zzp",
    secondaryKeywords: ["administratie bijhouden zzp", "administratie checklist zzp", "bonnen bijhouden", "facturen controleren"],
    intent: "ZZP'er zoekt een concrete, gratis weekcheck om de administratie zelf bij te houden en wil weten waar software kan helpen.",
    cta: "Probeer Kassie 30 dagen",
    sections: [
      { heading: "Kort antwoord: plan elke week hetzelfde kwartier", body: ["Reserveer iedere week vijftien minuten op een vast moment. Controleer achtereenvolgens je verkoopfacturen, inkoopfacturen en bonnen, bankmutaties, openstaande posten en btw-bewijs. Zet alles wat niet duidelijk is apart voor review in plaats van te gokken.", "Jij controleert of werk echt is geleverd, een uitgave zakelijk is, een betaling klopt en bewijs compleet is. Kassie kan gegevens en conceptacties klaarzetten, maar jij of je boekhouder beoordeelt uitzonderingen en fiscale twijfel."] },
      { heading: "Wat controleer je zelf en waar helpt Kassie?", body: ["Als ondernemer blijf je eigenaar van de feiten: klopt de klant, het bedrag, de omschrijving, de betaalstatus en de zakelijke reden? Controleer ook of een bon leesbaar is en of een afwijkende transactie uitleg nodig heeft.", "Kassie helpt met review-safe, auditbare automatisering: bonnen en berichten worden voorbereid als controleerbare concepten, ontbrekende informatie blijft zichtbaar en twijfelgevallen worden niet stilzwijgend definitief gemaakt."] },
      { heading: "Maak van uitzonderingen een korte reviewlijst", body: ["Probeer een lastig geval niet in je weekkwartier op te lossen. Noteer wat er is gebeurd, om welk bedrag het gaat, welk bewijs je hebt en welke vraag nog openstaat. Zo kan jij of je boekhouder gericht beoordelen zonder de hele administratie opnieuw uit te zoeken.", "Vraag review bij onder meer buitenlandse facturen, verlegde btw, gemengd privé en zakelijk gebruik, creditnota's, contante betalingen, ontbrekende bonnen of een btw-tarief waarover je twijfelt."] },
      { heading: "Kassie als hulp bij je weekroutine", body: ["Kassie kost €79 per maand exclusief btw en is 30 dagen te proberen. Je stuurt bijvoorbeeld een bon of opdracht via WhatsApp; Kassie zet de administratie-actie klaar en jij controleert voordat iets definitief wordt.", "Kassie belooft geen foutloze of volledig autonome fiscale verwerking. Het uitgangspunt is juist dat bewijs, wijzigingen en uitzonderingen controleerbaar blijven voor jou en waar nodig je boekhouder."] },
    ],
    checklist: {
      title: "Printbare 15-minuten weekchecklist",
      intro: "Vink de regels af op je scherm of print dit blok. De tijden zijn een richtlijn; bij een uitzondering noteer je alleen de vraag en ga je door.",
      downloadHref: "/downloads/wekelijkse-administratie-checklist-zzp.md",
      items: [
        { time: "0–3 min", title: "Verkoopfacturen", checks: ["Factureer afgerond werk dat nog niet is gefactureerd.", "Controleer klant, datum, omschrijving, factuurnummer, bedrag en btw.", "Verstuur pas nadat je het concept zelf hebt gecontroleerd."] },
        { time: "3–6 min", title: "Inkoopfacturen en bonnen", checks: ["Verzamel nieuwe inkoopfacturen en maak bonfoto's goed leesbaar.", "Controleer leverancier, datum, bedrag, btw, betaalwijze en zakelijk doel.", "Koppel ontbrekend bewijs aan een concrete opvolgactie."] },
        { time: "6–9 min", title: "Bankmutaties", checks: ["Vergelijk ontvangsten met verkoopfacturen en uitgaven met bewijsstukken.", "Markeer privéopnamen, privéstortingen en onbekende transacties apart.", "Noteer bij een afwijking wat je nog moet uitzoeken; boek niet op goed geluk."] },
        { time: "9–12 min", title: "Openstaande posten", checks: ["Markeer ontvangen betalingen als betaald.", "Controleer welke facturen over de afgesproken betaaltermijn zijn.", "Beslis zelf of en wanneer je een vriendelijke herinnering stuurt."] },
        { time: "12–15 min", title: "Btw-bewijs en uitzonderingen", checks: ["Controleer of iedere btw-post een leesbaar bewijsstuk en zakelijke context heeft.", "Zet creditnota's en correcties bij de juiste periode.", "Plaats twijfelgevallen op de reviewlijst voor jezelf of je boekhouder."] },
      ],
      reviewItems: ["Buitenlandse klant of leverancier", "Verlegde btw, KOR of vrijstelling", "Gemengd privé en zakelijk gebruik", "Ontbrekend of onleesbaar bewijs", "Ongebruikelijk btw-tarief of grote correctie"],
    },
    faqs: [
      { question: "Waarom mijn administratie wekelijks bijhouden?", answer: "Omdat klantafspraken, bonnen en betalingen dan nog herkenbaar zijn. Je ziet ontbrekend bewijs en openstaande facturen eerder dan wanneer je pas bij de btw-aangifte begint." },
      { question: "Wat als ik weinig transacties heb?", answer: "Ook dan is een korte check nuttig. Je bent vaak sneller klaar, terwijl openstaande facturen, bankafwijkingen en ontbrekende bonnen wel tijdig opvallen." },
      { question: "Doet Kassie mijn administratie volledig automatisch?", answer: "Nee. Kassie zet gegevens en conceptacties klaar. Jij controleert de feiten en fiscale uitzonderingen blijven reviewwerk voor jou of je boekhouder." },
      { question: "Kan ik de checklist gratis downloaden?", answer: "Ja. De checklist staat zonder e-mailgate als printbare HTML op deze pagina en als downloadbaar markdownbestand." },
    ],
    links: [{ label: "Boekhouden voor ZZP'ers", href: "/boekhouden-zzp" }, { label: "Bonnen bewaren als ZZP'er", href: "/bonnen-bewaren-zzp" }, { label: "BTW-aangifte voor ZZP'ers", href: "/btw-aangifte-zzp" }],
    sources: [{ label: "Belastingdienst — administratie bijhouden en bewaren", href: belastingdienst }],
  },
  {
    slug: "bonnen-bewaren-zzp",
    title: "Bonnen bewaren als ZZP'er: bewijs, foto en bewaarplicht | Kassie",
    description: "Hoe bewaar je bonnen controleerbaar als ZZP'er? Praktische uitleg over foto's, context, zakelijke kosten en bewaarplicht.",
    h1: "Bonnen bewaren als ZZP'er",
    primaryKeyword: "bonnen bewaren zzp",
    secondaryKeywords: ["bewaarplicht zzp", "bon fotograferen", "zakelijke kosten bewijs"],
    intent: "ZZP'er wil weten hoe bonnen digitaal en controleerbaar bewaard moeten worden.",
    cta: "Check je bonnenroutine",
    sections: [
      { heading: "Kort antwoord", body: ["Bewaar bonnen zo dat ze leesbaar, terugvindbaar en gekoppeld aan de zakelijke context blijven. Een foto kan praktisch zijn, maar zonder datum, leverancier, bedrag, betaling en zakelijk doel blijft controle lastig.", "Kassie helpt door de foto direct aan een administratie-actie te koppelen, inclusief context en reviewstatus."] },
      { heading: "Wat leg je vast?", body: ["Leverancier, datum, bedrag, btw, betaalwijze, zakelijk doel, klant/project waar relevant en of er privégebruik speelt.", "Voor gemengde kosten is uitleg belangrijker dan alleen het bonnetje." ] },
      { heading: "Veelgemaakte fout", body: ["Bonnen bewaren in WhatsApp, mail, downloads en galerij tegelijk zonder centrale administratie. Daardoor ontbreekt later context of is bewijs niet meer leesbaar.", "Stuur bonnen direct door en label twijfelgevallen." ] },
    ],
    faqs: [
      { question: "Mag ik een bon fotograferen?", answer: "Digitale bewaring kan praktisch zijn als de bon leesbaar en controleerbaar blijft. Controleer actuele eisen bij de Belastingdienst." },
      { question: "Hoe lang moet ik administratie bewaren?", answer: "Voor veel administratie geldt een meerjarige bewaarplicht. Controleer actuele regels voor jouw situatie." },
      { question: "Wat als een bon deels privé is?", answer: "Leg het zakelijke deel en je berekening vast en laat twijfel beoordelen." },
    ],
    links: [{ label: "Bewaarplicht", href: "/kennisbank/bewaarplicht" }, { label: "Zakelijke kosten", href: "/kennisbank/zakelijke-kosten" }, { label: "Aftrekposten-checker", href: "/tools/aftrekposten-checker" }],
    sources: [{ label: "Belastingdienst — administratie bewaren", href: belastingdienst }],
  },
];

const professionNames = ["kapper", "schoonheidsspecialist", "fotograaf", "videograaf", "klusjesman", "schilder", "stukadoor", "elektricien", "loodgieter", "hovenier", "rijinstructeur", "personal-trainer", "dietist", "fysiotherapeut", "coach", "virtual-assistant", "tekstschrijver", "vertaler", "webdesigner", "developer", "marketeer", "consultant", "interim-professional", "koerier", "taxichauffeur", "kunstenaar", "muzikant", "docent", "kraamverzorgende", "zzp-zorg"];
export const professions = professionNames.map((slug) => ({ slug, label: slug.replace(/-/g, " ").replace("dietist", "diëtist").replace("zzp zorg", "zzp'er in de zorg") }));

export const professionDetails: Record<string, { income: string[]; costs: string[]; routine: string; invoice: string; warning: string }> = {
  kapper: { income: ["knipbeurten", "kleurbehandelingen", "styling", "bruidskapsels"], costs: ["schaar/slijpen", "kleurproducten", "stoelhuur", "kappersbenodigdheden"], routine: "Leg dagomzet, pin/contant, productverbruik en afspraken wekelijks vast.", invoice: "Knipbeurt en kleurbehandeling volgens afspraak, inclusief producten.", warning: "Let op privégebruik van producten en contante betalingen." },
  schoonheidsspecialist: { income: ["behandelingen", "productverkoop", "strippenkaarten"], costs: ["cosmetica", "apparatuur", "handdoeken", "salonhuur"], routine: "Koppel per behandeling omzet, productgebruik en betaalwijze.", invoice: "Gezichtsbehandeling plus productverkoop volgens afspraak.", warning: "Scheid productverkoop en behandeling als btw/beoordeling daarom vraagt." },
  fotograaf: { income: ["shoots", "nabewerking", "licenties", "prints"], costs: ["camera", "lenzen", "software", "reiskosten"], routine: "Bewaar opdracht, licentie-afspraak, reistijd en nabewerkingsuren bij elkaar.", invoice: "Fotoshoot, selectie en nabewerking inclusief afgesproken gebruiksrechten.", warning: "Let op auteursrecht/licenties en internationale platforms." },
  videograaf: { income: ["draaidagen", "montage", "licenties", "reiskosten"], costs: ["camera/audio", "montagesoftware", "muzieklicenties", "opslag"], routine: "Leg draaidag, montage-uren, apparatuur en licenties per project vast.", invoice: "Draaidag en montage voor project, inclusief afgesproken correctieronde.", warning: "Muziek/licenties en ingehuurde freelancers vragen extra bewijs." },
  klusjesman: { income: ["arbeid", "materiaal", "voorrijkosten", "spoedklussen"], costs: ["gereedschap", "materiaal", "bus/kilometers", "werkkleding"], routine: "Bewaar materiaalbonnen bij de klantklus en factureer arbeid/materiaal apart duidelijk.", invoice: "Arbeid 6 uur, materiaal tegen verkoopprijs en voorrijkosten.", warning: "Maak opslag op materiaal vooraf duidelijk om discussie te voorkomen." },
  schilder: { income: ["schilderwerk", "voorbereiding", "materiaal", "meerwerk"], costs: ["verf", "kwasten", "steiger/huur", "afplakken"], routine: "Koppel verfbonnen, uren en meerwerk aan klant/project.", invoice: "Binnenschilderwerk inclusief voorbereiding en materiaal.", warning: "Btw-tarief kan per situatie verschillen; laat grensgevallen beoordelen." },
  stukadoor: { income: ["m2 werk", "voorstrijk", "materiaal", "meerwerk"], costs: ["gips", "profielen", "gereedschap", "transport"], routine: "Leg meters, materiaal en extra werk direct na klus vast.", invoice: "Stukadoorswerk per m2 inclusief materiaal en voorbereiding.", warning: "Controleer afspraken over materiaal en meerwerk schriftelijk." },
  elektricien: { income: ["uren", "materiaal", "storingsdienst", "keuring"], costs: ["kabels", "schakelmateriaal", "meetapparatuur", "bus"], routine: "Bewaar materiaalstaat, uren en veiligheids-/keuringsinformatie per opdracht.", invoice: "Montage en aansluiting inclusief materiaalstaat.", warning: "Certificering en garantieafspraken zijn belangrijk bewijs." },
  loodgieter: { income: ["uren", "materiaal", "spoed", "onderhoud"], costs: ["leidingen", "koppelingen", "gereedschap", "bus"], routine: "Koppel spoedritten, materiaalbonnen en klantfoto's aan de opdracht.", invoice: "Reparatie lekkage inclusief materiaal en voorrijkosten.", warning: "Spoedtarieven en materiaalopslag vooraf duidelijk vermelden." },
  hovenier: { income: ["onderhoud", "aanleg", "materiaal/planten", "afvoer"], costs: ["planten", "grond", "gereedschap", "aanhanger"], routine: "Leg per tuin materiaal, uren, kilometers en afvoerbonnen vast.", invoice: "Tuinonderhoud of aanleg inclusief planten en afvoer.", warning: "Seizoenswerk en contante bijbetalingen vragen discipline." },
  "rijinstructeur": { income: ["lessen", "pakketten", "examens", "annuleringen"], costs: ["lesauto", "brandstof", "verzekering", "onderhoud"], routine: "Houd lessen, pakketten, vooruitbetalingen en autokosten per week bij.", invoice: "Rijlespakket of losse lessen met periodevermelding.", warning: "Auto- en privégebruik vragen goede ritten/contextregistratie." },
  "personal-trainer": { income: ["sessies", "trajecten", "abonnementen", "schema's"], costs: ["zaalhuur", "materiaal", "software", "opleiding"], routine: "Koppel sessies, vooruitbetaalde pakketten en zaalhuur per klant.", invoice: "Personal training pakket van 10 sessies.", warning: "Vooruitbetalingen en no-shows goed vastleggen." },
  fysiotherapeut: { income: ["behandelingen", "trajecten", "rapportages"], costs: ["praktijkruimte", "materiaal", "bijscholing", "software"], routine: "Leg behandeling, declaratie/klantbetaling en praktijkkosten gescheiden vast.", invoice: "Behandeling of traject volgens afspraak.", warning: "Zorgspecifieke regels en btw-vrijstellingen vereisen beoordeling." },
  coach: { income: ["sessies", "trajecten", "workshops"], costs: ["ruimtehuur", "software", "opleiding", "marketing"], routine: "Koppel sessies en trajecttermijnen aan facturen en betaalstatus.", invoice: "Coachtraject maandtermijn of losse sessie.", warning: "Vermijd vage omschrijvingen; maak prestatie en periode duidelijk." },
  webdesigner: { income: ["projecten", "onderhoud", "hosting", "licenties"], costs: ["software", "hosting", "templates", "freelancers"], routine: "Splits projectwerk, recurring onderhoud en doorbelaste licenties.", invoice: "Website ontwerp en bouw fase 1 plus onderhoudscontract.", warning: "Doorbelasting van tools/licenties en buitenlandse SaaS-facturen goed controleren." },
  developer: { income: ["uren", "sprints", "retainers", "onderhoud"], costs: ["SaaS-tools", "hardware", "cloud", "opleiding"], routine: "Leg uren/sprints, cloudkosten en buitenlandse SaaS-facturen bij elkaar.", invoice: "Development sprint of onderhoudsretainer voor periode.", warning: "Buitenlandse btw en verleggingsregels komen vaak voor." },
};
export const getProfessionDetail = (slug: string) => professionDetails[slug] ?? { income: ["uren", "projecten", "diensten", "meerwerk"], costs: ["software", "materiaal", "kilometers", "opleiding"], routine: "Stuur bonnen direct door, factureer afgerond werk en controleer wekelijks openstaande bedragen.", invoice: "Werkzaamheden volgens afspraak met duidelijke periode en omschrijving.", warning: "Leg zakelijke context en twijfelgevallen vast zodat je boekhouder kan reviewen." };

const terms: [string, string, string][] = [
  ["kor", "KOR", "De kleineondernemersregeling is een btw-regeling voor ondernemers met beperkte omzet. Check voorwaarden en gevolgen altijd actueel."],
  ["urencriterium", "Urencriterium", "Het urencriterium bepaalt of je voor bepaalde ondernemersaftrekken in aanmerking kunt komen. Bewijs je uren zorgvuldig."],
  ["voorlopige-aanslag", "Voorlopige aanslag", "Een voorlopige aanslag spreidt verwachte inkomstenbelasting of bijdrage over het jaar."],
  ["zakelijke-rekening", "Zakelijke rekening", "Een aparte zakelijke rekening maakt controle, btw en overzicht eenvoudiger, ook als het niet altijd wettelijk verplicht is."],
  ["bewaarplicht", "Bewaarplicht", "Administratie moet meerdere jaren controleerbaar bewaard blijven. Digitale bonnen moeten leesbaar en terugvindbaar zijn."],
  ["kilometervergoeding", "Kilometervergoeding", "Zakelijke kilometers kunnen relevant zijn voor je administratie. Leg datum, rit, doel en afstand vast."],
  ["mkb-winstvrijstelling", "MKB-winstvrijstelling", "De MKB-winstvrijstelling is een fiscale regeling met voorwaarden en percentages die kunnen wijzigen."],
  ["btw-verleggen", "BTW verleggen", "Bij btw verleggen brengt de leverancier geen btw in rekening maar vermeldt dat de btw is verlegd naar de afnemer."],
  ["margeregeling", "Margeregeling", "De margeregeling kan gelden bij handel in gebruikte goederen. Dit is foutgevoelig en vraagt broncheck."],
  ["herinvesteringsreserve", "Herinvesteringsreserve", "Een herinvesteringsreserve kan spelen bij verkoop van bedrijfsmiddelen en geplande herinvestering."],
  ["factuurnummer", "Factuurnummer", "Factuurnummers moeten uniek en controleerbaar zijn zodat je administratie later te volgen is."],
  ["icp-opgave", "ICP-opgave", "De ICP-opgave hoort bij intracommunautaire prestaties binnen de EU en vraagt correcte klant- en btw-gegevens."],
  ["zelfstandigenaftrek", "Zelfstandigenaftrek", "Zelfstandigenaftrek is een ondernemersaftrek met voorwaarden, waaronder vaak het urencriterium."],
  ["startersaftrek", "Startersaftrek", "Startersaftrek kan onder voorwaarden bovenop zelfstandigenaftrek spelen voor startende ondernemers."],
  ["zakelijke-kosten", "Zakelijke kosten", "Zakelijke kosten zijn kosten voor je onderneming die je met bewijs en context kunt onderbouwen."],
  ["ubl", "UBL", "UBL is een gestructureerd factuurformaat waarmee systemen factuurvelden kunnen lezen zonder pdf-overtypen."],
  ["peppol", "Peppol", "Peppol is een netwerk en afsprakenstelsel voor veilige uitwisseling van elektronische documenten zoals e-facturen."],
  ["vida", "ViDA", "VAT in the Digital Age is Europese btw-modernisering rond e-facturatie en digitale rapportage."],
  ["ocr", "OCR bonherkenning", "OCR zet tekst uit bonnen en facturen om naar digitale velden, maar menselijke controle blijft belangrijk."],
  ["review-safe-automatisering", "Review-safe automatisering", "Review-safe automatisering zet concepten klaar en markeert twijfel in plaats van fiscale conclusies blind definitief te maken."],
  ["factuureisen", "Factuureisen", "Factuureisen beschrijven welke gegevens op een factuur moeten staan, zoals partijen, datum, nummer, bedragen en btw."],
  ["factuurdatum", "Factuurdatum", "De factuurdatum is de datum waarop de factuur wordt uitgereikt en helpt bij periode- en btw-controle."],
  ["vervaldatum", "Vervaldatum", "De vervaldatum geeft aan wanneer een factuur uiterlijk betaald moet zijn volgens afspraak of betalingstermijn."],
  ["betalingstermijn", "Betalingstermijn", "De betalingstermijn is de afgesproken periode waarbinnen de klant de factuur betaalt."],
  ["creditfactuur", "Creditfactuur", "Een creditfactuur corrigeert of vermindert een eerdere factuur en moet duidelijk naar die factuur herleidbaar zijn."],
  ["proforma-factuur", "Pro-forma factuur", "Een pro-forma factuur is meestal een concept of betalingsverzoek en niet hetzelfde als een definitieve factuur."],
  ["periodieke-factuur", "Periodieke factuur", "Een periodieke factuur keert terug voor abonnementen, onderhoud of vaste dienstverlening."],
  ["e-factuur", "E-factuur", "Een e-factuur is gestructureerde factuurdata, niet alleen een pdf per e-mail."],
  ["peppol-access-point", "Peppol Access Point", "Een Peppol Access Point verbindt software met het Peppol-netwerk voor uitwisseling van e-facturen."],
  ["btw-nummer", "BTW-nummer", "Een btw-nummer wordt gebruikt voor btw-administratie en controle bij ondernemers."],
  ["btw-id", "BTW-id", "Het btw-id is bedoeld voor communicatie met klanten en leveranciers en verschilt in gebruik van interne nummers."],
  ["btw-buitenland", "BTW buitenland", "Btw bij buitenlandse klanten of leveranciers hangt af van land, klanttype, prestatie en verleggingsregels."],
  ["suppletie", "Suppletie", "Een suppletie is een correctie op een eerdere btw-aangifte wanneer blijkt dat te veel of te weinig btw is aangegeven."],
  ["intracommunautaire-prestatie", "Intracommunautaire prestatie", "Een intracommunautaire prestatie is levering of dienst binnen de EU met specifieke btw- en opgaveverplichtingen."],
  ["btw-tarief", "BTW-tarief", "Het btw-tarief bepaalt hoeveel btw je berekent; 21%, 9%, 0% of vrijstelling hangt af van de prestatie."],
  ["audit-trail", "Audit trail", "Een audit trail laat zien hoe een administratiepost is ontstaan, aangepast en goedgekeurd."],
  ["bon-bewaren", "Bon bewaren", "Een bon bewaren betekent hem leesbaar, terugvindbaar en gekoppeld aan zakelijke context opslaan."],
  ["bankkoppeling", "Bankkoppeling", "Een bankkoppeling helpt bankmutaties automatisch in te lezen, maar context en bewijs blijven nodig."],
  ["kasadministratie", "Kasadministratie", "Kasadministratie legt contante ontvangsten en uitgaven controleerbaar vast."],
  ["urenregistratie", "Urenregistratie", "Urenregistratie onderbouwt werkzaamheden, projecten en soms fiscale regelingen zoals het urencriterium."],
  ["rittenregistratie", "Rittenregistratie", "Een rittenregistratie legt zakelijke en privéritten vast voor controle van autokosten en bijtelling."],
  ["inkomstenbelasting-reserveren", "Inkomstenbelasting reserveren", "Inkomstenbelasting reserveren betekent periodiek geld apart zetten voor verwachte belasting op winst."],
  ["administratiekantoor", "Administratiekantoor", "Een administratiekantoor helpt ondernemers met boekhouding, aangiften en administratieve controle."],
  ["boekhouder-machtigen", "Boekhouder machtigen", "Een boekhouder machtigen betekent dat je toegang of toestemming geeft om administratie of aangiften te verwerken."],
  ["aangifte-klaarzetten", "Aangifte klaarzetten", "Aangifte klaarzetten betekent gegevens voorbereiden zodat jij of je boekhouder ze kan controleren en indienen."],
  ["jaarrekening", "Jaarrekening", "Een jaarrekening vat financiële positie en resultaten over een boekjaar samen."],
  ["balans", "Balans", "De balans toont bezittingen, schulden en eigen vermogen op een bepaald moment."],
  ["winst-en-verliesrekening", "Winst-en-verliesrekening", "De winst-en-verliesrekening laat omzet, kosten en resultaat over een periode zien."],
  ["whatsapp-boekhouden", "WhatsApp boekhouden", "WhatsApp boekhouden gebruikt berichten en foto's als laagdrempelige invoer voor administratie-acties."],
  ["ai-boekhouden", "AI boekhouden", "AI boekhouden gebruikt automatisering om administratie voor te bereiden, maar fiscale controle blijft belangrijk."],
  ["conceptfactuur", "Conceptfactuur", "Een conceptfactuur is een voorbereid factuurvoorstel dat je controleert voordat het definitief wordt."],
  ["bonherkenning", "Bonherkenning", "Bonherkenning haalt leverancier, datum, bedrag en btw uit een bonfoto, maar moet bij twijfel gecontroleerd worden."],
  ["btw-kwartaal", "BTW-kwartaal", "Een btw-kwartaal is een aangifteperiode waarin verkoop, inkoop en correcties moeten worden samengevat."],
  ["openstaande-factuur", "Openstaande factuur", "Een openstaande factuur is verstuurd maar nog niet betaald en vraagt opvolging voor cashflow."],
  ["debiteurenbeheer", "Debiteurenbeheer", "Debiteurenbeheer is het volgen en herinneren van klanten die nog moeten betalen."],
  ["betalingsherinnering", "Betalingsherinnering", "Een betalingsherinnering wijst een klant vriendelijk op een verlopen factuur."],
  ["offerte-naar-factuur", "Offerte naar factuur", "Offerte naar factuur betekent dat afgesproken werk na akkoord wordt omgezet naar een factuur."],
  ["privestorting", "Privéstorting", "Een privéstorting is geld dat je privé in je onderneming stopt en apart moet worden herkend."],
  ["priveopname", "Privéopname", "Een privéopname is geld dat je uit je onderneming voor privé gebruikt en niet als zakelijke kosten boekt."],
  ["boekjaar", "Boekjaar", "Een boekjaar is de periode waarover je administratie en resultaat worden vastgesteld."],
  ["btw-vrijstelling", "BTW-vrijstelling", "Een btw-vrijstelling betekent dat over bepaalde prestaties geen btw wordt berekend, maar voorwaarden zijn strikt."],
  ["kleine-ondernemer", "Kleine ondernemer", "Een kleine ondernemer heeft vaak beperkte administratiecapaciteit en baat bij simpele routines en duidelijke controles."],
];
export const knowledgeTerms = terms.map(([slug, title, summary]) => ({ slug, title, summary }));
export const comparisons = ["moneybird", "e-boekhouden", "snelstart", "rompslomp", "tellow", "excel", "boekhouder-only", "facturatie-app"].map((slug) => ({ slug, name: slug === "e-boekhouden" ? "e-Boekhouden" : slug === "boekhouder-only" ? "Alleen boekhouder" : slug === "facturatie-app" ? "facturatie-app" : slug.charAt(0).toUpperCase() + slug.slice(1) }));
export const toolPages = [
  { slug: "factuurgenerator", title: "Gratis factuurgenerator", description: "Maak een eenvoudige ZZP-factuur zonder login en krijg factuureisen- en UBL-preview." },
  { slug: "btw-calculator", title: "BTW-calculator", description: "Bereken bedragen inclusief/exclusief btw en krijg een kwartaalcheck op hoofdlijnen." },
  { slug: "peppol-ready-check", title: "Peppol-ready-check", description: "Check of je facturatie klaar is voor e-facturatie via UBL/Peppol." },
  { slug: "uurtarief-calculator", title: "Uurtarief-calculator ZZP", description: "Schat welk uurtarief past bij inkomen, kosten en reserveringen." },
  { slug: "aftrekposten-checker", title: "Aftrekposten-checker", description: "Loop zakelijke kosten en fiscale aandachtspunten langs." },
  { slug: "btw-kwartaal-checklist", title: "BTW-kwartaal-checklist", description: "Controleer verkoop, inkoop, bonnen en correcties voordat je btw-aangifte doet." },
  { slug: "bonnen-bewaar-check", title: "Bonnen-bewaar-check", description: "Check of je bonnen leesbaar, terugvindbaar en zakelijk onderbouwd zijn." },
  { slug: "factuureisen-checker", title: "Factuureisen-checker", description: "Controleer of je factuur de belangrijkste gegevens bevat." },
  { slug: "belasting-reservering-calculator", title: "Belasting-reservering-calculator", description: "Maak een voorzichtige reserveringsinschatting voor btw, inkomstenbelasting en buffer." },
  { slug: "boekhouder-overdracht-checklist", title: "Boekhouder-overdracht-checklist", description: "Lever facturen, bonnen, bankmutaties en vragen overzichtelijk aan je boekhouder aan." },
];
export const approvalAssets = {
  linkedin: [
    "ViDA klinkt ver weg, maar België verplicht B2B e-facturatie al sinds 2026. Nederlandse ondernemers met Belgische klanten merken dit dus nu al.",
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
    "5 minuten ZZP-administratie #3 — factuurnummers moeten uniek en controleerbaar zijn. Gebruik geen losse Word-bestanden zonder overzicht.",
    "5 minuten ZZP-administratie #4 — Belgische B2B e-facturatie is al verplicht. Heb je Belgische klanten? Check of je proces klaar is."
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
