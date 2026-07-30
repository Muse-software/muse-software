import dynamic from "next/dynamic";
import SubpageHero from "../../components/sections/SubpageHero";
import ContactForm from "../../components/sections/ContactForm";
import Icon from "../../components/Icon";
import SocialLinks, { allSocials } from "../../components/SocialLinks";
import { buildMetadata } from "../../lib/seo";

const Glossy3D = dynamic(() => import("../../components/Glossy3D"));

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Tell Muse Studios what you're building — reach us on WhatsApp, email, or social.",
  path: "/contact",
});

const methods = [
  {
    label: "WhatsApp",
    detail: "+966 59 273 1040",
    href: "https://wa.me/966592731040",
    icon: "chat",
  },
  {
    label: "Email",
    detail: "info@muse.sa",
    href: "mailto:info@muse.sa",
    icon: "mail",
  },
] as const;

const CONTACT_SOCIAL_LABELS = new Set(["LinkedIn", "X", "Instagram"]);
const socials = allSocials.filter((social) => CONTACT_SOCIAL_LABELS.has(social.label));

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <SubpageHero
        eyebrow="Contact Us"
        title="Let's talk."
        subtitle="Tell us what you're building — we usually reply the same day."
      />

      <section className="relative overflow-hidden bg-[#060608] py-16 md:py-24">
        <Glossy3D
          size={280}
          className="pointer-events-none absolute -bottom-16 -right-16 hidden opacity-60 md:block"
        />
        <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {methods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border border-white/15 p-8 transition-colors duration-300 hover:border-[#fd4601] hover:bg-[#fd4601] hover:text-black md:p-10"
              >
                <div>
                  <p className="font-space-grotesk text-xl font-bold md:text-2xl">
                    {method.label}
                  </p>
                  <p className="mt-2 text-white/60 group-hover:text-black/70">
                    {method.detail}
                  </p>
                </div>
                <Icon name={method.icon} className="h-8 w-8 shrink-0" />
              </a>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-10 md:mt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Or find us on
            </p>
            <SocialLinks
              socials={socials}
              className="mt-4 gap-6 text-white/70"
              iconClassName="h-6 w-6 [&_svg]:h-full [&_svg]:w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[700px] px-5 md:px-10">
          <h2 className="font-space-grotesk text-2xl font-bold text-white md:text-3xl">
            Or send us a message
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
