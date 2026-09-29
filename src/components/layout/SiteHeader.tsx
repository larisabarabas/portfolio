"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SLIDE_CHANGE_EVENT } from "@/lib/constants";

type SiteHeaderProps = {
  /** Where the logo goes: "#hero" on the home page, "/" elsewhere. */
  logoHref: string;
  /** Extra controls before the theme toggle, e.g. a back link. */
  actions?: ReactNode;
};

// How far down the reader is: the page itself, or on the desktop home page
// the slide on screen, which scrolls inside itself while the page doesn't.
// (On phones the slides are ordinary sections, so their own scrollTop is 0.)
function readScrollY() {
  const slide = document.querySelector<HTMLElement>(
    '[data-slide][data-position="current"]',
  );
  return Math.max(window.scrollY, slide?.scrollTop ?? 0);
}

// The one header for every page: logo on the left, controls on the right,
// both lined up with the 1240px content column. Transparent at the top of the
// page or slide; once it scrolls, the header gains the page background and a
// soft bottom shadow, so content never shows through behind it.
export function SiteHeader({ logoHref, actions }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(readScrollY() > 8);
    update();
    // Capture phase: scroll events from a slide don't bubble to the window.
    window.addEventListener("scroll", update, { capture: true, passive: true });
    // A new slide may be at a different scroll position than the last one.
    window.addEventListener(SLIDE_CHANGE_EVENT, update);
    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener(SLIDE_CHANGE_EVENT, update);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-[8vw] transition-[background-color,box-shadow] duration-300 print:static print:shadow-none ${
        scrolled ? "bg-bg shadow-[0_6px_14px_-8px_var(--neu-dk)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-310 items-center justify-between gap-4 nav:h-20">
        <Logo href={logoHref} />
        <div className="flex items-center gap-4.5 print:hidden">
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
