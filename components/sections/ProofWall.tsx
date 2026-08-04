"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface ProofItem {
  category: string;
  title: string;
  body: string;
  tags: string[];
  link?: string;
  external?: boolean;
}

export default function ProofWall({ locale }: { locale: string }) {
  const t = useTranslations("Home.proofWall");
  const reduceMotion = useReducedMotion();

  const items: ProofItem[] = t.raw("items") as unknown as ProofItem[];

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10">
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
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        >
          {items.map((item: ProofItem, i: number) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
              className="p-6 md:p-8 rounded-2xl border border-white/15 bg-[#0a0a0c] hover:border-[#fd4601]/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#fd4601] bg-[#fd4601]/10 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="font-space-grotesk text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 leading-7 mb-4">
                {item.body}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag: string, ti: number) => (
                  <span
                    key={tag}
                    className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.link && (
                <Link
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#fd4601] hover:text-white transition-colors"
                >
                  {item.external ? "View live →" : "View case study →"}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}