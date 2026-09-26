import type { Locale } from "@/i18n/routing";

/** Temporary email contact mode: one destination for all public enquiries. */
export const CONTACT_EMAIL = "abdullah@muse.sa";
export const WHATSAPP_URL = "https://wa.me/966592731040";
export const WHATSAPP_NUMBER = "+966 59 273 1040";

export function contactHref(locale: Locale, intent?: string) {
  const subjects: Record<string, [string, string]> = {
    build: ["A new project", "فكرة مشروع جديد"],
    improve: ["Improving an existing product", "تحسين مشروع قائم"],
    ai: ["Simplifying our workflow", "تسهيل طريقة العمل"],
  };
  const subject = subjects[intent || ""]?.[locale === "ar" ? 1 : 0]
    || (locale === "ar" ? "فكرة نتحدث عنها" : "A project to discuss");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// Instagram and X checked against their live Muse profiles; LinkedIn confirmed by owner.
export const SOCIAL_LINKS = [
  {label: "Instagram", href: "https://www.instagram.com/muse_software/"},
  {label: "LinkedIn", href: "https://www.linkedin.com/company/musesoftware/"},
  {label: "X", href: "https://x.com/muse_software"},
] as const;
