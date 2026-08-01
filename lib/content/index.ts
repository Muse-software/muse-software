import { routing, type Locale } from "@/i18n/routing";
import type { CareerRole, Service } from "./shared";

import { services as enServices } from "./en/services";
import { careerRoles as enCareerRoles } from "./en/careers";

import { services as arServices } from "./ar/services";
import { careerRoles as arCareerRoles } from "./ar/careers";

export * from "./shared";

/**
 * The locale boundary for the content layer.
 *
 * Records are looked up rather than fetched, so these stay synchronous and
 * every page keeps its `setRequestLocale` static generation.
 *
 * There is no fallback to English on purpose. Plan section 7: if parity slips,
 * the honest behaviour is for the item not to exist in that locale rather than
 * to appear in English under Arabic chrome, which is the Localization
 * Playbook's "no translated placeholders" rule applied to code. A missing
 * record therefore produces a 404 and an empty list, both of which are visible,
 * rather than English text under `lang="ar"`, which is not.
 */
export function getServices(locale: Locale): Service[] {
  return locale === "ar" ? arServices : enServices;
}

export function getService(locale: Locale, slug: string): Service | undefined {
  return getServices(locale).find((item) => item.slug === slug);
}

export function getCareerRoles(locale: Locale): CareerRole[] {
  return locale === "ar" ? arCareerRoles : enCareerRoles;
}

export function getCareerRole(locale: Locale, slug: string): CareerRole | undefined {
  return getCareerRoles(locale).find((item) => item.slug === slug);
}

/**
 * Every slug that exists in any locale, for `generateStaticParams`.
 *
 * Returning this locale's own slugs would be more precise, and it is what the
 * two detail routes did first. Next 16.1.6 makes it unusable: if any one
 * parent param combination (here, one locale) returns an empty array, the
 * framework drops the *whole* dynamic route from the build rather than that
 * one branch. When `ar/playbooks.ts` was an empty array, that silently cost
 * all 56 English playbook pages, with no warning in the build output.
 *
 * So the route pattern is declared once for every locale and per-locale truth
 * is enforced in the page body, which resolves the slug in its own locale and
 * calls `notFound()` if there is no record. A locale missing an item answers a
 * real 404, which is what plan section 7 requires instead of falling back to
 * English under Arabic chrome.
 *
 * Used by both detail routes. Nothing is lopsided today, but the failure is
 * silent and only shows up as a page count, so the safe pattern stays.
 */
export function allSlugs(
  getter: (locale: Locale) => Array<{ slug?: string }>
): Array<{ slug: string }> {
  const slugs = new Set(
    routing.locales.flatMap((locale) =>
      getter(locale)
        .map((item) => item.slug)
        .filter((slug): slug is string => Boolean(slug))
    )
  );
  return Array.from(slugs, (slug) => ({ slug }));
}
