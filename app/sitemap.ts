import type { MetadataRoute } from "next";
import { getServices, getCareerRoles } from "@/lib/content";
import { PUBLISHED_LOCALES, type Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

const BASE_URL = "https://muse.sa";

type Entry = {
  path: string;
  lastModified: Date;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/**
 * The sitemap emits one URL per published locale, each carrying the full
 * `alternates.languages` set so the hreflang graph in the sitemap matches the
 * one in each page's `<head>`. Unpublished locales are absent entirely — see
 * PUBLISHED_LOCALES in i18n/routing.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Built per locale rather than once, because the content-derived paths are
   * not guaranteed to be the same in both. A locale whose records have not been
   * written yet has fewer URLs, and emitting the English slug set under /ar
   * would advertise pages that legitimately 404 there.
   *
   * Static routes are shared, so their hreflang set still spans every
   * published locale. Content routes declare an alternate only for the locales
   * that actually have that item, which is what keeps the hreflang graph
   * reciprocal — a one-way alternate pointing at a 404 is worse than none.
   */
  const staticEntries = (): Entry[] => [
    { path: "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { path: "/explore", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/careers", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { path: "/newsletter", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { path: "/get-started", lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { path: "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const contentEntries = (locale: Locale): Entry[] => [
    ...getServices(locale).map((service) => ({
      path: `/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getCareerRoles(locale)
      .filter((role) => role.slug)
      .map((role) => ({
        path: `/careers/${role.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
  ];

  const localesWithPath = new Map<string, Locale[]>();
  const byLocale = PUBLISHED_LOCALES.map((locale) => {
    const entries = [...staticEntries(), ...contentEntries(locale)];
    for (const entry of entries) {
      localesWithPath.set(entry.path, [
        ...(localesWithPath.get(entry.path) ?? []),
        locale,
      ]);
    }
    return { locale, entries };
  });

  return byLocale.flatMap(({ locale, entries }) =>
    entries.map((entry) => ({
      url: `${BASE_URL}${localizedPath(locale, entry.path)}`,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          (localesWithPath.get(entry.path) ?? [locale]).map((alt) => [
            alt,
            `${BASE_URL}${localizedPath(alt, entry.path)}`,
          ])
        ),
      },
    }))
  );
}
