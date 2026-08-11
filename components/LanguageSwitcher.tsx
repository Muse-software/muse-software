"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { PUBLISHED_LOCALES, routing, type Locale } from "@/i18n/routing";

/**
 * Renders nothing unless more than one locale is published.
 *
 * That gate is the whole design. `/ar` has existed and rendered since Phase 1,
 * but until the Arabic content programme clears its review gate it is English
 * copy under Arabic chrome, and plan section 11 is explicit that an Arabic
 * locale rendering English is worse than no Arabic locale at all. Wiring the
 * switcher to the same `PUBLISHED_LOCALES` constant that already controls
 * `noindex`, the sitemap and the hreflang set means going live is one constant
 * change in one file, with nothing left to remember.
 *
 * Colours are for the orange footer panel, which is its only mount point. If
 * it is ever placed on page black again these need to invert back to white.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (PUBLISHED_LOCALES.length < 2) return null;

  function switchTo(next: Locale) {
    startTransition(() => {
      // `pathname` here is the locale-stripped route, and `params` carries the
      // dynamic segments, so a switch from /en/playbooks/foo lands on
      // /ar/playbooks/foo rather than dropping the reader on the home page.
      // Slugs are shared across locales by design (plan section 1), which is
      // what makes this a straight substitution.
      router.replace(
        // @ts-expect-error -- pathname is a runtime string, so it cannot be
        // narrowed to the generated union of static routes. The params object
        // supplies whatever dynamic segments that route actually declares.
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    // Spacing is a prop because this renders null most of the time. A wrapper
    // supplying the margin from outside cannot know that, so it reserves the
    // space regardless — which is exactly what it was doing in the footer.
    <div className={`flex items-center gap-2 ${className ?? ""}`} aria-live="polite">
      {routing.locales
        .filter((locale) => PUBLISHED_LOCALES.includes(locale))
        .map((locale) => {
          const isActive = locale === params.locale;
          return (
            <button
              key={locale}
              type="button"
              lang={locale}
              onClick={() => switchTo(locale)}
              disabled={isActive || isPending}
              aria-current={isActive ? "true" : undefined}
              className={`px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                isActive
                  ? "text-black"
                  : "text-black/60 hover:text-black disabled:opacity-50"
              }`}
            >
              {t(locale)}
            </button>
          );
        })}
    </div>
  );
}
