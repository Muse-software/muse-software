"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import WordReveal from "../WordReveal";
import Icon from "../Icon";
import { getServices } from "../../lib/content";
import { localeDirection, type Locale } from "@/i18n/routing";

/**
 * Each card is a claim plus one checkable promise. The promise is the part a
 * client can hold us to, so it is set apart rather than buried in the body.
 * See "Applied" in the Website Voice note in the vault.
 *
 * The copy lives in `messages/*.json` under `Home.approach.cards`, keyed by
 * the service slug so a card can never drift away from the service it
 * describes.
 *
 * Motion added 2026-08-01, taken from the "minimal" template's `features`
 * section: the heading column pins while the cards travel past it, and each
 * card arrives on its own beat.
 *
 * The pinning is not new — `md:sticky md:top-28` was already on the heading
 * column and had never once worked, because `body` carried an `overflow-x:
 * hidden` that made it a scroll container of its own and left every sticky
 * descendant resolving against a box that does not scroll. That rule is gone
 * (see the comment on `html` in globals.css). What is new here is the gap
 * between cards: at `gap-5` the right column barely outran the viewport, so
 * even with sticky working there was almost nothing for the heading to hold
 * still *through*.
 *
 * Hover was a flat orange fill until 2026-08-02. It is the dither now — the
 * same drifting dot field as the subpage headers, so hovering a card reads as
 * the site's own material rather than as a generic accent swap. The field
 * itself is not here: `data-dither-card` opts the card into the one shared
 * canvas the page mounts, for the reasons in CardDither.
 *
 * Dropping the fill also stopped the card repainting every string it
 * contains. It used to force body, promise, eyebrow and icon all to flip to
 * black-on-orange and back, each needing its own contrast-checked pair.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function Approach({ locale }: { locale: Locale }) {
  const t = useTranslations("Home.doors");
  // The locale comes down from the page rather than from `useLocale()` so it
  // arrives already narrowed to the union the content layer accepts. Only
  // slug, title, image and icon are read here, so both locales' service
  // records still reach the client bundle: ~10 KB of source for the second
  // locale.
  const services = getServices(locale);
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  // The template slides its heading column in from x: -30. That is a physical
  // offset, so in Arabic the column would enter from the far side of the page
  // and cross the cards on its way in. Enter from the inline start instead.
  const enterFrom = localeDirection[locale] === "rtl" ? 30 : -30;

  const cardMotion = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay: index * 0.1, ease: EASE_OUT },
        };

  return (
    // No background: the page wash runs underneath — see PageDither.
    <section className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <motion.div
            className="md:sticky md:top-32 md:self-start"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, x: enterFrom },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.6, ease: EASE_OUT },
                })}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              {t("build.eyebrow")}
            </p>
            {/* No `ch` clamp. There was a `max-w-[10ch]` here from the
                original brand-guideline import, sized for a much shorter
                heading; the copy grew to 49 characters in English and 61 in
                Arabic and the clamp did not, so it held the h2 to 310px
                inside a 523px column and broke it over five lines (six in
                Arabic). The grid column is already the measure — it is set
                by the `1fr / 1.4fr` split above, which is the actual design
                decision — and a second, tighter measure inside it can only
                ever fight that one as copy changes. */}
            <WordReveal
              as="h2"
              className="mt-4 font-space-grotesk text-4xl font-medium leading-[1.05] text-white md:text-5xl"
            >
              {t("build.title")}
            </WordReveal>
          </motion.div>

          {/* The wide gap is what makes the pinned heading legible as pinned.
              Kept to `md:` so a phone, where nothing is sticky, does not get
              six inches of black between cards. */}
          <div className="flex flex-col gap-5 md:gap-24">
            {services.map((service, i) => (
              <motion.div key={service.slug} {...cardMotion(i)}>
                <Link
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  data-dither-card
                  className={`group flex items-center justify-between gap-6 border px-6 py-8 text-white transition-[border-color,transform] duration-300 hover:scale-[1.01] md:px-10 ${
                    active === i ? "border-[#fd4601]" : "border-white/35"
                  }`}
                >
                  <div className="max-w-[48ch]">
                    <h3 className="font-space-grotesk text-2xl font-bold md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
                      {t(`${service.slug}.body`)}
                    </p>
                    <p className="mt-3 border-s-2 border-[#fd4601] ps-3 text-sm leading-6 text-white/85 md:text-base">
                      {t(`${service.slug}.promise`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fd4601]">
                      {service.cta}{" "}
                      <span aria-hidden="true" className="arrow-inline">
                        →
                      </span>
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
                      className={`absolute inset-0 flex items-center justify-center text-white/50 transition-opacity duration-500 ${
                        active === i ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Icon name={service.icon} className="h-10 w-10" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
