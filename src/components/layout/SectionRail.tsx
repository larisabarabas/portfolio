import { NAV } from "@/lib/constants";

type SectionRailProps = {
  items: { id: string; label: string }[];
  index: number;
  onSelect: (index: number) => void;
};

// Desktop-only dot rail; on phones it would sit on top of the content, so the
// pager is the only navigation there.
export function SectionRail({ items, index, onSelect }: SectionRailProps) {
  return (
    <nav
      aria-label={NAV.railLabel}
      className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col gap-3 rounded-pill bg-bg px-2.25 py-3.5 shadow-neu-out-sm nav:flex"
    >
      {items.map(({ id, label }, i) => {
        const isCurrent = i === index;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isCurrent ? "true" : undefined}
            title={label}
            onClick={(e) => {
              e.preventDefault();
              onSelect(i);
            }}
            className="flex size-4 items-center justify-center rounded-full shadow-neu-in-sm"
          >
            <span
              className={`rounded-full bg-primary transition-[width,height] duration-300 ${
                isCurrent ? "size-2" : "size-0"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
