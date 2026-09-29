"use client";

import { type ReactNode, useEffect, useState } from "react";

type TopBarProps = {
  children: ReactNode;
};

// Holds the logo and theme toggle. Invisible at the top of the page, so the
// hero looks as designed; once the page scrolls it gains the page background
// and a soft bottom shadow, so content never shows through behind them.
export function TopBar({ children }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 transition-[background-color,box-shadow] duration-300 nav:h-20 nav:px-7 print:hidden ${
        scrolled ? "bg-bg shadow-[0_6px_14px_-8px_var(--neu-dk)]" : ""
      }`}
    >
      {children}
    </header>
  );
}
