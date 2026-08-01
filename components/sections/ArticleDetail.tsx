import Image from "next/image";
import { getLocale } from "next-intl/server";
import SubpageHero from "./SubpageHero";
import RichContent from "./RichContent";
import ArticleFAQ from "./ArticleFAQ";
import RelatedContent from "./RelatedContent";
import CTA from "./CTA";
import { formatArticleDate } from "../../lib/dates";
import type { Locale } from "@/i18n/routing";
import type { ContentBlock, Faq, FeaturedImage } from "../../lib/content";

type RelatedItem = {
  slug: string;
  title: string;
  excerpt: string;
  meta: string;
  href: string;
  image: string;
};

/**
 * Shared visual shell for article-style detail pages — currently only
 * playbooks, since insights and the newsletter back catalogue were retired
 * (see archive/README.md). Callers differ in eyebrow text, related-content
 * selection logic, and whether FAQs exist at all, so each page.tsx still
 * owns its own data prep (generateStaticParams, metadata, related-item
 * filtering, JSON-LD) and just hands the result here for rendering.
 *
 * There is deliberately no byline. Articles are attributed to Muse, not to
 * an individual: the JSON-LD `author` is the organization (lib/seo.ts), and
 * naming a single person on every playbook was neither true nor something
 * the content model tracked.
 */
export default async function ArticleDetail({
  eyebrow,
  title,
  date,
  featuredImage,
  content,
  faqs,
  relatedHeading,
  related,
  jsonLd,
}: {
  eyebrow: string;
  title: string;
  date: string;
  featuredImage: FeaturedImage;
  content: ContentBlock[];
  faqs?: Faq[];
  relatedHeading: string;
  related: RelatedItem[];
  jsonLd: Record<string, unknown>;
}) {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHero eyebrow={eyebrow} title={title} />
      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-10">
          <p className="text-sm text-white/50">{formatArticleDate(date, locale)}</p>

          <figure className="relative mt-6 h-64 w-full overflow-hidden md:h-[420px]">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              priority
              sizes="(min-width: 860px) 860px, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="mt-8">
            <RichContent blocks={content} />
          </div>

          {faqs && <ArticleFAQ faqs={faqs} />}
          <RelatedContent heading={relatedHeading} items={related} />
        </div>
      </section>
      <CTA />
    </div>
  );
}
