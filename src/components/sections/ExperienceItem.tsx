import type { ExperienceEntriesQueryResult } from "@/lib/sanity/sanity.types";

type ExperienceItemProps = {
  entry: ExperienceEntriesQueryResult[number];
};

// Shows only the dates, location, "Role — Company" and industry. The description
// bullets still live in Sanity (and in the query); they're just not rendered.
export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <li className="flex flex-col gap-2 rounded-[22px] bg-bg px-5.5 py-4.5 leading-normal shadow-neu-out-sm">
      <p className="self-start rounded-pill px-3 py-1.25 text-[12.5px] tabular-nums opacity-80 shadow-neu-in-sm">
        {entry.dateRange.trim()}
        {entry.location ? ` · ${entry.location.trim()}` : ""}
      </p>
      <h3 className="mt-1 text-[17px] font-semibold">{entry.role}</h3>
      {entry.industry ? (
        <p className="text-[14.5px] opacity-75">{entry.industry.trim()}</p>
      ) : null}
    </li>
  );
}
