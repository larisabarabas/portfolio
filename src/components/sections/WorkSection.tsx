import { WorkCard } from "@/components/sections/WorkCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WORK } from "@/lib/constants";
import type { ProjectsQueryResult } from "@/lib/sanity/sanity.types";

type WorkSectionProps = {
  projects: ProjectsQueryResult;
};

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section id="work" className="mx-auto max-w-310 px-[8vw] pt-45 pb-25">
      <SectionLabel>{WORK.eyebrow}</SectionLabel>
      <h2 className="mb-15 max-w-175 font-serif text-[clamp(32px,4vw,52px)] font-normal">
        {WORK.heading}
      </h2>
      {projects.length > 0 ? (
        <div className="flex flex-col gap-25">
          {projects.map((project, index) => (
            <WorkCard key={project._id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-base italic opacity-60">{WORK.emptyState}</p>
      )}
    </section>
  );
}
