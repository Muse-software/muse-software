import type { Locale } from "@/i18n/routing";

/**
 * Article dates render Gregorian with Arabic month names and Western (0-9)
 * numerals, per the locked decisions in docs/i18n-plan.md §1.
 *
 * Neither is what a bare locale tag gives you. `ar-SA` resolves to the
 * Umm al-Qura calendar, so a January 2026 post would display as a Hijri
 * date; and `ar` renders digits as Arabic-Indic (٢٠٢٦). The two Unicode
 * extensions below pin both explicitly rather than relying on whatever
 * calendar and numbering system the runtime's ICU data happens to default to.
 */
const DATE_LOCALE: Record<Locale, string> = {
  ar: "ar-u-ca-gregory-nu-latn",
  en: "en-US",
};

export function formatArticleDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(DATE_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
