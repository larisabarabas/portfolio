import { ServiceAccordionItem } from "@/components/sections/ServiceAccordionItem";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { SERVICES } from "@/lib/constants";

type Service = (typeof SERVICES.items)[number];

const SUBHEADING_CLASSES =
  "mb-2 text-xs font-semibold uppercase tracking-widest text-tertiary";
const BODY_CLASSES = "text-base leading-[1.65] text-pretty opacity-88";

function ServiceCard({ service }: { service: Service }) {
  const mailto = `mailto:${SERVICES.email}?subject=${encodeURIComponent(service.subject)}`;

  return (
    <ServiceAccordionItem
      id={service.id}
      number={service.number}
      title={service.title}
      teaser={service.problem}
    >
      <div className="flex flex-col gap-6.5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-9 gap-y-6">
          <div>
            <h4 className={SUBHEADING_CLASSES}>{SERVICES.problemHeading}</h4>
            <p className={BODY_CLASSES}>{service.problem}</p>
          </div>
          <div>
            <h4 className={SUBHEADING_CLASSES}>{SERVICES.whatIDoHeading}</h4>
            <p className={BODY_CLASSES}>{service.whatIDo}</p>
          </div>
        </div>

        <div className="border-t border-line pt-5.5">
          <h4 className={SUBHEADING_CLASSES}>{SERVICES.proofHeading}</h4>
          {service.proofAsList ? (
            <ul
              className={`flex list-disc flex-col gap-1.5 pl-5 ${BODY_CLASSES}`}
            >
              {service.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            service.proof.map((item) => (
              <p key={item} className={BODY_CLASSES}>
                {item}
              </p>
            ))
          )}
        </div>

        <div className="flex flex-wrap items-start gap-x-4.5 gap-y-3 rounded-2xl border border-primary/22 bg-soft/42 px-5.5 py-5">
          <Pill tone="solid" color="tertiary" size="sm">
            {SERVICES.startLabel}
          </Pill>
          <div className="min-w-0 flex-[1_1_260px]">
            <p className="mb-2.5 text-base leading-[1.6] font-medium text-pretty">
              {service.start}
            </p>
            <TextLink href={mailto}>{SERVICES.ctaLabel}</TextLink>
          </div>
        </div>
      </div>
    </ServiceAccordionItem>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto box-content max-w-310 px-[8vw] pt-35 pb-27.5"
    >
      <Reveal className="mb-16 max-w-190">
        <SectionLabel>{SERVICES.eyebrow}</SectionLabel>
        <h2
          id="services-title"
          className="mb-6 font-serif text-[clamp(32px,4vw,52px)] font-normal"
        >
          {SERVICES.heading}
        </h2>
        <p className="mb-7 text-[19px] leading-[1.65] text-pretty opacity-88">
          {SERVICES.lead}
        </p>
        <p className="text-sm leading-[1.7] opacity-72">
          <span className="mr-2.5 text-xs font-semibold uppercase tracking-widest">
            {SERVICES.workedAcrossLabel}
          </span>
          {SERVICES.workedAcross}
        </p>
      </Reveal>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-7">
        {SERVICES.items.map((service) => (
          <Reveal key={service.id}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
