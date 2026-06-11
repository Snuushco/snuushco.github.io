"use client";

import { useEffect } from "react";
import { trackMarketingEvent } from "./lib/client-analytics";

export default function TrackingPixel({ eventName, metadata = {} }: { eventName: "landing_view" | "kassie_tool_view"; metadata?: Record<string, unknown> }) {
  useEffect(() => {
    trackMarketingEvent(eventName, metadata);
  }, [eventName, metadata]);

  return null;
}
