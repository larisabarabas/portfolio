import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyOutcome } from "@/components/case-study/CaseStudyOutcome";
import { DecisionCard } from "@/components/case-study/DecisionCard";
import { MetaRow } from "@/components/case-study/MetaRow";
import { UXFlowSteps } from "@/components/case-study/UXFlowSteps";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pill } from "@/components/ui/Pill";
import { CASE_STUDY } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import type {
  ProjectBySlugQueryResult,
  ProjectSlugsQueryResult,
} from "@/lib/sanity/sanity.types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<ProjectSlugsQueryResult>({
    query: projectSlugsQuery,
    fallback: [],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await sanityFetch<ProjectBySlugQueryResult>({
    query: projectBySlugQuery,
    params: { slug },
    fallback: null,
  });

  if (!project?.hasCaseStudy) {
    notFound();
  }

  return (
    <>
      <CaseStudyHeader />

      <section className="animate-fade-up px-[8vw] pt-25 pb-17.5">
        <div className="mx-auto max-w-230">
          <Pill tone="solid" color={project.statusPillColor}>
            {project.statusLabel}
          </Pill>
          <h1 className="mt-5.5 mb-5 font-serif text-[clamp(40px,6vw,68px)] leading-[1.05] font-normal">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mb-8 text-[19px] leading-[1.6] opacity-85">
              {project.subtitle}
            </p>
          )}
          <MetaRow
            role={project.role}
            timelineLabel={project.timelineLabel}
            timelineValue={project.timelineValue}
            stackText={project.stackText}
            metaLinks={project.metaLinks}
          />
        </div>
      </section>

      {project.problemBody && (
        <section className="px-[8vw] pb-22.5">
          <div className="mx-auto max-w-230">
            <h2 className="mb-4 font-serif text-[32px] font-normal">
              {CASE_STUDY.problemHeading}
            </h2>
            <p className="text-[17px] leading-[1.75] opacity-85">
              {project.problemBody}
            </p>
          </div>
        </section>
      )}

      {(project.uxFlowImage?.asset ||
        project.uxFlowPlaceholderLabel ||
        (project.uxFlowSteps && project.uxFlowSteps.length > 0)) && (
        <section className="px-[8vw] pb-22.5">
          <div className="mx-auto max-w-230">
            <h2 className="mb-7.5 font-serif text-[32px] font-normal">
              {CASE_STUDY.uxFlowHeading}
            </h2>
            <ImagePlaceholder
              src={
                project.uxFlowImage?.asset
                  ? urlFor(project.uxFlowImage).width(1840).url()
                  : undefined
              }
              alt={`${project.title} UX flow`}
              placeholder={
                project.uxFlowPlaceholderLabel ??
                CASE_STUDY.uxFlowPlaceholderDefault
              }
              aspectRatio={
                project.uxFlowImage?.aspectRatio
                  ? String(project.uxFlowImage.aspectRatio)
                  : "1200/360"
              }
              radius={16}
              sizes="(min-width: 1024px) 920px, 100vw"
            />
            {project.uxFlowSteps && project.uxFlowSteps.length > 0 && (
              <UXFlowSteps
                steps={project.uxFlowSteps}
                accentColor={project.accentColor}
              />
            )}
          </div>
        </section>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <section className="px-[8vw] pb-22.5">
          <div className="mx-auto max-w-230">
            <h2 className="mb-7.5 font-serif text-[32px] font-normal">
              {CASE_STUDY.decisionsHeading}
            </h2>
            <div className="flex flex-col gap-5">
              {project.decisions.map((decision) => (
                <DecisionCard
                  key={decision._key}
                  heading={decision.heading}
                  decisionText={decision.decisionText}
                  tradeoffText={decision.tradeoffText}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CaseStudyOutcome
        heading={project.outcomeHeading ?? CASE_STUDY.outcomeHeadingDefault}
        body={project.outcomeBody}
        ctaLabel={project.outcomeCtaLabel}
        ctaUrl={project.outcomeCtaUrl}
      />
    </>
  );
}
