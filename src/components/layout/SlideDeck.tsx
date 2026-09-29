"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SectionPager } from "@/components/layout/SectionPager";
import { SectionRail } from "@/components/layout/SectionRail";
import { Reveal } from "@/components/ui/Reveal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

// Must match --breakpoint-nav in globals.css.
const DESKTOP_QUERY = "(width >= 47.5rem)";

export type Slide = {
  id: string;
  label: string;
  content: ReactNode;
};

// Id of the slide on screen in desktop slide mode; null on phones, where the
// page scrolls and several sections can be visible at once.
const ActiveSlideContext = createContext<string | null>(null);

/** False only for a desktop slide that's currently hidden. */
export function useIsActiveSlide(id: string) {
  const active = useContext(ActiveSlideContext);
  return active === null || active === id;
}

type SlideDeckProps = {
  slides: Slide[];
};

// The home page. On desktop: full-screen slides, one section at a time, moved
// between with the wheel, keys, swipes, the rail or the pager, with the URL
// hash tracking the current slide. On phones: a normal scrolling page with
// sections that snap into place and fade in. The layout switch lives in CSS
// (globals.css), so the first paint is right before this hydrates.
export function SlideDeck({ slides }: SlideDeckProps) {
  // The server can't know the width, so it renders the phone behaviour (no
  // `inert` panels); desktop switches over right after hydration.
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const indexRef = useRef(0);
  const deckRef = useRef<HTMLElement>(null);
  const focusPending = useRef(false);
  const deepLinkHandled = useRef(false);

  const slideIds = useMemo(() => slides.map((slide) => slide.id), [slides]);
  const navItems = useMemo(
    () => slides.map(({ id, label }) => ({ id, label })),
    [slides],
  );

  // Phones: which section is in the middle of the screen.
  const scrolledToId = useActiveSection(slideIds);
  const currentIndex = isDesktop
    ? index
    : Math.max(0, slideIds.indexOf(scrolledToId));

  const resolveHash = useCallback(
    (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return -1;
      const direct = slideIds.indexOf(id);
      if (direct >= 0) return direct;
      // An anchor inside a slide (e.g. a service card) opens its slide.
      const panel = document
        .getElementById(id)
        ?.closest<HTMLElement>("[data-slide]");
      return panel ? Number(panel.dataset.slide) : -1;
    },
    [slideIds],
  );

  // Desktop: switch slides.
  const go = useCallback(
    (target: number) => {
      const next = Math.max(0, Math.min(slideIds.length - 1, target));
      if (next === indexRef.current) return;
      indexRef.current = next;

      // If focus is inside the outgoing slide it's about to become inert, so
      // move it to the new slide once that renders. Focus on the rail or
      // pager stays where it is.
      const active = document.activeElement;
      focusPending.current =
        active != null &&
        active !== document.body &&
        (deckRef.current?.contains(active) ?? false);

      const panel = deckRef.current?.querySelector<HTMLElement>(
        `[data-slide="${next}"]`,
      );
      if (panel) panel.scrollTop = 0;
      window.history.replaceState(null, "", `#${slideIds[next]}`);
      setIndex(next);
    },
    [slideIds],
  );

  // Phones: scroll to the section like following a #link (smoothly unless
  // reduced motion, via `scroll-behavior`), adding a history entry so Back
  // returns to where you were.
  const scrollToSection = useCallback(
    (target: number) => {
      const id = slideIds[target];
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      section.scrollIntoView();
      window.history.pushState(null, "", `#${id}`);
    },
    [slideIds],
  );

  // Desktop deep links (/#work, or an anchor inside a slide) land on their
  // slide without animating through the ones before it. Phones scroll to the
  // anchor natively.
  useLayoutEffect(() => {
    if (!isDesktop || deepLinkHandled.current) return;
    deepLinkHandled.current = true;
    const target = resolveHash(window.location.hash);
    if (target <= 0) return;
    indexRef.current = target;
    setInstant(true);
    setIndex(target);
  }, [isDesktop, resolveHash]);

  useEffect(() => {
    if (!instant) return;
    // Two frames: one to paint the jump, one before transitions come back.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setInstant(false));
    });
    return () => cancelAnimationFrame(frame);
  }, [instant]);

  useEffect(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    deckRef.current
      ?.querySelector<HTMLElement>(`[data-slide="${index}"]`)
      ?.focus({ preventScroll: true });
  }, [index]);

  useSlideNavigation({ enabled: isDesktop, deckRef, index, go, resolveHash });

  return (
    <ActiveSlideContext value={isDesktop ? slideIds[index] : null}>
      <main
        id="main"
        ref={deckRef}
        tabIndex={-1}
        data-instant={instant || undefined}
        className="snap-sections outline-none nav:fixed nav:inset-0 nav:overflow-hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            data-slide={i}
            data-position={
              i === index ? "current" : i < index ? "before" : "after"
            }
            inert={isDesktop && i !== index}
            tabIndex={isDesktop ? -1 : undefined}
            className="slide-panel flex min-h-svh px-[8vw] pt-24 pb-30 outline-none nav:min-h-0 nav:overflow-y-auto nav:overscroll-contain"
          >
            {/* Phones fade sections in on scroll; the hero is already on
                screen. On desktop, Reveal stays inert because every slide
                sits within the first screen. */}
            {slide.id === "hero" ? (
              <div className="slide-content my-auto flex w-full">
                {slide.content}
              </div>
            ) : (
              <Reveal className="slide-content my-auto flex w-full">
                {slide.content}
              </Reveal>
            )}
          </div>
        ))}
      </main>
      <SectionRail items={navItems} index={index} onSelect={go} />
      <SectionPager
        items={navItems}
        index={currentIndex}
        onSelect={isDesktop ? go : scrollToSection}
      />
    </ActiveSlideContext>
  );
}
