import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";

export const OPS_SESSION_COOKIE = "snuushco_ops_session";

function expectedUser() {
  return process.env.SNUUSHCO_OPS_USER ?? "snuushco";
}

function password() {
  return process.env.SNUUSHCO_OPS_PASSWORD;
}

export function createOpsSession(username: string) {
  const secret = password();
  if (!secret) return null;
  const signature = createHmac("sha256", secret).update(username).digest("base64url");
  return username + "." + signature;
}

function isValidSession(value: string | undefined) {
  if (!value) return false;
  const separator = value.indexOf(".");
  const username = separator >= 0 ? value.slice(0, separator) : "";
  const signature = separator >= 0 ? value.slice(separator + 1) : "";
  if (username !== expectedUser()) return false;
  const expected = createOpsSession(username);
  if (!expected) return false;
  const expectedSignature = expected.slice(expected.indexOf(".") + 1);
  const left = Buffer.from(signature);
  const right = Buffer.from(expectedSignature);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validateOpsCredentials(username: string, candidate: string) {
  const secret = password();
  return Boolean(secret && username === expectedUser() && candidate === secret);
}

export async function requireOpsAuth() {
  const secret = password();
  if (!secret) return { ok: false, reason: "not_configured" as const };

  const cookieStore = await cookies();
  if (isValidSession(cookieStore.get(OPS_SESSION_COOKIE)?.value)) {
    return { ok: true, reason: "session" as const };
  }

  const headerStore = await headers();
  const authorization = headerStore.get("authorization") ?? "";
  if (!authorization.startsWith("Basic ")) return { ok: false, reason: "missing" as const };

  const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  const username = separator >= 0 ? decoded.slice(0, separator) : "";
  const candidate = separator >= 0 ? decoded.slice(separator + 1) : "";
  return {
    ok: validateOpsCredentials(username, candidate),
    reason: "invalid" as const,
  };
}

export function unauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Snuushco Operations"' },
  });
}
