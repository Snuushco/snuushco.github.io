import { NextResponse } from "next/server";
import { createOpsSession, OPS_SESSION_COOKIE, validateOpsCredentials } from "../../../lib/ops-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  if (!validateOpsCredentials(username, password)) {
    return NextResponse.redirect(new URL("/ops/login?error=1", request.url), 303);
  }

  const session = createOpsSession(username);
  if (!session) {
    return NextResponse.redirect(new URL("/ops/login?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/ops", request.url), 303);
  response.cookies.set(OPS_SESSION_COOKIE, session, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
