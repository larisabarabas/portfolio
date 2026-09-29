"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NAV } from "@/lib/constants";

type SectionPagerProps = {
  items: { id: string; label: string }[];
  index: number;
  onSelect: (index: number) => void;
};

const STEP_BUTTON_CLASSES =
  "flex size-11 cursor-pointer items-center justify-center rounded-full bg-bg text-lg text-tertiary shadow-neu-out-sm transition-[box-shadow,color] duration-300 enabled:hover:text-primary enabled:hover:shadow-neu-in-sm disabled:cursor-default disabled:opacity-40";

const MENU_EASE = "cubic-bezier(.2,.8,.2,1)";

const pad = (n: number) => String(n + 1).padStart(2, "0");

// Bottom-centre control: previous / current section (opens a list of every
// section) / next. The only section navigation on phones.
export function SectionPager({ items, index, onSelect }: SectionPagerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = items[index];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const pick = (i: number) => {
    setOpen(false);
    onSelect(i);
  };

  return (
    <nav
      ref={rootRef}
      aria-label={NAV.menuLabel}
      className="fixed bottom-5.5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3.5 rounded-pill bg-bg p-2 shadow-neu-out-sm print:hidden"
    >
      <button
        type="button"
        aria-label={NAV.previousLabel}
        disabled={index === 0}
        onClick={() => onSelect(index - 1)}
        className={STEP_BUTTON_CLASSES}
      >
        ←
      </button>

      <ul
        id={menuId}
        data-slide-nav
        inert={!open}
        style={{
          transition: `opacity .35s ease, scale .45s ${MENU_EASE}, translate .45s ${MENU_EASE}, visibility 0s linear ${open ? "0s" : ".45s"}`,
        }}
        className={`absolute bottom-[calc(100%+16px)] left-1/2 flex max-h-[calc(100svh-130px)] w-65 origin-bottom -translate-x-1/2 flex-col gap-1.5 overflow-y-auto rounded-[28px] bg-bg p-3 shadow-neu-out ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-3 scale-96 opacity-0"
        }`}
      >
        {items.map(({ id, label }, i) => {
          const isCurrent = i === index;
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => pick(i)}
                className={`flex w-full cursor-pointer items-center gap-3.5 rounded-[18px] bg-bg px-3 py-1.75 text-left text-sm font-semibold transition-[box-shadow,color] duration-300 hover:text-primary ${
                  isCurrent ? "text-tertiary shadow-neu-in-sm" : "text-ink"
                }`}
              >
                <span
                  className={`flex size-8 flex-none items-center justify-center rounded-full text-xs ${
                    isCurrent
                      ? "bg-primary text-on-accent"
                      : "text-primary shadow-neu-out-sm"
                  }`}
                >
                  {pad(i)}
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex min-w-42.5 cursor-pointer items-center justify-center gap-2 rounded-pill bg-bg px-4.5 py-2.5 text-[13px] font-semibold tracking-[0.08em] whitespace-nowrap text-ink uppercase transition-[box-shadow,color] duration-300 hover:text-primary ${
          open ? "shadow-neu-in" : "shadow-neu-in-sm"
        }`}
      >
        <span className="text-primary">{pad(index)}</span>
        <span aria-hidden="true">·</span>
        <span>{current.label}</span>
        <span
          aria-hidden="true"
          className={`inline-block text-[11px] opacity-60 transition-transform duration-350 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▴
        </span>
      </button>

      <button
        type="button"
        aria-label={NAV.nextLabel}
        disabled={index === items.length - 1}
        onClick={() => onSelect(index + 1)}
        className={STEP_BUTTON_CLASSES}
      >
        →
      </button>

      <p aria-live="polite" className="sr-only">
        {`${current.label}, section ${index + 1} of ${items.length}`}
      </p>
    </nav>
  );
}
