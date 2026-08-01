"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormSubmit } from "../../lib/useFormSubmit";

// Submitted values stay English and stable; only the visible labels are
// translated. `hearAboutUs === "Other"` below keys off the value, so the
// "Please specify" field keeps working in every locale.
const services = ["AI Transformation", "Product Engineering", "Gamification & Experience", "Not sure yet"];

const revenueBands = [
  "Under 5M SAR",
  "5M–20M SAR",
  "20M–75M SAR",
  "75M–200M SAR",
  "200M–500M SAR",
  "500M+ SAR",
];

const hearAboutOptions = [
  "Search Engine (Google, Bing, etc)",
  "AI App (ChatGPT, Perplexity, etc)",
  "X",
  "LinkedIn",
  "Instagram",
  "YouTube",
  "Referral",
  "Newsletter",
  "Other",
];

export default function GetStartedForm() {
  const t = useTranslations("GetStarted.form");
  const { status, delivered, error: errorMessage, submit } = useFormSubmit("/api/get-started");
  const [hearAboutUs, setHearAboutUs] = useState("");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 border border-[#fd4601]/40 bg-[#fd4601]/5 p-10 text-center md:p-16">
        <svg viewBox="0 0 43 28" fill="none" className="h-8 w-auto text-[#fd4601]" aria-hidden="true">
          <rect x="8.03523" y="0.848068" width="26.5918" height="8.03492" transform="rotate(90 8.03523 0.848068)" fill="currentColor" />
          <path d="M42.5466 9.71202L42.5466 0.848511L33.6831 0.848511L33.683 9.71202L42.5466 9.71202Z" fill="currentColor" />
          <path d="M33.6837 18.5724L33.6837 9.70885L24.8202 9.70885L24.8202 18.5724L33.6837 18.5724Z" fill="currentColor" />
          <path d="M42.5466 27.4396L42.5467 18.5761L33.6832 18.5761L33.6831 27.4396L42.5466 27.4396Z" fill="currentColor" />
          <path d="M24.8191 9.71203L24.8191 0.848518L15.9556 0.848518L15.9555 9.71203L24.8191 9.71203Z" fill="currentColor" />
          <path d="M24.8191 27.4373L24.8191 18.5738L15.9556 18.5738L15.9555 27.4373L24.8191 27.4373Z" fill="currentColor" />
        </svg>
        <h2 className="font-space-grotesk text-2xl font-bold text-white">{t("successTitle")}</h2>
        <p className="max-w-md text-base leading-7 text-white/70">
          {delivered ? t("successDelivered") : t("successNoted")}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-white/35 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#fd4601]";
  const labelClass = "text-xs font-semibold uppercase tracking-[0.2em] text-white/50";

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Honeypot — hidden from real users, bots tend to fill every field.
          Parked off the inline *start* edge, not off the left: overflow past
          the start edge is not scrollable, overflow past the end edge is. Under
          `dir="rtl"` the left is the end edge, so a physical `-left-[9999px]`
          would put 9999px of horizontal scroll on every Arabic page carrying
          this form — the same bug the skip-link had (see app/globals.css). */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -start-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className={labelClass}>
            {t("firstName")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className={labelClass}>
            {t("lastName")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            {t("email")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClass}>
            {t("company")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="company" name="company" type="text" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="jobTitle" className={labelClass}>
            {t("jobTitle")}<span className="text-[#fd4601]">*</span>
          </label>
          <input id="jobTitle" name="jobTitle" type="text" required className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="annualRevenue" className={labelClass}>
          {t("annualRevenue")}<span className="text-[#fd4601]">*</span>
        </label>
        <select id="annualRevenue" name="annualRevenue" required className={inputClass} defaultValue="">
          <option value="" disabled>
            {t("selectOne")}
          </option>
          {revenueBands.map((band) => (
            <option key={band} value={band} className="bg-[#060608]">
              {t(`revenueBands.${band}`)}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={labelClass}>
          {t("servicesLegend")}<span className="text-[#fd4601]">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {services.map((service, i) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-2 border border-white/35 px-4 py-2 text-sm text-white/80 transition-colors has-[:checked]:border-[#fd4601] has-[:checked]:text-[#fd4601]"
            >
              <input
                type="radio"
                name="services"
                value={service}
                required={i === 0}
                className="accent-[#fd4601]"
              />
              {t(`services.${service}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="needs" className={labelClass}>
          {t("needs")}<span className="text-[#fd4601]">*</span>
        </label>
        <textarea id="needs" name="needs" required rows={4} className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="hearAboutUs" className={labelClass}>
          {t("hearAboutUs")}<span className="text-[#fd4601]">*</span>
        </label>
        <select
          id="hearAboutUs"
          name="hearAboutUs"
          required
          className={inputClass}
          value={hearAboutUs}
          onChange={(e) => setHearAboutUs(e.target.value)}
        >
          <option value="" disabled>
            {t("selectOne")}
          </option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option} className="bg-[#060608]">
              {t(`hearAboutOptions.${option}`)}
            </option>
          ))}
        </select>
      </div>

      {hearAboutUs === "Other" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="other" className={labelClass}>
            {t("other")}
          </label>
          <input id="other" name="other" type="text" className={inputClass} />
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
