/**
 * Standalone copies of the content types the archived Insights and
 * Newsletter data depends on. These deliberately duplicate (rather than
 * import from) lib/content/shared.ts: the archive has to keep parsing on
 * its own years from now, even if the live content model moves on. Nothing
 * here is compiled into the site — see archive/README.md.
 */

export type InsightCategory = string;

export type Faq = { question: string; answer: string };

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

export type NewsletterIssue = {
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
  date: string;
  featuredImage: FeaturedImage;
  content: ContentBlock[];
};
