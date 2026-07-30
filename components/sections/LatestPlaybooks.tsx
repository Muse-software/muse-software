import Link from "next/link";
import Image from "next/image";
import { playbooks, toPlaybookSummary } from "../../lib/content";

export default function LatestPlaybooks() {
  const latest = [...playbooks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map(toPlaybookSummary);

  return (
    <section className="bg-[#060608] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
              Playbooks
            </p>
            <h2 className="mt-3 font-space-grotesk text-2xl font-bold text-white md:text-4xl">
              Practical guides, not theory.
            </h2>
          </div>
          <Link
            href="/playbooks"
            className="inline-flex shrink-0 items-center gap-3 self-start border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] md:self-auto"
          >
            View all playbooks
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {latest.map((playbook) => (
            <Link
              key={playbook.slug}
              href={`/playbooks/${playbook.slug}`}
              className="group overflow-hidden border border-white/10 transition-colors duration-300 hover:border-[#fd4601]"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={playbook.featuredImage.src}
                  alt={playbook.featuredImage.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {playbook.minutes} min read
                </p>
                <h3 className="mt-3 font-space-grotesk text-lg font-bold text-white md:text-xl">
                  {playbook.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/70">{playbook.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
