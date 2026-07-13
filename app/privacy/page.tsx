import { Footer, Header } from "../page";

export const metadata = {
  title: "Privacy | Snuushco",
  description: "Hoe Snuushco omgaat met gegevens uit intake en contact.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="band white">
          <div className="inner legal">
            <p className="eyebrow">Privacy</p>
            <h1>Privacyverklaring</h1>
            <p className="muted">
              Snuushco gebruikt ingevulde gegevens om aanvragen te beoordelen, op te volgen,
              projectbriefs te maken en betalingen of reviews te verwerken.
            </p>
            <h2>Welke gegevens</h2>
            <p>Bedrijfsnaam, e-mailadres, doelgroep, regio, projectdoel, gewenste omvang, assets, deadline en toelichting op het knelpunt.</p>
            <h2>Cashflow Lab eerste geschiktheidscheck</h2>
            <p>
              Voor de eerste check van de Margecheck + Offerteadvies pilot verwerken we alleen de bedrijfsnaam, het zakelijke e-mailadres en compacte antwoorden over doelgroep en geschiktheid. Vul in deze publieke eerste check geen financiële cijfers, offerte-inhoud, documenten of persoonsgegevens van medewerkers of klanten in.
            </p>
            <p>
              Pas na een passende check en betaling vragen we via de vervolginstructies om de informatie die nodig is voor de complete intake. Verwijder of anonimiseer daarbij persoonsgegevens die niet noodzakelijk zijn voor de analyse.
            </p>
            <h2>Waarvoor en op welke grondslag</h2>
            <p>We verwerken reserverings-, betaal- en projectgegevens om de overeenkomst uit te voeren, aanvragen te beoordelen, betalingen en terugbetalingen af te handelen, de afgesproken dienst te leveren en aan administratieve verplichtingen te voldoen. Beperkte beveiligings- en funnelgegevens verwerken we vanuit het gerechtvaardigde belang om misbruik te voorkomen en de zakelijke pilot te evalueren.</p>
            <h2>Delen met derden</h2>
            <p>Gegevens kunnen technisch worden verwerkt via hosting en database, Stripe voor betalingen en Telegram voor een PII-arme interne statusmelding. De Telegrammelding bevat geen bedrijfsnaam, e-mailadres, klant-, medewerker-, offerte- of financiële inhoud. We verkopen geen leadgegevens door.</p>
            <h2>Bewaartermijn</h2>
            <p>Een eerste geschiktheidscheck zonder betaling verwijderen we uiterlijk na 90 dagen. Projectinput en het analyseresultaat verwijderen we uiterlijk 12 maanden na oplevering of terugbetaling, tenzij je eerder om verwijdering vraagt en geen wettelijke bewaarplicht geldt. Betaal-, factuur- en overige gegevens die tot de fiscale administratie behoren bewaren we zeven jaar. Technische beveiligingslogs worden zo kort mogelijk bewaard.</p>
            <h2>Rechten</h2>
            <p>Je kunt vragen om inzage, correctie, verwijdering, beperking, overdracht of bezwaar wanneer dat wettelijk van toepassing is. Gebruik daarvoor de contactroute op de site of antwoord op het e-mailbericht over je reservering. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.</p>
            <h2>Beveiliging en dataminimalisatie</h2>
            <p>De openbare check vraagt geen offerte-inhoud of cijfers. Voor de complete intake vragen we alleen informatie die voor de analyse nodig is en instrueren we je om namen en andere onnodige persoonsgegevens van klanten en medewerkers te verwijderen. Toegang tot betaal- en projectgegevens is beperkt tot de uitvoering en review.</p>
            <h2>Contact</h2>
            <p>Snuushco is voor deze aanvraag de verwerkingsverantwoordelijke. Gebruik voor privacyvragen de contactroute op de site of antwoord op het e-mailadres waarmee de intake-instructie is verzonden.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
