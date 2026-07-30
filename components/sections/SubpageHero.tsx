import Image from "next/image";
import WordReveal from "../WordReveal";
import Motion3D from "../Motion3D";

type SubpageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
};

// Deterministic per-page pick so each subpage gets a different frame,
// framing, and loop style instead of the exact same motion treatment.
const objectPositionOptions = [
  "object-[85%_50%]",
  "object-[15%_40%]",
  "object-[70%_20%]",
  "object-[30%_75%]",
];

function pickVariant(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const frame = ((hash % 3) + 1) as 1 | 2 | 3;
  const variant: "pan" | "float" = hash % 2 === 0 ? "pan" : "float";
  const objectPosition = objectPositionOptions[hash % objectPositionOptions.length];
  return { frame, variant, objectPosition };
}

export default function SubpageHero({ eyebrow, title, subtitle, image }: SubpageHeroProps) {
  const { frame, variant, objectPosition } = pickVariant(title);

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
          <Motion3D frame={frame} variant={variant} className="opacity-60" objectPosition={objectPosition} priority />
          <div className="absolute inset-0 bg-linear-to-r from-[#060608] via-[#060608]/55 to-[#060608]/20" />
          <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-transparent to-[#060608]/50" />
        </>
      )}
      <div className="pattern-crosshair pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
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
