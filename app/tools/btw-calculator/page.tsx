import type { Metadata } from "next";
import { KassieToolShell } from "../tool-shell";
import BtwCalculator from "./tool";

export const metadata: Metadata = {
  title: "Gratis BTW-calculator voor ZZP'ers | Kassie",
  description: "Bereken btw inclusief/exclusief bedrag en krijg een KOR-check op hoofdlijnen.",
  alternates: { canonical: "https://kassieapp.nl/tools/btw-calculator" },
};

export default function Page() {
  return (
    <KassieToolShell slug="btw-calculator" title="BTW-calculator" description="Bereken snel bedrag exclusief btw, btw-bedrag en bedrag inclusief btw. Geen persoonlijk belastingadvies.">
      <BtwCalculator />
    </KassieToolShell>
  );
}
