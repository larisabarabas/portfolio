import Image from "next/image";
import {
  FRAME_IMAGE_CLASSES,
  ProductFrame,
} from "@/components/case-study/ProductFrame";
import { ZoomableImage } from "@/components/case-study/ZoomableImage";
import { Chip } from "@/components/ui/Chip";
import { PillLink } from "@/components/ui/PillLink";
import { imageProps, urlFor } from "@/lib/sanity/image";
import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

// Top of a case study: what it is and why it exists on the left, the product
// on the right (below on phones), then the links. The product is in the first
// screen, so a quick scan sees what was built before reading anything.
export function CaseStudyHero({ project }: { project: Project }) {
  const image = project.heroImage?.asset
    ? project.heroImage
    : project.mainImage;
  const links = (project.metaLinks ?? []).filter(
    (link) => link.url !== project.liveUrl,
  );

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
      <div className="min-w-0 lg:flex-[1_1_440px]">
        <div className="mb-5">
          <Chip variant="accent" color={project.statusPillColor} size="status">
            {project.statusLabel}
          </Chip>
        </div>
        <h1 className="mb-5 font-serif text-[clamp(40px,5vw,64px)] leading-[1.04] font-normal text-balance">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mb-6 text-[17px] leading-[1.6] lg:text-[18px]">
            {project.subtitle}
          </p>
        )}
        {project.whyLine && (
          <p className="mb-8 font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.2] text-tertiary italic">
            {project.whyLine}
          </p>
        )}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {project.liveUrl && (
            <PillLink href={project.liveUrl} variant="cta" external>
              {project.liveUrlLabel ?? "Visit live"}
            </PillLink>
          )}
          {links.map((link) => (
            <PillLink key={link._key} href={link.url} size="sm" external>
              {link.label.trim()}
            </PillLink>
          ))}
        </div>
      </div>
      {image.asset && (
        <div className="min-w-0 lg:flex-[1.1_1_480px]">
          <ProductFrame>
            <ZoomableImage
              src={urlFor(image).width(2400).url()}
              alt={`${project.title} product screenshot`}
            >
              <Image
                {...imageProps(image, image.aspectRatio, 1600)}
                alt=""
                sizes="(min-width: 1024px) 540px, 90vw"
                preload
                className={FRAME_IMAGE_CLASSES}
              />
            </ZoomableImage>
          </ProductFrame>
        </div>
      )}
    </div>
  );
}
