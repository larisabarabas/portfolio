"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type ServiceAccordionItemProps = {
  id: string;
  number: string;
  title: string;
  teaser: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

const CARD_PADDING = "p-[clamp(24px,4vw,44px)]";
const PANEL_PADDING = "px-[clamp(24px,4vw,44px)] pb-[clamp(24px,4vw,44px)]";

// Mirrors the handoff's flex layout (`1 1 220px` / `3 1 460px`, 56px gap): the
// left column gets its 220px basis plus a quarter of the leftover width.
const COLUMNS = "@3xl:grid-cols-[calc(220px+(100%-736px)/4)_minmax(0,1fr)]";

export function ServiceAccordionItem({
  id,
  number,
  title,
  teaser,
  defaultOpen = false,
  children,
}: ServiceAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const titleId = `${id}-title`;
  const panelId = `${id}-panel`;

  // Deep links like /#s2 land on the card already expanded.
  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [id]);

  return (
    <article
      id={id}
      aria-labelledby={titleId}
      className={`@container rounded-card-lg border bg-paper transition-colors duration-300 ${
        open ? "border-primary/30" : "border-line"
      }`}
    >
      <h3 className="font-normal">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className={`group relative grid w-full cursor-pointer gap-x-14 rounded-card-lg text-left ${COLUMNS} ${CARD_PADDING}`}
        >
          <span className="block min-w-0 pr-14 @3xl:pr-0">
            <span
              aria-hidden="true"
              className="mb-2.5 block text-[13px] font-semibold tracking-[0.08em] text-primary"
            >
              {number}
            </span>
            <span
              id={titleId}
              className="block font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] text-balance transition-colors duration-300 group-hover:text-primary"
            >
              {title}
            </span>
          </span>

          {/* The full problem text sits in the panel, so the teaser folds away on open. */}
          <span
            aria-hidden="true"
            className={`grid min-w-0 transition-[grid-template-rows,opacity] duration-500 ease-in-out @3xl:pr-14 ${
              open ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <span className="min-h-0 overflow-hidden">
              <span className="mt-4 line-clamp-2 text-base leading-[1.65] text-pretty opacity-72 @3xl:mt-7.5">
                {teaser}
              </span>
            </span>
          </span>

          <span
            aria-hidden="true"
            className="absolute top-[clamp(24px,4vw,44px)] right-[clamp(24px,4vw,44px)] flex size-10 items-center justify-center rounded-full border border-line text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-soft"
          >
            <span className="relative block size-3.5">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current" />
              <span
                className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${
                  open ? "scale-y-0" : "scale-y-100"
                }`}
              />
            </span>
          </span>
        </button>
      </h3>

      <section
        id={panelId}
        aria-labelledby={titleId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`grid gap-x-14 ${COLUMNS} ${PANEL_PADDING} transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="min-w-0 @3xl:col-start-2">{children}</div>
          </div>
        </div>
      </section>
    </article>
  );
}
