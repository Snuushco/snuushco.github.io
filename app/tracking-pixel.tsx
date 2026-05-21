"use client";

import { useEffect } from "react";

export default function TrackingPixel({ eventName, metadata = {} }: { eventName: "landing_view"; metadata?: Record<string, unknown> }) {
  useEffect(() => {
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
  }, [eventName, metadata]);

  return null;
}
