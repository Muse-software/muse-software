import { notFound } from "next/navigation";
import CTA from "../../../components/sections/CTA";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import GlassCard from "../../../components/ui/GlassCard";
import { insights } from "../../../lib/content";

export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.excerpt,
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return notFound();

  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
          
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_0.6fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                {insight.category}
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
                {insight.title}
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-7 text-white/70">
                {insight.excerpt}
              </p>
              <div className="flex gap-6 text-xs uppercase tracking-[0.3em] text-white/50">
                <span>{insight.minutes} min read</span>
                <span>{insight.date}</span>
              </div>
            </div>
            <aside className="hidden lg:block">
              <GlassCard className="sticky top-32 space-y-3 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Table of contents
                </p>
                <nav className="space-y-2 text-sm text-white/70">
                  {insight.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block hover:text-[var(--gold)]"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </GlassCard>
            </aside>
          </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-4xl px-6 pb-16">
          <div className="space-y-12">
            {insight.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="space-y-4 scroll-mt-28"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                {section.content.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <span>Share</span>
            <a className="hover:text-[var(--gold)]" href="https://www.linkedin.com">
              LinkedIn
            </a>
            <a className="hover:text-[var(--gold)]" href="https://www.x.com">
              X
            </a>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
