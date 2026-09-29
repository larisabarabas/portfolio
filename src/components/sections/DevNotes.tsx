import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DEV_NOTES } from "@/lib/constants";
import type { ArticleLinksQueryResult } from "@/lib/sanity/sanity.types";

type DevNotesProps = {
  articleLinks: ArticleLinksQueryResult;
};

export function DevNotes({ articleLinks }: DevNotesProps) {
  return (
    <section
      id="devnotes"
      aria-labelledby="devnotes-title"
      className="mx-auto w-full max-w-310"
    >
      <SectionLabel>{DEV_NOTES.eyebrow}</SectionLabel>
      <h2
        id="devnotes-title"
        className="mb-8 font-serif text-[clamp(32px,4vw,52px)] font-normal"
      >
        {DEV_NOTES.heading}
      </h2>

      <div className="flex flex-wrap items-start gap-x-10 gap-y-15">
        <div className="flex min-w-0 flex-[1_1_420px] flex-wrap items-center gap-8 rounded-[36px] bg-bg p-[clamp(22px,3vw,36px)] shadow-neu-out">
          <div className="max-w-full flex-[0_1_180px] rounded-[28px] p-2 shadow-neu-in">
            <Image
              src="/sdn-logo.png"
              alt={DEV_NOTES.logoAlt}
              width={360}
              height={360}
              sizes="180px"
              className="block aspect-square h-auto w-full rounded-[20px] bg-soft object-cover"
            />
          </div>
          <div className="min-w-0 flex-[1_1_260px]">
            <h3 className="mb-3 font-serif text-[26px] leading-[1.15] font-normal">
              {DEV_NOTES.featureHeading}
            </h3>
            <p className="mb-5.5 text-[15.5px] leading-[1.65] opacity-85">
              {DEV_NOTES.featureBody}
            </p>
            <PillLink
              href={DEV_NOTES.featureUrl}
              tone="tertiary"
              size="sm"
              external
            >
              {DEV_NOTES.featureCtaLabel} →
            </PillLink>
          </div>
        </div>

        {articleLinks.length > 0 ? (
          <div className="relative min-w-0 flex-[1_1_380px]">
            {/* Hangs above the list so the first row lines up with the top
                of the newsletter card beside it. */}
            <h3 className="absolute bottom-full left-0 mb-4.5 text-sm font-semibold text-tertiary">
              {DEV_NOTES.collaborationsLabel}
            </h3>
            <ul className="flex flex-col gap-4.5">
              {articleLinks.map((link) => (
                <li key={link._id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-5 rounded-card-lg bg-bg px-6 py-5 text-ink shadow-neu-out-sm transition-shadow duration-300 hover:text-ink hover:shadow-neu-in"
                  >
                    <div>
                      <p className="mb-1.5 text-xs font-semibold tracking-[0.06em] text-primary uppercase">
                        {link.publicationAndRole}
                      </p>
                      <p className="text-[17px] font-semibold">{link.title}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full text-lg text-primary shadow-neu-in-sm"
                    >
                      →
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
