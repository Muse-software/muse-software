import { notFound } from "next/navigation";
import ArticleDetail from "../../../components/sections/ArticleDetail";
import { playbooks } from "../../../lib/content";
import { buildMetadata, buildArticleJsonLd } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return playbooks.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = playbooks.find((item) => item.slug === slug);
  if (!playbook) return {};
  return buildMetadata({
    title: playbook.title,
    description: playbook.excerpt,
    path: `/playbooks/${slug}`,
    image: playbook.featuredImage.src,
  });
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = playbooks.find((item) => item.slug === slug);
  if (!playbook) return notFound();

  const related = playbooks
    .filter((item) => item.slug !== playbook.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      meta: `Playbook · ${item.minutes} min read`,
      href: `/playbooks/${item.slug}`,
      image: item.featuredImage.src,
    }));

  const jsonLd = buildArticleJsonLd({
    title: playbook.title,
    description: playbook.excerpt,
    path: `/playbooks/${slug}`,
    image: playbook.featuredImage.src,
    datePublished: playbook.date,
  });

  return (
    <ArticleDetail
      eyebrow={`${playbook.category} · ${playbook.minutes} min read`}
      title={playbook.title}
      date={playbook.date}
      byline="Noura Aldosary"
      featuredImage={playbook.featuredImage}
      content={playbook.content}
      faqs={playbook.faqs}
      relatedHeading="Related playbooks"
      related={related}
      jsonLd={jsonLd}
    />
  );
}
