import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { CaseStudyOutcome } from "@/components/case-study/CaseStudyOutcome";
import { DecisionCard } from "@/components/case-study/DecisionCard";
import { MetaRow } from "@/components/case-study/MetaRow";
import { UXFlowSteps } from "@/components/case-study/UXFlowSteps";
import { Chip } from "@/components/ui/Chip";
import { CASE_STUDY } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import type {
  ProjectBySlugQueryResult,
  ProjectSlugsQueryResult,
} from "@/lib/sanity/sanity.types";

// Every section: 8vw gutters around a 1240px column, headings clear of the
// sticky header when jumped to.
const SECTION_CLASSES = "scroll-mt-24 px-[8vw] pt-22";
const H2_CLASSES = "font-serif text-[clamp(30px,3.4vw,40px)] font-normal";

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

  const hasFlow =
    project.uxFlowImage?.asset != null ||
    project.uxFlowPlaceholderLabel != null ||
    (project.uxFlowSteps?.length ?? 0) > 0;
  const hasDecisions = (project.decisions?.length ?? 0) > 0;
  const outcomeHeading =
    project.outcomeHeading ?? CASE_STUDY.outcomeHeadingDefault;

  // The pager lists only the sections this project actually has.
  const navItems = [
    project.problemBody
      ? { id: "problem", label: CASE_STUDY.problemHeading }
      : null,
    hasFlow ? { id: "flow", label: CASE_STUDY.uxFlowHeading } : null,
    hasDecisions
      ? { id: "decisions", label: CASE_STUDY.decisionsNavLabel }
      : null,
    { id: "outcome", label: outcomeHeading },
  ].filter((item) => item !== null);

  return (
    <>
      <CaseStudyHeader />

      <main id="main">
        <section className="animate-fade-up px-[8vw] pt-32 pb-12 nav:pt-36">
          <div className="mx-auto max-w-310">
            <div className="mb-6">
              <Chip
                variant="accent"
                color={project.statusPillColor}
                size="status"
              >
                {project.statusLabel}
              </Chip>
            </div>
            <h1 className="mb-5 font-serif text-[clamp(40px,6vw,68px)] leading-[1.05] font-normal text-balance">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mb-8 max-w-165 text-[19px] leading-[1.6] opacity-85">
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
          <section
            id="problem"
            aria-labelledby="problem-title"
            className="scroll-mt-24 px-[8vw] pt-14"
          >
            <div className="mx-auto max-w-310">
              <h2 id="problem-title" className={`mb-4 ${H2_CLASSES}`}>
                {CASE_STUDY.problemHeading}
              </h2>
              <p className="max-w-190 text-[17px] leading-[1.75] opacity-85">
                {project.problemBody}
              </p>
            </div>
          </section>
        )}

        {hasFlow && (
          <section
            id="flow"
            aria-labelledby="flow-title"
            className={SECTION_CLASSES}
          >
            <div className="mx-auto max-w-310">
              <h2 id="flow-title" className={`mb-7 ${H2_CLASSES}`}>
                {CASE_STUDY.uxFlowHeading}
              </h2>
              {/* Raised frame → inset well → the diagram. */}
              <div className="rounded-[32px] p-3 shadow-neu-out">
                <div className="rounded-card-lg p-2.5 shadow-neu-in">
                  {project.uxFlowImage?.asset ? (
                    <Image
                      src={urlFor(project.uxFlowImage).width(1840).url()}
                      alt={`${project.title} UX flow`}
                      width={1840}
                      height={Math.round(
                        1840 / (project.uxFlowImage.aspectRatio ?? 1840 / 1190),
                      )}
                      sizes="(min-width: 1240px) 1200px, 90vw"
                      className="block h-auto w-full rounded-2xl bg-paper"
                    />
                  ) : (
                    <div className="flex aspect-10/3 items-center justify-center rounded-2xl px-4 text-center text-sm opacity-60">
                      {project.uxFlowPlaceholderLabel ??
                        CASE_STUDY.uxFlowPlaceholderDefault}
                    </div>
                  )}
                </div>
              </div>
              {project.uxFlowSteps && project.uxFlowSteps.length > 0 && (
                <UXFlowSteps
                  steps={project.uxFlowSteps}
                  accentColor={project.accentColor}
                />
              )}
            </div>
          </section>
        )}

        {hasDecisions && (
          <section
            id="decisions"
            aria-labelledby="decisions-title"
            className={SECTION_CLASSES}
          >
            <div className="mx-auto max-w-310">
              <h2 id="decisions-title" className={`mb-7 ${H2_CLASSES}`}>
                {CASE_STUDY.decisionsHeading}
              </h2>
              <div className="flex flex-col gap-6">
                {project.decisions?.map((decision) => (
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
          id="outcome"
          heading={outcomeHeading}
          body={project.outcomeBody}
          ctaLabel={project.outcomeCtaLabel}
          ctaUrl={project.outcomeCtaUrl}
        />
      </main>

      <CaseStudyNav items={navItems} />
    </>
  );
}
