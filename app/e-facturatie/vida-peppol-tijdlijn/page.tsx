import type { Metadata } from "next";
import Link from "next/link";
import { vidaPeppolAuthorityHub } from "../../kassie/content";

const timelineRows = [
  {
    date: "1 januari 2026",
    status: "vastgesteld buiten Nederland",
    text: "België verplicht B2B e-facturatie; relevant voor Nederlandse ondernemers met Belgische klanten of leveranciers.",
  },
  {
    date: "10 maart 2026",
    status: "Nederlandse voorbereiding",
    text: "Onderzoeksrapport over Nederlandse invoering overhandigd aan de Tweede Kamer; dit is input voor besluitvorming, nog geen generieke Nederlandse B2B-plicht.",
  },
  {
    date: "Zomer 2026",
    status: "verwacht monitorpunt",
    text: "Kabinetsreactie of beleidsrichting verwacht. Alleen na primaire bron verwerken als update, artikelconcept en review-draft.",
  },
  {
    date: "2027",
    status: "verwachting",
    text: "Conceptwetsvoorstel en consultatie worden verwacht volgens huidige planning. Formuleren als verwachting tot er officiële stukken zijn.",
  },
  {
    date: "1 juli 2030",
    status: "EU-richting",
    text: "ViDA stuurt richting e-facturatie en digitale rapportage voor grensoverschrijdende B2B-transacties binnen de EU. Nederlandse binnenlandse scope apart blijven checken.",
  },
];

export const metadata: Metadata = {
  title: "ViDA en Peppol tijdlijn Nederland | Kassie",
  description: "Operationele ViDA/Peppol hub voor Kassie: bronnen, monitorqueries, triggercriteria en review-drafts zonder paniekmarketing. Peildatum juni 2026.",
  alternates: { canonical: "https://kassieapp.nl/e-facturatie/vida-peppol-tijdlijn" },
  openGraph: {
    title: "ViDA en Peppol tijdlijn Nederland | Kassie",
    description: "Rustige broncheck voor e-facturatie, Peppol en ViDA: wat is vastgesteld, wat wordt gemonitord en wat publiceren we alleen na review?",
    url: "https://kassieapp.nl/e-facturatie/vida-peppol-tijdlijn",
    type: "article",
    locale: "nl_NL",
  },
};

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="kassie-card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Page() {
  return (
    <main className="kassie-seo-page">
      <section className="kassie-seo-hero">
        <p className="eyebrow">E-facturatie authority hub</p>
        <h1>ViDA en Peppol tijdlijn zonder paniekmarketing</h1>
        <p className="lead">
          Peildatum: {vidaPeppolAuthorityHub.peildatum}. Deze pagina is de operationele bron voor Kassie: eerst primaire bronnen checken, daarna pas een artikel-, LinkedIn- of nieuwsbriefconcept ter review.
        </p>
        <div className="kassie-meta-grid">
          <span><strong>Publieke host:</strong> kassieapp.nl</span>
          <span><strong>Toon:</strong> rustig, praktisch, bronvast</span>
          <span><strong>Gate:</strong> concepten wel, extern posten/mailen niet</span>
        </div>
        <div className="hero-actions">
          <Link className="button" href="/tools/peppol-ready-check">Doe de Peppol-ready-check</Link>
          <Link className="button secondary" href="/e-facturatie-peppol-vida">Lees de uitleg</Link>
        </div>
      </section>

      <section className="kassie-seo-content">
        <article className="kassie-card">
          <h2>Tijdlijn: status per mijlpaal</h2>
          <p>Gebruik deze tijdlijn niet als paniekclaim. Elke wijziging moet een primaire bron, datum en status krijgen: vastgesteld, aangekondigd, verwacht of vervallen.</p>
          {timelineRows.map((row) => (
            <div key={row.date} className="kassie-stack-item">
              <h3>{row.date}</h3>
              <p><strong>Status:</strong> {row.status}</p>
              <p>{row.text}</p>
            </div>
          ))}
        </article>

        <article className="kassie-card">
          <h2>Bronnenlijst</h2>
          <p>Monitor alleen bronnen die kunnen bewijzen wat veranderd is. Secundaire nieuwsartikelen mogen aanleiding zijn, maar niet de enige onderbouwing.</p>
          <ul>
            {vidaPeppolAuthorityHub.sources.map((source) => (
              <li key={source.name}>
                <a href={source.url}>{source.name}</a> — {source.use}
              </li>
            ))}
          </ul>
        </article>

        <ListCard title="Monitorqueries" items={vidaPeppolAuthorityHub.monitorQueries} />
        <ListCard title="Triggercriteria voor een update" items={vidaPeppolAuthorityHub.triggerCriteria} />
        <ListCard title="Artikeltemplate" items={vidaPeppolAuthorityHub.articleTemplate} />
        <ListCard title="LinkedIn-concepttemplate — review only" items={vidaPeppolAuthorityHub.linkedinDraftTemplate} />
        <ListCard title="Nieuwsbriefblok-template — review only" items={vidaPeppolAuthorityHub.newsletterDraftTemplate} />
        <ListCard title="Tijdlijn-update-instructies" items={vidaPeppolAuthorityHub.timelineUpdateInstructions} />

        <article className="kassie-card">
          <h2>Cron prompt voor monitor hardening</h2>
          <p>{vidaPeppolAuthorityHub.cronPrompt}</p>
        </article>
      </section>
    </main>
  );
}
