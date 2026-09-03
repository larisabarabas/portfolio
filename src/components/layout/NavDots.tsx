"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS } from "@/lib/constants";

const NAV_IDS = NAV_LINKS.map((link) => link.id);

export function NavDots() {
  const activeId = useActiveSection(NAV_IDS);

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 right-2 z-50 -translate-y-1/2"
    >
      <ul className="flex flex-col gap-1">
        {NAV_LINKS.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-2 rounded p-2"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none whitespace-nowrap rounded-pill bg-ink px-2 py-0.5 text-[11px] font-semibold text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 group-hover:bg-primary ${
                    isActive ? "bg-primary" : "bg-line"
                  }`}
                />
                <span className="sr-only">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
