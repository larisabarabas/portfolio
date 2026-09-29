import { NAV } from "@/lib/constants";

type SectionRailProps = {
  items: { id: string; label: string }[];
  index: number;
};

// Desktop-only dot rail; on phones it would sit on top of the content, so the
// pager is the only navigation there. Each dot shows its label on hover and
// keyboard focus.
export function SectionRail({ items, index }: SectionRailProps) {
  return (
    <nav
      aria-label={NAV.railLabel}
      className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col gap-3 rounded-pill bg-bg px-2.25 py-3.5 shadow-neu-out-sm nav:flex print:hidden"
    >
      {items.map(({ id, label }, i) => {
        const isCurrent = i === index;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isCurrent ? "true" : undefined}
            className="group relative flex size-4 items-center justify-center rounded-full shadow-neu-in-sm"
          >
            <span
              className={`rounded-full bg-primary transition-[width,height] duration-300 ${
                isCurrent ? "size-2" : "size-0"
              }`}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] translate-x-1 -translate-y-1/2 rounded-pill bg-ink px-2.5 py-0.75 text-[11px] font-semibold whitespace-nowrap text-bg opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
