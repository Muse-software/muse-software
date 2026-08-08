"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CarouselVelocity } from "@/components/effects/R3FCarouselScene";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import ProofWall from "./ProofWall";

const R3FCarouselScene = dynamic(() => import("@/components/effects/R3FCarouselScene"), { ssr: false });

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface ProofItem {
  category: string;
  title: string;
  body: string;
  tags: string[];
  link?: string;
  external?: boolean;
}

/**
 * Decorative background art, cycled per card — the case-study items carry no
 * per-item image of their own, and these are the only Muse-owned photos in
 * the repo (plan §6). Not meant to depict the specific case study it sits
 * behind.
 */
const PHOTOS = [
  "/photos/cover-neon-city.jpg",
  "/photos/cover-orange-blur.jpg",
  "/photos/cover-red-light-figure.jpg",
  "/photos/hero-group-silhouette.jpg",
  "/photos/hero-silhouette-sunset.jpg",
  "/photos/pillar-ai-transformation.jpg",
  "/photos/pillar-gamification.jpg",
  "/photos/pillar-product-engineering.jpg",
];

const IMAGE_SIZE: [number, number] = [1.7, 1.05];
const GAP = 0.55;

function inlineSign(el: HTMLElement): 1 | -1 {
  return getComputedStyle(el).direction === "rtl" ? -1 : 1;
}

function ProofCard({ item }: { item: ProofItem }) {
  return (
    <div className="w-72 rounded-2xl border border-white/15 bg-[#0a0a0c]/95 p-5 text-start backdrop-blur-sm">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#fd4601] bg-[#fd4601]/10 px-2.5 py-1 rounded-full">
        {item.category}
      </span>
      <h3 className="mt-3 font-space-grotesk text-lg font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/60 line-clamp-3">{item.body}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span key={tag} className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {tag}
          </span>
        ))}
      </div>
      {item.link && (
        <Link
          href={item.link}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#fd4601] hover:text-white transition-colors"
        >
          {item.external ? "View live →" : "View case study →"}
        </Link>
      )}
    </div>
  );
}

/**
 * Production variant of `ProofWall` (plan §3.E, phase E2) — same
 * `Home.proofWall.items` content contract, wave-shader carousel visual from
 * `R3FCarousel`'s engine instead of a static grid. Case-study text stays in
 * the DOM via `<Html transform>` (see `R3FCarouselScene.tsx`), never
 * rendered into the canvas, so a11y/SEO/Arabic-bidi are unaffected by the
 * WebGL layer (plan §11 R-2, R-4).
 *
 * Reduced motion renders `<ProofWall/>` — today's real grid — verbatim, not
 * a re-implementation of it: the plan requires this exact fallback (§11 R-1),
 * and importing the actual component is the only way to guarantee it never
 * drifts from it.
 *
 * **Not wired into `HomeSections.tsx`.** Plan §3.E's swap is gated on a QA
 * pass (live WebGL context count, LCP/CLS parity, RTL drag direction) that
 * this execution environment cannot run — no GPU and no software-rendering
 * fallback available to this sandbox's Chromium, confirmed while building
 * `R3FCarousel` (see `scripts/qa/effects-qa.mjs`'s header comment). Per the
 * plan's own instruction for exactly this case: ship as demo-only, keep the
 * grid in production, until that QA runs somewhere that can actually render
 * WebGL. See `docs/effects-3d-implementation-report.md`.
 */
export default function ProofWallCarousel({ locale }: { locale: string }) {
  const t = useTranslations("Home.proofWall");
  const reduceMotion = useReducedMotion();
  const reducedMotionQuery = usePrefersReducedMotion();
  const items = t.raw("items") as unknown as ProofItem[];

  const hostRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const velocityRef = useRef<CarouselVelocity>({ impulse: 0 });
  const dragState = useRef({ dragging: false, lastX: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry?.isIntersecting ?? false),
      { rootMargin: "50% 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // See R3FCarousel.tsx's matching listener: a vertical wheel gesture only
  // drives the carousel while the host is fully inside the viewport, or a
  // normal scroll wheel tick anywhere over this (560px-tall) section would
  // get hijacked into carousel motion instead of scrolling the page past it.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotionQuery) return;

    const isFullyInViewport = () => {
      const rect = host.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };

    const handleWheel = (event: WheelEvent) => {
      const isVerticalGesture = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      if (!isVerticalGesture || !isFullyInViewport()) return;
      event.preventDefault();
      velocityRef.current.impulse += inlineSign(host) * event.deltaY * 0.0025;
    };

    host.addEventListener("wheel", handleWheel, { passive: false });
    return () => host.removeEventListener("wheel", handleWheel);
  }, [reducedMotionQuery]);

  if (reducedMotionQuery) {
    return <ProofWall locale={locale} />;
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = { dragging: true, lastX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const dx = event.clientX - dragState.current.lastX;
    dragState.current.lastX = event.clientX;
    velocityRef.current.impulse += inlineSign(event.currentTarget) * dx * 0.006;
  };

  const stopDragging = () => {
    dragState.current.dragging = false;
  };

  const images = items.map((_, i) => PHOTOS[i % PHOTOS.length]);
  const content = items.map((item) => <ProofCard key={item.title} item={item} />);

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">{t("eyebrow")}</p>
          <h2 className="mt-4 font-space-grotesk text-3xl font-bold text-white md:text-5xl">{t("heading")}</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

        <div
          ref={hostRef}
          className="relative mt-12 h-[560px] w-full touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
          onPointerCancel={stopDragging}
        >
          {isNearViewport && (
            <R3FCarouselScene
              images={images}
              content={content}
              imageSize={IMAGE_SIZE}
              gap={GAP}
              curveStrength={0.25}
              curveFrequency={0.3}
              velocityRef={velocityRef}
            />
          )}
        </div>
      </div>
    </section>
  );
}
