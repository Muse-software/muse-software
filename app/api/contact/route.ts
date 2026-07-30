import { NextResponse } from "next/server";
import { recordSubmission, getClientIp } from "../../../lib/submissions";
import { isRateLimited } from "../../../lib/rateLimit";
import { isValidEmail, exceedsMaxLength } from "../../../lib/validation";
import { sendResendEmail } from "../../../lib/email";

/**
 * Accepts contact-form submissions. If RESEND_API_KEY is configured, sends a
 * real email via Resend's REST API. If not, it still returns success (so the
 * form works end to end during development) but logs a warning — nothing is
 * actually delivered until a real provider key is set in the environment.
 */
export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, company, projectType, budget, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (
    exceedsMaxLength(name, 200) ||
    exceedsMaxLength(email, 200) ||
    exceedsMaxLength(company ?? "", 200) ||
    exceedsMaxLength(message, 5000)
  ) {
    return NextResponse.json(
      { ok: false, error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  await recordSubmission(
    "contact",
    { name, email, company, projectType, budget, message },
    request,
  );

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    projectType ? `Project type: ${projectType}` : null,
    budget ? `Budget: ${budget}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const { delivered } = await sendResendEmail({
    logLabel: "contact",
    subject: `New enquiry from ${name}`,
    text: emailBody,
    replyTo: email,
    fallbackPayload: { name, email, company, projectType, budget, message },
  });

  return NextResponse.json({ ok: true, delivered });
}
