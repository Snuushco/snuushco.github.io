import type { Metadata } from "next";
import HourlyRateTool from "./tool";

export const metadata: Metadata = { title: "Uurtarief-calculator ZZP | Kassie", description: "Bereken een realistisch ZZP-uurtarief op basis van inkomen, kosten, vrije weken en factureerbare uren." };

export default function Page() {
  return <HourlyRateTool />;
}
