"use client";

import { startTransition, useCallback, useRef, useState } from "react";

export function useHeroParallax() {
  const [pos, setPos] = useState({ mx: 0, my: 0 });
  const elRef = useRef<HTMLElement | null>(null);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = elRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    startTransition(() => setPos({ mx: x, my: y }));
  }, []);

  const onPointerLeave = useCallback(
    () => startTransition(() => setPos({ mx: 0, my: 0 })),
    [],
  );

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (elRef.current) {
        elRef.current.removeEventListener("pointermove", onPointerMove);
        elRef.current.removeEventListener("pointerleave", onPointerLeave);
      }
      elRef.current = el;
      if (el) {
        el.addEventListener("pointermove", onPointerMove, { passive: true });
        el.addEventListener("pointerleave", onPointerLeave, {
          passive: true,
        });
      }
    },
    [onPointerMove, onPointerLeave],
  );

  return { ref, mx: pos.mx, my: pos.my };
}
