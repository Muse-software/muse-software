"use client";

/**
 * Phase B (plan §4): proves the runtime this branch adds actually resolves
 * and runs in a real build — Lenis feeding gsap's ticker (already wired
 * globally in `SmoothScrollProvider.tsx`, Phase A), plus three of the gsap
 * bonus plugins verified present in `node_modules/gsap/dist/` but not
 * previously exercised anywhere in the app: SplitText, Flip, ScrollTrigger
 * (already used by `WordReveal.tsx`, re-proven here in a harder pin/scrub
 * shape). If a future `npm i` ever changes gsap's `exports` map, this page's
 * build (and `npx tsc --noEmit`) is the gate that catches it — see plan §11 R-10.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
}

function SplitTextSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    if (reducedMotion) {
      gsap.set(heading, { opacity: 1 });
      return;
    }

    const split = new SplitText(heading, { type: "words,chars" });
    gsap.set(split.chars, { opacity: 0, yPercent: 100 });
    const tween = gsap.to(split.chars, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.02,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">SplitText</p>
      <h2 ref={headingRef} className="mt-4 font-space-grotesk text-3xl font-bold md:text-5xl">
        GSAP SplitText, resolved and running in this build.
      </h2>
    </section>
  );
}

const FLIP_CARDS = [
  { id: "a", label: "Lenis" },
  { id: "b", label: "SplitText" },
  { id: "c", label: "Flip" },
  { id: "d", label: "ScrollTrigger" },
  { id: "e", label: "GSAP" },
  { id: "f", label: "Muse" },
];

function FlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const toggle = () => {
    const container = containerRef.current;
    if (container && !reducedMotion) {
      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-flip-card]"));
      flipStateRef.current = Flip.getState(cards);
    }
    setLayout((prev) => (prev === "grid" ? "list" : "grid"));
  };

  // Flip.from needs the *new* layout already committed to the DOM — this
  // runs after that commit, before paint, keyed on the state that changed it.
  useLayoutEffect(() => {
    if (!flipStateRef.current) return;
    Flip.from(flipStateRef.current, { duration: 0.5, ease: "power2.inOut", absolute: true });
    flipStateRef.current = null;
  }, [layout]);

  return (
    <section className="py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">Flip</p>
          <h2 className="mt-4 font-space-grotesk text-3xl font-bold md:text-5xl">Layout, animated between states.</h2>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="shrink-0 rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:border-[#fd4601]"
        >
          Toggle layout
        </button>
      </div>
      <div
        ref={containerRef}
        className={
          layout === "grid"
            ? "mt-8 grid grid-cols-2 gap-4 md:grid-cols-3"
            : "mt-8 flex flex-col gap-3"
        }
      >
        {FLIP_CARDS.map((card) => (
          <div
            key={card.id}
            data-flip-card
            className="rounded-xl border border-white/15 bg-white/5 p-6 font-space-grotesk text-lg font-medium"
          >
            {card.label}
          </div>
        ))}
      </div>
    </section>
  );
}

const PIN_STEPS = [
  "Step one — Lenis wires into gsap's ticker (SmoothScrollProvider.tsx).",
  "Step two — ScrollTrigger reads Lenis's smoothed scroll position, not the raw one.",
  "Step three — this whole panel is pinned via ScrollTrigger while you scroll past it.",
];

function PinSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const steps = stepRefs.current.filter((el): el is HTMLParagraphElement => el !== null);
    if (!steps.length) return;

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0 });
      gsap.set(steps[0], { opacity: 1 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          steps.forEach((el, i) => gsap.set(el, { opacity: i === index ? 1 : 0 }));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">ScrollTrigger pin</p>
        <div className="mt-4 space-y-4">
          {PIN_STEPS.map((text) => (
            <p key={text} className="font-space-grotesk text-xl md:text-2xl">
              {text}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative flex h-screen items-center justify-center overflow-hidden">
      {PIN_STEPS.map((text, i) => (
        <p
          key={text}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
          className="absolute inset-x-10 mx-auto max-w-xl text-center font-space-grotesk text-2xl md:text-4xl"
        >
          {text}
        </p>
      ))}
    </section>
  );
}

export default function AnimationCoreDemo() {
  return (
    <div className="mx-auto max-w-4xl px-5 md:px-10">
      <SplitTextSection />
      <FlipSection />
      <PinSection />
      <div className="pb-24" />
    </div>
  );
}
