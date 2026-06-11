import type { KassieEventName } from "./kassie-seo";

export type SnuushcoEventName = KassieEventName;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const eventMap: Record<SnuushcoEventName, string> = {
  landing_view: "landing_view",
  kassie_tool_view: "view_item",
  kassie_tool_used: "select_content",
  newsletter_signup: "sign_up",
  contact_click: "contact",
  intake_started: "generate_lead_start",
  intake_submitted: "generate_lead",
  checkout_started: "begin_checkout",
  paid_lead: "purchase",
};

const eventCategoryMap: Record<SnuushcoEventName, string> = {
  landing_view: "snuushco_funnel",
  kassie_tool_view: "kassie_tool",
  kassie_tool_used: "kassie_tool",
  newsletter_signup: "kassie_lead",
  contact_click: "kassie_lead",
  intake_started: "snuushco_funnel",
  intake_submitted: "snuushco_funnel",
  checkout_started: "snuushco_funnel",
  paid_lead: "snuushco_funnel",
};

export function sendGoogleEvent(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventMap[eventName], {
    event_category: eventCategoryMap[eventName],
    event_label: typeof metadata.packageName === "string" ? metadata.packageName : typeof metadata.tool === "string" ? metadata.tool : eventName,
    ...metadata,
  });
}

export function trackMarketingEvent(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  sendGoogleEvent(eventName, metadata);

  const searchParams = new URLSearchParams(window.location.search);
  const payload = JSON.stringify({
    eventName,
    source: searchParams.get("utm_source") ?? searchParams.get("source") ?? "",
    campaign: searchParams.get("utm_campaign") ?? searchParams.get("campaign") ?? "",
    path: window.location.pathname,
    metadata,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  });
}
