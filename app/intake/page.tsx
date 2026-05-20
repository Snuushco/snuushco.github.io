import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer, Header } from "../page";
import IntakeForm from "./intake-form";

export const metadata: Metadata = {
  title: "Intake | Snuushco",
  description: "Vul de Snuushco intake in en ontvang direct pakketadvies, omvang en vervolgstappen.",
};

export default function IntakePage() {
  return (
    <>
      <Header />
      <main>
        <section className="band white">
          <div className="inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">Slimme intake</p>
                <h1>Ontvang direct pakketadvies en duidelijkheid over de vervolgstap.</h1>
              </div>
              <p>
                De intake kiest een passend pakket, laat zien welke onderdelen standaard passen
                en welke onderdelen extra review nodig hebben. Zo weet je vooraf waar je aan toe bent.
              </p>
            </div>
            <Suspense fallback={<div className="form-panel">Intake wordt geladen.</div>}>
              <IntakeForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
