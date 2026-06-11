import type { Metadata } from "next";
import PeppolReadyTool from "./tool";

export const metadata: Metadata = { title: "Peppol-ready-check | Kassie", description: "Check of je facturatie klaar is voor e-facturatie via UBL/Peppol." };

export default function Page() {
  return <PeppolReadyTool />;
}
