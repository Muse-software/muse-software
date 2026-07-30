"use client";

import Link from "next/link";
import Image from "next/image";
import PaginatedCardGrid from "../PaginatedCardGrid";
import type { NewsletterSummary } from "../../lib/content";

export default function NewsletterList({ issues }: { issues: NewsletterSummary[] }) {
  return (
    <PaginatedCardGrid
      items={issues}
      pageSize={6}
      heading="Past editions"
      className="border-t border-white/10 bg-[#060608] py-16 md:py-24"
      renderCard={(issue) => (
        <Link
          key={issue.slug}
          href={`/newsletter/${issue.slug}`}
          className="group overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601]"
        >
          <div className="relative h-40 w-full">
            <Image
              src={issue.featuredImage.src}
              alt={issue.featuredImage.alt}
              fill
              sizes="(min-width: 768px) 550px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              {new Date(issue.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {issue.minutes} min read
            </p>
            <h3 className="mt-3 font-space-grotesk text-lg font-bold text-white md:text-xl">
              {issue.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-white/70">{issue.excerpt}</p>
          </div>
        </Link>
      )}
    />
  );
}
