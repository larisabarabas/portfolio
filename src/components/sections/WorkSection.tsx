import { WorkCard } from "@/components/sections/WorkCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { WORK } from "@/lib/constants";
import type { ProjectsQueryResult } from "@/lib/sanity/sanity.types";

type WorkSectionProps = {
  projects: ProjectsQueryResult;
};

export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1240px] px-[8vw] pt-[180px] pb-[100px]"
    >
      <SectionEyebrow>{WORK.eyebrow}</SectionEyebrow>
      <h2 className="mb-[60px] max-w-[700px] font-serif text-[clamp(32px,4vw,52px)] font-normal">
        {WORK.heading}
      </h2>
      {projects.length > 0 ? (
        <div className="flex flex-col gap-[100px]">
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
