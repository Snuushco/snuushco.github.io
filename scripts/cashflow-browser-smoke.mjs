import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const baseUrl =
  process.env.CASHFLOW_LAB_BASE_URL || process.env.BASE_URL || "http://127.0.0.1:3000";
const artifactDir =
  process.env.CASHFLOW_LAB_ARTIFACT_DIR || join(tmpdir(), "cashflow-lab-smoke");
await mkdir(artifactDir, { recursive: true });

const systemBrowserCandidates = [
  process.env.PLAYWRIGHT_EXECUTABLE_PATH,
  process.platform === "win32" ? "C:/Program Files/Google/Chrome/Application/chrome.exe" : null,
  process.platform === "win32" ? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" : null,
].filter(Boolean);
const executablePath = systemBrowserCandidates.find((candidate) => existsSync(candidate));
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
});
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`));

  await page.goto(`${baseUrl}/margecheck-offerteadvies`, { waitUntil: "networkidle" });
  assert.match(await page.title(), /Margecheck \+ Offerteadvies/);
  assert.match(await page.locator("h1").innerText(), /Weet wat één beveiligingsofferte met je marge doet/);
  assert.match(await page.locator("body").innerText(), /€ 99 excl\. btw/);
  assert.match(await page.locator("body").innerText(), /Maximaal 3 founder-pilots/);
  assert.match(await page.locator("body").innerText(), /geen cao-, juridisch, fiscaal, boekhoudkundig of ander gereguleerd advies/i);
  await page.screenshot({ path: `${artifactDir}/desktop-full.png`, fullPage: true });

  const submit = page.getByRole("button", { name: /Controleer en ga naar Stripe/i });
  await submit.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${artifactDir}/desktop-form.png`, fullPage: false });

  await page.locator('input[name="businessEmail"]').fill("owner@small-security.example");
  await page.locator('input[name="company"]').fill("Kleine Beveiliging B.V.");
  await page.locator('input[name="isSmallSecurityCompany"][value="no"]').check();
  await page.locator('input[name="hasConcreteB2BQuote"][value="yes"]').check();
  await page.locator('input[name="acceptsFixedScope"][value="yes"]').check();
  await page.locator('input[name="canProvideSanitizedIntake"][value="yes"]').check();
  await page.locator('input[name="privacyAcknowledged"]').check();
  await page.locator('input[name="termsAccepted"]').check();

  let apiRequests = 0;
  await page.route("**/api/cashflow-lab/checkout", async (route) => {
    apiRequests += 1;
    await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "test route" }) });
  });
  const hydration = await page.locator("form.cashflow-form").evaluate((form) => {
    const reactKeys = Object.keys(form).filter((key) => key.startsWith("__reactProps$"));
    return {
      reactKeys,
      hasOnSubmit: reactKeys.some((key) => typeof form[key]?.onSubmit === "function"),
    };
  });
  assert.equal(
    hydration.hasOnSubmit,
    true,
    JSON.stringify({ hydration, consoleErrors, pageErrors, failedRequests }),
  );
  const ineligibleValidity = await page.locator("form.cashflow-form").evaluate((form) => ({
    valid: form.checkValidity(),
    invalid: [...form.elements]
      .filter((element) => typeof element.checkValidity === "function" && !element.checkValidity())
      .map((element) => ({ name: element.name, value: element.value, message: element.validationMessage })),
  }));
  assert.equal(ineligibleValidity.valid, true, JSON.stringify(ineligibleValidity));
  await submit.click();
  await page.waitForTimeout(750);
  const ineligibleAlert = await page.locator('[role="alert"]').allInnerTexts();
  const ineligibleButtonText = await submit.innerText();
  const ineligibleFormText = await page.locator("form.cashflow-form").innerText();
  assert.match(
    ineligibleAlert.join(" "),
    /Deze pilot is alleen voor kleine beveiligingsbedrijven/i,
    `onverwachte ongeschiktheidsstatus; apiRequests=${apiRequests}; button=${ineligibleButtonText}; formTail=${ineligibleFormText.slice(-400)}`,
  );
  assert.equal(apiRequests, 0, "een ongeschikte aanvraag mag de server niet bereiken");

  await page.locator('input[name="isSmallSecurityCompany"][value="yes"]').check();
  let submittedPayload;
  await page.unroute("**/api/cashflow-lab/checkout");
  await page.route("**/api/cashflow-lab/checkout", async (route) => {
    apiRequests += 1;
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ url: "https://example.com/onveilige-testcheckout" }),
    });
  });
  await submit.click();
  await page.getByText(/De betaalpagina kon niet veilig worden geopend\. Er is niets afgeschreven\./i).waitFor();
  assert.equal(apiRequests, 1);
  assert.deepEqual(Object.keys(submittedPayload).sort(), [
    "acceptsFixedScope",
    "businessEmail",
    "canProvideSanitizedIntake",
    "company",
    "hasConcreteB2BQuote",
    "isSmallSecurityCompany",
    "privacyAcknowledged",
    "termsAccepted",
  ]);
  assert.equal(submittedPayload.amount, undefined);
  assert.equal(submittedPayload.quote, undefined);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto(`${baseUrl}/margecheck-offerteadvies`, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: `${artifactDir}/mobile-full.png`, fullPage: true });
  const mobileLayout = await mobile.locator("body").evaluate((body) => {
    const viewportWidth = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll("*")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        };
      })
      .filter((item) => item.right > viewportWidth + 1 || item.left < -1)
      .sort((a, b) => b.right - a.right)
      .slice(0, 12);
    return { bodyWidth: body.scrollWidth, viewportWidth, offenders };
  });
  assert.ok(
    mobileLayout.bodyWidth <= mobileLayout.viewportWidth,
    `mobiele pagina heeft horizontale overflow: ${JSON.stringify(mobileLayout)}`,
  );
  await mobile.close();

  assert.deepEqual(consoleErrors, []);
  console.log(`CASHFLOW_BROWSER_SMOKE_PASS apiRequests=${apiRequests} mobileWidth=${mobileLayout.bodyWidth} artifacts=${artifactDir}`);
} finally {
  await browser.close();
}
