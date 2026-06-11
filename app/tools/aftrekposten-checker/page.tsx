import type { Metadata } from "next";
import DeductionCheckerTool from "./tool";

export const metadata: Metadata = { title: "Aftrekposten-checker | Kassie", description: "Check mogelijke zakelijke kosten, bewijsstukken en reviewpunten voor ZZP-aftrekposten." };

export default function Page() {
  return <DeductionCheckerTool />;
}
