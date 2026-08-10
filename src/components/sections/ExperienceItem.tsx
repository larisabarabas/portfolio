import type { ExperienceEntriesQueryResult } from "@/lib/sanity/sanity.types";

type DotColor = ExperienceEntriesQueryResult[number]["dotColor"];

const DOT_CLASSES: Record<DotColor, string> = {
  primary: "bg-primary",
  magenta: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  soft: "bg-soft",
};

type ExperienceItemProps = {
  entry: ExperienceEntriesQueryResult[number];
};

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className="relative">
      <div
        className={`absolute top-1 left-[-42px] h-3 w-3 rounded-full ${DOT_CLASSES[entry.dotColor]}`}
      />
      <p className="mb-1.5 text-[13px] opacity-60">
        {entry.dateRange}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <h3
        className={
          entry.compact
            ? "mb-2 text-lg font-semibold"
            : "mb-2.5 text-[21px] font-semibold"
        }
      >
        {entry.role}
      </h3>
      <p
        className={`max-w-[620px] text-[15.5px] leading-[1.7] ${
          entry.compact ? "opacity-75" : "opacity-85"
        }`}
      >
        {entry.description}
      </p>
    </div>
  );
}
