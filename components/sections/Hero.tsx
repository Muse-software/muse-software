"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../ui/Button";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
      gsap.to(".float-card", {
        y: -12,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="hero-animate text-xs font-semibold uppercase tracking-[0.45em] text-[var(--gold)]">
              Enterprise AI Agency
            </p>
            <h1 className="hero-animate hero-title text-balance font-semibold leading-[1.05] text-white">
              Build AI systems that move revenue, reduce risk, and scale globally.
            </h1>
            <p className="hero-animate max-w-xl text-pretty text-base leading-7 text-white/70 md:text-lg">
              Muse designs and deploys AI transformation programs, engineering
              teams, and digital platforms built for regulated industries.
            </p>
            <div className="hero-animate flex flex-wrap gap-4">
              <Button href="/contact" label="Start Project" />
              <Button href="/case-studies/axiom-logistics" label="View Work" variant="secondary" />
            </div>
            <div className="hero-animate flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              <span className="h-px w-10 bg-white/30" />
              Scroll
            </div>
          </div>
          <div className="relative grid gap-6 sm:grid-cols-2">
            <div className="float-card glass-panel space-y-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--coral)]">
                Signal Intelligence
              </p>
              <p className="text-xl font-semibold text-white">
                98.7% decision accuracy with live policy guardrails.
              </p>
            </div>
            <div className="float-card glass-panel space-y-4 p-6 sm:translate-y-10">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
                Latency
              </p>
              <p className="text-xl font-semibold text-white">
                420ms median response for global AI agents.
              </p>
            </div>
            <div className="float-card glass-panel space-y-4 p-6 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--purple)]">
                Outcomes
              </p>
              <p className="text-xl font-semibold text-white">
                $96M pipeline influenced across enterprise AI rollouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
