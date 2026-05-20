import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | Snuushco Operations",
  robots: { index: false, follow: false },
};

export default function OpsLoginPage() {
  return (
    <main className="ops-page">
      <section className="ops-auth-card">
        <LockKeyhole />
        <h1>Operations login</h1>
        <p>Log in om leads, betalingen en productiekaarten te beheren.</p>
        <form className="ops-login-form" action="/api/ops/login" method="post">
          <label>
            Gebruiker
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            Wachtwoord
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Inloggen</button>
        </form>
      </section>
    </main>
  );
}
