"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { HERO } from "@/lib/constants";

type WordId = (typeof HERO.words)[number]["id"];

// One underline path per verb, drawn in a 100x12 box that stretches to the
// word's width: a curve for design, a level line for build, a rising
// staircase for improve.
const UNDERLINE_PATHS: Record<WordId, string> = {
  designs: "M2 7 C 20 1, 35 11, 50 6 S 80 1, 98 6",
  builds: "M2 6 H98",
  improves: "M2 10 H32 V7 H64 V4 H98",
};

const UNDERLINE_SVG_PROPS = {
  viewBox: "0 0 100 12",
  preserveAspectRatio: "none",
  className:
    "pointer-events-none absolute -bottom-[0.04em] left-0 h-[0.3em] w-full overflow-visible fill-none",
} as const;

// An engraved groove at rest (dark edge + light edge). The primary line sits
// on top and is revealed left to right when the word is active. Reduced
// motion makes the reveal instant.
function Underline({ path, active }: { path: string; active: boolean }) {
  return (
    <>
      <svg aria-hidden="true" {...UNDERLINE_SVG_PROPS}>
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d={path}
            stroke="var(--neu-dk)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path}
            stroke="var(--neu-lt)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            transform="translate(0.6 1)"
          />
        </g>
      </svg>
      <svg
        aria-hidden="true"
        {...UNDERLINE_SVG_PROPS}
        className={`${UNDERLINE_SVG_PROPS.className} transition-[clip-path] duration-500 ease-out ${
          active
            ? "[clip-path:inset(-8px_-8px_-8px_-8px)]"
            : "[clip-path:inset(-8px_100%_-8px_-8px)]"
        }`}
      >
        <path
          d={path}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="stroke-primary"
        />
      </svg>
    </>
  );
}

// First visit of the session: after the hero has settled, each underline
// fills in turn so visitors see the words do something (touch screens have no
// hover to discover it). Any interaction cancels it.
const DEMO_STORAGE_KEY = "stef-hero-demo";
const DEMO_START_MS = 1200;
const DEMO_STEP_MS = 3000;

function shouldPlayDemo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    return sessionStorage.getItem(DEMO_STORAGE_KEY) === null;
  } catch {
    return true;
  }
}

function markDemoPlayed() {
  try {
    sessionStorage.setItem(DEMO_STORAGE_KEY, "1");
  } catch {}
}

// The default line: a primary dot (as on the photo's hover hint) ties it to
// the underlined words above.
function Hint() {
  return (
    <>
      <span
        aria-hidden="true"
        className="mr-3 inline-block size-2 rounded-full bg-primary align-middle shadow-[0_0_0_4px_rgba(168,68,122,.18)]"
      />
      {HERO.wordHint}
    </>
  );
}

// The hero headline plus the line under it. The three verbs are buttons; the
// line shows the idea behind the last one pointed at, focused or tapped. The
// state lives here, not in Hero, so hovering doesn't re-render the photo.
export function HeroHeadline() {
  const [active, setActive] = useState<WordId | null>(null);
  // True while the intro demo runs, so screen readers aren't read the
  // swapping lines unprompted.
  const [demoPlaying, setDemoPlaying] = useState(false);
  const demoTimers = useRef<number[]>([]);
  const activeText = HERO.words.find((word) => word.id === active)?.idea;

  useEffect(() => {
    if (!shouldPlayDemo()) return;
    const timers = demoTimers.current;
    setDemoPlaying(true);
    HERO.words.forEach((word, index) => {
      timers.push(
        window.setTimeout(
          () => setActive(word.id),
          DEMO_START_MS + index * DEMO_STEP_MS,
        ),
      );
    });
    timers.push(
      window.setTimeout(
        () => {
          setActive(null);
          setDemoPlaying(false);
          markDemoPlayed();
        },
        DEMO_START_MS + HERO.words.length * DEMO_STEP_MS,
      ),
    );
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
      timers.length = 0;
    };
  }, []);

  // A visitor's own choice ends the demo for good.
  const choose = (id: WordId) => {
    for (const timer of demoTimers.current) window.clearTimeout(timer);
    demoTimers.current.length = 0;
    setDemoPlaying(false);
    markDemoPlayed();
    setActive(id);
  };

  return (
    <>
      <h1
        id="hero-title"
        className="mb-5 font-serif text-[clamp(34px,5.4vw,80px)] leading-[1.18] font-normal text-balance lg:mb-6.5"
      >
        {HERO.headingLine1}
        <br />
        <span className="text-tertiary italic">
          {HERO.headingLead}{" "}
          {HERO.words.map((word, index) => {
            const isActive = word.id === active;
            // Punctuation stays glued to its word; the space after it is
            // outside the nowrap span so the line can still break there.
            const punctuation = index === 0 ? "," : "";
            const gap = index === 1 ? " and " : " ";
            return (
              <Fragment key={word.id}>
                <span className="whitespace-nowrap">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onPointerEnter={() => choose(word.id)}
                    onFocus={() => choose(word.id)}
                    onClick={() => choose(word.id)}
                    className={`relative inline-block cursor-pointer pb-[0.22em] italic transition-colors duration-300 ${
                      isActive ? "text-primary" : ""
                    }`}
                  >
                    {word.label}
                    <Underline
                      path={UNDERLINE_PATHS[word.id]}
                      active={isActive}
                    />
                  </button>
                  {punctuation}
                </span>
                {gap}
              </Fragment>
            );
          })}
          {HERO.headingTail}
        </span>
      </h1>
      {/* Every possible line is rendered invisibly so the box is as tall as
          the longest one, and the buttons below never jump. */}
      <div className="mb-7 grid max-w-140 text-[17px] leading-[1.6] lg:mb-10 lg:text-[19px]">
        {[HERO.wordHint, ...HERO.words.map((word) => word.idea)].map((text) => (
          <span
            key={text}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1"
          >
            {text === HERO.wordHint ? <Hint /> : text}
          </span>
        ))}
        <p
          aria-live={demoPlaying ? "off" : "polite"}
          className="col-start-1 row-start-1 opacity-85"
        >
          {activeText ?? <Hint />}
        </p>
      </div>
    </>
  );
}
