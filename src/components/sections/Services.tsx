"use client";

import { ArrowRight } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EMAIL, SERVICES } from "@/lib/constants";

type Service = (typeof SERVICES.items)[number];

// Must match --breakpoint-nav in globals.css.
const MOBILE_QUERY = "(width < 47.5rem)";

const SUBHEADING_CLASSES =
  "mb-2 text-xs font-semibold uppercase tracking-widest text-tertiary";
const BODY_CLASSES = "text-[15.5px] leading-[1.6] text-pretty opacity-88";

function ServiceDetails({ service }: { service: Service }) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(service.subject)}`;

  return (
    <>
      <h3 className="font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] font-normal">
        {service.title}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-9 gap-y-5">
        <div>
          <h4 className={SUBHEADING_CLASSES}>{SERVICES.problemHeading}</h4>
          <p className={BODY_CLASSES}>{service.problem}</p>
        </div>
        <div>
          <h4 className={SUBHEADING_CLASSES}>{SERVICES.whatIDoHeading}</h4>
          <p className={BODY_CLASSES}>{service.whatIDo}</p>
        </div>
      </div>
      <div>
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
          <div className="flex flex-col gap-4">
            {service.proof.map((item) => (
              <p key={item} className={BODY_CLASSES}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-start gap-x-5 gap-y-3 rounded-card-lg px-5.5 py-5 shadow-neu-in">
        <span className="flex-none rounded-pill bg-bg px-3.75 py-1.75 text-xs font-semibold tracking-[0.08em] text-tertiary uppercase shadow-neu-out-sm">
          {SERVICES.startLabel}
        </span>
        <div className="min-w-0 flex-[1_1_260px]">
          <p className="mb-2.5 text-[15.5px] leading-[1.6] font-medium text-pretty">
            {service.start}
          </p>
          <TextLink href={mailto} icon={ArrowRight}>
            {SERVICES.ctaLabel}
          </TextLink>
        </div>
      </div>
    </>
  );
}

export function Services() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // Index of the open service; -1 = all collapsed (only possible on mobile,
  // desktop falls back to the first tab).
  const [open, setOpen] = useState(0);
  const active = isMobile ? open : Math.max(open, 0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollPending = useRef(false);

  // Old deep links like /#s2 still open that service.
  useEffect(() => {
    const linked = SERVICES.items.findIndex(
      (service) => `#${service.id}` === window.location.hash,
    );
    if (linked >= 0) setOpen(linked);
  }, []);

  // On mobile, bring a just-opened service's heading to the top of the slide.
  useEffect(() => {
    if (!scrollPending.current || open < 0) return;
    scrollPending.current = false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    tabRefs.current[open]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [open]);

  const select = (i: number) => {
    if (!isMobile) {
      setOpen(i);
      return;
    }
    const opening = i !== open;
    scrollPending.current = opening;
    setOpen(opening ? i : -1);
  };

  // Tab keyboard pattern (desktop): arrows move and select, Home/End jump.
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (isMobile) return;
    const count = SERVICES.items.length;
    const keyTargets: Record<string, number> = {
      ArrowDown: (i + 1) % count,
      ArrowRight: (i + 1) % count,
      ArrowUp: (i - 1 + count) % count,
      ArrowLeft: (i - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const target = keyTargets[e.key];
    if (target === undefined) return;
    e.preventDefault();
    setOpen(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto w-full max-w-310"
    >
      <div className="mb-6">
        <SectionLabel>{SERVICES.eyebrow}</SectionLabel>
        <h2
          id="services-title"
          className="mb-4.5 font-serif text-[clamp(32px,4vw,52px)] font-normal"
        >
          {SERVICES.heading}
        </h2>
        <p className="text-[17px] leading-[1.65] text-pretty opacity-88">
          {SERVICES.lead}
        </p>
      </div>
      <p className="mb-8 rounded-[20px] px-5 py-3 text-[13.5px] leading-[1.6] opacity-75 shadow-neu-in-sm">
        <span className="mr-2.5 text-xs font-semibold tracking-widest uppercase">
          {SERVICES.workedAcrossLabel}
        </span>
        {SERVICES.workedAcross}
      </p>

      {/* Desktop: tab list beside one panel. Mobile: the two wrappers turn
          into `display: contents` and `order` interleaves each tab with its
          panel, making an accordion. */}
      <div className="flex flex-col gap-4 nav:flex-row nav:flex-wrap nav:items-start nav:gap-8">
        <div
          {...(isMobile
            ? {}
            : {
                role: "tablist",
                "aria-label": SERVICES.eyebrow,
                "aria-orientation": "vertical" as const,
              })}
          className="contents nav:flex nav:max-w-85 nav:flex-[1_1_260px] nav:flex-col nav:gap-4"
        >
          {SERVICES.items.map((service, i) => {
            const isActive = i === active;
            return (
              <button
                key={service.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                id={`${service.id}-tab`}
                {...(isMobile
                  ? { "aria-expanded": isActive }
                  : {
                      role: "tab",
                      "aria-selected": isActive,
                      tabIndex: isActive ? 0 : -1,
                    })}
                aria-controls={service.id}
                onClick={() => select(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                style={{ order: i * 2 + 1 }}
                className={`flex cursor-pointer scroll-mt-20 items-center gap-4 rounded-[22px] bg-bg px-4.5 py-3.5 text-left text-base leading-[1.3] font-semibold transition-[box-shadow,color] duration-350 ${
                  isActive
                    ? "text-tertiary shadow-neu-in"
                    : "text-ink shadow-neu-out-sm"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-10 flex-none items-center justify-center rounded-full text-[13px] tracking-[0.04em] transition-[background-color,color,box-shadow] duration-300 ${
                    isActive
                      ? "bg-primary text-on-accent shadow-accent-primary"
                      : "text-primary shadow-neu-in-sm"
                  }`}
                >
                  {service.number}
                </span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        <div className="contents nav:grid nav:min-w-0 nav:flex-[3_1_520px]">
          {SERVICES.items.map((service, i) => {
            const isActive = i === active;
            return (
              <article
                key={service.id}
                id={service.id}
                role={isMobile ? "region" : "tabpanel"}
                aria-labelledby={`${service.id}-tab`}
                inert={!isActive}
                style={{
                  order: i * 2 + 2,
                  transition: `opacity .5s ease, translate .6s ease, visibility 0s linear ${isActive ? "0s" : ".5s"}`,
                }}
                className={`mb-2 min-w-0 flex-col gap-5 rounded-[28px] bg-bg p-5.5 shadow-neu-out nav:mb-0 nav:flex nav:gap-5.5 nav:rounded-[36px] nav:p-[clamp(24px,3.4vw,40px)] nav:[grid-area:1/1] ${
                  isActive
                    ? "flex nav:visible nav:opacity-100"
                    : "hidden nav:pointer-events-none nav:invisible nav:translate-y-4 nav:opacity-0"
                }`}
              >
                <ServiceDetails service={service} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
