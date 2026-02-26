import Link from "next/link";

type ButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--gold)] text-black shadow-[0_0_24px_rgba(248,191,84,0.35)] hover:shadow-[0_0_32px_rgba(248,191,84,0.5)]",
  secondary:
    "border border-white/25 text-white hover:border-[var(--coral)] hover:text-[var(--coral)]",
  ghost:
    "text-white/80 hover:text-white",
};

export default function Button({
  href,
  label,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.2em] transition ${variants[variant]}`}
    >
      {label}
    </Link>
  );
}
