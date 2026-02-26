"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CollectionHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  gradient?: string; // kept for API compatibility but not used
}

export default function CollectionHero({
  eyebrow,
  title,
  subtitle,
}: CollectionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 0.7,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      // Animate title with stagger
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
        }
      );

      // Animate subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 0.7,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[60svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="space-y-6 text-center">
          <p
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50"
          >
            {eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {title}
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto max-w-2xl text-base md:text-lg text-white/60"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
