/**
 * Photography in /public/photos is sourced from Unsplash (free commercial
 * use, no attribution required under the Unsplash License) — credited here
 * as good practice:
 *   pillar-ai-transformation.jpg   — Pawel Czerwinski
 *   pillar-product-engineering.jpg — Ricardo Gomez Angel
 *   pillar-gamification.jpg        — Taiga Miyamoto
 *   cover-neon-city.jpg            — Emma Gasseau-Dryer
 *   cover-red-light-figure.jpg     — Jahanzeb Ahsan
 *   cover-orange-blur.jpg          — Simone Dinoia
 *   hero-silhouette-sunset.jpg     — Zulfugar Karimov
 *   hero-group-silhouette.jpg      — Vibhav Satam
 */

type ServicePillar = {
  title: string;
  body: string;
  crossLinkSlug?: string;
  crossLinkLabel?: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  icon: "gear" | "shield" | "share";
  intro: string[];
  approachHeading: string;
  approachIntro: string[];
  pillars: ServicePillar[];
  whyHeadline: string;
  whyReasons: string[];
  whatWeDoHeadline: string;
  whatWeDo: { title: string; body: string }[];
  whyWorkHeadline?: string;
  whyWorkWithUs?: { title: string; body: string }[];
};

/**
 * A category is just whatever string a content item is tagged with — not a
 * fixed union — so adding a new category is purely a content-authoring
 * change (write a new value in an item's `category` field) with no type or
 * list to update in code. The actual set of categories in use is derived
 * from the content arrays themselves (see `insightCategories` in
 * insights.ts, `playbookCategories` in playbooks.ts), each independently,
 * since Insights and Playbooks currently use unrelated taxonomies.
 */
export type InsightCategory = string;

/** "Banking & Finance" -> "banking-and-finance", for SEO-friendly /insights/[category] URLs. */
export function insightCategorySlug(category: InsightCategory): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function insightCategoryFromSlug(
  slug: string,
  categories: InsightCategory[]
): InsightCategory | undefined {
  return categories.find((c) => insightCategorySlug(c) === slug);
}

export type Faq = { question: string; answer: string };

/**
 * CMS-style rich content model — the same block-based pattern headless CMSs
 * (Contentful, Sanity's Portable Text, Strapi dynamic zones) use for body
 * copy, rather than a flat array of paragraph strings. A detail page just
 * maps this array through <RichContent /> to real semantic HTML: <p>,
 * <blockquote>, <figure><img>, <ul>/<ol>. New block types can be added here
 * without touching every article.
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; style: "bullet" | "number"; items: string[] };

export type FeaturedImage = { src: string; alt: string; caption?: string };

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  minutes: number;
  date: string;
  featuredImage: FeaturedImage;
  content: ContentBlock[];
  faqs: Faq[];
};

export type Playbook = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  minutes: number;
  date: string;
  featuredImage: FeaturedImage;
  content: ContentBlock[];
  faqs: Faq[];
};

export type NewsletterIssue = {
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
  date: string;
  featuredImage: FeaturedImage;
  content: ContentBlock[];
};

/**
 * Summary shapes for list/grid views — deliberately omit `content` (the
 * full rich-text body) and `faqs`. Those fields aren't rendered by any
 * list card, but Insight/Playbook/NewsletterIssue previously shipped in
 * full to client-side list components anyway; since RSC props serialize
 * into the flight payload, every list page's initial JS included every
 * article's full body text. These Pick<> types are the server-side
 * boundary that strips it back down to only what a card actually shows.
 */
export type InsightSummary = Pick<
  Insight,
  "slug" | "title" | "excerpt" | "category" | "minutes" | "featuredImage"
>;
export type PlaybookSummary = Pick<
  Playbook,
  "slug" | "title" | "excerpt" | "category" | "minutes" | "featuredImage"
>;
export type NewsletterSummary = Pick<
  NewsletterIssue,
  "slug" | "title" | "excerpt" | "minutes" | "date" | "featuredImage"
>;

export function toInsightSummary(item: Insight): InsightSummary {
  const { slug, title, excerpt, category, minutes, featuredImage } = item;
  return { slug, title, excerpt, category, minutes, featuredImage };
}
export function toPlaybookSummary(item: Playbook): PlaybookSummary {
  const { slug, title, excerpt, category, minutes, featuredImage } = item;
  return { slug, title, excerpt, category, minutes, featuredImage };
}
export function toNewsletterSummary(item: NewsletterIssue): NewsletterSummary {
  const { slug, title, excerpt, minutes, date, featuredImage } = item;
  return { slug, title, excerpt, minutes, date, featuredImage };
}

export type CareerRole = {
  slug?: string;
  title: string;
  department: "Engineering" | "Design" | "Strategy" | "Operations" | "Marketing";
  blurb: string;
  location?: string;
  employmentType?: string;
  compensation?: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHaves?: string[];
};
