"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import WordReveal from "../WordReveal";
import Icon from "../Icon";
import { getServices } from "../../lib/content";
import type { Locale } from "@/i18n/routing";

/**
 * Each card is a claim plus one checkable promise. The promise is the part a
 * client can hold us to, so it is set apart rather than buried in the body.
 * See "Applied" in the Website Voice note in the vault.
 *
 * The copy lives in `messages/*.json` under `Home.approach.cards`, keyed by
 * the service slug so a card can never drift away from the service it
 * describes.
 */
export default function Approach({ locale }: { locale: Locale }) {
  const t = useTranslations("Home.approach");
  // The locale comes down from the page rather than from `useLocale()` so it
  // arrives already narrowed to the union the content layer accepts. Only
  // slug, title, image and icon are read here, so both locales' service
  // records still reach the client bundle: ~10 KB of source for the second
  // locale. The playbooks array is 288 KB and could not survive the same
  // treatment, which is why it is passed in as data instead.
  const services = getServices(locale);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[#060608] py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              {t("eyebrow")}
            </p>
            <WordReveal
              as="h2"
              className="mt-4 max-w-[10ch] font-space-grotesk text-4xl font-medium leading-[1.05] text-white md:text-5xl"
            >
              {t("heading")}
            </WordReveal>
          </div>

          <div className="flex flex-col gap-5">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`group flex items-center justify-between gap-6 border px-6 py-8 transition-colors duration-300 md:px-10 ${
                  active === i
                    ? "border-[#fd4601] bg-[#fd4601] text-black"
                    : "border-white/35 bg-transparent text-white"
                }`}
              >
                <div className="max-w-[48ch]">
                  <h3 className="font-space-grotesk text-2xl font-bold md:text-3xl">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-6 md:text-base ${
                      active === i ? "text-black/80" : "text-white/60"
                    }`}
                  >
                    {t(`cards.${service.slug}.body`)}
                  </p>
                  <p
                    className={`mt-3 border-s-2 ps-3 text-sm leading-6 md:text-base ${
                      active === i
                        ? "border-black/40 text-black"
                        : "border-[#fd4601] text-white/85"
                    }`}
                  >
                    {t(`cards.${service.slug}.promise`)}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                      active === i ? "text-black" : "text-[#fd4601]"
                    }`}
                  >
                    {t("learnMore")} <span aria-hidden="true" className="arrow-inline">→</span>
                  </span>
                </div>

                {/* Outline icon crossfades into a real photo on hover */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden md:h-28 md:w-28">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 112px, 80px"
                    className={`object-cover transition-opacity duration-500 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      active === i ? "opacity-0" : "opacity-100"
                    } ${active === i ? "text-black" : "text-white/50"}`}
                  >
                    <Icon name={service.icon} className="h-10 w-10" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
