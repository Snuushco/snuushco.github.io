import type { Metadata } from "next";
import { KassieToolShell } from "../tool-shell";
import InvoiceTool from "./tool";

export const metadata: Metadata = {
  title: "Gratis factuurgenerator voor ZZP'ers | Kassie",
  description: "Maak zonder login een eenvoudige factuur en download/print het resultaat.",
  alternates: { canonical: "https://kassieapp.nl/tools/factuurgenerator" },
};

export default function Page() {
  return (
    <KassieToolShell slug="factuurgenerator" title="Factuurgenerator" description="Maak een eenvoudig factuurconcept zonder login. UBL/export en e-mailflow zijn de volgende bouwfase.">
      <InvoiceTool />
    </KassieToolShell>
  );
}
