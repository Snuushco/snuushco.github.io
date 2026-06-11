import type { Metadata } from "next";
import InvoiceTool from "./tool";
export const metadata: Metadata = { title: "Gratis factuurgenerator voor ZZP'ers | Kassie", description: "Maak zonder login een eenvoudige factuur en download/print het resultaat." };
export default function Page() { return <InvoiceTool />; }
