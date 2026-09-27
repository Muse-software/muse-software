
import Icon from "@/components/Icon";
import { inquiryHref } from "@/lib/contact";

export default function EmailCTA({ locale }: { locale: "en" | "ar" }) {
  return <div className="mx-email-cta">
    <a className="mx-button" href={inquiryHref(locale)}>
      {locale === "ar" ? "ابدأ مجانًا" : "Get started"}
      <Icon name="arrow-up-right" className="mx-arrow"/>
    </a>
  </div>;
}
