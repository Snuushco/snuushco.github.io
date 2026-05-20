import { headers } from "next/headers";

export async function requireOpsAuth() {
  const password = process.env.SNUUSHCO_OPS_PASSWORD;
  if (!password) return { ok: false, reason: "not_configured" as const };

  const headerStore = await headers();
  const authorization = headerStore.get("authorization") ?? "";
  if (!authorization.startsWith("Basic ")) return { ok: false, reason: "missing" as const };

  const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  const username = separator >= 0 ? decoded.slice(0, separator) : "";
  const candidate = separator >= 0 ? decoded.slice(separator + 1) : "";
  const expectedUser = process.env.SNUUSHCO_OPS_USER ?? "snuushco";

  return {
    ok: username === expectedUser && candidate === password,
    reason: "invalid" as const,
  };
}

export function unauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Snuushco Operations"' },
  });
}
