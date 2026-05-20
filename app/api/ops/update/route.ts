import { NextResponse } from "next/server";
import { updateFulfillmentTaskStatus, updateLeadStatus } from "../../../lib/db";
import { requireOpsAuth, unauthorizedResponse } from "../../../lib/ops-auth";

const allowedLeadStatuses = new Set(["new", "checkout_started", "paid", "qualified", "archived"]);
const allowedTaskStatuses = new Set(["awaiting_payment", "ready_for_production", "review_required", "in_progress", "done", "blocked"]);

export async function POST(request: Request) {
  const auth = await requireOpsAuth();
  if (!auth.ok) return unauthorizedResponse();

  const form = await request.formData();
  const kind = String(form.get("kind") ?? "");
  const id = String(form.get("id") ?? "");
  const status = String(form.get("status") ?? "");

  if (!id || !status) {
    return NextResponse.json({ error: "Ontbrekende statusgegevens" }, { status: 400 });
  }

  if (kind === "lead") {
    if (!allowedLeadStatuses.has(status)) return NextResponse.json({ error: "Ongeldige leadstatus" }, { status: 400 });
    await updateLeadStatus(id, status);
  } else if (kind === "task") {
    if (!allowedTaskStatuses.has(status)) return NextResponse.json({ error: "Ongeldige taakstatus" }, { status: 400 });
    await updateFulfillmentTaskStatus(id, status);
  } else {
    return NextResponse.json({ error: "Ongeldig type" }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/ops", request.url), 303);
}

