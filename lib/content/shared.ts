/**
 * Photography in /public/photos is sourced from Unsplash (free commercial
 * use, no attribution required under the Unsplash License) — credited here
 * as good practice:
 *   pillar-ai-transformation.jpg   — Pawel Czerwinski
 *   pillar-product-engineering.jpg — Ricardo Gomez Angel
 *   pillar-gamification.jpg        — Taiga Miyamoto
 *   hero-group-silhouette.jpg      — Vibhav Satam
 *
 * These four are no longer referenced by any live page — they were the
 * playbook cover images, and the playbooks were archived on 2026-08-01 (see
 * archive/README.md). They are kept because archive/content/playbooks.ts
 * still points at them and a restore would need them back:
 *   cover-neon-city.jpg            — Emma Gasseau-Dryer
 *   cover-red-light-figure.jpg     — Jahanzeb Ahsan
 *   cover-orange-blur.jpg          — Simone Dinoia
 *   hero-silhouette-sunset.jpg     — Zulfugar Karimov
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
  /**
   * The card CTA. Per service rather than one shared "Learn more", because
   * three different headings ending in the identical label tells the reader
   * the three cards are the same thing. See "Applied" point 4 in the Website
   * Voice note in the vault. Read by both Approach and Services.
   */
  cta: string;
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
  faq?: { q: string; a: string }[];
};

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
