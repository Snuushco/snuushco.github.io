import type { Metadata } from "next";
import { kassieBaseUrl } from "../../kassie/content";
import BtwCalculator from "./tool";
export const metadata: Metadata = { title: "Gratis BTW-calculator voor ZZP'ers | Kassie", description: "Bereken btw inclusief/exclusief bedrag en krijg een kwartaalcheck en KOR-waarschuwing op hoofdlijnen.", alternates: { canonical: `${kassieBaseUrl}/tools/btw-calculator` }, openGraph: { title: "Gratis BTW-calculator voor ZZP'ers | Kassie", description: "Bereken btw en controleer je kwartaalvoorbereiding.", url: `${kassieBaseUrl}/tools/btw-calculator` } };
export default function Page() { return <BtwCalculator />; }
