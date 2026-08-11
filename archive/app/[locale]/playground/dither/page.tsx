import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getServices } from "@/lib/content";
import CardDither from "@/components/CardDither";
import Icon from "@/components/Icon";
import MuseLogo from "@/components/MuseLogo";
import { PixelArrow } from "@/components/PillButton";
import DitherDisplay from "@/components/playground/DitherDisplay";
import DitherDuotone from "@/components/playground/DitherDuotone";
import DitherFAQ, { type FaqItem } from "@/components/playground/DitherFAQ";
import DitherGlyph from "@/components/playground/DitherGlyph";
import DitherIcon, { SolidIcon } from "@/components/playground/DitherIcon";
import DitherKnobs from "@/components/playground/DitherKnobs";
import DitherPanel from "@/components/playground/DitherPanel";
import DitherPill from "@/components/playground/DitherPill";
import DitherPlate from "@/components/playground/DitherPlate";
import DitherLayers from "@/components/playground/DitherLayers";
import DitherMask from "@/components/playground/DitherMask";
import DitherQuote from "@/components/playground/DitherQuote";
import DitherRail from "@/components/playground/DitherRail";
import DitherRule from "@/components/playground/DitherRule";
import DitherSeam from "@/components/playground/DitherSeam";
import DitherWick from "@/components/playground/DitherWick";
import GlContextMeter from "@/components/playground/GlContextMeter";
import HeroAperture from "@/components/playground/HeroAperture";
import HeroHorizon from "@/components/playground/HeroHorizon";
import HeroSplit from "@/components/playground/HeroSplit";
import HeroTypeField from "@/components/playground/HeroTypeField";
import InverseBento, { BentoCell } from "@/components/playground/InverseBento";
import Specimen from "@/components/playground/Specimen";

/**
 * PLAYGROUND — the dither component catalogue, on the real stack.
 *
 * Specimens for every phase of docs/dither-system-plan.md, so they can be
 * looked at and picked from rather than described. Deliberately unlinked and
 * `noindex, nofollow`, and deliberately NOT using `lib/seo.ts`'s
 * `buildMetadata`, which emits canonicals and hreflang alternates that this
 * page must not have. Same arrangement as `app/[locale]/preview/hero-dither`.
 *
 * Renders in both locales because that is the only way to see the two things
 * most likely to be wrong: whether a physical-axis mask mirrored, and whether
 * a cell size that reads as dither in Latin reads as damage in Arabic.
 *
 * The copy is real, taken from `messages/*.json`, and passed in here rather
 * than added as translation keys. Lorem hides bugs (Arabic and Latin break
 * lines differently), and new keys in the catalogue would outlive the
 * experiment they were added for.
 *
 * To remove the whole thing: delete `app/[locale]/playground/`,
 * `components/playground/`, and the marked block at the end of
 * `app/globals.css`.
 */
export const metadata: Metadata = {
  title: "Playground: dither system",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    /* Home.hero.tagline */
    display: "We're a product team in Riyadh.",
    /* About.hero.title */
    knockout: "Riyadh-built. Globally standard.",
    /* Home.hero.subtitle */
    quote: "We actually build the thing, not just the deck about the thing.",
    /* CTA.subheading */
    body: "The first conversation is with the people who would build it, not a sales layer.",
    /* CTA.heading */
    seamAbove: "Tell us what you're trying to build.",
    /* Home.hero.headlineLead + headlineTurn — the real hero headline, which is
       the only string long enough to judge a hero treatment on. */
    heroLead: "Everyone has an AI strategy.",
    heroTurn: "Almost nobody has shipped one.",
    /* Explore.hero.subtitle. Load-bearing on P18: the site publishes the three
       services as peers and explicitly does not rank them. */
    tiersNote: "Three ways we help teams move at startup speed. Pick one, or combine all three.",
    other: "العربية",
  },
  ar: {
    display: "احنا فريق منتجات في الرياض.",
    knockout: "صُنع في الرياض. بمعيار عالمي.",
    quote: "نفكر، نصمّم، ونبني الشيء نفسه، لا العرض التقديمي عنه.",
    body: "أول محادثة تكون مع اللي بيشتغلون عليه، مو مع فريق مبيعات.",
    seamAbove: "علّمنا وش المشكلة اللي تواجهها، واترك بناء الحل علينا.",
    heroLead: "الكل عنده استراتيجية للذكاء الاصطناعي.",
    heroTurn: "بس قليل جدًا اللي قدر ينفذها.",
    tiersNote: "ثلاث طرق نساعد بها الفرق على التحرك بسرعة الشركات الناشئة. اختر واحدة، أو اجمع الثلاث.",
    other: "English",
  },
} as const;

const CELLS = ["sm", "md", "lg", "xl"] as const;
const LEVELS = [0.12, 0.3, 0.5, 0.75, 1] as const;
const ICONS = ["globe", "gear", "shield", "chart", "lock", "share", "user", "chat"] as const;
/** Only the genuinely CLOSED shapes. Filling an outline icon built from open
 *  paths (gear, chart, share, user) does not produce a silhouette, it produces
 *  a blob, so those are deliberately absent rather than shown failing. */
const FILL_ICONS = ["shield", "chat", "mail", "lock", "globe"] as const;

export default async function DitherPlayground({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = copy[locale];
  const services = getServices(locale);

  /* Real content for the specimens that model a whole section, read from the
     existing catalogue rather than added to it. Same reasoning as the `copy`
     object above — the sheet must never be judged on lorem, because Arabic and
     Latin break lines differently and a rail or an accordion is exactly where
     that shows — but these are lists, and inlining four method steps twice
     would put a second copy of real content somewhere it can silently drift
     from the first.

     `whatWeDo` on the AI Transformation service is the site's only genuinely
     ordered, real method: four named steps a buyer is actually taken through.
     That is what makes P7 and P17 buildable at all under rule 9 — a progress
     rail against invented steps would be exactly the "94% of nothing" the plan
     doc rules out. */
  const method = services[0].whatWeDo;
  const faqT = await getTranslations({ locale, namespace: "Home.faq" });
  const faqItems = (faqT.raw("items") as FaqItem[]).slice(0, 4);

  return (
    /* `relative isolate` is CardDither's requirement, not decoration: its
       canvas is `fixed` at `z-index: -10`, so without a stacking context here
       it would sit behind the page background instead of behind the cards.
       Same contract HomeSections carries for it and for PageDither. */
    /* `dither-squares` swaps every dot on the page from a circle to a square:
       the lattice, the quote highlighter, the underline, and the icons' dash
       caps. The shader fields carry it as `variant="square"` instead, since
       that is a uniform, not a class. The three SHIPPED shader fields
       (DitherField, PageDither, CardDither) still ask for circles, so the
       CardDither row further down is the one thing here that stays round —
       if squares win, those switch too. */
    <div className="dither-squares relative isolate min-h-screen bg-[#060608] pb-40 pt-32 text-white">
      {/* The shipped card hover, mounted once, so P9 can be compared against
          the thing that replaced it rather than against its own description.
          It also puts a second context on the page, which is exactly what the
          meter in the header is for. */}
      <CardDither />
      <div className="mx-auto w-full max-w-[1100px] px-5 md:px-10">
        {/* ---------------------------------------------------------- */}
        <header className="border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-[#fd4601]">
              Playground · not shipped
            </p>
            <div className="flex items-center gap-5">
              <GlContextMeter />
              <Link
                href="/playground/dither"
                locale={locale === "ar" ? "en" : "ar"}
                className="dither-underline font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-[#fd4601]"
              >
                {t.other}
              </Link>
            </div>
          </div>

          <h1 className="mt-6 font-space-grotesk text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            The dither system
          </h1>
          {/* English chrome, so LTR even on /ar — see the note in Specimen. */}
          <p dir="ltr" className="mt-4 max-w-[62ch] text-base leading-7 text-white/55">
            The whole catalogue in <code className="text-white/80">docs/dither-system-plan.md</code>,
            less the four cut for want of real data (P3, P19, P20) or superseded outright. The
            thesis is that density should mean something: the dither is not a pattern, it is a
            quantiser, so it can carry emphasis, depth, progress and state rather than just sitting
            behind things. Every specimen prints its engine and its cost, because the engine choice
            is the decision that goes wrong and it is invisible in a screenshot.
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-20">
          {/* ======================= PHASE 0 ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Phase 0 · primitives
          </p>

          <Specimen
            id="§3"
            name="Cell presets"
            engine="css"
            note="The shipped lattice is one hard-coded 6px cell tuned for card-sized surfaces. The dot stays at 43% of the cell across (the ratio that makes the grid read as dots rather than as flat noise) and only the cell scales. Display type needs xl; anything below sm turns to mush."
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {CELLS.map((cell) => (
                <div key={cell} className="flex flex-col gap-2">
                  <div className="relative h-28 overflow-hidden rounded-md bg-black text-[#fd4601]">
                    <DitherLayers variant="wash" cell={cell} />
                  </div>
                  <span className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/40">
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          </Specimen>

          <Specimen
            id="§3"
            name="Density as a value"
            engine="css"
            note="--dither-level from 0 to 1. Layers switch on in Bayer order, so density ramps and brightness does not. That distinction is the whole difference between dithering and fading, and it is what lets the same four layers become a meter, a progress rail or a hover state."
          >
            <div className="grid grid-cols-5 gap-3">
              {LEVELS.map((level) => (
                <div key={level} className="flex flex-col gap-2">
                  <div
                    style={{ "--dither-level": level } as React.CSSProperties}
                    className="relative h-28 overflow-hidden rounded-md bg-black text-[#fd4601]"
                  >
                    <DitherLayers variant="wash" ramp cell="lg" />
                  </div>
                  <span className="font-space-grotesk text-[11px] tracking-[0.1em] text-white/40">
                    {level.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Specimen>

          <Specimen
            id="§3"
            name="DitherMask"
            engine="css"
            note="Dither inside a shape, or the shape knocked out of the field. A mix-blend-mode: multiply sandwich, chosen over background-clip: text (needs four duplicated text nodes in pixel lockstep) and over an SVG mask data URI (cannot load the page webfont, so it breaks Arabic). This keeps one real text node: selectable, in the accessibility tree, natively shaped."
          >
            <div className="flex flex-wrap items-center gap-6">
              <DitherMask mode="fill" cell="lg">
                <span className="block px-4 py-3 font-space-grotesk text-5xl font-bold tracking-tight">
                  {locale === "ar" ? "ميوز" : "Muse"}
                </span>
              </DitherMask>
              <DitherMask mode="knockout" cell="lg">
                <span className="block px-4 py-3 font-space-grotesk text-5xl font-bold tracking-tight">
                  {locale === "ar" ? "ميوز" : "Muse"}
                </span>
              </DitherMask>
            </div>
            <p className="mt-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              fill · knockout
            </p>
          </Specimen>

          <Specimen
            id="§5"
            name="Knobs"
            engine="css"
            note="Live control over the four variables, so cell sizes get chosen by looking rather than by argument. Nothing configurable survives into a shipped component; whatever wins here becomes a constant."
          >
            <DitherKnobs />
          </Specimen>

          {/* ======================= PHASE 1 ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Phase 1 · zero-cost, immediately reusable
          </p>

          <Specimen
            id="P8"
            name="DitherIcon"
            engine="svg"
            note="At 24px the lattice is the wrong tool: a 6px cell inside a 1.5px stroke catches one dot and reads as damage. So the stroke becomes the dot run instead. Works on all fourteen existing icons with no new artwork. Hover to resolve — the icon sharpens under attention rather than lighting up."
          >
            <div className="flex flex-wrap gap-3">
              {ICONS.map((name) => (
                <span
                  key={name}
                  tabIndex={0}
                  className="group flex h-20 w-20 items-center justify-center rounded-md border border-white/10 text-[#fd4601] outline-none transition-colors hover:border-[#fd4601]/40 focus-visible:border-[#fd4601]"
                >
                  <DitherIcon name={name} className="h-9 w-9" />
                </span>
              ))}
              <span className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-white/15 text-white">
                <DitherIcon name="check" className="h-9 w-9" solid />
              </span>
            </div>
            <p className="mt-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              hover or tab · last cell is the resolved state
            </p>
          </Specimen>

          <Specimen
            id="P4"
            name="DitherGlyph · fills"
            engine="css"
            note="A fill has no stroke to dash, so filled marks go through DitherMask instead: the glyph is the stencil and the dither shows through its silhouette. The Muse mark is the natural fit — it is already drawn as a stepped blocky shape, so a square lattice inside it reads as the mark's own construction rather than as a texture over it. The icons below are only the genuinely closed shapes: filling an outline icon built from open paths (gear, chart, share, user) produces a blob rather than a silhouette, so those are left out rather than shown failing. Note the size floor — a glyph needs to be several cells across before the lattice inside it reads as texture instead of damage."
          >
            <div className="flex flex-wrap items-center gap-8">
              <DitherGlyph cell="lg">
                <MuseLogo showWordmark={false} iconClassName="h-32 w-auto" />
              </DitherGlyph>
              <DitherGlyph cell="md">
                <MuseLogo showWordmark={false} iconClassName="h-20 w-auto" />
              </DitherGlyph>
              <DitherGlyph cell="sm">
                <MuseLogo showWordmark={false} iconClassName="h-12 w-auto" />
              </DitherGlyph>
              <DitherGlyph cell="sm">
                <PixelArrow className="h-20 w-20" />
              </DitherGlyph>
            </div>

            <p className="mt-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              logo mark at lg, md and sm · the pixel arrow
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {FILL_ICONS.map((name) => (
                <span
                  key={name}
                  className="flex h-24 w-24 items-center justify-center rounded-md border border-white/10"
                >
                  <DitherGlyph cell="sm" ground="#08080a">
                    <SolidIcon name={name} className="h-16 w-16" />
                  </DitherGlyph>
                </span>
              ))}
              <span className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-white/15 text-[#fd4601]">
                <SolidIcon name="shield" className="h-16 w-16" />
              </span>
            </div>

            <p className="mt-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              solid icons, dithered · last cell is the silhouette on its own
            </p>
          </Specimen>

          <Specimen
            id="P6"
            name="DitherRule"
            engine="css"
            note="The hairline rule, fraying into dots instead of stopping on a cut edge. fray is made entirely of dots; core is a solid line dissolving into its own, the two masks being exact inverses so it reads as one object changing state. Symmetric, so neither needs RTL work."
          >
            <div className="flex flex-col gap-10 py-4">
              <DitherRule variant="fray" />
              <DitherRule variant="core" />
              <DitherRule variant="fray" cell="lg" />
            </div>
            <p className="mt-2 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              fray · core · fray at lg
            </p>
          </Specimen>

          <Specimen
            id="P5"
            name="DitherSeam"
            engine="css"
            note="The boundary between two sections, as a band of texture rather than a cut edge or a one-directional gradient scrim. A scrim only works when the block above it is lighter than the page; a seam works between any two sections and costs no WebGL context. Probably the most reusable thing in the catalogue."
            stageClassName="p-0"
          >
            <div className="bg-[#0c0c10] px-8 py-10">
              <p className="max-w-[40ch] font-space-grotesk text-xl font-bold leading-snug">
                {t.seamAbove}
              </p>
            </div>
            <DitherSeam variant="crest" bloom />
            <div className="px-8 py-10">
              <p className="max-w-[52ch] text-sm leading-7 text-white/55">{t.body}</p>
            </div>
            <DitherSeam variant="pinch" height="9rem" />
            <div className="px-8 py-6">
              <p className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
                crest with bloom · pinch
              </p>
            </div>
          </Specimen>

          <Specimen
            id="P22"
            name="DitherUnderline"
            engine="css"
            note="A dotted underline that doubles in density on hover. background-size is animatable, so the whole interaction is one transition with no extra DOM and no JS. It is the smallest thing here and it appears on more of the site than any hero will."
          >
            <p className="max-w-[56ch] text-lg leading-8 text-white/70">
              {t.body}{" "}
              {services.map((service, i) => (
                <span key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="dither-underline text-white transition-colors hover:text-[#fd4601]"
                  >
                    {service.title}
                  </Link>
                  {i < services.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </Specimen>

          <Specimen
            id="P9"
            name="Card hover · two answers"
            engine="css"
            note="SUPERSEDED, kept for comparison. P9 argued that DitherHover's one-rAF-loop-per-card should become a CSS transition. CardDither then replaced DitherHover with one shared shader canvas whose mask moves to the hovered card, which serves any number of cards on one context and one loop — so the cost argument is gone, and .card-dither's own note records that this exact lattice was tried for this exact job and rejected as too regular and motionless. Top row is the shipped shader; bottom is the lattice. The only thing the lattice still does that the shader cannot is work with no JS and no WebGL at all."
            stageClassName="bg-transparent p-8 md:p-12"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  data-dither-card
                  className="group flex flex-col gap-4 rounded-md border border-white/10 p-6 outline-none transition-colors hover:border-[#fd4601]/40 focus-visible:border-[#fd4601]"
                >
                  <Icon name={service.icon} className="h-7 w-7 text-[#fd4601]" />
                  <h3 className="font-space-grotesk text-lg font-bold leading-snug">
                    {service.title}
                  </h3>
                </Link>
              ))}
            </div>

            <p className="my-5 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              shipped · CardDither · 1 shared GL context
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative isolate flex flex-col gap-4 overflow-hidden rounded-md border border-white/10 p-6 outline-none transition-colors hover:border-[#fd4601]/40 focus-visible:border-[#fd4601]"
                >
                  <DitherWick />
                  <Icon name={service.icon} className="h-7 w-7 text-[#fd4601]" />
                  <h3 className="font-space-grotesk text-lg font-bold leading-snug">
                    {service.title}
                  </h3>
                </Link>
              ))}
            </div>

            <p className="mt-5 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              P9 · DitherWick · zero JS, zero context
            </p>
          </Specimen>

          <Specimen
            id="P7"
            name="DitherRail"
            engine="css"
            note="Progress as texture instead of a filled bar: a dither column beside a stepped process, each segment densifying once its step is passed. Scroll the sheet and watch the rail fill behind you. Rule 7 is the design constraint, not a caveat — scroll drives the RAIL and nothing else, so every heading and paragraph is fully opaque from first paint and stays that way whether or not the observer ever fires. One IntersectionObserver for the whole rail, and steps are unobserved once counted, because scrolling back up must not un-complete a step. Real method steps: the five stages of the AI Transformation engagement, as already published."
          >
            <DitherRail steps={method} />
          </Specimen>

          <Specimen
            id="P12"
            name="DitherPanel"
            engine="css"
            note="The CTA panel's treatment generalised: the field reaches all four edges and is what describes the shape, so the border can fall back to a hairline or go away entirely. The reusable part is that density is a value here — a set of these can be ranked with no badge, no size change and no second colour, which is rule 3 satisfied and the mechanism P18 needs. Top row is fixed emphasis at three levels. Bottom row is the same panel with the hairline dropped: at 0.25 the shape barely holds, which is the honest limit of the idea."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[0.25, 0.55, 1].map((level) => (
                <DitherPanel key={level} emphasis={level}>
                  <div className="p-6">
                    <p className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/40">
                      emphasis {level.toFixed(2)}
                    </p>
                    <p className="mt-3 font-space-grotesk text-lg font-bold leading-snug text-white">
                      {services[0].title}
                    </p>
                  </div>
                </DitherPanel>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[0.25, 0.55, 1].map((level) => (
                <DitherPanel key={level} emphasis={level} bare>
                  <div className="p-6">
                    <p className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/40">
                      bare · {level.toFixed(2)}
                    </p>
                    <p className="mt-3 font-space-grotesk text-lg font-bold leading-snug text-white">
                      {services[0].title}
                    </p>
                  </div>
                </DitherPanel>
              ))}
            </div>
          </Specimen>

          {/* =================== MICRO-INTERACTIONS =================== */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Micro-interactions
          </p>

          <Specimen
            id="P23"
            name="PillButton · dither fill"
            engine="css"
            note="The shipped button already has a good hover: the corners ease from 6px to a full 50px radius over 500ms and the arrow chip scales with it. This adds the field bursting outward FROM the chip on the same envelope, so the three read as one gesture rather than three effects that fire together. It extends a control that is already right instead of adding a new one. The burst origin is the chip, which sits at the inline end, so it is physical and flips — check it on /ar. Held at 0.22 opacity: this is texture under black text on a white button, and the button's job is to be pressed."
          >
            <div className="flex flex-wrap items-center gap-6">
              <DitherPill>{locale === "ar" ? "ابدأ الآن" : "Get started"}</DitherPill>
              <span className="font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
                hover or tab
              </span>
            </div>
          </Specimen>

          <Specimen
            id="P24"
            name="DitherFocus"
            engine="css"
            note="Considered, and the answer is yes but OUTSIDE. A dotted focus ring on its own is a worse focus ring: WCAG 2.4.11 sets a 3:1 floor against adjacent colours and a dot grid at ~40% coverage does not carry the effective contrast of the solid rule it replaced — it only looks like it does, which is the worst outcome for an affordance whose whole job is to be unmissable. So the solid 2px ring stays exactly as it is and the dither goes outside it. Compliance unchanged, house material still announcing the focus. Tab through these rather than clicking: :focus-visible is the whole point and a mouse click will not show it."
          >
            <div className="flex flex-wrap items-center gap-4">
              {services.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  className="dither-focus rounded-md border border-white/15 px-5 py-3 font-space-grotesk text-sm text-white outline-none transition-colors hover:border-white/35"
                >
                  {service.title}
                </button>
              ))}
            </div>
          </Specimen>

          {/* ======================= PHASE 2 ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Phase 2 · masked type
          </p>

          <Specimen
            id="P1"
            name="DitherDisplay"
            engine="css"
            note="A headline filled with the halftone, density ramping across the line so the last word is nearly dissolved. Type that is arriving or departing, rather than type with a texture on it. Two things are per-script here: the cell size (Arabic strokes are thinner, so they drop one preset) and the ramp direction (this is one of the few masks on a physical axis, so it mirrors)."
          >
            <DitherDisplay as="h3">{t.display}</DitherDisplay>
          </Specimen>

          <Specimen
            id="P2"
            name="DitherPlate · type over the field"
            engine="css"
            note="Solid type ON the field instead of cut out of it. No blend mode anywhere, so this is the only arrangement with no Safari question mark and the only one that stays legible over a sparse or moving field. Three tones: page black with orange dither, and the accent plate both ways round. Contrast is not uniform — white on the accent orange is 3.4:1, which clears the 3:1 bar for display type and fails everywhere else; black on the accent orange is 6.2:1 and is safe at any size."
            stageClassName="p-0"
          >
            <DitherPlate as="h3" tone="ink" type="over">
              {t.knockout}
            </DitherPlate>
            <DitherPlate as="h3" tone="accentBlack" type="over">
              {t.knockout}
            </DitherPlate>
            <DitherPlate as="h3" tone="accentWhite" type="over">
              {t.knockout}
            </DitherPlate>
            <p className="px-6 py-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              ink · accentBlack (large text only) · accentWhite
            </p>
          </Specimen>

          <Specimen
            id="P2"
            name="DitherPlate · knocked out"
            engine="css"
            note="The original idea: the words are holes cut in the field. On the accent plate this cannot use multiply, because multiply only darkens and the letterforms have to come back UP to the plate colour with the dots removed from inside them — lighten does exactly that. It reads by texture rather than by colour, so it only works while the field around it stays dense."
            stageClassName="p-0"
          >
            <DitherPlate as="h3" tone="ink" type="knockout">
              {t.knockout}
            </DitherPlate>
            <DitherPlate as="h3" tone="accentBlack" type="knockout">
              {t.knockout}
            </DitherPlate>
            <p className="px-6 py-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              ink · multiply &nbsp;·&nbsp; accentBlack · lighten
            </p>
          </Specimen>

          <Specimen
            id="P2"
            name="DitherPlate · shader field"
            engine="webgl"
            note="PixelBlast at three times DitherField's density, square variant. Both placements over the same field, and the comparison is the point: the knockout below was the original concept and it is close to illegible here, because the shader's dots come and go with the noise and a dark hole needs a dense field to be a hole in. White type over the top solves it outright. Known risk: mix-blend-mode over a live canvas has been unreliable in Safari; it fails open (dark type on white) rather than invisible, and only the knockout is exposed to it."
            stageClassName="p-0"
          >
            <DitherPlate as="h3" tone="ink" type="over" engine="shader">
              {t.knockout}
            </DitherPlate>
            <p className="px-6 pb-2 pt-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              white type over the field
            </p>
            <DitherPlate as="h3" tone="ink" type="knockout" engine="shader">
              {t.knockout}
            </DitherPlate>
            <p className="px-6 py-4 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
              knocked out of the field · 2 contexts on this specimen
            </p>
          </Specimen>

          <Specimen
            id="P11"
            name="DitherQuote"
            engine="css"
            note="Dither behind the text's own line boxes, so the haze is ragged and stops exactly where each line ends. It specced as a DitherMask and did not need to be: box-decoration-break gives every line its own rect and several background-images give the Bayer offsets, so it is one element with one text node. Half density, which is a contrast decision — white on the orange is 3.4:1 and fails AA, so the dots have to stay sparse under copy."
          >
            <blockquote className="max-w-[26ch] font-space-grotesk text-3xl font-bold leading-[1.7] md:text-4xl md:leading-[1.7]">
              <DitherQuote>{t.quote}</DitherQuote>
            </blockquote>
          </Specimen>

          {/* ======================= PHASE 3 ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Phase 3 · heroes and photography
          </p>

          <Specimen
            id="P16"
            name="HeroTypeField"
            engine="webgl"
            note="The answer to why the hero spends a WebGL context on decoration: the shader field is visible ONLY inside the headline and everything else is pure black, so the most expensive effect on the site stops being background and becomes the subject. Costs the context the hero already spends, not an extra one. The Safari caveat is genuinely better here than on P2 and it is the opposite of the prediction: if mix-blend-mode over a live canvas is dropped, fill mode's stencil is white type on the ground, so it degrades to solid white type on black — which IS the fallback the plan asked for, arrived at by construction rather than by a @supports guard that cannot test the thing that actually breaks. Knockout degrades to a white slab. Worth judging on /ar first: a fully connected Arabic word is a better mask than a Latin one."
            stageClassName="p-0"
          >
            <HeroTypeField>{t.heroLead}</HeroTypeField>
          </Specimen>

          <Specimen
            id="P13"
            name="HeroHorizon"
            engine="css"
            note="Dense along the bottom edge, thinning upward, so the headline floats above a ground rather than sitting on a flat wash. Depth from density alone: no gradient scrim, no parallax. The argument is a cost argument as much as a visual one — the shipped hero spends a GL context on a field that drifts but is the same density everywhere, which is the free engine's best case. xl cell, because at md the same mask reads as a fine grey haze and the horizon disappears."
            stageClassName="p-0"
          >
            <HeroHorizon>
              <h3 className="max-w-[18ch] font-space-grotesk text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                {t.heroLead}{" "}
                <span className="text-white/45">{t.heroTurn}</span>
              </h3>
            </HeroHorizon>
          </Specimen>

          <Specimen
            id="P14"
            name="HeroAperture"
            engine="css"
            note="Page black, then a circular aperture opens once from the centre over 900ms and settles. One motion, on arrival, never again. Pure CSS: --dither-burst is registered, so the four concentric masks interpolate as one aperture instead of snapping, and it starts at first paint rather than after hydration — the obvious implementation, render settled then flip a state on mount, shows the finished frame first and then plays the arrival, which is worse than no animation. Reduced motion renders it open. Replay is sheet furniture; an arrival animation is by definition something you cannot see twice. NOT compatible with PageLoader, which already dissolves on every navigation — two back to back is one too many, so if this is wanted that one goes."
            stageClassName="p-0"
          >
            <HeroAperture>
              <h3 className="max-w-[18ch] font-space-grotesk text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                {t.heroLead}
              </h3>
            </HeroAperture>
          </Specimen>

          <Specimen
            id="P15"
            name="HeroSplit"
            engine="css"
            note="The composition divides on the inline axis: one half flat black carrying the headline, the other a dense field, meeting on a dithered edge rather than a straight one. The most RTL-exposed thing in the catalogue, because two things have to mirror by different mechanisms. Which HALF the field is on is free — grid tracks lay out in writing order. Which WAY it dissolves is not: the mask has to be dense at the outer edge and thin toward the type, and outer is the right in English and the left in Arabic. Getting the first right and the second wrong looks mirrored while quietly putting the densest part of the field directly behind the headline, so this is one to check on /ar rather than reason about."
            stageClassName="p-0"
          >
            <HeroSplit>
              <h3 className="max-w-[16ch] font-space-grotesk text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
                {t.heroLead}
              </h3>
              <p className="mt-4 max-w-[38ch] text-sm leading-6 text-white/55">{t.body}</p>
            </HeroSplit>
          </Specimen>

          <Specimen
            id="P10"
            name="DitherDuotone"
            engine="css"
            note="The photography given a house treatment instead of being left as generic stock, which is currently the weakest visual layer on the site — the one surface carrying no brand material at all. Duotone by multiplying a grayscaled, contrast-pushed image onto an orange plate, which is a real luminance ramp rather than a tint, then the lattice on top in screen so the dots lighten the shadows the way a printed halftone does. Honest about what it is: option (a) from the plan, a screen over a photo rather than a threshold. The upgrade if this is picked is a one-shot canvas 2D Bayer pass at idle cached as a data URL — CSP allows it, it must not run on the critical path. Hover to return to the real photograph; the swap is a cross-fade because mix-blend-mode is not animatable."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {services.map((service) => (
                <figure key={service.slug} className="m-0">
                  <DitherDuotone
                    src={service.image}
                    sizes="(min-width: 640px) 300px, 90vw"
                    className="h-48 w-full"
                  />
                  <figcaption className="mt-2 font-space-grotesk text-[11px] uppercase tracking-[0.16em] text-white/35">
                    {service.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Specimen>

          {/* ======================= PHASE 4 ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Phase 4 · sections the site does not have yet
          </p>

          <Specimen
            id="P17"
            name="MethodGrid"
            engine="css"
            note="P7's rail in situ, as the section the site is missing: it describes what Muse does at length and never how, which is the first thing a services buyer asks. Real content throughout — the heading, the intro and the five steps are the AI Transformation engagement as it is already published, not a method invented to have something to put on a rail. On the sheet separately from P7 because what is under test here is different: whether the composition holds at section width with real Arabic paragraphs, not whether the rail mechanism works."
          >
            <div className="max-w-[62ch]">
              <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-[#fd4601]">
                {services[0].approachHeading}
              </p>
              <h3 className="mt-4 font-space-grotesk text-2xl font-bold leading-tight text-white md:text-4xl">
                {services[0].whatWeDoHeadline}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                {services[0].approachIntro[1]}
              </p>
            </div>
            <div className="mt-10">
              <DitherRail steps={method} />
            </div>
          </Specimen>

          <Specimen
            id="P18"
            name="EngagementTiers · emphasis without a badge"
            engine="css"
            note="RESCOPED, and the reason matters. The plan specced three panels where the denser one marks the RECOMMENDED tier. Muse publishes no such ranking — the Explore page says in as many words to pick one or combine all three — so a statically denser panel would be asserting a hierarchy that does not exist, which is rule 9 with the label filed off. What density can honestly encode here is attention: the panel being pointed at densifies and the others recede, which is real state. Emphasis with no badge, no size change and no second colour (rule 3), and it costs no JS — pure :hover and :focus-within on the group. Tab through it as well as hovering. The static-ranking version is one prop away (P12's emphasis) if a real hierarchy ever exists."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <DitherPanel key={service.slug} interactive className="group">
                  <Link
                    href={`/services/${service.slug}`}
                    className="dither-focus flex h-full flex-col gap-3 p-6 outline-none"
                  >
                    <Icon name={service.icon} className="h-7 w-7 text-[#fd4601]" />
                    <h4 className="font-space-grotesk text-lg font-bold leading-snug text-white">
                      {service.title}
                    </h4>
                    <p className="text-sm leading-6 text-white/55">{service.summary}</p>
                  </Link>
                </DitherPanel>
              ))}
            </div>
            <p className="mt-5 max-w-[62ch] text-sm leading-6 text-white/40">{t.tiersNote}</p>
          </Specimen>

          <Specimen
            id="P21"
            name="DitherFAQ"
            engine="css"
            note="The open panel carries a field and the closed ones do not, so the open state is a change of MATERIAL rather than a rotated chevron. The chevron stays — this adds what is legible from across the room, it does not replace what is legible at reading distance. pinch rather than a flat wash, and that is the detail that makes it usable: rule 8 caps texture behind body copy at roughly 25% coverage before the paragraph needs its own scrim, and pinch is dense at the item's two block edges and clear through the middle, so the material change lands on the seams and the answer sits in clean space. The expand mechanism is the shipped .accordion-panel untouched, so the only variable under test is the surface. Real questions from Home.faq."
          >
            <DitherFAQ items={faqItems} />
          </Specimen>

          <Specimen
            id="P25"
            name="InverseBento"
            engine="css"
            note="One continuous field spans the whole grid and the cards are transparent windows onto it, with the gutters solid page black. The texture belongs to the surface underneath the layout rather than to each card, so the grid reads as holes cut in a page rather than tiles placed on one. Strictly cheaper than any per-card treatment and the saving grows with the count: one field, no hover plumbing, no shared-canvas machinery. The implementation is the whole idea — the gutters are the cells' BORDERS, not a gap, because a gap would let the field show between the cards and invert the effect. Borders also handle spans and uneven rows, and give the outer frame for free."
            stageClassName="p-0"
          >
            {/* The heading spans the full row rather than two of three. At
                span-2 the three service cells left one grid slot with no cell
                in it, and because the gutters ARE the cells' borders an empty
                slot is not empty — nothing paints over the field there, so it
                renders as a bare patch of texture the size of a card. That is
                the one failure mode this construction has, and it is invisible
                until the cell count stops filling the rows. */}
            <InverseBento gridClassName="sm:grid-cols-3">
              <BentoCell className="sm:col-span-3">
                <h4 className="font-space-grotesk text-2xl font-bold leading-snug text-white">
                  {t.seamAbove}
                </h4>
                {/* `/80`, not the `/55` every other specimen uses for body
                    copy, and it is a measured decision rather than a nudge.
                    Unlike a panel or a seam, the bento field runs at full
                    density straight under the text with no clear middle to
                    sit in: a glyph's worst case is a dot pixel, #fd4601 at
                    0.55 over page black, which is rgb(142, 41, 4). White at
                    55% over that is 3.61:1 and fails AA outright; at 80% it
                    is 5.97:1 and passes. So the rule this component carries
                    is that body copy over it cannot be muted. */}
                <p className="mt-3 max-w-[46ch] text-sm leading-6 text-white/80">{t.body}</p>
              </BentoCell>
              {services.map((service) => (
                <BentoCell key={service.slug}>
                  <Icon name={service.icon} className="h-6 w-6 text-[#fd4601]" />
                  <p className="mt-3 font-space-grotesk text-base font-bold leading-snug text-white">
                    {service.title}
                  </p>
                </BentoCell>
              ))}
            </InverseBento>
          </Specimen>

          {/* ======================= STRESS ======================= */}
          <p className="font-space-grotesk text-[11px] uppercase tracking-[0.28em] text-white/35">
            Stress
          </p>

          <Specimen
            id="—"
            name="Twelve wick cards at once"
            engine="css"
            note="Twelve lattice hovers at once: twelve CSS transitions, zero animation loops, zero contexts. This was P9's whole argument when the alternative was one rAF loop per card, and CardDither has since made the same saving a different way. What it still shows is the ceiling of the free engine — sweep the pointer across the grid and watch for dropped frames."
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="group relative isolate flex h-28 items-end overflow-hidden rounded-md border border-white/10 p-4"
                >
                  <DitherWick />
                  <span className="font-space-grotesk text-sm text-white/50">{i + 1}</span>
                </div>
              ))}
            </div>
          </Specimen>
        </div>
      </div>
    </div>
  );
}
