import { defineRouting } from "next-intl/routing";

/**
 * Arabic is the default locale per the Localization Playbook's Rule Zero, but
 * both locales still carry a URL prefix. Serving Arabic from the bare root
 * would silently swap the language of already-indexed English URLs like
 * /playbooks/foo with no redirect to signal it; prefixing both means the old
 * URL 308s to /en/playbooks/foo and keeps the language of every URL stable.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Text direction per locale — consumed by <html dir> and the RTL work in Phase 3. */
export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

/**
 * Search-index publication gate retained from docs/i18n-plan.md §18.
 * Mosaic now has complete English and Arabic copy and both are browsable.
 * Arabic stays out of search indexing until the existing editorial review is
 * complete; archive collections are independently noindex in both languages.
 */
export const PUBLISHED_LOCALES: readonly Locale[] = ["en"];

export function isPublishedLocale(locale: Locale): boolean {
  return PUBLISHED_LOCALES.includes(locale);
}
