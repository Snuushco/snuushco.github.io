import { NextResponse } from "next/server";
import { unsubscribeKassieMarketingLead } from "../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { token?: string } | null;
  const token = body?.token?.trim();
  if (!token) {
    return NextResponse.json({ error: "Token ontbreekt" }, { status: 400 });
  }

  const result = await unsubscribeKassieMarketingLead(token);
  if (result.database === "not_configured") {
    return NextResponse.json({ status: "not_configured" }, { status: 202 });
  }

  return NextResponse.json({ status: result.updated ? "unsubscribed" : "not_found" }, { status: result.updated ? 200 : 404 });
}
