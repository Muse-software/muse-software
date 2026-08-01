import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WordReveal from "../WordReveal";

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-8 w-8 border-white/30 ${className}`} />;
}

export default async function Manifesto() {
  const t = await getTranslations("Home.manifesto");

  return (
    <section className="relative bg-[#4C0014] py-20 md:py-32">
      <div className="pattern-crosshair pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1250px] px-5 md:px-10">
        <div className="relative border border-white/10 bg-[#4C0014] px-6 py-16 md:px-16 md:py-24">
          <Corner className="left-0 top-0 border-l border-t" />
          <Corner className="right-0 top-0 border-r border-t" />
          <Corner className="bottom-0 left-0 border-b border-l" />
          <Corner className="bottom-0 right-0 border-b border-r" />

          <WordReveal
            as="h2"
            mode="scrub"
            className="font-space-grotesk text-3xl font-bold leading-[1.15] text-white md:text-5xl"
            wordClassName="text-white"
          >
            {t("heading")}
          </WordReveal>

          <div className="mt-10 max-w-3xl md:mt-14">
            <WordReveal
              as="p"
              mode="scrub"
              className="text-lg leading-8 text-white/70 md:text-xl md:leading-9"
            >
              {t("paragraph1")}
            </WordReveal>
            <div className="h-4" />
            <WordReveal
              as="p"
              mode="scrub"
              className="text-lg leading-8 text-white/70 md:text-xl md:leading-9"
            >
              {t("paragraph2")}
            </WordReveal>
            <div className="h-4" />
            <WordReveal
              as="p"
              mode="scrub"
              className="text-lg leading-8 text-white/70 md:text-xl md:leading-9"
            >
              {t("paragraph3")}
            </WordReveal>
          </div>

          <Link
            href="/get-started"
            className="mt-12 inline-flex items-center gap-5 border border-black bg-white py-2 ps-5 pe-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] md:mt-16 md:py-3 md:ps-6 md:pe-4 md:text-lg"
          >
            {t("cta")}
            <svg width="16" height="16" viewBox="0 0 30 30" fill="none" className="arrow-inline" aria-hidden="true">
              <rect width="30" height="30" fill="black" />
              <path
                d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
