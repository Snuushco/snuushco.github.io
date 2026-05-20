import { NextResponse } from "next/server";
import { getOperationsHealth } from "../../../lib/db";

export async function GET() {
  try {
    const health = await getOperationsHealth();
    return NextResponse.json({
      ok: health.database === "ok",
      checkedAt: new Date().toISOString(),
      ...health,
    });
  } catch {
    return NextResponse.json({ ok: false, checkedAt: new Date().toISOString() }, { status: 500 });
  }
}
