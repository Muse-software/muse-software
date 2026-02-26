import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/ai-transformation", label: "AI Transformation" },
      { href: "/services/ai-engineering", label: "AI Engineering" },
      { href: "/services/digital-systems", label: "Digital Systems" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Muse AI
            </p>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              Enterprise AI agency delivering trusted systems, measurable
              outcomes, and global readiness.
            </p>
            <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
              <Link href="https://www.linkedin.com" className="transition hover:text-[var(--gold)]">
                LinkedIn
              </Link>
              <Link href="https://www.x.com" className="transition hover:text-[var(--gold)]">
                X
              </Link>
              <Link href="https://www.github.com" className="transition hover:text-[var(--gold)]">
                GitHub
              </Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {column.title}
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  {column.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block transition hover:text-[var(--gold)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>(c) 2026 Muse Software. All rights reserved.</p>
          <p>Enterprise-ready AI systems for high-growth teams.</p>
        </div>
      </div>
    </footer>
  );
}
