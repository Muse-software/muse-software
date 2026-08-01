import { NextResponse } from "next/server";
import { recordSubmission, getClientIp } from "../../../lib/submissions";
import { isRateLimited } from "../../../lib/rateLimit";
import { isValidEmail, exceedsMaxLength } from "../../../lib/validation";
import { sendResendEmail } from "../../../lib/email";

/**
 * Accepts get-started qualification-form submissions. Same honest pattern as
 * /api/contact: sends via Resend if RESEND_API_KEY is set, otherwise logs a
 * warning and still returns success so the form works end to end in dev.
 */
export async function POST(request: Request) {
  if (isRateLimited(`get-started:${getClientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_body", error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — bots fill every field, real users never see or fill this one.
  if (body.website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    jobTitle,
    annualRevenue,
    services,
    needs,
    hearAboutUs,
    other,
  } = body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !company ||
    !jobTitle ||
    !needs
  ) {
    return NextResponse.json(
      { ok: false, code: "missing_fields", error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, code: "invalid_email", error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (
    exceedsMaxLength(firstName, 200) ||
    exceedsMaxLength(lastName, 200) ||
    exceedsMaxLength(email, 200) ||
    exceedsMaxLength(phone, 50) ||
    exceedsMaxLength(company, 200) ||
    exceedsMaxLength(jobTitle, 200) ||
    exceedsMaxLength(needs, 5000)
  ) {
    return NextResponse.json(
      { ok: false, code: "too_long", error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  await recordSubmission(
    "get-started",
    {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      annualRevenue,
      services,
      needs,
      hearAboutUs,
      other,
    },
    request,
  );

  const emailBody = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company}`,
    `Job title: ${jobTitle}`,
    annualRevenue ? `Annual revenue: ${annualRevenue}` : null,
    services ? `Interested in: ${services}` : null,
    hearAboutUs
      ? `Heard about us via: ${hearAboutUs}${other ? ` (${other})` : ""}`
      : null,
    "",
    "Specific needs:",
    needs,
  ]
    .filter(Boolean)
    .join("\n");

  const { delivered } = await sendResendEmail({
    logLabel: "get-started",
    subject: `New Get Started request from ${firstName} ${lastName} (${company})`,
    text: emailBody,
    replyTo: email,
    fallbackPayload: {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      annualRevenue,
      services,
      needs,
      hearAboutUs,
      other,
    },
  });

  return NextResponse.json({ ok: true, delivered });
}
