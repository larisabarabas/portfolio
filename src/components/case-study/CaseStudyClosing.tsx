import { PillLink } from "@/components/ui/PillLink";

type CaseStudyClosingProps = {
  note?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

// The last thing on the page: one line and the one action, across the full
// column so neither floats alone.
export function CaseStudyClosing({
  note,
  ctaLabel,
  ctaUrl,
}: CaseStudyClosingProps) {
  const hasCta = Boolean(ctaLabel && ctaUrl);
  if (!note && !hasCta) return null;

  return (
    <section className="px-[8vw] pt-22">
      <div
        className={`mx-auto flex max-w-310 flex-wrap items-center gap-5 rounded-[28px] px-6 py-6 shadow-neu-in lg:rounded-[32px] lg:px-10 lg:py-8 ${
          note && hasCta ? "justify-between" : "justify-center"
        }`}
      >
        {note && (
          <p className="text-[17px] leading-[1.6] font-medium lg:text-[18px]">
            {note}
          </p>
        )}
        {hasCta && ctaLabel && ctaUrl && (
          <PillLink href={ctaUrl} variant="cta" external>
            {ctaLabel}
          </PillLink>
        )}
      </div>
    </section>
  );
}
