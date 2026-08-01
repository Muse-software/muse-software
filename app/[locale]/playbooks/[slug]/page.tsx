import { notFound } from "next/navigation";
import ArticleDetail from "@/components/sections/ArticleDetail";
import { allSlugs, getPlaybook, getPlaybooks } from "@/lib/content";
import { buildMetadata, buildArticleJsonLd } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const dynamicParams = false;

/**
 * The union of every locale's slugs, not this locale's.
 *
 * Per-locale slugs are what you want and what this function used to return,
 * but Next 16.1.6 drops the *entire* dynamic route if any one parent param
 * combination returns an empty array. `lib/content/ar/playbooks.ts` is
 * deliberately empty until Batch 6 lands, so returning `[]` for `ar` silently
 * took all 56 English playbook pages out of the build as well — measured, not
 * assumed: 40 pages generated instead of 96, with no warning.
 *
 * Returning the union keeps the route alive. Per-locale truth then comes from
 * the page body, which looks the slug up in its own locale and calls
 * `notFound()` when there is no record. So /ar/playbooks/<slug> answers a real
 * 404 rather than English text under `lang="ar"`, which is the behaviour plan
 * section 7 asks for. The cost is a handful of prerendered 404s in the Arabic
 * build, and it disappears the moment Arabic playbooks exist.
 *
 * `dynamicParams` stays false. The alternative fix was to let unlisted slugs
 * resolve on demand, which would have opened a server-rendered path on a site
 * whose static-first architecture is load-bearing.
 */
export function generateStaticParams() {
  return allSlugs(getPlaybooks);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const playbook = getPlaybook(locale, slug);
  if (!playbook) return {};
  return buildMetadata({
    title: playbook.title,
    description: playbook.excerpt,
    path: `/playbooks/${slug}`,
    image: playbook.featuredImage.src,
    locale,
  });
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const playbook = getPlaybook(locale, slug);
  if (!playbook) return notFound();

  const t = await getTranslations("Playbooks");

  const related = getPlaybooks(locale)
    .filter((item) => item.slug !== playbook.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      meta: t("detail.relatedMeta", { minutes: item.minutes }),
      href: `/playbooks/${item.slug}`,
      image: item.featuredImage.src,
    }));

  const jsonLd = buildArticleJsonLd({
    title: playbook.title,
    description: playbook.excerpt,
    path: `/playbooks/${slug}`,
    image: playbook.featuredImage.src,
    datePublished: playbook.date,
    locale,
  });

  return (
    <ArticleDetail
      eyebrow={t("cardMeta", {
        category: playbook.category,
        minutes: playbook.minutes,
      })}
      title={playbook.title}
      date={playbook.date}
      byline={t("detail.byline")}
      featuredImage={playbook.featuredImage}
      content={playbook.content}
      faqs={playbook.faqs}
      relatedHeading={t("detail.relatedHeading")}
      related={related}
      jsonLd={jsonLd}
    />
  );
}
