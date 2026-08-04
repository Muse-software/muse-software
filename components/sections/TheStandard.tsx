"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function TheStandard({ locale }: { locale: string }) {
  const t = useTranslations("Home.theStandard");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#4C0014] py-20 md:py-32">
      <div className="pattern-crosshair pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1250px] px-5 md:px-10">
        <div className="relative border border-white/10 bg-[#4C0014] px-6 py-16 md:px-16 md:py-24">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-space-grotesk text-3xl font-bold text-white md:text-5xl">
              {t("heading")}
            </h2>
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            <p className="text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              {t("paragraph1")}
            </p>
            <div className="h-4" />
            <p className="text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              {t("paragraph2")}
            </p>
            <div className="h-4" />
            <p className="text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              {t("paragraph3")}
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
          >
            {t.raw("pillars").map((pillar: { title: string; body: string }, i: number) => (
              <div key={pillar.title} className="p-4 rounded-xl border border-white/10 bg-[#4C0014]/50">
                <h3 className="font-space-grotesk text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-base leading-6 text-white/60">
                  {pillar.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}