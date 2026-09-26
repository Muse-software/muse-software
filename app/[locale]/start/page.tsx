import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, contactHref, WHATSAPP_URL, WHATSAPP_NUMBER } from "@/lib/contact";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: locale === "ar" ? "نتكلم عن فكرتك" : "Let's talk about your idea",
    description: locale === "ar" ? "راسل عبدالله في ميوز عن فكرتك أو مشروعك." : "Email Abdullah at Muse about your idea or project.",
    path: "/start", locale,
  });
}

/** Old shared links remain useful without collecting data or opening a form. */
export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ar = locale === "ar";
  return <section className="dir-container mail-contact">
    <h1>{ar ? "نتكلم عن فكرتك." : "Let’s talk about your idea."}</h1>
    <p>{ar ? "اكتب لنا عن اللي في بالك. مو لازم تكون كل التفاصيل جاهزة." : "Tell us what you have in mind. You don’t need to have every detail ready."}</p>
    <a className="dir-button" href={contactHref(locale)}>{ar ? "راسل عبدالله" : "Email Abdullah"}<span aria-hidden="true">↗</span></a>
    <p className="mail-contact-help">{ar ? "يفتح تطبيق البريد عندك. أو انسخ العنوان:" : "Opens your email app. Or copy the address:"}</p>
    <a className="mail-contact-address" href={contactHref(locale)} dir="ltr">{CONTACT_EMAIL}</a>
    <a className="mail-contact-whatsapp" href={WHATSAPP_URL}>{ar ? "أو تواصل على واتساب" : "Or message us on WhatsApp"}<span dir="ltr">{WHATSAPP_NUMBER}</span><span aria-hidden="true">↗</span></a>
  </section>;
}
