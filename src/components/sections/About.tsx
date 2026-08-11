import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-310 px-[8vw] py-35">
      <Reveal className="flex flex-wrap items-start gap-17.5">
        <div className="flex-[0_1_280px]">
          <ImagePlaceholder
            src="/about-img.jpeg"
            alt={ABOUT.portraitAlt}
            placeholder={ABOUT.portraitPlaceholder}
            aspectRatio="280/340"
            radius={20}
            sizes="(min-width: 768px) 280px, 100vw"
          />
        </div>
        <div className="min-w-70 flex-[1_1_380px]">
          <SectionLabel>{ABOUT.eyebrow}</SectionLabel>
          <h2 className="mb-6.5 font-serif text-[clamp(32px,4vw,52px)] font-normal">
            {ABOUT.heading}
          </h2>
          <p className="mb-5 max-w-160 text-[17px] leading-[1.75] opacity-88">
            {ABOUT.bodyParagraph1}
          </p>
          <p className="mb-8.5 max-w-160 text-[17px] leading-[1.75] opacity-88">
            {ABOUT.bodyParagraph2Pre}
            <a
              href={ABOUT.devNotesUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ABOUT.devNotesLinkLabel}
            </a>
            {ABOUT.bodyParagraph2Post}
          </p>
          <div className="flex flex-wrap gap-3">
            {ABOUT.statChips.map((chip) => (
              <Pill key={chip} tone="outline" size="md">
                {chip}
              </Pill>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
