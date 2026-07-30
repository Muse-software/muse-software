import { notFound } from "next/navigation";
import ArticleDetail from "../../../components/sections/ArticleDetail";
import { newsletters } from "../../../lib/content";
import { buildMetadata, buildArticleJsonLd } from "../../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return newsletters.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = newsletters.find((item) => item.slug === slug);
  if (!issue) return {};
  return buildMetadata({
    title: issue.title,
    description: issue.excerpt,
    path: `/newsletter/${slug}`,
    image: issue.featuredImage.src,
  });
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = newsletters.find((item) => item.slug === slug);
  if (!issue) return notFound();

  const sorted = [...newsletters].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const related = sorted
    .filter((item) => item.slug !== issue.slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      meta: `${item.minutes} min read`,
      href: `/newsletter/${item.slug}`,
      image: item.featuredImage.src,
    }));

  const jsonLd = buildArticleJsonLd({
    title: issue.title,
    description: issue.excerpt,
    path: `/newsletter/${slug}`,
    image: issue.featuredImage.src,
    datePublished: issue.date,
  });

  return (
    <ArticleDetail
      eyebrow={`Newsletter · ${issue.minutes} min read`}
      title={issue.title}
      date={issue.date}
      byline="Muse Studios"
      featuredImage={issue.featuredImage}
      content={issue.content}
      relatedHeading="Past editions"
      related={related}
      jsonLd={jsonLd}
    />
  );
}
