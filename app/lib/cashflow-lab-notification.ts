import { markCashflowLabNotification } from "./db";

async function notifyCashflowLabPayment() {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const telegramChatId = process.env.SNUUSHCO_TELEGRAM_CHAT_ID?.trim();
  if (!telegramToken || !telegramChatId) return "not_configured" as const;

  const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal: AbortSignal.timeout(4_000),
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: [
        "Cashflow Lab: provider-bevestigde betaling ontvangen.",
        "Open Snuushco Ops voor de gekoppelde fulfillmenttaak en controleer daarna Stripe.",
        "Start alleen na een complete PII-arme intake en scopecontrole.",
        "Deel geen klant-, medewerker- of offertegegevens in Telegram.",
      ].join("\n"),
    }),
  });

  if (!response.ok) throw new Error("cashflow_lab_payment_notification_failed");
  return "sent" as const;
}

export async function finishCashflowLabPaymentNotification(result: {
  tracked: boolean;
  shouldNotify: boolean;
  sessionId: string | null;
}) {
  if (!result.tracked || !result.shouldNotify || !result.sessionId) return;

  try {
    const notification = await notifyCashflowLabPayment();
    if (notification === "not_configured") {
      await markCashflowLabNotification(result.sessionId, {
        sent: false,
        error: "telegram_notification_not_configured_order_available_in_ops",
      });
      return;
    }
    await markCashflowLabNotification(result.sessionId, { sent: true });
  } catch (error) {
    await markCashflowLabNotification(result.sessionId, {
      sent: false,
      error: error instanceof Error ? error.name : "unknown_notification_error",
    });
    throw error;
  }
}
