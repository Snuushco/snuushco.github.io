import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const password = process.env.SNUUSHCO_OPS_PASSWORD;
  if (!password) return;

  const authorization = request.headers.get("authorization") ?? "";
  const expectedUser = process.env.SNUUSHCO_OPS_USER ?? "snuushco";

  if (authorization.startsWith("Basic ")) {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(":");
    const username = separator >= 0 ? decoded.slice(0, separator) : "";
    const candidate = separator >= 0 ? decoded.slice(separator + 1) : "";
    if (username === expectedUser && candidate === password) return;
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Snuushco Operations"' },
  });
}

export const config = {
  matcher: ["/ops/:path*", "/api/ops/:path*"],
};
