import type { Metadata } from "next";
import { kassieBaseUrl } from "../../kassie/content";
import InvoiceTool from "./tool";
export const metadata: Metadata = { title: "Gratis factuurgenerator voor ZZP'ers | Kassie", description: "Maak zonder login een eenvoudige factuur en krijg factuureisen-checklist en UBL-preview.", alternates: { canonical: `${kassieBaseUrl}/tools/factuurgenerator` }, openGraph: { title: "Gratis factuurgenerator voor ZZP'ers | Kassie", description: "Maak een factuurconcept met btw, checklist en UBL-preview.", url: `${kassieBaseUrl}/tools/factuurgenerator` } };
export default function Page() { return <InvoiceTool />; }
