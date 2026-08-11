import { ExperienceItem } from "@/components/sections/ExperienceItem";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EXPERIENCE } from "@/lib/constants";
import type { ExperienceEntriesQueryResult } from "@/lib/sanity/sanity.types";

type ExperienceProps = {
  entries: ExperienceEntriesQueryResult;
};

export function Experience({ entries }: ExperienceProps) {
  return (
    <section id="experience" className="mx-auto max-w-250 px-[8vw] py-25">
      <Reveal>
        <SectionLabel>{EXPERIENCE.eyebrow}</SectionLabel>
        <h2 className="mb-14 font-serif text-[clamp(32px,4vw,52px)] font-normal">
          {EXPERIENCE.heading}
        </h2>
        {entries.length > 0 ? (
          <div className="flex flex-col gap-12 border-l-2 border-line pl-9">
            {entries.map((entry) => (
              <ExperienceItem key={entry._id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="text-[15.5px] italic opacity-60">
            {EXPERIENCE.emptyState}
          </p>
        )}
      </Reveal>
    </section>
  );
}
