"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import WordReveal from "../WordReveal";
import { localeDirection, type Locale } from "@/i18n/routing";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * The two role nouns wipe in like a highlighter stroke the first time the
 * section enters view — `whileInView` is Motion's IntersectionObserver, so
 * this fires once and never re-triggers on scroll back up. Reduced motion
 * gets the same box with no wipe, matching `.hero-highlight` in the hero.
 */
function RoleHighlight({ children }: { children: ReactNode }) {
  const locale = useLocale() as Locale;
  const reduceMotion = useReducedMotion();
  const dir = localeDirection[locale];

  if (reduceMotion) {
    return (
      <span className="hero-highlight inline-block whitespace-nowrap bg-white text-black">
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className="hero-highlight inline-block whitespace-nowrap bg-white text-black"
      initial={{ clipPath: dir === "rtl" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  );
}

export default function WhoWeBuildFor() {
  const t = useTranslations("Home.whoWeBuildFor");

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1000px] px-5 md:px-10 text-center">
        <WordReveal
          as="h2"
          className="font-space-grotesk text-3xl font-bold leading-[1.15] text-white md:text-5xl"
        >
          {t("heading")}
        </WordReveal>
        <p className="mt-8 text-lg leading-8 text-white/75 md:text-2xl md:leading-10">
          {t.rich("body", {
            role: (chunks) => <RoleHighlight>{chunks}</RoleHighlight>,
          })}
        </p>
      </div>
    </section>
  );
}
