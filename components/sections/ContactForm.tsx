"use client";

import { useTranslations } from "next-intl";
import { useFormSubmit } from "../../lib/useFormSubmit";

// The submitted VALUE stays English and stable; only the visible label is
// translated. An Arabic visitor picking a project type still lands the same
// string in the team's inbox, so nothing downstream has to learn a second
// vocabulary.
const projectTypes = [
  "AI Transformation",
  "Product Engineering",
  "Gamification & Experience",
  "Other",
];

const budgets = ["Under 50K SAR", "50K–150K SAR", "150K–500K SAR", "500K+ SAR", "Not sure yet"];

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const { status, delivered, error: errorMessage, submit } = useFormSubmit("/api/contact");

  if (status === "success") {
    return (
      <div className="border border-[#fd4601]/40 bg-[#fd4601]/5 p-8 md:p-10">
        <h3 className="font-space-grotesk text-xl font-bold text-white">
          {delivered ? t("successDeliveredTitle") : t("successNotedTitle")}
        </h3>
        <p className="mt-3 max-w-prose text-base leading-7 text-white/70">
          {delivered ? t("successDeliveredBody") : t("successNotedBody")}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-white/35 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#fd4601]";
  const labelClass = "text-xs font-semibold uppercase tracking-[0.2em] text-white/50";

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            {t("name")}
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClass}>
            {t("company")}
          </label>
          <input id="company" name="company" type="text" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className={labelClass}>
            {t("projectType")}
          </label>
          <select id="projectType" name="projectType" className={inputClass} defaultValue="">
            <option value="" disabled>
              {t("selectOne")}
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-[#060608]">
                {t(`projectTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className={labelClass}>
          {t("budget")}
        </label>
        <select id="budget" name="budget" className={inputClass} defaultValue="">
          <option value="" disabled>
            {t("selectRange")}
          </option>
          {budgets.map((budget) => (
            <option key={budget} value={budget} className="bg-[#060608]">
              {t(`budgets.${budget}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          {t("message")}
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
