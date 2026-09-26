"use client";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitch({
  className,
  fullLabel = false,
}: {
  className?: string;
  fullLabel?: boolean;
}) {
  const ar = useLocale() === "ar";
  const pathname = usePathname();
  const target = ar ? "en" : "ar";
  return (
    <Link
      className={className}
      href={pathname}
      locale={target}
      lang={target}
      hrefLang={target}
      aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        // Reload the localized root document so lang/dir and font assets switch together.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(
          `/${target}${pathname === "/" ? "" : pathname}${window.location.search}${window.location.hash}`,
        );
      }}
    >
      {ar ? (fullLabel ? "English" : "EN") : fullLabel ? "العربية" : "عربي"}
    </Link>
  );
}
