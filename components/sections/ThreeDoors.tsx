"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Door = {
  slug: string;
  title: string;
  body: string;
  promise: string;
  cta: string;
};

export default function ThreeDoors({ locale }: { locale: string }) {
  const t = useTranslations("Home.doors");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const doors: Door[] = [
    {
      slug: "build",
      title: t("build.title"),
      body: t("build.body"),
      promise: t("build.promise"),
      cta: t("build.cta"),
    },
    {
      slug: "ventures",
      title: t("ventures.title"),
      body: t("ventures.body"),
      promise: t("ventures.promise"),
      cta: t("ventures.cta"),
    },
    {
      slug: "think",
      title: t("think.title"),
      body: t("think.body"),
      promise: t("think.promise"),
      cta: t("think.cta"),
    },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <motion.div
          className="mb-16 md:mb-24"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <h2 className="font-space-grotesk text-3xl font-bold text-white md:text-5xl">
            {t("heading")}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {doors.map((door, i) => (
            <motion.div
              key={door.slug}
              initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT }}
            >
              <Link
                href={`/${door.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group block rounded-2xl border border-white/15 bg-[#0a0a0c] p-8 transition-all duration-300 hover:border-[#fd4601]/50 hover:shadow-lg hover:shadow-[#fd4601]/5 hover:-translate-y-1 md:p-10"
              >
                <h3 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
                  {door.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {door.body}
                </p>
                <p className="mt-6 border-s-2 border-[#fd4601] ps-4 text-sm leading-6 text-white/80">
                  {door.promise}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#fd4601] transition-colors group-hover:text-white">
                  {door.cta}
                  <span aria-hidden="true" className="arrow-inline">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}