import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { allSocials } from "@/components/SocialLinks";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { alternatesFor } from "@/lib/seo";
import "../globals.css";

// This is the root layout. There is deliberately no `app/layout.tsx`: when a
// dynamic segment's layout renders <html>, Next treats it as the root, and
// next-intl's own docs prescribe deleting the outer one. Keeping both would
// nest two <html> elements. `app/global-error.tsx` renders its own
// <html>/<body> because it replaces this whole tree when it fires.

// Code-split the nav's animation logic into its own chunk instead of the
// shared bundle every route pays for — still rendered server-side (no
// ssr:false) so the pill, logo and toggle are present in the initial HTML
// with no flash-of-missing-nav; only the JS weight is deferred.
//
// SiteHeader replaced StaggeredMenu on 2026-08-01. The route/label split that
// used to live here moved into the component, because the new header groups
// its routes into named cards and the grouping is layout, not configuration.
// StaggeredMenu itself is at `archive/components/StaggeredMenu.tsx`.
const SiteHeader = dynamic(() => import("@/components/SiteHeader"));

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
  const t = await getTranslations({ locale: activeLocale, namespace: "Metadata" });

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
    <html lang={locale} dir={localeDirection[locale]}>
      <body className={`${fontVariables} bg-[#060608] text-white antialiased`}>
        {/*
          No `messages` prop: next-intl v4 lets the provider inherit the whole
          catalogue from `i18n/request.ts` when it is rendered from a Server
          Component. Hand-picking namespaces would shave a few KB off the RSC
          payload but fails at runtime — and only on the page that uses the
          missing namespace — so the whole catalogue is passed deliberately.
        */}
        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-link">
              {common("skipToContent")}
            </a>
            <PageLoader />
            {/*
              The header needs no RTL prop of its own. It is a centred pill whose
              inner row is a flex `justify-between`, so `dir` swaps the logo and
              the toggle for free, and the card grid below reflows the same way.
              Everything directional inside it (the link nudge on hover, the
              up-and-out arrow) is handled there with logical properties and
              `.arrow-inline`.

              Socials are passed in rather than imported inside the component so
              the canonical list in SocialLinks stays the single source of URLs.
            */}
            <SiteHeader socials={allSocials} />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
