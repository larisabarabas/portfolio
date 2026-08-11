"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS } from "@/lib/constants";

const NAV_IDS = NAV_LINKS.map((link) => link.id);

export function NavDots() {
  const activeId = useActiveSection(NAV_IDS);

  return (
    <div className="fixed top-1/2 right-5.5 z-50 flex -translate-y-1/2 flex-col gap-3.5">
      {NAV_LINKS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          className={`h-2 w-2 rounded-full transition-colors duration-300 hover:bg-primary ${
            activeId === id ? "bg-primary" : "bg-line"
          }`}
        >
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </div>
  );
}
