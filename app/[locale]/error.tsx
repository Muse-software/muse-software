"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const ar = useLocale() === "ar";
  return (
    <div className="route-state shell">
      <h1>
        {ar ? "ما قدرنا نكمل تحميل الصفحة." : "This page didn’t load properly."}
      </h1>
      <p>
        {ar
          ? "جرّب مرة ثانية، أو ارجع للرئيسية واختر وجهتك."
          : "Try again, or return home and choose where to go next."}
      </p>
      <div className="hero-actions">
        <button onClick={reset} className="studio-button">
          {ar ? "حاول مرة ثانية" : "Try again"}
        </button>
        <Link href="/" className="text-link">
          {ar ? "العودة للرئيسية" : "Back to home"}
          <span className="arrow-inline" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
