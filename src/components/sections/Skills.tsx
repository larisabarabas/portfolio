import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SKILLS } from "@/lib/constants";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1240px] px-[8vw] py-[100px]">
      <Reveal>
        <SectionEyebrow>{SKILLS.eyebrow}</SectionEyebrow>
        <h2 className="mb-[50px] font-serif text-[clamp(32px,4vw,52px)] font-normal">
          {SKILLS.heading}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-9">
          {SKILLS.groups.map((group) => (
            <div key={group.label}>
              <p className="mb-3.5 text-sm font-semibold text-tertiary">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-[9px]">
                {group.items.map((item) => (
                  <Pill key={item} tone={group.tone} color={group.color}>
                    {item}
                  </Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
