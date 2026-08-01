import { getLocale, getTranslations } from "next-intl/server";
import SubpageHero from "@/components/sections/SubpageHero";
import { Link } from "@/i18n/navigation";
import { localeDirection, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

/**
 * `not-found.tsx` receives no `params`, so the locale comes from the request
 * scope the layout already established.
 *
 * The wrapper carries `lang`, `dir` and the font variables itself rather than
 * inheriting them from `[locale]/layout.tsx`: when `notFound()` fires, Next
 * serves its own document shell (`<html id="__next_error__">`) and the
 * layout's `<html>`/`<body>` attributes are dropped. Relying on them here
 * would ship an Arabic 404 that renders left-to-right in a system font with no
 * language declared for screen readers.
 *
 * Known limitation, measured on Next 16.1.6: this subtree is client-rendered.
 * `notFound()` returns the 404 status with the flight payload but no
 * server-rendered markup, so a bad URL paints the page background first and
 * fills in on hydration. Verified as framework behaviour, not local wiring —
 * it reproduces with `global-error.tsx` removed and with a fully synchronous
 * version of this component. The 404 *status* is server-side and correct,
 * which is the part crawlers act on.
 */

const suggestions = [
  { key: "home", href: "/" },
  { key: "explore", href: "/explore" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("NotFound");

  return (
    <div
      lang={locale}
      dir={localeDirection[locale]}
      className={`${fontVariables} min-h-screen bg-[#060608] text-white antialiased`}
    >
      <SubpageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion.href}
                href={suggestion.href}
                className="group flex items-center justify-between gap-6 border border-white/15 p-6 transition-colors duration-300 hover:border-[#fd4601] hover:bg-[#fd4601] hover:text-black md:p-8"
              >
                <span className="font-space-grotesk text-lg font-bold md:text-xl">
                  {t(`suggestions.${suggestion.key}`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
