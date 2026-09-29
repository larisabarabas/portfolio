import { ExperienceItem } from "@/components/sections/ExperienceItem";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EXPERIENCE } from "@/lib/constants";
import type { ExperienceEntriesQueryResult } from "@/lib/sanity/sanity.types";

type ExperienceProps = {
  entries: ExperienceEntriesQueryResult;
};

export function Experience({ entries }: ExperienceProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto w-full max-w-240"
    >
      <SectionLabel>{EXPERIENCE.eyebrow}</SectionLabel>
      <h2
        id="experience-title"
        className="mb-9 font-serif text-[clamp(32px,4vw,52px)] font-normal"
      >
        {EXPERIENCE.heading}
      </h2>
      {entries.length > 0 ? (
        <ol className="flex flex-col gap-3.5 rounded-[32px] p-3.5 shadow-neu-in">
          {entries.map((entry) => (
            <ExperienceItem key={entry._id} entry={entry} />
          ))}
        </ol>
      ) : (
        <p className="text-[15.5px] italic opacity-70">
          {EXPERIENCE.emptyState}
        </p>
      )}
    </section>
  );
}
