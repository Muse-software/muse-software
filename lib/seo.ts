import type { Metadata } from "next";

const SITE_URL = "https://muse.sa";
const ORGANIZATION = {
  "@type": "Organization" as const,
  name: "Muse",
  url: SITE_URL,
};

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
const DEFAULT_OG_IMAGE = "/opengraph-image";

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = [{ url: image ?? DEFAULT_OG_IMAGE }];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/**
 * Article structured data for insight/playbook/newsletter detail pages.
 * `dateModified` mirrors `datePublished` — there's no separately-tracked
 * "last updated" date in the content model, so reusing the publish date is
 * the honest option rather than inventing one.
 */
export function buildArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: datePublished,
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
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
}: {
  title: string;
  description: string;
  path: string;
  location?: string;
  employmentType?: string;
}) {
  const [locality] = (location ?? "").split(",").map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    hiringOrganization: ORGANIZATION,
    url: `${SITE_URL}${path}`,
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
