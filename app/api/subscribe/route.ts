import { NextResponse } from "next/server";
import { recordSubmission, getClientIp } from "../../../lib/submissions";
import { isRateLimited } from "../../../lib/rateLimit";
import { isValidEmail, exceedsMaxLength } from "../../../lib/validation";

/**
 * Accepts newsletter signups. There's no email service provider (e.g. an ESP
 * like Mailchimp/ConvertKit) connected yet — this validates the email,
 * records it to the local submission log so nothing is lost, but no real
 * mailing list exists until a provider is wired in via CONVERTKIT_API_KEY
 * (or similar).
 */
export async function POST(request: Request) {
  if (isRateLimited(`subscribe:${getClientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_body", error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !isValidEmail(email) || exceedsMaxLength(email, 200)) {
    return NextResponse.json({ ok: false, code: "email_required", error: "A valid email is required." }, { status: 400 });
  }

  await recordSubmission("newsletter", { email }, request);

  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) {
    console.warn(
      "[subscribe] No email provider configured (CONVERTKIT_API_KEY) — signup was not stored:",
      email
    );
    return NextResponse.json({ ok: true, subscribed: false });
  }

  // Wire up a real ESP call here once CONVERTKIT_API_KEY (or another
  // provider's key) is set.
  return NextResponse.json({ ok: true, subscribed: true });
}
