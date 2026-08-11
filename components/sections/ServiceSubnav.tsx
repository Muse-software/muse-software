"use client";

import { useEffect, useState } from "react";

type SubnavItem = { id: string; label: string };

/**
 * A sticky horizontal bar below the fixed header. On mobile the links get a
 * pill treatment and the row scrolls horizontally if it overflows; desktop
 * has room to lay them out as plain text. Scroll-spy highlights whichever
 * section is nearest the top of the viewport; clicking a link scrolls to it,
 * instantly rather than smoothly under reduced motion.
 */
export default function ServiceSubnav({ items }: { items: SubnavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section"
      className="sticky top-20 z-20 overflow-x-auto border-b border-white/10 bg-[#060608]/90 px-3 backdrop-blur md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-4 gap-1 py-3 md:flex md:gap-6 md:py-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`min-w-0 whitespace-nowrap rounded-full border px-1 py-1.5 text-center text-[9px] font-semibold uppercase tracking-normal transition-colors md:rounded-none md:border-0 md:border-b-2 md:px-0 md:py-0 md:pb-1 md:text-start md:text-sm md:tracking-[0.15em] ${
              active === item.id
                ? "border-[#fd4601] text-white md:border-[#fd4601]"
                : "border-white/20 text-white/50 hover:text-white md:border-transparent"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
