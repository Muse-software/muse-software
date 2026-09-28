import Icon from "@/components/Icon";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import SubpageHero from "@/components/sections/SubpageHero";
import { allSlugs, getCareerRole, getCareerRoles } from "@/lib/content";
import { buildMetadata, buildJobPostingJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const dynamicParams = false;

// Union across locales, not this locale's slugs — see `allSlugs`.
export function generateStaticParams() {
  return allSlugs(getCareerRoles);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const role = getCareerRole(locale, slug);
  if (!role) return {};
  return buildMetadata({
    title: role.title,
    description: role.blurb,
    path: `/careers/${slug}`,
    locale,
  });
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const role = getCareerRole(locale, slug);
  if (!role) return notFound();

  // Two namespaces rather than one: `departments` and `applySubject` are shared
  // with the list page, so they live one level up under `Careers`.
  const t = await getTranslations("Careers.detail");
  const careers = await getTranslations("Careers");

  // Was `Application: ${role.title}`, which composed an English word with an
  // Arabic role name and handed the reader a half-translated subject line.
  const applyHref = mailtoHref(careers("applySubject", { role: role.title }));

  const description = [
    role.blurb,
    role.responsibilities?.length
      ? `${t("responsibilities")}: ${role.responsibilities.join("; ")}`
      : null,
    role.requirements?.length
      ? `${t("requirements")}: ${role.requirements.join("; ")}`
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  const jsonLd = buildJobPostingJsonLd({
    title: role.title,
    description,
    path: `/careers/${slug}`,
    location: role.location,
    employmentType: role.employmentType,
    locale,
  });

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHero title={role.title} subtitle={role.blurb} />

      <section className="bg-[#060608] pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[800px] px-5 md:px-10">
          <Link href="/careers" className="text-link career-back">
            <Icon name="arrow-left" className="arrow-inline" />
            {locale === "ar" ? "كل الوظائف" : "All roles"}
          </Link>
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10 pb-8 text-sm text-white/60">
            {role.location && <span>{role.location}</span>}
            {role.employmentType && <span>{role.employmentType}</span>}
            {role.compensation && <span>{role.compensation}</span>}
          </div>

          {role.responsibilities && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">
                {t("responsibilities")}
              </h2>
              <ul className="mt-4 space-y-3">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-white/70"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.requirements && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">
                {t("requirements")}
              </h2>
              <ul className="mt-4 space-y-3">
                {role.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-white/70"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {role.niceToHaves && (
            <div className="mt-10">
              <h2 className="font-space-grotesk text-xl font-bold text-white">
                {t("niceToHave")}
              </h2>
              <ul className="mt-4 space-y-3">
                {role.niceToHaves.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-white/70"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd4601]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="recruitment-apply">
            <h2>
              {locale === "ar"
                ? "خلّنا نتعرّف عليك."
                : "Let’s get to know you."}
            </h2>
            <p>
              {locale === "ar"
                ? "أرسل سيرتك أو رابط ملفك المهني، مع نبذة قصيرة عن اهتمامك بالدور. أضف رابط أعمالك إذا كان متاحًا."
                : "Send your CV or professional profile and a short note about your interest in the role. Include a portfolio link if you have one."}
            </p>
            <a href={applyHref} className="studio-button secondary">
              {locale === "ar" ? "قدّم بالإيميل" : "Apply by email"}{" "}
              <Icon name="arrow-up-right" />
            </a>
            <p className="recruitment-fallback">
              {locale === "ar"
                ? "ما فتح تطبيق الإيميل؟ راسلنا على"
                : "No email app? Write to"}{" "}
              <a href={applyHref} dir="ltr">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
