"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function TheProblem({ locale }: { locale: string }) {
  const t = useTranslations("Home.theProblem");
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 text-center">
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
          className="mt-12 grid gap-8 md:grid-cols-3"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        >
          {t.raw("items").map((item: { title: string; body: string }, i: number) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
              className="p-6 md:p-8 rounded-2xl border border-white/15 bg-[#0a0a0c]"
            >
              <h3 className="font-space-grotesk text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 leading-7">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}