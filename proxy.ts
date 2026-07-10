import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const sessionCookie = "snuushco_ops_session";

const kassieMarketingPaths = new Set([
  "/aftrekposten-zzp",
  "/boekhouden-zzp",
  "/btw-aangifte-zzp",
  "/e-facturatie-peppol-vida",
  "/e-facturatie/vida-peppol-tijdlijn",
  "/factureren-zzp",
  "/marketing/kassie-operating-model",
  "/tools/aftrekposten-checker",
  "/tools/btw-calculator",
  "/tools/factuurgenerator",
  "/tools/peppol-ready-check",
  "/tools/uurtarief-calculator",
  "/zzp-starten-administratie",
]);

function isKassieMarketingPath(pathname: string) {
  return kassieMarketingPaths.has(pathname)
    || pathname.startsWith("/blog")
    || pathname.startsWith("/boekhouden-voor/")
    || pathname.startsWith("/kennisbank/")
    || pathname.startsWith("/vergelijk/");
}

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

  if (host === "snuushco.nl" || host === "www.snuushco.nl") {
    if (pathname === "/kassie" || pathname.startsWith("/kassie/")) {
      return NextResponse.redirect("https://kassieapp.nl", 308);
    }
    if (isKassieMarketingPath(pathname)) {
      return NextResponse.redirect(new URL(`${pathname}${request.nextUrl.search}`, "https://kassieapp.nl"), 308);
    }
  }

  if (host === "kassieapp.nl") {
    const isInternalKassieRewrite = request.headers.get("x-kassie-root-rewrite") === "1";

    if ((pathname === "/kassie" || pathname.startsWith("/kassie/")) && !isInternalKassieRewrite) {
      return NextResponse.redirect(new URL("/", request.url), 308);
    }
    if (pathname === "/") {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-kassie-root-rewrite", "1");
      return NextResponse.rewrite(new URL("/kassie", request.url), {
        request: { headers: requestHeaders },
      });
    }

    if (pathname === "/pricing" || pathname === "/blog" || pathname.startsWith("/blog/")) {
      const appUrl = new URL(pathname, "https://mijn.kassieapp.nl");
      appUrl.search = request.nextUrl.search;
      return NextResponse.redirect(appUrl, 308);
    }

    if (!pathname.startsWith("/ops") && !pathname.startsWith("/api/ops")) {
      return;
    }
  }

  if (!pathname.startsWith("/ops") && !pathname.startsWith("/api/ops")) {
    return;
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
