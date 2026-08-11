import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EXPERIMENTS } from "@/lib/constants";

export function Experiments() {
  return (
    <section id="experiments" className="mx-auto max-w-310 px-[8vw] py-25">
      <Reveal>
        <SectionLabel>{EXPERIMENTS.eyebrow}</SectionLabel>
        <h2 className="mb-12.5 max-w-175 font-serif text-[clamp(32px,4vw,52px)] font-normal">
          {EXPERIMENTS.heading}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-center gap-14 rounded-card-lg border border-line bg-paper p-10">
          <ImagePlaceholder
            alt={EXPERIMENTS.imageAlt}
            placeholder={EXPERIMENTS.imagePlaceholder}
            aspectRatio="1/1"
            radius={16}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div>
            <Pill tone="solid" color="soft" size="sm">
              {EXPERIMENTS.statusLabel}
            </Pill>
            <h3 className="mt-4 mb-3.5 font-serif text-[30px] font-normal">
              {EXPERIMENTS.cardHeading}
            </h3>
            <p className="text-base leading-[1.7] opacity-85">
              {EXPERIMENTS.body}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
