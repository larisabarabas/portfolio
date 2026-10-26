import type { ProjectBySlugQueryResult } from "@/lib/sanity/sanity.types";

type Project = NonNullable<ProjectBySlugQueryResult>;

type CaseStudyOutcomeProps = {
  id: string;
  heading: string;
  intro?: Project["outcomeIntro"];
  stats?: Project["outcomeStats"];
  notes?: Project["outcomeNotes"];
  /** The older single-text outcome, used only when there are no stats or notes. */
  body?: Project["outcomeBody"];
};

function splitParagraphs(text: string | null | undefined) {
  return (text ?? "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const TEXT_CLASSES = "text-[16px] leading-[1.75] opacity-90 lg:text-[16.5px]";

// Numbers first (they carry the scan), then the notes that explain them. Two
// notes sit side by side, the first wider because it is usually the longer,
// so both columns end together; one note flows through two columns instead.
export function CaseStudyOutcome({
  id,
  heading,
  intro,
  stats,
  notes,
  body,
}: CaseStudyOutcomeProps) {
  const hasStats = (stats?.length ?? 0) > 0;
  const hasNotes = (notes?.length ?? 0) > 0;
  const legacyParagraphs = hasStats || hasNotes ? [] : splitParagraphs(body);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 px-[8vw] pt-22"
    >
      <div className="mx-auto max-w-310">
        <h2
          id={`${id}-title`}
          className="mb-6 font-serif text-[clamp(30px,3.4vw,40px)] font-normal"
        >
          {heading}
        </h2>

        {intro && (
          <p className="mb-8 text-[17px] leading-[1.7] font-medium text-tertiary">
            {intro}
          </p>
        )}

        {hasStats && stats && (
          <ul className="mb-12 grid list-none grid-cols-2 gap-3.5 nav:flex nav:flex-wrap nav:gap-5">
            {stats.map((stat) => (
              <li
                key={stat._key}
                className="rounded-[20px] bg-bg p-4.5 shadow-neu-out nav:flex-[1_1_220px] nav:rounded-3xl nav:p-6 [&:last-child:nth-child(odd)]:col-span-2"
              >
                <p className="mb-1.5 font-serif text-[clamp(42px,4vw,56px)] leading-none text-tertiary">
                  {stat.value}
                </p>
                <p className="text-[13.5px] leading-[1.45] nav:text-[14.5px] nav:leading-[1.5]">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        )}

        {hasNotes && notes && (
          <div
            className={
              notes.length > 1
                ? "flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14"
                : "lg:columns-2 lg:gap-14"
            }
          >
            {notes.map((note, index) => (
              <div
                key={note._key}
                className={`min-w-0 ${
                  notes.length > 1
                    ? index === 0
                      ? "lg:flex-[1.7_1_420px]"
                      : "lg:flex-[1_1_300px]"
                    : ""
                }`}
              >
                <h3 className="mb-4 font-serif text-[25px] leading-[1.15] font-normal lg:text-[30px]">
                  {note.heading}
                </h3>
                <div className="flex flex-col gap-4">
                  {splitParagraphs(note.body).map((paragraph) => (
                    <p key={paragraph} className={TEXT_CLASSES}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {legacyParagraphs.length > 0 && (
          <div className="flex flex-col gap-4.5 rounded-[32px] bg-bg p-[clamp(24px,3.4vw,36px)] shadow-neu-out">
            {/* The first paragraph is the headline result. */}
            {legacyParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-[17px] leading-[1.75] ${
                  index === 0 ? "font-medium text-tertiary" : "opacity-85"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
