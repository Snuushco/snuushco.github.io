import { Footer, Header } from "../page";

export const metadata = {
  title: "Voorwaarden | Snuushco",
  description: "Belangrijkste voorwaarden voor Snuushco websitepakketten en maatwerk.",
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
              Deze pagina vat de belangrijkste afspraken samen voor intake, pakketadvies,
              betaling, review en oplevering.
            </p>
            <h2>Pakketadvies</h2>
            <p>Het advies uit de intake is een eerste beoordeling op basis van ingevulde antwoorden en is geen bindende offerte.</p>
            <h2>Prijzen</h2>
            <p>Alle genoemde prijzen zijn vanafprijzen en exclusief btw, tenzij anders vermeld. Extra scope, spoed, integraties en maatwerk kunnen extra kosten geven.</p>
            <h2>Standaardpakketten</h2>
            <p>Standaardpakketten zijn bedoeld voor afgebakende websites en aanvraagroutes. Complexe koppelingen, portals, betalingen, booking, meertaligheid en gevoelige claims vallen buiten standaard scope.</p>
            <h2>Premium maatwerk</h2>
            <p>Premium maatwerk start met betaalde discovery of review. Pas daarna worden scope, planning, acceptatiecriteria en definitieve prijs bevestigd.</p>
            <h2>Oplevering</h2>
            <p>Oplevering vindt plaats via preview, reviewronde en livegang of overdracht volgens de afgesproken route.</p>
            <h2>Geen garanties</h2>
            <p>Snuushco levert website, intake en workflow-inrichting, maar garandeert geen specifieke ranking, omzet, leadvolume of conversie.</p>
            <h2>Menselijke review</h2>
            <p>Gevoelige, juridische, medische, financiele, HR-gerelateerde of technisch complexe onderdelen krijgen review voordat ze live gaan.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

