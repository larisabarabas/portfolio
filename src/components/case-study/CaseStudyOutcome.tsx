import { Button } from "@/components/ui/Button";
import { CASE_STUDY } from "@/lib/constants";

type CaseStudyOutcomeProps = {
  heading: string;
  body?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
};

export function CaseStudyOutcome({
  heading,
  body,
  ctaLabel,
  ctaUrl,
}: CaseStudyOutcomeProps) {
  return (
    <section className="px-[8vw] pb-30">
      <div className="mx-auto max-w-230">
        <h2 className="mb-4 font-serif text-[32px] font-normal">{heading}</h2>
        {body && (
          <p className="mb-8 text-[17px] leading-[1.75] opacity-85">{body}</p>
        )}
        <div className="flex flex-wrap gap-4">
          {ctaLabel && ctaUrl && (
            <Button href={ctaUrl} external>
              {ctaLabel}
            </Button>
          )}
          <Button href="/" variant="outline">
            {CASE_STUDY.backToPortfolioCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
