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
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

export type Slide = {
  id: string;
  label: string;
  content: ReactNode;
};

const ActiveSlideContext = createContext<string | null>(null);

/** Whether the slide with this id is the one on screen. */
export function useIsActiveSlide(id: string) {
  return useContext(ActiveSlideContext) === id;
}

type SlideDeckProps = {
  slides: Slide[];
};

// The home page as full-screen slides: one section at a time, each scrolling
// on its own, moved between with the wheel, keys, swipes, the rail or the
// pager. The URL hash tracks the current slide so it can be linked to.
export function SlideDeck({ slides }: SlideDeckProps) {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const indexRef = useRef(0);
  const deckRef = useRef<HTMLElement>(null);
  const focusPending = useRef(false);

  const slideIds = useMemo(() => slides.map((slide) => slide.id), [slides]);
  const navItems = useMemo(
    () => slides.map(({ id, label }) => ({ id, label })),
    [slides],
  );

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

  // Deep links (/#work, or an anchor inside a slide) land on their slide
  // before first paint, without animating through the ones before it.
  useLayoutEffect(() => {
    const target = resolveHash(window.location.hash);
    if (target <= 0) return;
    indexRef.current = target;
    setInstant(true);
    setIndex(target);
  }, [resolveHash]);

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

  useSlideNavigation({ deckRef, index, go, resolveHash });

  return (
    <ActiveSlideContext value={slideIds[index]}>
      <main
        id="main"
        ref={deckRef}
        tabIndex={-1}
        data-instant={instant || undefined}
        className="fixed inset-0 overflow-hidden outline-none"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            data-slide={i}
            data-position={
              i === index ? "current" : i < index ? "before" : "after"
            }
            inert={i !== index}
            tabIndex={-1}
            className="slide-panel flex overflow-y-auto overscroll-contain px-[8vw] pt-24 pb-30 outline-none"
          >
            <div className="slide-content my-auto flex w-full">
              {slide.content}
            </div>
          </div>
        ))}
      </main>
      <SectionRail items={navItems} index={index} onSelect={go} />
      <SectionPager items={navItems} index={index} onSelect={go} />
    </ActiveSlideContext>
  );
}
