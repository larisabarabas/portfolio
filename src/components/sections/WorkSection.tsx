import { WorkCard } from "@/components/sections/WorkCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WORK } from "@/lib/constants";
import type { ProjectsQueryResult } from "@/lib/sanity/sanity.types";

type WorkSectionProps = {
  projects: ProjectsQueryResult;
};

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto w-full max-w-310"
    >
      <SectionLabel>{WORK.eyebrow}</SectionLabel>
      <h2
        id="work-title"
        className="mb-9 max-w-170 font-serif text-[clamp(28px,3.4vw,42px)] font-normal"
      >
        {WORK.heading}
      </h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-9">
          {projects.map((project) => (
            <WorkCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-base italic opacity-70">{WORK.emptyState}</p>
      )}
    </section>
  );
}
