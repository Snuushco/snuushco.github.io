import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { getLeadDetail } from "../../../lib/db";
import { requireOpsAuth } from "../../../lib/ops-auth";

export const metadata: Metadata = {
  title: "Leaddossier | Snuushco Operations",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type JsonMap = Record<string, unknown>;

const leadStatuses = ["new", "checkout_started", "paid", "qualified", "archived"];
const taskStatuses = ["awaiting_payment", "ready_for_production", "review_required", "in_progress", "done", "blocked"];
const priorities = ["low", "normal", "high", "urgent"];

function value(input: unknown) {
  return typeof input === "string" && input.length ? input : "Niet ingevuld";
}

function dateLabel(input: string) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Amsterdam" }).format(new Date(input));
}

function Select({ name, current, options }: { name: string; current: unknown; options: string[] }) {
  return <select name={name} defaultValue={String(current ?? "")}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="ops-edit-field"><span>{label}</span>{children}</label>;
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireOpsAuth();
  if (!auth.ok) {
    return <main className="ops-page"><section className="ops-auth-card"><LockKeyhole /><h1>Inloggen nodig</h1><p>Open dit dossier met de interne Snuushco operations login.</p></section></main>;
  }

  const { id } = await params;
  const data = await getLeadDetail(id);
  if (data.database !== "ok" || !data.lead) {
    return <main className="ops-page"><section className="ops-auth-card"><h1>Dossier niet gevonden</h1><p>Deze lead bestaat niet of de database is niet beschikbaar.</p><a href="/ops">Terug naar dashboard</a></section></main>;
  }

  const lead = data.lead as JsonMap;
  const intake = lead.intake as JsonMap;
  const advice = lead.advice as JsonMap;
  const tasks = data.tasks as JsonMap[];

  return (
    <main className="ops-page">
      <header className="ops-header">
        <div>
          <p className="eyebrow">Leaddossier #{String(lead.id)}</p>
          <h1>{String(lead.company)}</h1>
          <p>{String(lead.email)} - {String(lead.package_name)} - {String(lead.price_range)}</p>
        </div>
        <a className="ops-refresh" href="/ops"><ArrowLeft size={16} /> Terug</a>
      </header>

      <section className="ops-detail-grid">
        <article className="ops-panel ops-edit-card">
          <div className="ops-panel-head"><h2>Opvolging</h2><span>{dateLabel(String(lead.created_at))}</span></div>
          <form action="/api/ops/update" method="post" className="ops-edit-form">
            <input type="hidden" name="kind" value="lead" />
            <input type="hidden" name="id" value={String(lead.id)} />
            <input type="hidden" name="redirect" value={"/ops/leads/" + String(lead.id)} />
            <Field label="Status"><Select name="status" current={lead.status} options={leadStatuses} /></Field>
            <Field label="Prioriteit"><Select name="priority" current={lead.ops_priority ?? "normal"} options={priorities} /></Field>
            <Field label="Eigenaar"><input name="owner" defaultValue={String(lead.ops_owner ?? "")} placeholder="Emily, Mara, Guus" /></Field>
            <Field label="Volgende actie"><input name="next_action" defaultValue={String(lead.next_action ?? "")} placeholder="Bijv. proposal sturen" /></Field>
            <Field label="Notities"><textarea name="notes" defaultValue={String(lead.ops_notes ?? "")} placeholder="Interne notities" /></Field>
            <button type="submit">Dossier bijwerken</button>
          </form>
        </article>

        <article className="ops-panel ops-facts">
          <div className="ops-panel-head"><h2>Intake</h2></div>
          <dl>
            <dt>Segment</dt><dd>{value(lead.segment)}</dd>
            <dt>Markt</dt><dd>{value(lead.market)}</dd>
            <dt>Doel</dt><dd>{value(intake.goal)}</dd>
            <dt>Gewenste onderdelen</dt><dd>{value(intake.features)}</dd>
            <dt>Huidige situatie</dt><dd>{value(intake.currentSituation)}</dd>
            <dt>Advies</dt><dd>{value(advice.followUpAdvice)}</dd>
            <dt>Betaalstatus</dt><dd>{value(lead.stripe_payment_status)}</dd>
          </dl>
        </article>
      </section>

      <section className="ops-panel ops-detail-tasks">
        <div className="ops-panel-head"><h2>Productiekaarten</h2></div>
        <div className="ops-task-list">
          {tasks.map((task) => {
            const checklist = Array.isArray(task.checklist) ? task.checklist : [];
            return (
              <article className="ops-task" key={String(task.id)}>
                <div><strong>{String(task.package_name)}</strong><span>{String(task.task_type)} - {String(task.priority)}</span></div>
                <form action="/api/ops/update" method="post" className="ops-edit-form compact">
                  <input type="hidden" name="kind" value="task" />
                  <input type="hidden" name="id" value={String(task.id)} />
                  <input type="hidden" name="redirect" value={"/ops/leads/" + String(lead.id)} />
                  <Field label="Status"><Select name="status" current={task.status} options={taskStatuses} /></Field>
                  <Field label="Eigenaar"><input name="owner" defaultValue={String(task.ops_owner ?? "")} /></Field>
                  <Field label="Volgende actie"><input name="next_action" defaultValue={String(task.next_action ?? "")} /></Field>
                  <Field label="Notities"><textarea name="notes" defaultValue={String(task.ops_notes ?? "")} /></Field>
                  <button type="submit">Taak bijwerken</button>
                </form>
                <ul>{checklist.map((item) => <li key={String(item)}>{String(item)}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
