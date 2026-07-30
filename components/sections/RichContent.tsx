import Image from "next/image";
import type { ContentBlock } from "../../lib/content";

/**
 * Renders a CMS-style content-block array to real semantic HTML — the
 * counterpart to the block content model in lib/content.ts. Each block
 * type maps to one element; add a new block type in both places together.
 */
export default function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-8 text-white/70">
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={i}
                className="pt-4 font-space-grotesk text-2xl font-bold text-white md:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-[#fd4601] py-1 pl-6 font-space-grotesk text-2xl font-medium leading-snug text-white md:text-3xl"
              >
                &ldquo;{block.text}&rdquo;
                {block.attribution && (
                  <footer className="mt-3 text-sm font-normal not-italic text-white/50">
                    {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i}>
                <div className="relative h-64 w-full overflow-hidden md:h-96">
                  <Image src={block.src} alt={block.alt} fill sizes="(min-width: 860px) 860px, 100vw" className="object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-white/50">{block.caption}</figcaption>
                )}
              </figure>
            );

          case "list":
            return block.style === "number" ? (
              <ol key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-lg leading-8 text-white/70">
                    <span className="shrink-0 font-space-grotesk font-bold text-[#fd4601]">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-8 text-white/70">
                    <span className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
