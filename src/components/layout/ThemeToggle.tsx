"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { NAV, THEME_STORAGE_KEY } from "@/lib/constants";

type Theme = "light" | "dark";

// Same rule as the inline script in layout.tsx: a saved choice wins,
// otherwise follow the OS.
function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// <html data-theme> is the source of truth; this just lets React re-render
// the switch's aria-checked when it changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.dataset.theme === "dark";

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false);

  // The inline script only runs on full page loads. This covers arriving here
  // via client-side navigation, and React clearing the attribute on the dev
  // Strict Mode remount. The cleanup keeps dark mode off the case studies.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = readTheme();
    return () => {
      delete root.dataset.theme;
    };
  }, []);

  const toggle = () => {
    const next: Theme = isDarkNow() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  // The knob's position and glyph come from the `dark:` variant rather than
  // from `isDark`, so they're right on first paint, before hydration.
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={NAV.themeLabel}
      onClick={toggle}
      className="flex h-11 w-19 cursor-pointer items-center rounded-pill bg-bg p-1.5 shadow-neu-in-sm"
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-bg text-base leading-none text-primary shadow-neu-out-sm transition-transform duration-400 dark:translate-x-8"
      >
        <span className="dark:hidden">{"☀︎"}</span>
        <span className="hidden dark:inline">{"☾︎"}</span>
      </span>
    </button>
  );
}
