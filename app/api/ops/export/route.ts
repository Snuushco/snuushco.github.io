import { getOperationsDashboard } from "../../../lib/db";
import { requireOpsAuth, unauthorizedResponse } from "../../../lib/ops-auth";

function csvValue(input: unknown) {
  const value = input == null ? "" : String(input);
  return '"' + value.replaceAll('"', '""') + '"';
}

export async function GET() {
  const auth = await requireOpsAuth();
  if (!auth.ok) return unauthorizedResponse();

  const data = await getOperationsDashboard();
  if (data.database !== "ok") {
    return Response.json({ error: "Database niet beschikbaar" }, { status: 503 });
  }

  const headers = [
    "type",
    "id",
    "created_at",
    "company",
    "email",
    "segment",
    "market",
    "package",
    "status",
    "priority",
    "owner",
    "next_action",
    "notes",
  ];

  const leadRows = (data.leads as Array<Record<string, unknown>>).map((lead) => [
    "lead",
    lead.id,
    lead.created_at,
    lead.company,
    lead.email,
    lead.segment,
    lead.market,
    lead.package_name,
    lead.status,
    lead.ops_priority,
    lead.ops_owner,
    lead.next_action,
    lead.ops_notes,
  ]);

  const taskRows = (data.tasks as Array<Record<string, unknown>>).map((task) => [
    "task",
    task.id,
    task.created_at,
    task.company,
    task.email,
    "",
    "",
    task.package_name,
    task.status,
    task.priority,
    task.ops_owner,
    task.next_action,
    task.ops_notes,
  ]);

  const csv = [headers, ...leadRows, ...taskRows].map((row) => row.map(csvValue).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="snuushco-ops-export.csv"',
    },
  });
}
