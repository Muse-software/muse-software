import dynamic from "next/dynamic";
import CardDither from "@/components/CardDither";
import SubpageHero from "@/components/sections/SubpageHero";
import ContactForm from "@/components/sections/ContactForm";
import Icon from "@/components/Icon";
import SocialLinks, { allSocials } from "@/components/SocialLinks";
import { buildMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

const Glossy3D = dynamic(() => import("@/components/Glossy3D"));

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildMetadata({
    title: t("contact.title"),
    description: t("contact.description"),
    path: "/contact",
    locale,
  });
}

// `detail` and `href` are data, not copy — a phone number and an address do
// not get translated. Only `key` resolves to a visible, translatable label.
const methods = [
  {
    key: "whatsapp",
    detail: "+966 59 273 1040",
    href: "https://wa.me/966592731040",
    icon: "chat",
  },
  {
    key: "email",
    detail: "info@muse.sa",
    href: "mailto:info@muse.sa",
    icon: "mail",
  },
] as const;

const CONTACT_SOCIAL_LABELS = new Set(["LinkedIn", "X", "Instagram"]);
const socials = allSocials.filter((social) => CONTACT_SOCIAL_LABELS.has(social.label));

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <div className="relative isolate min-h-screen bg-[#060608] text-white">
      <CardDither />
      <SubpageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <Glossy3D
          size={280}
          className="pointer-events-none absolute -bottom-16 -end-16 hidden opacity-60 md:block"
        />
        <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {methods.map((method) => (
              <a
                key={method.key}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                data-dither-card
                className="group flex items-center justify-between gap-6 border border-white/15 p-8 transition-colors duration-300 hover:border-[#fd4601] md:p-10"
              >
                <div>
                  <p className="font-space-grotesk text-xl font-bold md:text-2xl">
                    {t(`methods.${method.key}`)}
                  </p>
                  {/*
                    `dir="ltr"` on the run, not on the paragraph.

                    A phone number is not direction-neutral just because it is
                    digits. In an RTL paragraph the leading "+" resolves to a
                    neutral, N2 gives it the paragraph's own RTL direction, and
                    each digit group is an LTR island inside it — so the groups
                    reorder around the sign. Measured on /ar/contact before this
                    change, by reading the rendered x of every character:

                      source: "+966 59 273 1040"
                      screen: "1040 273 59 966+"

                    That is a wrong phone number on the page, not a cosmetic
                    complaint. HTML's UA sheet gives any element carrying `dir`
                    an `unicode-bidi: isolate`, so a `dir="ltr"` span both fixes
                    the internal order and keeps the whole run anchored at the
                    paragraph's start edge — the number stays on the right with
                    the Arabic label above it, and reads correctly.

                    It covers `info@muse.sa` too. That one already resolved LTR
                    on its own (every character is Latin or a neutral between
                    two Latin runs), but it resolved correctly by accident, and
                    the accident stops holding the moment the string gains a
                    leading or trailing neutral.
                  */}
                  <p className="mt-2 text-white/60">
                    <span dir="ltr">{method.detail}</span>
                  </p>
                </div>
                <Icon name={method.icon} className="h-8 w-8 shrink-0" />
              </a>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-10 md:mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              {t("orFindUsOn")}
            </p>
            <SocialLinks
              socials={socials}
              className="mt-4 gap-6 text-white/70"
              iconClassName="h-6 w-6 [&_svg]:h-full [&_svg]:w-full"
            />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[700px] px-5 md:px-10">
          <h2 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
            {t("formHeading")}
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
