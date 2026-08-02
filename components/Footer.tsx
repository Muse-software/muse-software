import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MuseLogo from "./MuseLogo";
import PillButton from "./PillButton";
import SocialLinks, { allSocials } from "./SocialLinks";

/**
 * Footer, rebuilt on the "minimal" template's footer (2026-08-01): a full
 * orange panel with rounded top corners, a blurb and button above two link
 * columns, then a rule, then an oversized "reach out" line facing the contact
 * details.
 *
 * Two departures from the template, both forced by what we actually have:
 *
 * - Its contact block is a street address, a suite number and opening hours.
 *   Muse has none of those on record anywhere in the repo or the vault. The
 *   city is real and is all that goes in. Inventing an address to fill the
 *   column is the same failure as an invented client metric.
 * - Its column headings are `text-black/50`, which is 2.8:1 on #fd4601 and
 *   fails AA. They read at /75 here. The template gets away with /50 because
 *   its accent is #ffd900, a far lighter yellow.
 */

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

const exploreLinks = [
  { key: "explore", href: "/explore" },
  { key: "newsletter", href: "/newsletter" },
  { key: "getStarted", href: "/get-started" },
] as const;

const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
] as const;

const FOOTER_SOCIAL_LABELS = new Set(["LinkedIn", "X", "Instagram"]);
const socials = allSocials.filter((social) => FOOTER_SOCIAL_LABELS.has(social.label));

/** `hover:translate-x-1` in the template is a physical nudge, so an Arabic
 *  link would slide away from its own text. Forward is the inline axis. */
const LINK_CLASSES =
  "inline-block text-black/80 transition-all duration-300 hover:text-black hover:translate-x-1 rtl:hover:-translate-x-1";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");

  return (
    <footer className="rounded-t-4xl bg-[#fd4601] px-5 py-16 text-black md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <MuseLogo iconClassName="h-7 w-auto text-black" />
            <p className="mt-6 text-lg leading-relaxed text-black/80">{t("blurb")}</p>
            <PillButton href="/get-started" variant="onAccent" className="mt-8">
              {t("cta")}
            </PillButton>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/75">
                {t("columns.company")}
              </h2>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASSES}>
                      {nav(`items.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/75">
                {t("columns.explore")}
              </h2>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASSES}>
                      {nav(`items.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="my-14 h-px bg-black/15 md:my-16" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {/* Deliberately not a WordReveal. Everything else on the site that
                animates in does it once, near the viewport top; a footer
                heading is the last thing on the page and would reveal at the
                exact moment the scroll stops, which reads as lag. */}
            <p className="text-balance font-space-grotesk text-5xl font-medium leading-none tracking-tight md:text-7xl lg:text-8xl">
              {t("reachOut")}
            </p>
            <p className="mt-8 text-sm text-black/70">
              {/* The year is passed as a string on purpose: as a number, ICU
                  would group it into "2,026". */}
              {t("rights", { year: String(new Date().getFullYear()) })}
            </p>
            <div className="mt-3 flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-black/70 underline-offset-4 transition-colors hover:text-black hover:underline"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-end">
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-space-grotesk font-semibold">{t("locationName")}</h2>
                <p className="text-black/70">{t("location")}</p>
              </div>
              <a
                href="mailto:info@muse.sa"
                className="inline-block text-lg font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                info@muse.sa
              </a>
            </div>

            {/* The shared `.social-links` hover (dim the siblings) is kept
                rather than the template's scale-up pills — it is the same
                interaction the nav and the contact page already use, and
                three different social-icon behaviours on one site is noise.
                Only the palette moves: the pattern's #fd4601 hover is
                invisible here, so these invert to black on the orange. */}
            <SocialLinks socials={socials} className="social-links-on-accent text-black/60" />
          </div>
        </div>

        {/* Renders nothing at all while only one locale is published, so it
            gets no wrapper and carries its own top margin. A wrapping div with
            `mt-12` on it added three rem of empty orange to the bottom of
            every page for a component that emits no DOM. */}
        <LanguageSwitcher className="mt-12" />
      </div>
    </footer>
  );
}
