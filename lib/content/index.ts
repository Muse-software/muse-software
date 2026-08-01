import { routing, type Locale } from "@/i18n/routing";
import type { CareerRole, ContentCategory, Playbook, Service } from "./shared";

import { services as enServices } from "./en/services";
import { careerRoles as enCareerRoles } from "./en/careers";
import { playbooks as enPlaybooks } from "./en/playbooks";

import { services as arServices } from "./ar/services";
import { careerRoles as arCareerRoles } from "./ar/careers";
import { playbooks as arPlaybooks } from "./ar/playbooks";

export * from "./shared";

/**
 * The locale boundary for the content layer.
 *
 * Records are looked up rather than fetched, so these stay synchronous and
 * every page keeps its `setRequestLocale` static generation. Types in
 * `shared.ts` are untouched, including the `PlaybookSummary` Pick<> that keeps
 * article bodies out of client bundles.
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

export function getPlaybooks(locale: Locale): Playbook[] {
  return locale === "ar" ? arPlaybooks : enPlaybooks;
}

export function getPlaybook(locale: Locale, slug: string): Playbook | undefined {
  return getPlaybooks(locale).find((item) => item.slug === slug);
}

/**
 * Derived from the content rather than hand-maintained: tagging a playbook
 * with a new category is enough to make it show up in the filter chips.
 *
 * This used to live in `playbooks.ts` as a module-level const, which meant a
 * Client Component importing the category list also pulled in every playbook
 * body — 288 KB of article text into the browser bundle, defeating the whole
 * point of the `PlaybookSummary` boundary through a second import path. It is
 * a function here, called on the server, and the result is passed down as a
 * prop.
 */
export function getPlaybookCategories(locale: Locale): ContentCategory[] {
  return Array.from(new Set(getPlaybooks(locale).map((item) => item.category))).sort();
}

/**
 * Every slug that exists in any locale, for `generateStaticParams`.
 *
 * Returning this locale's own slugs would be more precise, and it is what the
 * three detail routes did first. Next 16.1.6 makes it unusable: if any one
 * parent param combination (here, one locale) returns an empty array, the
 * framework drops the *whole* dynamic route from the build rather than that
 * one branch. With `ar/playbooks.ts` empty, that silently cost all 56 English
 * playbook pages, with no warning in the build output.
 *
 * So the route pattern is declared once for every locale and per-locale truth
 * is enforced in the page body, which resolves the slug in its own locale and
 * calls `notFound()` if there is no record. A locale missing an item answers a
 * real 404, which is what plan section 7 requires instead of falling back to
 * English under Arabic chrome.
 *
 * Used by all three detail routes even though only playbooks is currently
 * lopsided, because the failure is silent and only shows up as a page count.
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
