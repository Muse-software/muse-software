import { Suspense } from "react";
import { notFound } from "next/navigation";
import ArticleDetail from "../../../components/sections/ArticleDetail";
import InsightsList from "../../../components/sections/InsightsList";
import SubpageHero from "../../../components/sections/SubpageHero";
import {
  insights,
  toInsightSummary,
  insightCategories,
  insightCategorySlug,
  insightCategoryFromSlug,
} from "../../../lib/content";
import { buildMetadata, buildArticleJsonLd } from "../../../lib/seo";

export const dynamicParams = false;

/**
 * This single dynamic segment serves two different things: an article
 * ("/insights/where-ai-creates-roi") and, for SEO-friendly category URLs
 * ("/insights/ai", "/insights/gtm-engineering"), a pre-filtered list page.
 * Next can't have both `[slug]` and `[category]` as siblings at the same
 * path — they'd collide — so both sets of static params are generated here
 * and the page branches on which one actually matched. Verified the two
 * slug spaces don't collide (no insight article is slugged "ai",
 * "machine-learning", etc.).
 */
export function generateStaticParams() {
  const articleParams = insights.map((insight) => ({ slug: insight.slug }));
  const categoryParams = insightCategories.map((category) => ({
    slug: insightCategorySlug(category),
  }));
  return [...articleParams, ...categoryParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = insightCategoryFromSlug(slug, insightCategories);
  if (category) {
    return buildMetadata({
      title: `${category} Insights`,
      description: `Field notes on ${category.toLowerCase()} from Muse Studios.`,
      path: `/insights/${slug}`,
    });
  }

  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    image: insight.featuredImage.src,
  });
}

export default async function InsightOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = insightCategoryFromSlug(slug, insightCategories);
  if (category) {
    const filtered = insights
      .filter((item) => item.category === category)
      .map(toInsightSummary);

    return (
      <div className="min-h-screen bg-[#060608] text-white">
        <SubpageHero
          eyebrow="Insights"
          title={`${category} field notes.`}
          subtitle={`Short, opinionated writing on ${category.toLowerCase()}.`}
        />
        <Suspense fallback={null}>
          <InsightsList insights={filtered} activeCategory={category} />
        </Suspense>
      </div>
    );
  }

  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return notFound();

  const related = insights
    .filter((item) => item.category === insight.category && item.slug !== insight.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      meta: `${item.category} · ${item.minutes} min read`,
      href: `/insights/${item.slug}`,
      image: item.featuredImage.src,
    }));

  const jsonLd = buildArticleJsonLd({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    image: insight.featuredImage.src,
    datePublished: insight.date,
  });

  return (
    <ArticleDetail
      eyebrow={`${insight.category} · ${insight.minutes} min read`}
      title={insight.title}
      date={insight.date}
      byline="Muse Studios Team"
      featuredImage={insight.featuredImage}
      content={insight.content}
      faqs={insight.faqs}
      relatedHeading="Related insights"
      related={related}
      jsonLd={jsonLd}
    />
  );
}
