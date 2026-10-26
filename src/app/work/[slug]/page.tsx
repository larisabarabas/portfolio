import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyClosing } from "@/components/case-study/CaseStudyClosing";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { CaseStudyOutcome } from "@/components/case-study/CaseStudyOutcome";
import { DecisionCard } from "@/components/case-study/DecisionCard";
import {
  FeatureTour,
  type TourStep,
} from "@/components/case-study/FeatureTour";
import { MetaRow } from "@/components/case-study/MetaRow";
import { UXFlowSteps } from "@/components/case-study/UXFlowSteps";
import { CASE_STUDY } from "@/lib/constants";
import { sanityFetch } from "@/lib/sanity/fetch";
import { imageProps, urlFor } from "@/lib/sanity/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import type {
  ProjectBySlugQueryResult,
  ProjectSlugsQueryResult,
} from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;
type Feature = NonNullable<Project["uxFlowSteps"]>[number];

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

function toTourStep(feature: Feature): TourStep | null {
  if (!feature.screenshot?.asset) return null;
  return {
    id: feature._key,
    label: feature.label.trim(),
    description: feature.description.trim(),
    alt: feature.screenshotAlt?.trim() || feature.label.trim(),
    ...imageProps(feature.screenshot, feature.screenshot.aspectRatio, 1600),
  };
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

  // Which sections exist. The page, its pager and its order all follow from
  // these, so a new section is added in one place.
  const features = project.uxFlowSteps ?? [];
  const tourSteps = features.map(toTourStep);
  // The tour needs a screenshot on every feature; until then the features
  // show as the plain list they used to be.
  const tour = tourSteps.length > 0 && tourSteps.every((step) => step !== null);
  const hasFeatures = features.length > 0;
  const hasProblem = Boolean(project.problemBody);
  const hasDecisions = (project.decisions?.length ?? 0) > 0;
  const hasFlowDiagram =
    project.uxFlowImage?.asset != null ||
    project.uxFlowPlaceholderLabel != null;
  const outcomeHeading =
    project.outcomeHeading ?? CASE_STUDY.outcomeHeadingDefault;

  // The pager lists only the sections this project actually has, in page order.
  const navItems = [
    hasFeatures ? { id: "tour", label: CASE_STUDY.tourHeading } : null,
    hasProblem ? { id: "problem", label: CASE_STUDY.problemHeading } : null,
    hasDecisions
      ? { id: "decisions", label: CASE_STUDY.decisionsNavLabel }
      : null,
    { id: "outcome", label: outcomeHeading },
    hasFlowDiagram ? { id: "flow", label: CASE_STUDY.uxFlowHeading } : null,
  ].filter((item) => item !== null);

  return (
    <>
      <CaseStudyHeader />

      <main id="main" className="pb-35">
        <section className="animate-fade-up px-[8vw] pt-32 pb-4 nav:pt-36">
          <div className="mx-auto max-w-310">
            <CaseStudyHero project={project} />
            <div className="mt-10">
              <MetaRow
                role={project.role}
                timelineLabel={project.timelineLabel}
                timelineValue={project.timelineValue}
                stackText={project.stackText}
              />
            </div>
          </div>
        </section>

        {hasFeatures && (
          <section
            id="tour"
            aria-labelledby="tour-title"
            className={SECTION_CLASSES}
          >
            <div className="mx-auto max-w-310">
              <h2 id="tour-title" className={`mb-7 ${H2_CLASSES}`}>
                {CASE_STUDY.tourHeading}
              </h2>
              {tour ? (
                <FeatureTour steps={tourSteps} />
              ) : (
                <UXFlowSteps
                  steps={features}
                  accentColor={project.accentColor}
                />
              )}
            </div>
          </section>
        )}

        {hasProblem && (
          <section
            id="problem"
            aria-labelledby="problem-title"
            className={SECTION_CLASSES}
          >
            <div className="mx-auto flex max-w-310 flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
              <h2
                id="problem-title"
                className={`${H2_CLASSES} lg:w-65 lg:flex-none`}
              >
                {CASE_STUDY.problemHeading}
              </h2>
              {/* Set large so the paragraph fills the column beside its
                  heading instead of leaving the row half empty. */}
              <p className="min-w-0 font-serif text-[clamp(21px,2.3vw,28px)] leading-[1.4] lg:flex-[3_1_560px]">
                {project.problemBody}
              </p>
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
              <div className="flex flex-col gap-5 lg:gap-6">
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
          intro={project.outcomeIntro}
          stats={project.outcomeStats}
          notes={project.outcomeNotes}
          body={project.outcomeBody}
        />

        {hasFlowDiagram && (
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
            </div>
          </section>
        )}

        <CaseStudyClosing
          note={project.closingNote}
          ctaLabel={project.outcomeCtaLabel}
          ctaUrl={project.outcomeCtaUrl}
        />
      </main>

      <CaseStudyNav items={navItems} />
    </>
  );
}
