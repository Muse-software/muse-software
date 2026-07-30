"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../Pagination";
import { insightCategories, insightCategorySlug } from "../../lib/content";
import type { InsightSummary, InsightCategory } from "../../lib/content";

const PAGE_SIZE = 9;

/**
 * Receives an already-filtered `insights` list — filtering by category now
 * happens server-side via the real /insights/[category] pages (see
 * app/insights/[slug]/page.tsx), not client state, so each category is a
 * genuine, indexable, shareable URL. This component only owns pagination,
 * which still lives in the URL (?page=...) so a deep page is bookmarkable
 * and survives back/forward.
 */
export default function InsightsList({
  insights,
  activeCategory,
}: {
  insights: InsightSummary[];
  activeCategory: InsightCategory | "All";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const totalPages = Math.max(1, Math.ceil(insights.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => insights.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [insights, page]
  );
  const [feature, ...rest] = pageItems;

  const goToPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next <= 1) params.delete("page");
      else params.set("page", String(next));
      const query = params.toString();
      router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pathname, router, searchParams]
  );

  return (
    <section className="bg-[#060608] pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/insights"
            className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
              activeCategory === "All"
                ? "border-[#fd4601] text-[#fd4601]"
                : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            All
          </Link>
          {insightCategories.map((cat) => (
            <Link
              key={cat}
              href={`/insights/${insightCategorySlug(cat)}`}
              className={`border px-5 py-2 text-sm font-medium transition-colors md:text-base ${
                activeCategory === cat
                  ? "border-[#fd4601] text-[#fd4601]"
                  : "border-white/35 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {!feature ? (
          <p className="mt-14 text-white/50">No insights in this category yet.</p>
        ) : (
          <>
            {page === 1 && (
              <Link
                href={`/insights/${feature.slug}`}
                className="group mt-10 block overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601] md:mt-14"
              >
                <div className="relative h-56 w-full md:h-72">
                  <Image
                    src={feature.featuredImage.src}
                    alt={feature.featuredImage.alt}
                    fill
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#060608] to-transparent" />
                </div>
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
                    {feature.category} · {feature.minutes} min read
                  </p>
                  <h2 className="mt-4 font-space-grotesk text-2xl font-bold text-white md:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                    {feature.excerpt}
                  </p>
                </div>
              </Link>
            )}

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {(page === 1 ? rest : pageItems).map((insight) => (
                <Link
                  key={insight.slug}
                  href={`/insights/${insight.slug}`}
                  className="group overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601]"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={insight.featuredImage.src}
                      alt={insight.featuredImage.alt}
                      fill
                      sizes="(min-width: 768px) 550px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      {insight.category} · {insight.minutes} min read
                    </p>
                    <h3 className="mt-3 font-space-grotesk text-lg font-bold text-white md:text-xl">
                      {insight.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/70">{insight.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </>
        )}
      </div>
    </section>
  );
}
