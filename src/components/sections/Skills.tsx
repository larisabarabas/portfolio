import { Chip } from "@/components/ui/Chip";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SKILLS } from "@/lib/constants";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto w-full max-w-310"
    >
      <SectionLabel>{SKILLS.eyebrow}</SectionLabel>
      <h2
        id="skills-title"
        className="mb-9 font-serif text-[clamp(32px,4vw,52px)] font-normal"
      >
        {SKILLS.heading}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6.5">
        {SKILLS.groups.map((group) => (
          <div
            key={group.label}
            className="rounded-[28px] bg-bg px-6 py-5.5 shadow-neu-out"
          >
            <h3 className="mb-4 text-sm font-semibold text-tertiary">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Chip
                    variant={group.tone === "solid" ? "accent" : "inset"}
                    color={group.color}
                  >
                    {item}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
