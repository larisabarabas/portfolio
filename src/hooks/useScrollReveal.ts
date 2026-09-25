"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";

type UseScrollRevealOptions = {
  delay?: number;
  threshold?: number;
};

// "static": rendered as-is, no animation. This is the server/first-paint
//   state, so content is never invisible while JS loads or if it never does.
// "hidden": below the fold at mount, waiting to scroll into view.
// "shown":  scrolled into view, animating in.
type RevealPhase = "static" | "hidden" | "shown";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollReveal({
  delay = 0,
  threshold = 0,
}: UseScrollRevealOptions = {}) {
  const [phase, setPhase] = useState<RevealPhase>("static");

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el || prefersReducedMotion()) return;
      // Already on screen at mount (e.g. a reload mid-page or a deep link):
      // leave it alone — hiding it now would make visible content flash.
      if (el.getBoundingClientRect().top < window.innerHeight) return;

      setPhase("hidden");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPhase("shown");
            observer.disconnect();
          }
        },
        { threshold, rootMargin: "0px 0px -48px 0px" },
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    [threshold],
  );

  const style: CSSProperties | undefined =
    phase === "hidden"
      ? { opacity: 0, transform: "translateY(28px)" }
      : phase === "shown"
        ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
          }
        : undefined;

  return { ref, style };
}
