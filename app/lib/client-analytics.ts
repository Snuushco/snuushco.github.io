export type SnuushcoEventName =
  | "landing_view"
  | "intake_started"
  | "intake_submitted"
  | "checkout_started"
  | "paid_lead"
  | "tool_viewed"
  | "tool_completed"
  | "tool_exported"
  | "tool_email_requested";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const eventMap: Record<SnuushcoEventName, string> = {
  landing_view: "landing_view",
  intake_started: "generate_lead_start",
  intake_submitted: "generate_lead",
  checkout_started: "begin_checkout",
  paid_lead: "purchase",
  tool_viewed: "view_item",
  tool_completed: "generate_lead",
  tool_exported: "file_download",
  tool_email_requested: "generate_lead",
};

export function sendGoogleEvent(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventMap[eventName], {
    event_category: "kassie_lead_magnet",
    event_label:
      typeof metadata.tool === "string"
        ? metadata.tool
        : typeof metadata.packageName === "string"
          ? metadata.packageName
          : eventName,
    ...metadata,
  });
}

export function trackKassieToolEvent(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}) {
  sendGoogleEvent(eventName, metadata);

  if (typeof window === "undefined") return;

  const payload = {
    eventName,
    path: window.location.pathname,
    metadata: {
      product: "kassie",
      ...metadata,
    },
  };

  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
