"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import MuseLogo from "./MuseLogo";
import { socialIconGlyphs, type Social } from "./SocialLinks";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Site header, ported from the "minimal" landing template's `header`
 * (2026-08-01). A pill that widens as you scroll and expands into a card grid
 * when opened.
 *
 * It replaces StaggeredMenu, the React Bits full-screen panel that shipped
 * before it. That component is not deleted — it is parked at
 * `archive/components/StaggeredMenu.tsx`, which is outside `app/` and excluded
 * in tsconfig, so it is kept without being compiled. See the archive README.
 *
 * Retoned rather than recoloured one-for-one. The template is a light site
 * with a near-black pill, so the pill is the high-contrast object on the page.
 * Inverting that literally would put a white panel over Muse's black, which
 * fights everything else on the page and leaves the orange accent with nothing
 * to sit on. The pill stays dark and separates from the #060608 page on a
 * hairline border and a shadow instead.
 *
 * Deviations from the template beyond palette, all of them defects there:
 *
 * - Its toggle is a bare `<button>` with no accessible name, no
 *   `aria-expanded` and no `aria-controls`, so the menu's state is invisible
 *   to a screen reader. All three are set here.
 * - No Escape handling and no focus return. Opening the menu, tabbing in and
 *   pressing Escape did nothing; closing it dropped focus to the top of the
 *   document. Both are handled.
 * - The menu stayed open across a client-side navigation, because nothing
 *   watched the route.
 * - Its scroll listener queries `.h-screen.overflow-y-auto`, the Lenis
 *   wrapper from its own layout, and measures a scrollbar-width offset off
 *   it. Neither exists here; this reads `window.scrollY`.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const SPRING = { type: "spring", stiffness: 100, damping: 20, mass: 1 } as const;

/** Route shape lives here, labels come from `Nav.items` — the same split the
 *  layout used for StaggeredMenu, so a URL change is still a one-file edit. */
const MENU_GROUPS = [
  { id: "explore", items: ["explore", "newsletter"] },
  {
    id: "capabilities",
    items: [
      "productStrategyDiscovery",
      "productExperienceDesign",
      "productEngineering",
      "aiTransformation",
      "gamificationExperience",
    ],
  },
  { id: "company", items: ["about", "careers"] },
  { id: "contact", items: [] },
] as const;

const ROUTES: Record<string, string> = {
  home: "/",
  explore: "/explore",
  about: "/about",
  careers: "/careers",
  newsletter: "/newsletter",
  contact: "/contact",
  getStarted: "/start",
  productStrategyDiscovery: "/services/product-strategy-discovery",
  productExperienceDesign: "/services/product-experience-design",
  productEngineering: "/services/product-engineering",
  aiTransformation: "/services/ai-transformation",
  gamificationExperience: "/services/gamification-experience",
};

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden="true" className="relative flex h-2.5 w-7 flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full bg-current"
        animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full bg-current"
        animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      />
    </span>
  );
}

/** The template's `lucide-react` ArrowUpRight, inlined so the dependency is
 *  not pulled in for one glyph. `.arrow-inline` mirrors it under RTL, which
 *  turns "up and forward" from up-right into up-left — correct, because
 *  forward is left in Arabic. */
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`arrow-inline ${className ?? ""}`}
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function SiteHeader({ socials }: { socials: Social[] }) {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");
  const pathname = usePathname();
  const panelId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The template gates its open/close choreography on a 700px query and
  // defaults the server snapshot to `true` (desktop). Same here: on desktop
  // the pill has to finish widening before the cards stagger in, on a phone
  // it is already full width so the wait is dead time.
  const isDesktop = useMediaQuery("(min-width: 700px)", true);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change. Without this the panel stays open over the page it
  // just navigated to.
  //
  // Adjusted during render rather than in an effect. An effect would work but
  // trips `react-hooks/set-state-in-effect`, and the rule is right: it would
  // paint the new route once with the menu still open and then re-render to
  // close it. Comparing against the previous value during render is React's
  // documented pattern for this and closes it in the same pass. Closing in
  // each link's onClick instead would miss browser back/forward.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsOpen(false);
  }

  // Escape closes and returns focus to the control that opened it, which is
  // where a keyboard user expects to land.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-4"
        aria-label={t("header")}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
      >
        <motion.nav
          className="flex max-w-[1400px] flex-col overflow-hidden rounded-md border border-white/10 bg-[#0f0f11] shadow-2xl shadow-black/40"
          initial={false}
          animate={{ width: isOpen ? "100%" : hasScrolled ? "56rem" : "42rem" }}
          transition={{ ...SPRING, delay: isOpen ? 0 : 0.15 }}
        >
          <div className="flex w-full items-center justify-between py-2 pe-2 ps-4">
            <Link href="/" aria-label={t("homeAriaLabel")} className="flex items-center">
              <MuseLogo iconClassName="h-7 w-auto text-[#fd4601]" />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              className="flex cursor-pointer items-center gap-2 rounded-[3.5px] px-2 py-2 font-space-grotesk text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fd4601]"
              onClick={() => setIsOpen((open) => !open)}
            >
              <HamburgerIcon isOpen={isOpen} />
              <span className="text-lg font-medium tracking-tight">{t("menuLabel")}</span>
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id={panelId}
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{
                  height: "auto",
                  transition: { duration: 0.5, ease: EASE_IN_OUT, delay: isDesktop ? 0.2 : 0 },
                }}
                exit={{ height: 0, transition: { duration: 0.4, ease: EASE_IN_OUT } }}
              >
                <div className="no-scrollbar max-h-[calc(100vh-6rem)] overflow-y-auto">
                  <motion.div
                    className="grid grid-cols-1 gap-6 p-6 min-[1080px]:grid-cols-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: isDesktop ? 0.7 : 0.2,
                        },
                      },
                    }}
                  >
                    {MENU_GROUPS.map((group) => (
                      <motion.div
                        key={group.id}
                        data-nav-group={group.id}
                        className="min-h-50 rounded-2xl bg-[#1a1a1c] p-6 min-[1080px]:min-h-80"
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: EASE_OUT },
                          },
                        }}
                      >
                        <h2 className="font-space-grotesk text-xs font-medium uppercase tracking-widest text-white/50">
                          {t(`groups.${group.id}`)}
                        </h2>

                        {group.id === "contact" ? (
                          <div className="mt-6 flex h-[calc(100%-2rem)] flex-col justify-between pb-4">
                            <a
                              href="mailto:info@muse.sa"
                              className="font-space-grotesk text-xl font-semibold text-white transition-colors hover:text-[#fd4601] md:text-2xl"
                            >
                              info@muse.sa
                            </a>
                            <ul
                              role="list"
                              aria-label={t("socialsLabel")}
                              className="social-links mt-auto flex items-center gap-4 pt-8 text-white/70"
                            >
                              {socials.map((social) => (
                                <li key={social.label}>
                                  <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={common(`socials.${social.label}`)}
                                    className="social-links-item flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                                  >
                                    <span className="h-5 w-5 [&_svg]:h-full [&_svg]:w-full">
                                      {socialIconGlyphs[social.label]}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <ul role="list" className="mt-6">
                            {group.items.map((key, index) => (
                              <li key={key}>
                                <Link
                                  href={ROUTES[key]}
                                  className="group flex items-center justify-between py-4 font-space-grotesk text-xl font-semibold text-white transition-colors duration-300 hover:text-[#fd4601] md:text-2xl"
                                >
                                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                    {t(`items.${key}`)}
                                  </span>
                                  <ArrowUpRight className="h-5 w-5 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                                </Link>
                                {index < group.items.length - 1 && (
                                  <div className="h-px bg-white/10" />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      className="col-span-full flex items-center justify-center gap-2 pt-2"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: EASE_OUT },
                        },
                      }}
                    >
                      <Link
                        href={ROUTES.contact}
                        className="rounded-[3.5px] bg-white/10 px-6 py-3 font-space-grotesk text-lg font-medium tracking-tight text-white transition-colors hover:bg-white/20"
                      >
                        {t("items.contact")}
                      </Link>
                      <Link
                        href={ROUTES.getStarted}
                        className="rounded-[3.5px] bg-[#fd4601] px-6 py-3 font-space-grotesk text-lg font-medium tracking-tight text-black transition-all duration-500 hover:rounded-[50px]"
                      >
                        {t("items.getStarted")}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>
    </>
  );
}
