"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";

type UseScrollRevealOptions = {
  delay?: number;
  threshold?: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollReveal({
  delay = 0,
  threshold = 0,
}: UseScrollRevealOptions = {}) {
  const [visible, setVisible] = useState(false);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      // No animation to gate on — reveal immediately so nothing can get
      // stranded at opacity: 0 (e.g. a section taller than the viewport that
      // never reaches the intersection threshold).
      if (prefersReducedMotion()) {
        setVisible(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
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

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };

  return { ref, style, visible };
}
