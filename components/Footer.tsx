import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MuseLogo from "./MuseLogo";
import SocialLinks, { allSocials } from "./SocialLinks";

const resourceLinks = [{ key: "careers", href: "/careers" }] as const;

const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
] as const;

const FOOTER_SOCIAL_LABELS = new Set(["LinkedIn", "X", "Instagram"]);
const socials = allSocials.filter((social) => FOOTER_SOCIAL_LABELS.has(social.label));

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-white/10 bg-[#060608] px-5 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <MuseLogo iconClassName="h-7 w-auto text-[#fd4601]" />
          <p className="text-xs text-white/50">
            {/* The year is passed as a string on purpose: as a number, ICU
                would group it into "2,026". */}
            {t("rights", { year: String(new Date().getFullYear()) })}
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 transition-colors hover:text-[#fd4601]"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-6">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-[#fd4601]"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <a
              href="mailto:info@muse.sa"
              className="text-sm text-white/60 transition-colors hover:text-[#fd4601]"
            >
              info@muse.sa
            </a>
            <SocialLinks socials={socials} className="text-white/60" />
          </div>
          {/* Renders nothing while only one locale is published. The footer is
              the low-risk home for it: the nav is vendored React Bits code
              whose header is a two-item flex row, and adding a third element
              there is a layout decision worth making when Arabic actually goes
              live rather than months ahead of it. */}
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
