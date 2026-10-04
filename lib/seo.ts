import {CONTACT_EMAIL,SOCIAL_LINKS,WHATSAPP_NUMBER} from "@/lib/contact";
import type { Metadata } from "next";
import { PUBLISHED_LOCALES, isPublishedLocale, type Locale } from "@/i18n/routing";

const SITE_URL = "https://muse.sa";

// The brand keeps its Latin wordmark in Arabic — "Muse" is not transliterated
// so the organization node is locale-independent. The @id lets every page's
// structured data point at the same organization, which is how search engines
// tie the homepage, jobs and breadcrumbs to one brand (and, with a Google
// Business Profile, to the knowledge panel).
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION = {
  "@type": "Organization" as const,
  "@id": ORGANIZATION_ID,
  name: "Muse Studios",
  alternateName: ["Muse", "ميوز"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: CONTACT_EMAIL,
  telephone: WHATSAPP_NUMBER.replace(/\s+/g, ""),
  address: { "@type": "PostalAddress" as const, addressLocality: "Riyadh", addressCountry: "SA" },
  sameAs: SOCIAL_LINKS.map(s=>s.href),
};

/**
 * Homepage graph: the organization plus the WebSite node. Google reads
 * WebSite.name/alternateName for the site name shown above results, and the
 * organization for logo, contact details and social profiles.
 */
export function buildHomeJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Muse Studios",
        alternateName: ["Muse", "muse.sa"],
        url: `${SITE_URL}${localizedPath(locale, "/")}`,
        inLanguage: locale,
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** Breadcrumb trail, starting at the localized homepage. Paths are locale-free. */
export function buildBreadcrumbJsonLd(locale: Locale, trail: { name: string; path: string }[]) {
  const home = { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${localizedPath(locale, item.path)}`,
    })),
  };
}

const OG_LOCALE: Record<Locale, string> = {
  ar: "ar_SA",
  en: "en_US",
};

// Visitors who match neither locale get English — a French speaker is better
// served by English than by Arabic.
const X_DEFAULT_LOCALE: Locale = "en";

/**
 * Every `path` passed into this module is locale-free ("/", "/about",
 * "/playbooks/foo"); the locale prefix is added here so no caller has to
 * remember to do it.
 */
export function localizedPath(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Canonical is **self-referential per locale**. Pointing the Arabic canonical
 * at the English URL would tell Google the Arabic pages are duplicates and
 * drop them from the index entirely — the single highest-consequence detail
 * in locale indexing.
 */
export function alternatesFor(path: string, locale: Locale): Metadata["alternates"] {
  // Only published locales are advertised — see PUBLISHED_LOCALES.
  const languages: Record<string, string> = {};
  for (const candidate of PUBLISHED_LOCALES) {
    languages[candidate] = localizedPath(candidate, path);
  }
  languages["x-default"] = localizedPath(X_DEFAULT_LOCALE, path);

  return {
    canonical: localizedPath(locale, path),
    languages,
  };
}

/**
 * Single source of truth for page metadata — every page/`generateMetadata`
 * export should build its object through this helper instead of writing
 * its own bare `{ title, description }`. Without it, `alternates.canonical`
 * and `openGraph`/`twitter` silently inherit the root layout's values
 * (the homepage's) on every page, which is what let every subpage share the
 * same canonical URL and social-share preview.
 */
// The app/opengraph-image.tsx file convention only auto-attaches to a route
// when that route's own metadata leaves `openGraph.images` completely
// unset. Since every page here defines its own `openGraph` object (to fix
// title/description/url inheriting from the homepage), that auto-merge
// never kicks in — so pages without their own photo need to reference the
// generated default explicitly, or they'd end up with no image at all.
//
// The two locales are produced by different pipelines on purpose. English is
// the `next/og` (Satori) route. Arabic cannot be: Satori shapes Arabic glyphs
// but does not run the bidi algorithm, so a sentence renders with its words
// mirrored, and neither `direction: rtl` nor the RLE/RLM control characters
// change that (measured on Next 16.1.6 — the control characters also render as
// visible tofu). The Arabic card is therefore pre-rendered by headless
// Chromium, which does standard UAX#9 bidi, via `scripts/build-og-image-ar.mjs`.
// The card carries no per-page content, so nothing is lost by baking it.
const DEFAULT_OG_IMAGE: Record<Locale, string> = {
  en: "/opengraph-image",
  ar: "/og/opengraph-image-ar.png",
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale: Locale;
}): Metadata {
  const images = [{ url: image ?? DEFAULT_OG_IMAGE[locale] }];
  const alternateLocales = PUBLISHED_LOCALES.filter(
    (candidate) => candidate !== locale
  ).map((candidate) => OG_LOCALE[candidate]);

  return {
    title,
    description,
    alternates: alternatesFor(path, locale),
    // Unpublished locales remain browsable while editorial review is pending.
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url: localizedPath(locale, path),
      images,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
  temporary: "TEMPORARY",
};

/**
 * JobPosting structured data for career detail pages. Deliberately omits
 * `datePosted` — Google's guidelines require it for Jobs rich-result
 * eligibility, but the content model doesn't track a real posting date, and
 * inventing one would misrepresent the listing.
 */
export function buildJobPostingJsonLd({
  title,
  description,
  path,
  location,
  employmentType,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  location?: string;
  employmentType?: string;
  locale: Locale;
}) {
  const [locality] = (location ?? "").split(",").map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    inLanguage: locale,
    hiringOrganization: ORGANIZATION,
    url: `${SITE_URL}${localizedPath(locale, path)}`,
    ...(locality && {
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: locality,
          addressCountry: "SA",
        },
      },
    }),
    ...(employmentType && {
      employmentType: EMPLOYMENT_TYPE_MAP[employmentType.toLowerCase()] ?? undefined,
    }),
  };
}
