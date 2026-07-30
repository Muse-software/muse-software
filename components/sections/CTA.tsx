import Link from "next/link";
import WordReveal from "../WordReveal";
import MuseLogo from "../MuseLogo";
import Motion3D from "../Motion3D";

export default function CTA() {
  return (
    <section className="bg-[#060608] px-5 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 text-center">
        <MuseLogo showWordmark={false} iconClassName="h-10 w-auto text-[#fd4601]" />
        <WordReveal
          as="h2"
          className="font-space-grotesk text-4xl font-bold leading-[1.05] text-white md:text-6xl"
        >
          Stay on the right side of history.
        </WordReveal>
        <Link
          href="/get-started"
          className="inline-flex items-center gap-5 border border-black bg-white py-3 pl-6 pr-4 text-lg font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601]"
        >
          Get started
          <svg width="18" height="18" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect width="30" height="30" fill="black" />
            <path
              d="M10.0066 22V21.0033H11.0053V20.0066H12.004V19.0099H13.0026V18.0132H14.0013V17.0165H15V16.0198H15.9987V15.0231H16.9974V14.0264H17.996V13.0297H18.9947V12.033H19.9934V17.0316H22V8H13.004V10.0026H18.0145V10.9993H17.0159V11.996H16.0172V12.9927H15.0185V13.9895H14.0198V14.9862H13.0211V15.9829H12.0225V16.9796H11.0238V17.9763H10.0251V18.973H9.02642V19.9697H8V21.9723H10.0066V22Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      <div className="relative mx-auto mt-16 h-64 w-full max-w-[1400px] overflow-hidden md:h-96">
        <Motion3D frame={3} variant="float" className="opacity-80" />
        <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-transparent to-transparent" />
      </div>
    </section>
  );
}
