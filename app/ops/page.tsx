import type { Metadata } from "next";
import { CheckCircle2, ClipboardList, Download, Filter, LockKeyhole, RefreshCw, UsersRound } from "lucide-react";
import { getOperationsDashboard } from "../lib/db";
import { requireOpsAuth } from "../lib/ops-auth";

export const metadata: Metadata = {
  title: "Operations | Snuushco",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type JsonMap = Record<string, unknown>;

function value(input: unknown) {
  return typeof input === "string" && input.length ? input : "Niet ingevuld";
}

function dateLabel(input: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(input));
}

function statusOptions(kind: "lead" | "task") {
  return kind === "lead"
    ? ["new", "checkout_started", "paid", "qualified", "archived"]
    : ["awaiting_payment", "ready_for_production", "review_required", "in_progress", "done", "blocked"];
}

function StatusForm({ id, current, kind }: { id: string; current: string; kind: "lead" | "task" }) {
  return (
    <form className="ops-inline-form" action="/api/ops/update" method="post">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <select name="status" defaultValue={current}>
        {statusOptions(kind).map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
      <button type="submit">Bijwerken</button>
    </form>
  );
}

function textParam(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] ?? "" : input ?? "";
}

export default async function OpsPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = searchParams ? await searchParams : {};
  const filters = {
    q: textParam(params.q).trim(),
    status: textParam(params.status).trim(),
    owner: textParam(params.owner).trim(),
  };
  const auth = await requireOpsAuth();
  if (!auth.ok) {
    if (auth.reason === "not_configured") {
      return (
        <main className="ops-page">
          <section className="ops-auth-card">
            <LockKeyhole />
            <h1>Operations dashboard niet geconfigureerd</h1>
            <p>Zet SNUUSHCO_OPS_PASSWORD in Vercel om dit dashboard te activeren.</p>
          </section>
        </main>
      );
    }
    return (
      <main className="ops-page">
        <section className="ops-auth-card">
          <LockKeyhole />
          <h1>Inloggen nodig</h1>
          <p>Open dit dashboard met de interne Snuushco operations login.</p>
        </section>
      </main>
    );
  }

  const data = await getOperationsDashboard(filters);
  if (data.database !== "ok") {
    return (
      <main className="ops-page">
        <section className="ops-auth-card">
          <LockKeyhole />
          <h1>Database niet geconfigureerd</h1>
          <p>Het dashboard heeft DATABASE_URL nodig om leads en taken te tonen.</p>
        </section>
      </main>
    );
  }

  const leads = data.leads as Array<JsonMap>;
  const tasks = data.tasks as Array<JsonMap>;
  const summary = data.summary as Array<{ status: string; count: number }>;
  const paid = leads.filter((lead) => lead.status === "paid").length;
  const review = tasks.filter((task) => task.status === "review_required").length;
  const ready = tasks.filter((task) => task.status === "ready_for_production").length;

  return (
    <main className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Snuushco Operations</p>
          <h1>Leads en fulfillment</h1>
          <p>Interne cockpit voor intake, betaling, review en productie.</p>
        </div>
        <div className="ops-actions">
          <a className="ops-refresh" href="/api/ops/export"><Download size={16} /> Export</a>
          <a className="ops-refresh" href="/ops"><RefreshCw size={16} /> Verversen</a>
        </div>
      </header>

      <form className="ops-filters" action="/ops">
        <label><Filter size={15} /> Zoek <input name="q" defaultValue={filters.q} placeholder="Bedrijf, mail, pakket, inhoud" /></label>
        <label>Status <select name="status" defaultValue={filters.status}><option value="">Alle statussen</option>{statusOptions("lead").map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
        <label>Eigenaar <input name="owner" defaultValue={filters.owner} placeholder="Emily, Mara, Guus" /></label>
        <button type="submit">Filteren</button>
      </form>

      <section className="ops-metrics">
        <article><UsersRound /><span>{leads.length}</span><p>Leads zichtbaar</p></article>
        <article><CheckCircle2 /><span>{paid}</span><p>Betaald</p></article>
        <article><ClipboardList /><span>{ready}</span><p>Klaar voor productie</p></article>
        <article><LockKeyhole /><span>{review}</span><p>Review nodig</p></article>
      </section>

      <section className="ops-grid">
        <div className="ops-panel">
          <div className="ops-panel-head">
            <h2>Recente leads</h2>
            <div className="ops-summary">{summary.map((item) => <span key={item.status}>{item.status}: {item.count}</span>)}</div>
          </div>
          <div className="ops-table-wrap">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Aangemaakt</th>
                  <th>Bedrijf</th>
                  <th>Pakket</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const intake = lead.intake as JsonMap;
                  const advice = lead.advice as JsonMap;
                  return (
                    <tr key={String(lead.id)}>
                      <td>{dateLabel(String(lead.created_at))}</td>
                      <td>
                        <strong>{String(lead.company)}</strong>
                        <span>{String(lead.email)}</span>
                        <span>{value(lead.segment)} - {value(lead.market)}</span>
                      </td>
                      <td>
                        <strong>{String(lead.package_name)}</strong>
                        <span>{String(lead.price_range)}</span>
                        <span>{String(lead.route)}</span>
                      </td>
                      <td><StatusForm id={String(lead.id)} current={String(lead.status)} kind="lead" /></td>
                      <td>
                        <span>{value(intake.goal)}</span>
                        <span>{value(intake.features)}</span>
                        <span>{value(advice.followUpAdvice)}</span>
                        <a className="ops-detail-link" href={`/ops/leads/${String(lead.id)}`}>Dossier openen</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ops-panel">
          <div className="ops-panel-head">
            <h2>Fulfillment taken</h2>
          </div>
          <div className="ops-task-list">
            {tasks.map((task) => {
              const brief = task.brief as JsonMap;
              const checklist = Array.isArray(task.checklist) ? task.checklist : [];
              return (
                <article className="ops-task" key={String(task.id)}>
                  <div>
                    <strong>{String(task.company ?? brief.company ?? "Onbekend bedrijf")}</strong>
                    <span>{String(task.package_name)} - {String(task.priority)}</span>
                    <span>{value(task.ops_owner)} - {value(task.next_action)}</span>
                    <span>{String(task.task_type)} - lead #{String(task.lead_id)}</span>
                  </div>
                  <StatusForm id={String(task.id)} current={String(task.status)} kind="task" />
                  <p>{String(brief.clientPain ?? "Geen toelichting")}</p>
                  <ul>{checklist.slice(0, 5).map((item) => <li key={String(item)}>{String(item)}</li>)}</ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
