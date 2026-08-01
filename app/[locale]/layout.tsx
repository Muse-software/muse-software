import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
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

// Code-split GSAP (and the rest of the nav's animation logic) into its own
// chunk instead of the shared bundle every route pays for — still rendered
// server-side (no ssr:false) so the header/logo/toggle button are present
// in the initial HTML with no flash-of-missing-nav; only the JS weight is
// deferred to its own async chunk.
const StaggeredMenu = dynamic(() => import("@/components/StaggeredMenu"));

// Route shape lives in code, labels live in `messages/*.json` under `Nav.items`
// — the two are joined at render time so a translation never has to carry a
// URL and a URL change never has to be repeated in two message files.
const NAV_ROUTES = [
  { key: "home", link: "/" },
  { key: "explore", link: "/explore" },
  { key: "about", link: "/about" },
  { key: "careers", link: "/careers" },
  { key: "newsletter", link: "/newsletter" },
  { key: "contact", link: "/contact" },
  { key: "getStarted", link: "/get-started" },
] as const;

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

  const t = await getTranslations("Nav");
  const common = await getTranslations("Common");

  const menuItems = NAV_ROUTES.map(({ key, link }) => ({
    label: t(`items.${key}`),
    link,
  }));

  // Built here rather than at module scope because the accessible name is a
  // translation lookup. `label` stays the English identity key (it selects the
  // glyph inside the menu); `ariaLabel` is what a screen reader announces.
  const socialItems = allSocials.map(({ label, href }) => ({
    label,
    ariaLabel: common(`socials.${label}`),
    link: href,
  }));

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
          <a href="#main-content" className="skip-link">
            {common("skipToContent")}
          </a>
          <PageLoader />
          {/*
            The panel slides in from the inline start edge, which is the left
            in Arabic. The component was already RTL-capable: the GSAP
            offscreen maths and the [data-position='left'] CSS both key off
            this one prop, so mirroring the nav costs a ternary. The header
            itself needs nothing — it is a flex row, so `dir` swaps the logo
            and the toggle for free and the toggle lands on the same side the
            panel opens from.
          */}
          <StaggeredMenu
            position={localeDirection[locale] === "rtl" ? "left" : "right"}
            isFixed={true}
            items={menuItems}
            socialItems={socialItems}
            labels={{
              header: t("header"),
              home: t("homeAriaLabel"),
              openMenu: t("openMenu"),
              closeMenu: t("closeMenu"),
              socialsHeading: t("socialsHeading"),
              socialsLabel: t("socialsLabel"),
              empty: t("empty"),
            }}
            colors={["#fd4601", "#c23800"]}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            accentColor="#fd4601"
            displayItemNumbering={true}
            displaySocials={true}
          />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
