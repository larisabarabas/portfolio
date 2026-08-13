import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { WORK } from "@/lib/constants";
import { urlFor } from "@/lib/sanity/image";
import type { ProjectsQueryResult } from "@/lib/sanity/sanity.types";

type WorkCardProps = {
  project: ProjectsQueryResult[number];
  index: number;
};

export function WorkCard({ project, index }: WorkCardProps) {
  const imageFirst = index % 2 === 0;

  const image = project.mainImage?.asset ? (
    <Image
      src={urlFor(project.mainImage).width(1600).url()}
      alt={project.title}
      width={1600}
      height={1200}
      quality={100}
      sizes="(min-width: 768px) 50vw, 100vw"
      className="block h-auto w-full rounded-card border border-line shadow-[0_30px_60px_-30px_rgba(34,20,16,0.35)]"
    />
  ) : (
    <ImagePlaceholder
      alt={project.title}
      placeholder={WORK.screenshotPlaceholder}
      aspectRatio="4/3"
      radius={20}
      sizes="(min-width: 768px) 50vw, 100vw"
    />
  );

  const copy = (
    <div>
      <Pill tone="solid" color={project.statusPillColor} size="sm">
        {project.statusLabel}
      </Pill>
      <h3 className="mt-4 mb-3.5 font-serif text-[32px] font-normal">
        {project.title}
      </h3>
      {project.summaryPoints?.map((point) => (
        <p
          key={point._key}
          className="mb-2.5 text-base leading-[1.7] opacity-85"
        >
          <strong>{point.label}:</strong> {point.text}
        </p>
      ))}
      {project.techTags && project.techTags.length > 0 && (
        <div className="mt-5 mb-5 flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <Pill key={tag} tone="outline" size="sm">
              {tag}
            </Pill>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-5">
        {project.hasCaseStudy && (
          <TextLink
            href={`/work/${project.slug.current}`}
            color={project.accentColor}
          >
            {WORK.caseStudyLinkLabel}
          </TextLink>
        )}
        {project.liveUrl && (
          <TextLink href={project.liveUrl} color="tertiary" external>
            {project.liveUrlLabel ?? WORK.liveLinkLabelDefault}
          </TextLink>
        )}
        {project.githubUrl && (
          <TextLink href={project.githubUrl} color="ink" external>
            {WORK.githubLinkLabel}
          </TextLink>
        )}
      </div>
    </div>
  );

  return (
    <Reveal delay={index * 0.12}>
      <div className="grid items-center gap-14 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {imageFirst ? image : null}
        {copy}
        {imageFirst ? null : image}
      </div>
    </Reveal>
  );
}
