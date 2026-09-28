import type { Locale } from "@/i18n/routing";

/**
 * Shared destinations for the enquiry form and direct contact links.
 * CONTACT_EMAIL comes from `.env`; next.config.ts validates it and inlines it
 * at build time so client components can read it too.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL as string;
export const WHATSAPP_URL = "https://wa.me/966592731040";
export const WHATSAPP_NUMBER = "+966 59 273 1040";

/** `mailto:` link to the contact address, optionally with a subject line. */
export function mailtoHref(subject?: string) {
  return `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export function contactHref(locale: Locale, intent?: string) {
  const subjects: Record<string, [string, string]> = {
    build: ["A new project", "فكرة مشروع جديد"],
    improve: ["Improving an existing product", "تحسين مشروع قائم"],
    ai: ["Simplifying our workflow", "تسهيل طريقة العمل"],
  };
  const subject =
    subjects[intent || ""]?.[locale === "ar" ? 1 : 0] ||
    (locale === "ar" ? "فكرة نتحدث عنها" : "A project to discuss");
  return mailtoHref(subject);
}

// Instagram and X checked against their live Muse profiles; LinkedIn confirmed by owner.
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/muse_software/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/musesoftware/" },
  { label: "X", href: "https://x.com/muse_software" },
] as const;

export function inquiryHref(locale: Locale, intent?: string) {
  const query =
    intent && ["build", "improve", "ai", "unsure"].includes(intent)
      ? `?intent=${intent}`
      : "";
  return `/${locale}/start${query}`;
}
