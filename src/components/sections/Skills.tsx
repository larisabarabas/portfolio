import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SKILLS } from "@/lib/constants";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-310 px-[8vw] py-25">
      <Reveal>
        <SectionLabel>{SKILLS.eyebrow}</SectionLabel>
        <h2 className="mb-12.5 font-serif text-[clamp(32px,4vw,52px)] font-normal">
          {SKILLS.heading}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-9">
          {SKILLS.groups.map((group) => (
            <div key={group.label}>
              <p className="mb-3.5 text-sm font-semibold text-tertiary">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2.25">
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
