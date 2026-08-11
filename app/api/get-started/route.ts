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

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_body", error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (
    parsedBody === null ||
    typeof parsedBody !== "object" ||
    Array.isArray(parsedBody) ||
    Object.values(parsedBody).some((value) => typeof value !== "string")
  ) {
    return NextResponse.json(
      { ok: false, code: "invalid_body", error: "Invalid request body." },
      { status: 400 },
    );
  }

  const body = parsedBody as Record<string, string>;

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
    source,
    preferredContact,
  } = body;

  // /start (the guided conversation) asks far less than the retired
  // qualification form: no last name, company, job title, or revenue band.
  // Gating it on those would just make the flow lie about what it collects.
  const isStart = source === "start";

  if (isStart) {
    if (
      !firstName ||
      !email ||
      !needs ||
      (preferredContact !== "call" && preferredContact !== "write")
    ) {
      return NextResponse.json(
        { ok: false, code: "missing_fields", error: "Please fill in all required fields." },
        { status: 400 },
      );
    }
    if (preferredContact === "call" && !phone) {
      return NextResponse.json(
        {
          ok: false,
          code: "phone_required_for_call",
          error: "Please add a phone number so we can call you.",
        },
        { status: 400 },
      );
    }
  } else if (
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
    exceedsMaxLength(email, 200) ||
    exceedsMaxLength(needs, 5000) ||
    (lastName && exceedsMaxLength(lastName, 200)) ||
    (phone && exceedsMaxLength(phone, 50)) ||
    (company && exceedsMaxLength(company, 200)) ||
    (jobTitle && exceedsMaxLength(jobTitle, 200)) ||
    (preferredContact && exceedsMaxLength(preferredContact, 50)) ||
    (source && exceedsMaxLength(source, 50))
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
      source,
      preferredContact,
    },
    request,
  );

  const preferredContactLabel =
    preferredContact === "call" ? "Request a call" : preferredContact === "write" ? "Write to us" : null;

  const emailBody = isStart
    ? [
        `Name: ${firstName}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        company ? `Company: ${company}` : null,
        preferredContactLabel ? `Preferred contact: ${preferredContactLabel}` : null,
        "Source: start",
        "",
        needs,
      ]
        .filter(Boolean)
        .join("\n")
    : [
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
    subject: isStart
      ? `New Start conversation from ${firstName}`
      : `New Get Started request from ${firstName} ${lastName} (${company})`,
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
      source,
      preferredContact,
    },
  });

  return NextResponse.json({ ok: true, delivered });
}
