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
 * Locales that are ready to be advertised to search engines and users.
 *
 * `/ar` routes exist and render from Phase 1 onward, but until the Arabic
 * content programme lands (docs/i18n-plan.md §9) they serve English copy under
 * Arabic chrome. Emitting hreflang alternates or sitemap entries for them
 * would be pointing Google at pages whose declared language is a lie, so an
 * unpublished locale is `noindex` and absent from both.
 *
 * This is the same gate as the language switcher: flip it to
 * `routing.locales` when Batch 2 lands, and not before.
 */
export const PUBLISHED_LOCALES: readonly Locale[] = ["en"];

export function isPublishedLocale(locale: Locale): boolean {
  return PUBLISHED_LOCALES.includes(locale);
}
