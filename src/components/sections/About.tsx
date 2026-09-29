import Image from "next/image";
import { Chip } from "@/components/ui/Chip";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT } from "@/lib/constants";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto flex w-full max-w-310 flex-wrap items-center gap-17.5"
    >
      <div className="max-w-full min-w-0 flex-[0_1_300px] rounded-[36px] p-3.5 shadow-neu-out">
        <Image
          src="/about-img.jpeg"
          alt={ABOUT.portraitAlt}
          width={560}
          height={680}
          sizes="(min-width: 760px) 272px, 100vw"
          className="block aspect-280/340 h-auto w-full rounded-card-lg bg-soft object-cover"
        />
      </div>
      <div className="min-w-0 flex-[1_1_380px]">
        <SectionLabel className="mb-4.5">{ABOUT.eyebrow}</SectionLabel>
        <h2
          id="about-title"
          className="mb-6.5 font-serif text-[clamp(32px,4vw,52px)] font-normal"
        >
          {ABOUT.heading}
        </h2>
        <p className="mb-5 max-w-160 text-[17px] leading-[1.75] opacity-88">
          {ABOUT.bodyParagraph1}
        </p>
        <p className="mb-7.5 max-w-160 text-[17px] leading-[1.75] opacity-88">
          {ABOUT.bodyParagraph2}
        </p>
        <ul className="flex flex-wrap gap-3.5">
          {ABOUT.statChips.map((chip) => (
            <li key={chip}>
              <Chip variant="raised" size="lg">
                {chip}
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
