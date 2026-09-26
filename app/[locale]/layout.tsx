import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SiteFrame from "@/components/SiteFrame";

import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { alternatesFor } from "@/lib/seo";
import "../globals.css";
import "../studio.css";
import "@/components/site/site.css";
import "@/components/mosaic/mosaic.css";
import "@/components/site/launch.css";

// This is the root layout. There is deliberately no `app/layout.tsx`: when a
// dynamic segment's layout renders <html>, Next treats it as the root, and
// next-intl's own docs prescribe deleting the outer one. Keeping both would
// nest two <html> elements. `app/global-error.tsx` renders its own
// <html>/<body> because it replaces this whole tree when it fires.

// Shared, server-rendered shell; interactive navigation hydrates separately.

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: activeLocale,
    namespace: "Metadata",
  });

  const siteName = t("siteName");
  const description = t("siteDescription");

  return {
    title: {
      default: siteName,
      template: t("titleTemplate"),
    },
    description,
    metadataBase: new URL("https://muse.sa"),
    openGraph: {
      title: siteName,
      description,
      url: `/${activeLocale}`,
      siteName,
      locale: activeLocale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
    alternates: alternatesFor("/", activeLocale),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Without this, every route under [locale] silently opts out of static
  // generation and falls back to dynamic rendering. It fails quietly, so the
  // build's route table is the only place it shows up.
  setRequestLocale(locale);

  const common = await getTranslations("Common");

  return (
    <html lang={locale} dir={localeDirection[locale]} data-scroll-behavior="smooth">
      <body className={`${fontVariables} bg-[#060608] text-white antialiased`}>
        {/*
          No `messages` prop: next-intl v4 lets the provider inherit the whole
          catalogue from `i18n/request.ts` when it is rendered from a Server
          Component. Hand-picking namespaces would shave a few KB off the RSC
          payload but fails at runtime — and only on the page that uses the
          missing namespace — so the whole catalogue is passed deliberately.
        */}
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">
            {common("skipToContent")}
          </a>

          <SiteFrame>{children}</SiteFrame>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
