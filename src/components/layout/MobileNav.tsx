"use client";

import { Menu, X } from "lucide-react";
import { type MouseEvent, useRef } from "react";
import { LOGO_TEXT, NAV_LINKS } from "@/lib/constants";

type MobileNavProps = {
  activeId: string;
};

const WORDMARK_CLASSES =
  "flex items-baseline gap-0.5 font-serif text-2xl italic font-bold text-tertiary no-underline";
const PILL_BUTTON_CLASSES =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border-[1.5px] border-ink px-4 text-sm font-semibold text-ink";

function Wordmark() {
  return (
    <>
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </>
  );
}

// Phone-only header. The menu is a native modal <dialog>, which gives focus
// trapping, Escape-to-close and focus return to the Menu button for free.
export function MobileNav({ activeId }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Jump instantly instead of following the site-wide smooth scroll: the menu
  // covers the page, so there's nothing to watch, and closing the dialog (which
  // moves focus back to the Menu button) was cancelling long smooth scrolls
  // midway. scroll-margin-top in globals.css keeps the header off the target.
  const goToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    close();
    history.pushState(null, "", `#${id}`);
    target.scrollIntoView({ behavior: "instant" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-bg/90 px-5 py-2.5 backdrop-blur md:hidden">
        <a
          href="#main"
          aria-label={`${LOGO_TEXT} — back to top`}
          className={WORDMARK_CLASSES}
        >
          <Wordmark />
        </a>
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className={PILL_BUTTON_CLASSES}
        >
          <Menu size={18} strokeWidth={2.25} />
          Menu
        </button>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-2.5">
          <span className={WORDMARK_CLASSES}>
            <Wordmark />
          </span>
          <button type="button" onClick={close} className={PILL_BUTTON_CLASSES}>
            <X size={18} strokeWidth={2.25} />
            Close
          </button>
        </div>

        <nav
          aria-label="Page sections"
          className="flex-1 overflow-y-auto px-5 py-8"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => goToSection(event, id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block py-2 font-serif text-4xl no-underline ${
                      isActive ? "text-primary" : "text-ink"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
