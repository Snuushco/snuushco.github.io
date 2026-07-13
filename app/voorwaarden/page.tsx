import { Footer, Header } from "../page";

export const metadata = {
  title: "Voorwaarden | Snuushco",
  description: "Belangrijkste voorwaarden voor Snuushco websitepakketten, maatwerk en de Cashflow Lab founder-pilot.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="band white">
          <div className="inner legal">
            <p className="eyebrow">Voorwaarden</p>
            <h1>Voorwaarden</h1>
            <p className="muted">
              Deze pagina bevat de belangrijkste zakelijke afspraken voor intake, pakketadvies,
              betaling, review en oplevering. Versie 2026-07-13.
            </p>
            <h2>Pakketadvies</h2>
            <p>Het advies uit de intake is een eerste beoordeling op basis van ingevulde antwoorden en is geen bindende offerte.</p>
            <h2>Prijzen</h2>
            <p>Alle genoemde prijzen zijn vanafprijzen en exclusief btw, tenzij anders vermeld. Extra scope, spoed, integraties en maatwerk kunnen extra kosten geven. De Cashflow Lab-founder-pilot is hierop een uitzondering: de beschreven pilotscope heeft een vaste prijs van € 99 exclusief btw.</p>
            <h2>Standaardpakketten</h2>
            <p>Standaardpakketten zijn bedoeld voor afgebakende websites en aanvraagroutes. Complexe koppelingen, portals, betalingen, booking, meertaligheid en gevoelige claims vallen buiten standaard scope.</p>
            <h2>Premium maatwerk</h2>
            <p>Premium maatwerk start met betaalde discovery of review. Pas daarna worden scope, planning, acceptatiecriteria en definitieve prijs bevestigd.</p>
            <h2>Cashflow Lab Margecheck + Offerteadvies</h2>
            <p>
              Snuushco verkoopt deze zakelijke founder-pilot voor € 99 exclusief btw, vooraf te betalen via Stripe. De vaste scope is één kostenprofiel en één concrete offerte. De oplevering bestaat uit een PDF, rekensamenvatting, drie scenario&apos;s, een bespreking van 30 minuten en één ronde voor feitelijke correcties. Er zijn maximaal drie pilotplekken.
            </p>
            <p>
              Het werk start pas nadat de complete intake is ontvangen én de betaalprovider de betaling heeft bevestigd. De genoemde levertijd van twee werkdagen gaat op dat moment in. Blijkt bij de complete intake dat de aanvraag door scope of capaciteit toch niet past, dan wordt de reservering volledig terugbetaald.
            </p>
            <p>
              De margecheck is praktische beslisondersteuning op basis van aangeleverde informatie. Het is geen cao-, juridisch, fiscaal of boekhoudkundig advies en geeft geen winst-, marge- of resultaatgarantie. De pilot is een handmatige dienst, geen verkoop van een Excel-model, validator of ander downloadproduct.
            </p>
            <p>
              Deze pilot is uitsluitend een zakelijke dienst. Lever de complete, van onnodige persoonsgegevens ontdane intake binnen zeven kalenderdagen na de betaalbevestiging aan. De analyse start pas nadat Snuushco de intake compleet en passend heeft verklaard. Tot dat startbericht kun je via de contactroute of door te antwoorden op de intake-instructie kosteloos annuleren; daarna is annulering alleen mogelijk voor zover de wet dat vereist. Bij een no-show kan de bespreking één keer in overleg worden verplaatst.
            </p>
            <p>
              Aangeleverde informatie wordt vertrouwelijk voor de uitvoering gebruikt. De klant mag de opgeleverde PDF en rekensamenvatting intern voor de eigen bedrijfsvoering gebruiken; algemene methodiek, formats en werkwijze blijven van Snuushco. Aansprakelijkheid voor directe schade is, voor zover wettelijk toegestaan, beperkt tot het voor deze pilot betaalde bedrag. Deze beperking geldt niet bij opzet of bewuste roekeloosheid.
            </p>
            <h2>Oplevering overige diensten</h2>
            <p>Voor website- en overige diensten vindt oplevering plaats via preview, reviewronde en livegang of overdracht volgens de afgesproken route. Voor Cashflow Lab geldt uitsluitend de hierboven beschreven PDF-, rekensamenvatting- en besprekingsroute.</p>
            <h2>Geen garanties</h2>
            <p>Snuushco levert website, intake en bijbehorende aanvraagroute, maar garandeert geen specifieke ranking, omzet, leadvolume of conversie.</p>
            <h2>Menselijke review</h2>
            <p>Gevoelige, juridische, medische, financiele, HR-gerelateerde of technisch complexe onderdelen krijgen review voordat ze live gaan.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
