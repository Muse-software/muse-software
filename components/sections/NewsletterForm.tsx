"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useFormSubmit } from "../../lib/useFormSubmit";

export default function NewsletterForm() {
  const t = useTranslations("Newsletter.form");
  const {
    status,
    delivered: subscribed,
    error,
    submit,
  } = useFormSubmit("/api/subscribe", "generic");

  if (status === "success") {
    return (
      <p className="text-lg text-white/80">
        {subscribed ? t("successSubscribed") : t("successNoted")}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("emailLabel")}
        </label>
        {/* LTR field, RTL page — an email address, and its `you@company.com`
            placeholder, are Latin strings that should not inherit the page's
            direction. See the note in ContactForm. */}
        <input
          id="newsletter-email"
          type="email"
          dir="ltr"
          name="email"
          required
          placeholder={t("emailPlaceholder")}
          className="w-full max-w-sm border border-white/35 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#fd4601]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <p className="max-w-md text-xs text-white/50">
        {/* Rich text, not three concatenated fragments: Arabic puts the links
            in a different place in the sentence, and only the translator can
            decide where. */}
        {t.rich("consent", {
          terms: (chunks) => (
            <Link href="/terms" className="underline hover:text-[#fd4601]">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link href="/privacy" className="underline hover:text-[#fd4601]">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
