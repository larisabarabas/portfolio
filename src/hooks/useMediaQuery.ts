"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live `matchMedia` result. The server (and the first client render, so
 * hydration matches) sees `serverValue`; keep layout in CSS and use this only
 * for behaviour and ARIA that can safely switch after hydration.
 */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
