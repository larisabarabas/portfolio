import Image from "next/image";
import { Chip } from "@/components/ui/Chip";
import { PillLink } from "@/components/ui/PillLink";
import { TextLink } from "@/components/ui/TextLink";
import { WORK } from "@/lib/constants";
import { urlFor } from "@/lib/sanity/image";
import type { ProjectsQueryResult } from "@/lib/sanity/sanity.types";

type WorkCardProps = {
  project: ProjectsQueryResult[number];
};

export function WorkCard({ project }: WorkCardProps) {
  // A case study is the strongest proof of how the work was done, so those
  // projects get a full-width row with the image beside the text.
  const featured = project.hasCaseStudy;

  return (
    <article
      className={`flex min-w-0 flex-col gap-3.5 rounded-[32px] bg-bg px-4 pt-4 pb-6.5 shadow-neu-out ${
        featured
          ? "col-span-full md:grid md:grid-cols-2 md:items-center md:gap-8 md:p-5"
          : ""
      }`}
    >
      <div className="rounded-[22px] p-2 shadow-neu-in">
        {project.mainImage?.asset ? (
          <Image
            src={urlFor(project.mainImage).width(1600).url()}
            alt={project.title}
            width={1600}
            height={1000}
            quality={100}
            sizes={
              featured
                ? "(min-width: 1240px) 600px, (min-width: 768px) 45vw, 100vw"
                : "(min-width: 1240px) 600px, (min-width: 760px) 50vw, 100vw"
            }
            className="block aspect-16/10 h-auto w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex aspect-16/10 items-center justify-center rounded-2xl px-4 text-center text-sm opacity-60">
            {WORK.screenshotPlaceholder}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-2.5 pt-1">
        <div>
          <Chip variant="accent" color={project.statusPillColor} size="status">
            {project.statusLabel}
          </Chip>
        </div>
        <h3
          className={`font-serif font-normal ${featured ? "text-[clamp(28px,3vw,38px)]" : "text-[28px]"}`}
        >
          {project.title}
        </h3>
        {project.summaryPoints?.map((point) => (
          <p
            key={point._key}
            className="text-[14.5px] leading-[1.6] opacity-85"
          >
            <strong>{point.label}:</strong> {point.text}
          </p>
        ))}
        {project.techTags && project.techTags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <li key={tag}>
                <Chip size="tag">{tag}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-4.5">
          {project.hasCaseStudy ? (
            <PillLink
              href={`/work/${project.slug.current}`}
              tone="tertiary"
              size="sm"
            >
              {WORK.caseStudyLinkLabel} →
            </PillLink>
          ) : null}
          {project.liveUrl ? (
            <TextLink
              href={project.liveUrl}
              color="tertiary"
              size="sm"
              external
            >
              {project.liveUrlLabel ?? WORK.liveLinkLabelDefault}
            </TextLink>
          ) : null}
          {project.githubUrl ? (
            <TextLink href={project.githubUrl} color="ink" size="sm" external>
              {WORK.githubLinkLabel}
            </TextLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
