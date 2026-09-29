import { PillLink } from "@/components/ui/PillLink";

type CaseStudyOutcomeProps = {
  id: string;
  heading: string;
  body?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

export function CaseStudyOutcome({
  id,
  heading,
  body,
  ctaLabel,
  ctaUrl,
}: CaseStudyOutcomeProps) {
  const paragraphs = (body ?? "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 px-[8vw] pt-22 pb-35"
    >
      <div className="mx-auto max-w-310">
        <h2
          id={`${id}-title`}
          className="mb-6 font-serif text-[clamp(30px,3.4vw,40px)] font-normal"
        >
          {heading}
        </h2>
        {paragraphs.length > 0 && (
          <div className="flex flex-col gap-4.5 rounded-[32px] bg-bg p-[clamp(24px,3.4vw,36px)] shadow-neu-out">
            {/* The first paragraph is the headline result. */}
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`max-w-190 text-[17px] leading-[1.75] ${
                  index === 0 ? "font-medium text-tertiary" : "opacity-85"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {ctaLabel && ctaUrl && (
          <div className="mt-10 flex flex-wrap gap-5">
            <PillLink href={ctaUrl} variant="cta" external>
              {ctaLabel}
            </PillLink>
          </div>
        )}
      </div>
    </section>
  );
}
