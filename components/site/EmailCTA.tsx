import { contactHref } from "@/lib/contact";

export default function EmailCTA({ locale }: { locale: "en" | "ar" }) {
  return <div className="mx-email-cta">
    <a className="mx-button" href={contactHref(locale)}>
      {locale === "ar" ? "ابدأ مجانًا" : "Get started"}
      <span className="mx-arrow" aria-hidden="true">↗</span>
    </a>
  </div>;
}
