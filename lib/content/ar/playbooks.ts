import type { Playbook } from "../shared";

/**
 * Arabic playbooks. Deliberately empty.
 *
 * Batch 6 of the content programme is the 28 English playbooks, 31,282 words,
 * and it is the long pole of the whole bilingual effort. It is a content
 * decision rather than an engineering one (docs/i18n-plan.md section 12 asks
 * outright whether all 28 warrant Arabic at all), so the accessor layer is
 * built and the array is left empty until that decision lands.
 *
 * Empty is the honest behaviour, not a gap. Plan section 7 rules out fallback
 * to English under Arabic chrome: "the honest behaviour is for the article to
 * not exist in that locale rather than to appear in English under Arabic
 * chrome". With this array empty, /ar/playbooks renders its translated empty
 * state, /ar/playbooks/<slug> returns a real 404, and the sitemap is unchanged
 * because `ar` is not in PUBLISHED_LOCALES yet. Nothing lies about what exists.
 *
 * Adding records here needs nothing else: the list page, the detail page's
 * generateStaticParams, and the category filter are all already locale-driven.
 */
export const playbooks: Playbook[] = [];
