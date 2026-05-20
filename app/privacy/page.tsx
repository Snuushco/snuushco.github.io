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
            <h2>Waarvoor</h2>
            <p>Voor pakketadvies, aanvraagbeoordeling, opvolging, betaling, projectvoorbereiding, kwaliteitscontrole en noodzakelijke administratie.</p>
            <h2>Delen met derden</h2>
            <p>Gegevens kunnen technisch worden verwerkt via hosting, database, Stripe voor betalingen en Telegram voor interne notificaties. We verkopen geen leadgegevens door.</p>
            <h2>Bewaartermijn</h2>
            <p>Lead- en projectgegevens blijven bewaard zolang dat nodig is voor opvolging, levering, administratie of wettelijke verplichtingen.</p>
            <h2>Rechten</h2>
            <p>Je kunt vragen om inzage, correctie of verwijdering van gegevens wanneer dat wettelijk mogelijk is.</p>
            <h2>Contact</h2>
            <p>Voor privacyvragen kun je reageren via het e-mailadres waarmee je de intake hebt ingevuld of via de contactroute op de site.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
