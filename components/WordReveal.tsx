"use client";

import { ElementType, Fragment, useEffect, useRef, type ReactNode, type Ref } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Arabic, Hebrew, and their presentation/supplement blocks. */
const STRONG_RTL = /[֐-׿؀-ۿ܀-ݏݐ-ݿࢠ-ࣿיִ-﷿ﹰ-﻿]/;
const STRONG_LTR = /[A-Za-zÀ-ɏ]/;

type BidiRun = { dir: "rtl" | "ltr"; words: string[] };

/**
 * Groups a heading's words into runs of a single direction.
 *
 * Each word is animated in its own `inline-block` span, and an inline-block is
 * an atomic box to the bidi algorithm — it has no characters of its own to
 * resolve, so the boxes are simply laid out in the container's base direction.
 * That is why an English heading rendered inside `dir="rtl"` came out as
 * "existdoesn't page This": every word was correct, the order was reversed.
 * Wrapping the words in a run element that declares the run's own direction
 * gives the algorithm the strong direction the inline-blocks lost, so an
 * English phrase inside an Arabic sentence keeps its internal word order while
 * the sentence around it still runs right to left.
 *
 * Words with no strong character of their own (a lone number, "&", "2026")
 * join the run in progress rather than starting a new one, which is what the
 * bidi algorithm does with neutrals and keeps punctuation from fragmenting a
 * sentence into a dozen single-word runs.
 */
function firstStrongDir(text: string): "rtl" | "ltr" | null {
  const rtlAt = text.search(STRONG_RTL);
  const ltrAt = text.search(STRONG_LTR);
  if (rtlAt !== -1 && ltrAt !== -1) return rtlAt < ltrAt ? "rtl" : "ltr";
  if (rtlAt !== -1) return "rtl";
  if (ltrAt !== -1) return "ltr";
  return null;
}

function toBidiRuns(text: string): BidiRun[] {
  // A heading opening on a neutral word ("2026 was the year …") has nothing to
  // start the first run with, so it borrows the direction of the string's
  // first strong character — the same rule `dir="auto"` uses. A string with no
  // strong character anywhere is all digits and punctuation, which is LTR.
  const baseDir = firstStrongDir(text) ?? "ltr";
  const runs: BidiRun[] = [];

  for (const word of text.split(" ")) {
    const dir = firstStrongDir(word);
    const current = runs[runs.length - 1];

    if (current && (dir === null || dir === current.dir)) {
      current.words.push(word);
    } else {
      runs.push({ dir: dir ?? baseDir, words: [word] });
    }
  }

  return runs;
}

type WordRevealProps = {
  children: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
};

/**
 * Headings only. A `mode="scrub"` variant used to exist that tied word opacity
 * to scroll position; the Manifesto ran its body copy through it and you
 * arrived at the section to find sentences half-faded mid-line. Removed rather
 * than left available: reading should never depend on how far you have
 * scrolled. The reveal below fires once, as a block nears the viewport.
 */
export default function WordReveal({
  children,
  as = "span",
  className,
  wordClassName,
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, yPercent: -100 });

      const tweenVars = {
        opacity: 1,
        yPercent: 0,
        stagger: 0.03,
        duration: 0.7,
        ease: "power2.out",
      };

      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        // Already inside the "top 85%" zone the instant this mounts — true
        // for every SubpageHero heading, which is always above the fold. A
        // ScrollTrigger created after the element has already crossed its own
        // start point is documented to fire its toggleActions immediately,
        // but that specific path proved unreliable in practice: on a
        // client-side route change the words' opacity would resolve to 1
        // while yPercent stayed permanently pinned at its initial -100
        // (confirmed via the computed transform, not just a visual glance),
        // overlapping whatever sits above the heading. Skipping ScrollTrigger
        // entirely for the common "already visible" case removes the failure
        // mode rather than chasing its timing.
        gsap.to(words, tweenVars);
      } else {
        // Genuinely below the fold — animate once actually scrolled into
        // view. A real future scroll event drives this, so it isn't exposed
        // to the same just-mounted timing issue.
        gsap.to(words, {
          ...tweenVars,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    // On a hard reload, fonts and images are already settled by the time
    // this effect runs, so the trigger's start/end offsets are correct
    // immediately. On a client-side route change they aren't — web font
    // swap, image decode, or any slow-mounting component further down the
    // page (e.g. a WebGL scene falling back to CSS after a failed context
    // creation) can all still shift page height afterward, leaving the
    // trigger tied to stale offsets (text overlapping headings until
    // something forces a recalculation). `document.fonts.ready` and the
    // `load` event are each one-shot *per browser session* — on the second
    // and later navigations they've already fired, so they fire again
    // near-instantly (before the new page's layout has necessarily
    // settled) rather than actually waiting for anything. A ResizeObserver
    // on the document catches any real layout change, from any cause, for
    // a bounded window after mount.
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.body);
    const stopObserving = window.setTimeout(() => resizeObserver.disconnect(), 3000);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      window.clearTimeout(stopObserving);
    };
  }, []);

  const runs = toBidiRuns(children);
  // `as` is a runtime value, not a JSX-recognizable capitalized identifier —
  // aliasing it lets JSX treat it as a dynamic component/tag while still
  // passing `ref` the normal way, instead of hand-building the props object
  // that createElement needed (which is what tripped react-hooks/refs).
  //
  // The cast is what makes that alias type-check. A bare `ElementType` is the
  // union of every intrinsic element and every component, and JSX resolves a
  // union's props by intersecting them — which for that union collapses to
  // `never`, so *any* prop passed here is an error (`ref`, `className` and
  // `children` each reported one, and `next build` failed on all three).
  //
  // Restating it as `ElementType<TagProps>` is worse, not better: that maps
  // the same enormous union through a generic and TS gives up with "union type
  // too complex to represent". A single function-component signature is the
  // one form that both erases the union and keeps the three props this call
  // site passes actually checked — the alternative being `any`, which would
  // stop checking them at all. It goes through `unknown` because `as` is a
  // string at runtime for every current caller ("h1", "h2"), and React accepts
  // both, but the two types do not overlap for a direct assertion.
  const Tag = as as unknown as (props: {
    ref?: Ref<HTMLElement | null>;
    className?: string;
    children?: ReactNode;
  }) => ReactNode;

  return (
    <Tag ref={ref} className={className}>
      {runs.map((run, runIndex) => (
        <Fragment key={runIndex}>
          <span dir={run.dir}>
            {run.words.map((word, i) => (
              <Fragment key={i}>
                <span
                  data-word
                  className={`inline-block will-change-transform ${wordClassName ?? ""}`}
                >
                  {word}
                </span>
                {/* A real text node, not a margin. Two reasons: `marginRight`
                    is a physical axis and put the gap on the wrong side of
                    every Arabic word, and a margin is invisible to
                    `innerText`, so any DOM text extraction (tests, scrapers,
                    some accessibility tooling) read the 404 heading back as
                    "Thispagedoesn'texist." A space between two inline-blocks
                    renders at the font's own word width and reads back
                    correctly. */}
                {i < run.words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
          {runIndex < runs.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
