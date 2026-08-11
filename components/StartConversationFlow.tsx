"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useFormSubmit } from "@/lib/useFormSubmit";

type DeepLinkIntent = "build" | "improve" | "ai" | "capability";
type Intent = DeepLinkIntent | "unsure";
type ScreenState = { intent: Intent | null; screen: 0 | 1 | 2 };

const DEEP_LINK_INTENTS: DeepLinkIntent[] = ["build", "improve", "ai", "capability"];
const SCREEN0_OPTIONS: Intent[] = ["build", "improve", "ai", "capability", "unsure"];

// Q1/Q2 stay in one branching table, not scattered `if (intent === ...)`
// chains, so §10.3's five rows (brief) map 1:1 to five entries here.
const SCREEN1_CONFIG: Record<DeepLinkIntent, { hasQ1: boolean; q2Options: string[] }> = {
  build: {
    hasQ1: true,
    q2Options: ["Just an idea", "A written plan", "Early designs", "A working prototype"],
  },
  improve: {
    hasQ1: true,
    q2Options: ["The experience", "Performance", "Growth", "A rethink"],
  },
  ai: {
    hasQ1: false,
    q2Options: ["Operations", "Customers", "Your product", "Not sure yet"],
  },
  capability: {
    hasQ1: true,
    q2Options: [
      "Product Strategy & Discovery",
      "Product & Experience Design",
      "Product Engineering",
      "AI",
      "Gamification & Experience",
    ],
  },
};

// The team's inbox reads one language regardless of the visitor's locale —
// same rule the retired qualification form's service values followed. Free text the
// visitor actually types (Q1, the open prompt) is preserved verbatim.
const INTENT_LABELS_EN: Record<Intent, string> = {
  build: "Start something new",
  improve: "Improve a product",
  ai: "Explore AI Transformation",
  capability: "Needs a specific capability",
  unsure: "Not sure yet",
};
const Q1_LABELS_EN: Partial<Record<DeepLinkIntent, string>> = {
  build: "About the idea",
  improve: "About the product",
  capability: "About the work",
};
const Q2_LABELS_EN: Record<DeepLinkIntent, string> = {
  build: "Where it is today",
  improve: "What matters most right now",
  ai: "Where AI should help",
  capability: "Capability needed",
};
const CONTACT_LABELS_EN: Record<"call" | "write", string> = {
  call: "Request a call",
  write: "Write to us",
};

const METHODS = [
  { key: "whatsapp", detail: "+966 59 273 1040", href: "https://wa.me/966592731040" },
  { key: "email", detail: "info@muse.sa", href: "mailto:info@muse.sa" },
] as const;

function deriveStateFromSearch(search: string): ScreenState {
  const params = new URLSearchParams(search);
  const intentParam = params.get("intent");
  if (intentParam === "unsure") return { intent: "unsure", screen: 2 };
  if (intentParam && (DEEP_LINK_INTENTS as string[]).includes(intentParam)) {
    return { intent: intentParam as DeepLinkIntent, screen: params.get("step") === "contact" ? 2 : 1 };
  }
  return { intent: null, screen: 0 };
}

function buildUrl(pathname: string, state: ScreenState): string {
  const params = new URLSearchParams();
  if (state.intent === "unsure") {
    params.set("intent", "unsure");
  } else if (state.intent) {
    params.set("intent", state.intent);
    if (state.screen === 2) params.set("step", "contact");
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

function composeNeeds({
  intent,
  q1,
  q2,
  openPrompt,
  preferredContact,
}: {
  intent: Intent | null;
  q1: string;
  q2: string;
  openPrompt: string;
  preferredContact: "call" | "write" | "";
}): string {
  const lines: string[] = [];
  if (intent) lines.push(`Intent: ${INTENT_LABELS_EN[intent]}`);
  if (intent === "unsure") {
    if (openPrompt.trim()) lines.push(`Notes: ${openPrompt.trim()}`);
  } else if (intent) {
    const q1Label = Q1_LABELS_EN[intent];
    if (q1Label && q1.trim()) lines.push(`${q1Label}: ${q1.trim()}`);
    if (q2) lines.push(`${Q2_LABELS_EN[intent]}: ${q2}`);
  }
  if (preferredContact) lines.push(`Preferred contact: ${CONTACT_LABELS_EN[preferredContact]}`);
  return lines.join("\n");
}

const inputClass =
  "w-full resize-none border border-white/35 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#fd4601]";
const labelClass = "text-sm font-semibold tracking-[0.08em] text-white/65";
const headingClass = "font-space-grotesk text-2xl font-bold text-white md:text-3xl";
const choiceLabelClass =
  "flex min-h-12 cursor-pointer items-center gap-3 border border-white/35 px-4 py-3 text-base text-white/80 transition-colors has-[:checked]:border-[#fd4601] has-[:checked]:bg-[#fd4601]/10 has-[:checked]:text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#fd4601]";
const intentChoiceClass = `${choiceLabelClass} w-full`;
const primaryButtonClass =
  "inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601]";
const secondaryButtonClass =
  "inline-flex items-center gap-2 border border-white/35 px-6 py-3 text-base font-medium font-space-grotesk text-white transition-colors duration-200 hover:border-[#fd4601] hover:text-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601]";
const linkButtonClass =
  "text-sm text-white/60 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-[#fd4601] hover:decoration-[#fd4601] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601]";

export default function StartConversationFlow({ initialIntent }: { initialIntent?: DeepLinkIntent }) {
  const t = useTranslations("Start");
  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms.errors");
  const { status, delivered, error: hookError, submit } = useFormSubmit("/api/get-started");

  const [state, setState] = useState<ScreenState>(() =>
    initialIntent ? { intent: initialIntent, screen: 1 } : { intent: null, screen: 0 },
  );
  const [hasVisitedScreen0, setHasVisitedScreen0] = useState(!initialIntent);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [openPrompt, setOpenPrompt] = useState("");
  const [preferredContact, setPreferredContact] = useState<"" | "call" | "write">("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [contextError, setContextError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const isFirstRender = useRef(true);

  const navigate = useCallback((next: ScreenState) => {
    setState(next);
    if (next.screen === 0) setHasVisitedScreen0(true);
    window.history.pushState({}, "", buildUrl(window.location.pathname, next));
  }, []);

  useEffect(() => {
    function onPopState() {
      const next = deriveStateFromSearch(window.location.search);
      setState(next);
      if (next.screen === 0) setHasVisitedScreen0(true);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Step change moves focus to the new step's heading — skip on first mount
  // so a fresh page load doesn't steal focus from the natural document start.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [state.screen, state.intent]);

  useEffect(() => {
    if (status === "success") headingRef.current?.focus();
  }, [status]);

  const skipsContext = state.intent === "unsure";
  const total = (hasVisitedScreen0 ? 1 : 0) + (skipsContext ? 0 : 1) + 1;
  const stepIndex = state.screen === 0 ? 1 : state.screen === 1 ? (hasVisitedScreen0 ? 2 : 1) : total;
  const progressText = t("progress.stepOf", { step: stepIndex, total });

  const composedNeeds = useMemo(
    () => composeNeeds({ intent: state.intent, q1, q2, openPrompt, preferredContact }),
    [state.intent, q1, q2, openPrompt, preferredContact],
  );

  function handleSelectIntent(value: Intent) {
    setQ1("");
    setQ2("");
    setContextError(null);
    if (value === "unsure") navigate({ intent: "unsure", screen: 2 });
    else navigate({ intent: value, screen: 1 });
  }

  function handleSkipFromScreen0() {
    navigate({ intent: "unsure", screen: 2 });
  }

  function handleContinueFromScreen1() {
    if (!state.intent || state.intent === "unsure") return;
    const config = SCREEN1_CONFIG[state.intent];
    if ((config.hasQ1 && !q1.trim()) || !q2) {
      setContextError(t("screen1.requiredError"));
      return;
    }
    setContextError(null);
    navigate({ intent: state.intent, screen: 2 });
  }

  function handleBackFromScreen1() {
    navigate({ intent: null, screen: 0 });
  }

  function handleBackFromScreen2() {
    if (state.intent === "unsure") navigate({ intent: null, screen: 0 });
    else navigate({ intent: state.intent, screen: 1 });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const email = emailRef.current?.value.trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      setEmailError(tForms("invalid_email"));
      emailRef.current?.focus();
      return;
    }
    setEmailError(null);
    if (preferredContact === "call" && !phoneRef.current?.value.trim()) {
      e.preventDefault();
      setPhoneError(tForms("phone_required_for_call"));
      phoneRef.current?.focus();
      return;
    }
    setPhoneError(null);
    submit(e);
  }

  if (status === "success") {
    return (
      <div
        data-testid="outcome-region"
        role={delivered ? "status" : "alert"}
        className="flex flex-col items-center gap-4 border border-[#fd4601]/40 bg-[#fd4601]/5 p-10 text-center md:p-16"
      >
        <h2 ref={headingRef} tabIndex={-1} data-testid="step-heading" className={`${headingClass} outline-none`}>
          {delivered ? t("success.deliveredTitle") : t("success.notedTitle")}
        </h2>
        <p
          data-testid="success"
          data-delivered={String(delivered)}
          className="max-w-md text-base leading-7 text-white/70"
        >
          {delivered
            ? preferredContact === "call"
              ? t("success.deliveredBodyCall")
              : t("success.deliveredBodyWrite")
            : t("success.notedBody")}
        </p>
        {!delivered && (
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {METHODS.map((method) => (
              <a
                key={method.key}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClass}
              >
                {t(`methods.${method.key}`)}
                <span dir="ltr" className="text-white/50">
                  {method.detail}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <p aria-live="polite" className="sr-only" data-testid="progress-live">
        {progressText}
      </p>
      <p
        data-testid="progress-visible"
        className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#fd4601]"
      >
        {progressText}
      </p>

      {state.screen === 0 && (
        <div data-testid="screen-0">
          <h2 ref={headingRef} tabIndex={-1} data-testid="step-heading" className={`${headingClass} outline-none`}>
            {t("screen0.heading")}
          </h2>
          <fieldset className="mt-8 flex flex-col gap-3">
            <legend className="sr-only">{t("screen0.heading")}</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {SCREEN0_OPTIONS.map((option) => (
                <label key={option} className={intentChoiceClass}>
                  <input
                    type="radio"
                    name="intent"
                    value={option}
                    checked={state.intent === option}
                    onChange={() => handleSelectIntent(option)}
                    className="accent-[#fd4601]"
                  />
                  <span>{t(`screen0.options.${option}`)}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            data-testid="skip-to-contact"
            onClick={handleSkipFromScreen0}
            className={`${linkButtonClass} mt-8 block`}
          >
            {t("skipToContact")}
          </button>
        </div>
      )}

      {state.screen === 1 && state.intent && state.intent !== "unsure" && (
        <div data-testid="screen-1">
          <h2 ref={headingRef} tabIndex={-1} data-testid="step-heading" className={`${headingClass} outline-none`}>
            {t("screen1.heading")}
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {SCREEN1_CONFIG[state.intent].hasQ1 && (
              <div className="flex flex-col gap-2">
                <label htmlFor="q1" className={labelClass}>
                  {t(`screen1.${state.intent}.q1Label`)}
                </label>
                <textarea
                  id="q1"
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>
            )}

            <fieldset className="flex flex-col gap-3">
              <legend className={labelClass}>{t(`screen1.${state.intent}.q2Legend`)}</legend>
              <div className="flex flex-wrap gap-3">
                {SCREEN1_CONFIG[state.intent].q2Options.map((option) => (
                  <label key={option} className={choiceLabelClass}>
                    <input
                      type="radio"
                      name="contextChoice"
                      value={option}
                      checked={q2 === option}
                      onChange={() => setQ2(option)}
                      className="accent-[#fd4601]"
                    />
                    {t(`screen1.${state.intent}.q2Options.${option}`)}
                  </label>
                ))}
              </div>
            </fieldset>
            {contextError && (
              <p data-testid="context-error" role="alert" className="text-sm text-red-400">
                {contextError}
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <button type="button" data-testid="skip-to-contact" onClick={() => navigate({ intent: state.intent, screen: 2 })} className={`${linkButtonClass} self-start`}>
              {t("skipToContact")}
            </button>
            <div className="flex flex-wrap items-center justify-between gap-4">
            <button type="button" data-testid="back-button" onClick={handleBackFromScreen1} className={secondaryButtonClass}>
              <span aria-hidden="true" className="arrow-inline">
                ←
              </span>
              {tCommon("previous")}
            </button>
              <button type="button" data-testid="continue-button" onClick={handleContinueFromScreen1} className={primaryButtonClass}>
                {tCommon("next")}
                <span aria-hidden="true" className="arrow-inline">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {state.screen === 2 && (
        <div data-testid="screen-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="source" value="start" readOnly />
            <input type="hidden" name="needs" value={composedNeeds} readOnly />
            {/* Honeypot stays off the logical start edge to avoid RTL overflow. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -start-[9999px] h-0 w-0 opacity-0"
            />

            <h2 ref={headingRef} tabIndex={-1} data-testid="step-heading" className={`${headingClass} outline-none`}>
              {t("screen2.heading")}
            </h2>

            {state.intent === "unsure" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="openPrompt" className={labelClass}>
                  {t("screen2.openPromptLabel")}
                </label>
                <textarea
                  id="openPrompt"
                  value={openPrompt}
                  onChange={(e) => setOpenPrompt(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className={labelClass}>
                  {t("screen2.firstName")}
                  <span className="text-[#fd4601]">*</span>
                </label>
                <input id="firstName" name="firstName" type="text" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  {t("screen2.email")}
                  <span className="text-[#fd4601]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  required
                  ref={emailRef}
                  onChange={() => setEmailError(null)}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={inputClass}
                />
                {emailError && (
                  <p id="email-error" role="alert" className="text-sm text-red-400">
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className={labelClass}>
                  {t("screen2.phone")}
                  {preferredContact === "call" ? (
                    <span className="text-[#fd4601]">*</span>
                  ) : (
                    <span className="ms-2 font-normal text-white/45">{t("screen2.optional")}</span>
                  )}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  ref={phoneRef}
                  onChange={() => setPhoneError(null)}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                  className={inputClass}
                />
                {phoneError && (
                  <p id="phone-error" role="alert" className="text-sm text-red-400">
                    {phoneError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className={labelClass}>
                  {t("screen2.company")}
                  <span className="ms-2 font-normal text-white/45">{t("screen2.optional")}</span>
                </label>
                <input id="company" name="company" type="text" className={inputClass} />
              </div>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className={labelClass}>
                {t("screen2.preferredContactLegend")}
                <span className="text-[#fd4601]">*</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {(["call", "write"] as const).map((choice) => (
                  <label
                    key={choice}
                    data-selected={preferredContact === choice ? "true" : "false"}
                    style={
                      preferredContact === choice
                        ? { backgroundColor: "rgba(253, 70, 1, 0.1)", borderColor: "#fd4601", color: "#fff" }
                        : undefined
                    }
                    className={choiceLabelClass}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={choice}
                      required
                      checked={preferredContact === choice}
                      onChange={() => setPreferredContact(choice)}
                      className="accent-[#fd4601]"
                    />
                    {t(`screen2.preferredContact.${choice}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                {hookError}
              </p>
            )}

            <div data-testid="contact-actions" className="flex flex-wrap items-center gap-4">
              <button type="button" data-testid="back-button" onClick={handleBackFromScreen2} className={secondaryButtonClass}>
                <span aria-hidden="true" className="arrow-inline">
                  ←
                </span>
                {tCommon("previous")}
              </button>
              <button type="submit" disabled={status === "submitting"} className={primaryButtonClass}>
                {status === "submitting" ? t("nav.submitting") : t("nav.submit")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
