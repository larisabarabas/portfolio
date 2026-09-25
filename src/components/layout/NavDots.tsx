import { NAV_LINKS } from "@/lib/constants";

type NavDotsProps = {
  activeId: string;
};

// Desktop-only: without hover, the labels can't be seen, so phones get
// MobileNav instead.
export function NavDots({ activeId }: NavDotsProps) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 right-2 z-50 hidden -translate-y-1/2 md:block"
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
