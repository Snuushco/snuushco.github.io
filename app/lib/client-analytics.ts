export type SnuushcoEventName = "landing_view" | "intake_started" | "intake_submitted" | "checkout_started" | "paid_lead";

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
};

export function sendGoogleEvent(eventName: SnuushcoEventName, metadata: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventMap[eventName], {
    event_category: "snuushco_funnel",
    event_label: typeof metadata.packageName === "string" ? metadata.packageName : eventName,
    ...metadata,
  });
}

