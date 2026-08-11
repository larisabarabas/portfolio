import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { DEV_NOTES } from "@/lib/constants";
import type { ArticleLinksQueryResult } from "@/lib/sanity/sanity.types";

type DevNotesProps = {
  articleLinks: ArticleLinksQueryResult;
};

export function DevNotes({ articleLinks }: DevNotesProps) {
  return (
    <section id="devnotes" className="mx-auto max-w-310 px-[8vw] py-25">
      <Reveal>
        <SectionLabel>{DEV_NOTES.eyebrow}</SectionLabel>
        <h2 className="mb-12.5 max-w-175 font-serif text-[clamp(32px,4vw,52px)] font-normal">
          {DEV_NOTES.heading}
        </h2>

        <div className="mb-14 flex flex-wrap items-center gap-10 rounded-card-lg border border-line bg-paper p-10">
          <div className="flex-[0_1_200px]">
            <ImagePlaceholder
              src="/sdn-logo.png"
              alt={DEV_NOTES.logoAlt}
              placeholder={DEV_NOTES.logoPlaceholder}
              aspectRatio="1/1"
              fit="contain"
              sizes="(min-width: 768px) 200px, 100vw"
            />
          </div>
          <div className="min-w-70 flex-[1_1_340px]">
            <h3 className="mb-3.5 font-serif text-[28px] font-normal">
              {DEV_NOTES.featureHeading}
            </h3>
            <p className="mb-5.5 text-base leading-[1.7] opacity-85">
              {DEV_NOTES.featureBody}
            </p>
            <TextLink href={DEV_NOTES.featureUrl} color="tertiary" external>
              {DEV_NOTES.featureCtaLabel}
            </TextLink>
          </div>
        </div>

        {articleLinks.length > 0 ? (
          <>
            <p className="mb-5.5 text-sm font-semibold text-tertiary">
              {DEV_NOTES.collaborationsLabel}
            </p>
            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {articleLinks.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-6 bg-paper px-7 py-6 text-ink hover:bg-soft"
                >
                  <div>
                    <p className="mb-1.5 text-xs font-semibold tracking-[0.06em] text-primary uppercase">
                      {link.publicationAndRole}
                    </p>
                    <p className="text-lg font-semibold">{link.title}</p>
                  </div>
                  <span className="shrink-0 text-xl">→</span>
                </a>
              ))}
            </div>
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
