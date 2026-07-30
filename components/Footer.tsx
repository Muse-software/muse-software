import Link from "next/link";
import MuseLogo from "./MuseLogo";
import SocialLinks, { allSocials } from "./SocialLinks";

const resourceLinks = [
  { label: "Insights", href: "/insights" },
  { label: "Playbooks", href: "/playbooks" },
  { label: "Careers", href: "/careers" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const FOOTER_SOCIAL_LABELS = new Set(["LinkedIn", "X", "Instagram"]);
const socials = allSocials.filter((social) => FOOTER_SOCIAL_LABELS.has(social.label));

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060608] px-5 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <MuseLogo iconClassName="h-7 w-auto text-[#fd4601]" />
          <p className="text-xs text-white/50">
            {new Date().getFullYear()} Muse Studios. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 transition-colors hover:text-[#fd4601]"
              >
                {link.label}
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
                {link.label}
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
        </div>
      </div>
    </footer>
  );
}
