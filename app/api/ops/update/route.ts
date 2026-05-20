import { NextResponse } from "next/server";
import { updateFulfillmentTaskOps, updateFulfillmentTaskStatus, updateLeadOps, updateLeadStatus } from "../../../lib/db";
import { requireOpsAuth, unauthorizedResponse } from "../../../lib/ops-auth";

const allowedLeadStatuses = new Set(["new", "checkout_started", "paid", "qualified", "archived"]);
const allowedTaskStatuses = new Set(["awaiting_payment", "ready_for_production", "review_required", "in_progress", "done", "blocked"]);
const allowedPriorities = new Set(["low", "normal", "high", "urgent"]);

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
    const priority = String(form.get("priority") ?? "normal");
    const owner = String(form.get("owner") ?? "").trim();
    const nextAction = String(form.get("next_action") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    if (form.has("priority") || owner || nextAction || notes) {
      if (!allowedPriorities.has(priority)) return NextResponse.json({ error: "Ongeldige prioriteit" }, { status: 400 });
      await updateLeadOps({ id, status, priority, owner, nextAction, notes });
    } else {
      await updateLeadStatus(id, status);
    }
  } else if (kind === "task") {
    if (!allowedTaskStatuses.has(status)) return NextResponse.json({ error: "Ongeldige taakstatus" }, { status: 400 });
    const owner = String(form.get("owner") ?? "").trim();
    const nextAction = String(form.get("next_action") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    if (form.has("owner") || form.has("next_action") || form.has("notes")) {
      await updateFulfillmentTaskOps({ id, status, owner, nextAction, notes });
    } else {
      await updateFulfillmentTaskStatus(id, status);
    }
  } else {
    return NextResponse.json({ error: "Ongeldig type" }, { status: 400 });
  }

  const redirectTo = String(form.get("redirect") ?? "/ops");
  return NextResponse.redirect(new URL(redirectTo.startsWith("/") ? redirectTo : "/ops", request.url), 303);
}
