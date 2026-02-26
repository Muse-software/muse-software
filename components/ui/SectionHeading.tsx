type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`space-y-4 ${alignClass}`.trim()}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-pretty text-base leading-7 text-white/70 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
