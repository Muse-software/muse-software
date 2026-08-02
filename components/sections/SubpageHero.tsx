import Image from "next/image";
import WordReveal from "../WordReveal";
import DitherField from "../DitherField";

type SubpageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
};

export default function SubpageHero({ eyebrow, title, subtitle, image }: SubpageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#060608] pb-16 pt-40 md:pb-20 md:pt-48">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-[#060608]/70 to-[#060608]/40" />
        </>
      ) : (
        <>
          <DitherField className="opacity-90" />
          {/* One vertical scrim, doing two jobs: it keeps the orange eyebrow off
              the orange dot field, and it resolves the section into the page
              black at the bottom edge so the header meets the next section with
              no seam. Vertical on purpose — the gradient this replaced ran
              `to-r`, a physical axis that `dir` does not flip, so under Arabic
              the text landed on the *transparent* end of its own scrim. */}
          <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-[#060608]/50 to-transparent" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fd4601]">
          {eyebrow}
        </p>
        <WordReveal
          as="h1"
          className="mt-4 max-w-4xl font-space-grotesk text-4xl font-bold leading-[1.05] text-white md:text-6xl"
        >
          {title}
        </WordReveal>
        {subtitle ? (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
