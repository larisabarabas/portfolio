"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";

type UseScrollRevealOptions = {
  delay?: number;
  threshold?: number;
};

export function useScrollReveal({
  delay = 0,
  threshold = 0.15,
}: UseScrollRevealOptions = {}) {
  const [visible, setVisible] = useState(false);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(el);
    },
    [threshold],
  );

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };

  return { ref, style };
}
