/**
 * Shared Resend dispatch for /api/contact and /api/get-started — both routes
 * previously duplicated this env-var/no-key-fallback/fetch/error-handling
 * block verbatim, differing only in the log label, subject line, and body
 * text (which each route still builds itself, since those genuinely differ).
 */
export async function sendResendEmail({
  logLabel,
  subject,
  text,
  replyTo,
  fallbackPayload,
}: {
  logLabel: string;
  subject: string;
  text: string;
  replyTo: string;
  fallbackPayload: unknown;
}): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL_TO || "info@muse.sa";

  if (!apiKey) {
    console.warn(
      `[${logLabel}] RESEND_API_KEY is not set — submission was not emailed. Payload:`,
      fallbackPayload,
    );
    return { delivered: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Muse Studios <onboarding@resend.dev>",
        to: recipient,
        reply_to: replyTo,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      console.error(`[${logLabel}] Resend API responded with an error`, await res.text());
      return { delivered: false };
    }

    return { delivered: true };
  } catch (err) {
    console.error(`[${logLabel}] Failed to send email`, err);
    return { delivered: false };
  }
}
