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

// Shows only the dates, location and "Role — Company". The description
// bullets still live in Sanity (and in the query); they're just not rendered.
export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className="relative">
      <div
        className={`absolute top-1 -left-10.5 h-3 w-3 rounded-full ${DOT_CLASSES[entry.dotColor]}`}
      />
      <p className="mb-1.5 text-[13px] opacity-70">
        {entry.dateRange}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <h3
        className={
          entry.compact ? "text-lg font-semibold" : "text-[21px] font-semibold"
        }
      >
        {entry.role}
      </h3>
    </div>
  );
}
