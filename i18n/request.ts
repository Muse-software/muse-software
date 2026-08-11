import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    formats: {
      number: {
        /**
         * Western numerals in Arabic, per docs/i18n-plan.md section 1.
         *
         * This only matters once a message formats a number rather than
         * interpolating a pre-formatted string, which Arabic forces: "8 min
         * read" has to agree with the Arabic plural (دقيقتان / دقائق / دقيقة),
         * so `minutes` has to reach ICU as a real number for `plural` to
         * select on it. ICU then formats it with `Intl.NumberFormat("ar")`,
         * whose default numbering system is `arab` — the read time would have
         * rendered as ٨ on a site that has already decided against
         * Arabic-Indic digits.
         *
         * Declared as a named format rather than fixed globally because
         * `plural`'s `#` placeholder takes no format argument; the messages
         * that need it use `{minutes, number, latn}` explicitly.
         */
        latn: { numberingSystem: "latn" },
      },
    },
  };
});
