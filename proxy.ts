import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const sessionCookie = "snuushco_ops_session";

async function sign(username: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(username));
  return btoa(String.fromCharCode(...new Uint8Array(signature))).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hasValidSession(request: NextRequest, username: string, secret: string) {
  const value = request.cookies.get(sessionCookie)?.value;
  if (!value) return false;
  const separator = value.indexOf(".");
  const cookieUser = separator >= 0 ? value.slice(0, separator) : "";
  const signature = separator >= 0 ? value.slice(separator + 1) : "";
  if (cookieUser !== username) return false;
  return signature === await sign(cookieUser, secret);
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";
  const { pathname } = request.nextUrl;

  if (host === "www.kassieapp.nl") {
    const url = request.nextUrl.clone();
    url.hostname = "kassieapp.nl";
    return NextResponse.redirect(url, 308);
  }

  if ((host === "snuushco.nl" || host === "www.snuushco.nl") && pathname === "/kassie") {
    return NextResponse.redirect("https://kassieapp.nl", 308);
  }

  if (host === "kassieapp.nl") {
    if (pathname === "/kassie") {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/kassie", request.url));
    }
  }

  const password = process.env.SNUUSHCO_OPS_PASSWORD;
  if (!password) return;

  if (pathname === "/ops/login" || pathname === "/api/ops/login") return;

  const authorization = request.headers.get("authorization") ?? "";
  const expectedUser = process.env.SNUUSHCO_OPS_USER ?? "snuushco";

  if (await hasValidSession(request, expectedUser, password)) return;

  if (authorization.startsWith("Basic ")) {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(":");
    const username = separator >= 0 ? decoded.slice(0, separator) : "";
    const candidate = separator >= 0 ? decoded.slice(separator + 1) : "";
    if (username === expectedUser && candidate === password) return;
  }

  if (pathname.startsWith("/ops")) {
    return Response.redirect(new URL("/ops/login", request.url), 303);
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Snuushco Operations"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
