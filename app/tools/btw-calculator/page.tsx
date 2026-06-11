import type { Metadata } from "next";
import BtwCalculator from "./tool";
export const metadata: Metadata = { title: "Gratis BTW-calculator voor ZZP'ers | Kassie", description: "Bereken btw inclusief/exclusief bedrag en krijg een KOR-check op hoofdlijnen." };
export default function Page() { return <BtwCalculator />; }
