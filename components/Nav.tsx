import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export default function Nav() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
          Muse Software
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--gold)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden h-10 items-center justify-center rounded-full border border-white/30 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[var(--coral)] md:inline-flex"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-white/10" aria-hidden="true" />
    </header>
  );
}
