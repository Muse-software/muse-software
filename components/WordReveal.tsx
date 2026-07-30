"use client";

import { ElementType, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type WordRevealProps = {
  children: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  /**
   * "stagger" fires once as the block nears the viewport (used for section
   * headings). "scrub" ties opacity/position directly to scroll position, so
   * the text reveals itself as you scroll past it (used for the manifesto).
   */
  mode?: "stagger" | "scrub";
};

export default function WordReveal({
  children,
  as = "span",
  className,
  wordClassName,
  mode = "stagger",
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, yPercent: -100 });

      if (mode === "scrub") {
        gsap.to(words, {
          opacity: 1,
          yPercent: 0,
          stagger: 0.015,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 20%",
            scrub: 0.8,
          },
        });
      } else {
        const tweenVars = {
          opacity: 1,
          yPercent: 0,
          stagger: 0.03,
          duration: 0.7,
          ease: "power2.out",
        };

        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          // Already inside the "top 85%" zone the instant this mounts —
          // true for every SubpageHero heading, which is always above the
          // fold. A ScrollTrigger created after the element has already
          // crossed its own start point is documented to fire its
          // toggleActions immediately, but that specific path proved
          // unreliable in practice: on a client-side route change the
          // words' opacity would resolve to 1 while yPercent stayed
          // permanently pinned at its initial -100 (confirmed via the
          // computed transform, not just a visual glance), overlapping
          // whatever sits above the heading. Skipping ScrollTrigger
          // entirely for the common "already visible" case removes the
          // failure mode rather than chasing its timing.
          gsap.to(words, tweenVars);
        } else {
          // Genuinely below the fold — animate once actually scrolled into
          // view. A real future scroll event drives this, so it isn't
          // exposed to the same just-mounted timing issue.
          gsap.to(words, {
            ...tweenVars,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    }, el);

    // On a hard reload, fonts and images are already settled by the time
    // this effect runs, so the trigger's start/end offsets are correct
    // immediately. On a client-side route change they aren't — web font
    // swap, image decode, or any slow-mounting component further down the
    // page (e.g. a WebGL scene falling back to CSS after a failed context
    // creation) can all still shift page height afterward, leaving the
    // trigger tied to stale offsets (text overlapping headings until
    // something forces a recalculation). `document.fonts.ready` and the
    // `load` event are each one-shot *per browser session* — on the second
    // and later navigations they've already fired, so they fire again
    // near-instantly (before the new page's layout has necessarily
    // settled) rather than actually waiting for anything. A ResizeObserver
    // on the document catches any real layout change, from any cause, for
    // a bounded window after mount.
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.body);
    const stopObserving = window.setTimeout(() => resizeObserver.disconnect(), 3000);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      window.clearTimeout(stopObserving);
    };
  }, [mode]);

  const words = children.split(" ");
  // `as` is a runtime value, not a JSX-recognizable capitalized identifier —
  // aliasing it lets JSX treat it as a dynamic component/tag while still
  // passing `ref` the normal way, instead of hand-building the props object
  // that createElement needed (which is what tripped react-hooks/refs).
  const Tag = as;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          className={`inline-block will-change-transform ${wordClassName ?? ""}`}
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
