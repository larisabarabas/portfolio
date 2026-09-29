"use client";

import { useState } from "react";
import { useIsActiveSlide } from "@/components/layout/SlideDeck";
import { PillLink } from "@/components/ui/PillLink";
import { SaturationFocusImage } from "@/components/ui/SaturationFocusImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EMAIL, HERO } from "@/lib/constants";

// The same 4:5 portrait crop at three sizes, via the Next image optimizer
// (widths from its default size list). A phone banner loads the 640px one;
// the desktop frame the 1200px one.
const HERO_IMAGE_WIDTHS = [640, 828, 1200];
const heroImageUrl = (width: number) =>
  `/_next/image?url=%2Fhero-portrait.jpg&w=${width}&q=75`;
const HERO_IMAGE_SOURCES = HERO_IMAGE_WIDTHS.map((width) => ({
  src: heroImageUrl(width),
  width,
  height: Math.round((width * 5) / 4),
}));

export function Hero() {
  const isActive = useIsActiveSlide("hero");
  const [hintVisible, setHintVisible] = useState(true);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-310 grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-16"
    >
      <div className="min-w-0">
        <SectionLabel variant="inset" className="mb-4 lg:mb-6.5">
          {HERO.eyebrow}
        </SectionLabel>
        <h1
          id="hero-title"
          className="mb-5 font-serif text-[clamp(38px,6.4vw,96px)] leading-[1.02] font-normal text-balance lg:mb-6.5"
        >
          {HERO.headingLine1}
          <br />
          <span className="text-tertiary italic">{HERO.headingLine2}</span>
        </h1>
        <p className="mb-2 max-w-140 text-[17px] leading-[1.6] opacity-85 lg:text-[19px]">
          {HERO.body}
        </p>
        <p className="mb-7 max-w-140 text-[17px] leading-[1.6] opacity-85 lg:mb-10 lg:text-[19px]">
          {HERO.status}
        </p>
        <div className="flex flex-wrap gap-3 lg:gap-5">
          <PillLink href="#services" variant="cta" size="lg">
            {HERO.primaryCtaLabel}
          </PillLink>
          <PillLink
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(HERO.secondaryCtaSubject)}`}
            size="lg"
          >
            {HERO.secondaryCtaLabel}
          </PillLink>
        </div>
      </div>

      {/* Raised frame → inset well → floating photo. Beside the text on
          wide screens; once the hero stacks it becomes a short banner above
          the text, so the photo is in the first screen without pushing the
          headline out of it. On screens too short to fit the banner and
          both buttons above the pager (under ~820px of visible height, which
          includes most phones once the browser bars are showing), it's left
          out so the text and buttons come first. */}
      <div className="order-first w-full min-w-0 max-lg:[@media(height<820px)]:hidden justify-self-center rounded-[28px] p-2 shadow-neu-out lg:order-none lg:max-w-130 lg:rounded-[44px] lg:p-4.5">
        <div className="rounded-[20px] p-2 shadow-neu-in lg:rounded-[30px] lg:p-5">
          {/* A portrait crop of hero-bg.png (its centre 4:5 slice, at full
              resolution). Loading the wide original left only ~460px of
              height to fill a ~1100px-tall retina canvas, so it was blurry. */}
          <SaturationFocusImage
            src={heroImageUrl(1200)}
            sources={HERO_IMAGE_SOURCES}
            autoPlay
            paused={!isActive}
            onUserHover={() => setHintVisible(false)}
            className="relative aspect-5/2 w-full animate-neu-float cursor-crosshair overflow-hidden rounded-[14px] will-change-transform lg:aspect-4/5 lg:max-h-[calc(100svh-300px)] lg:rounded-[20px]"
          >
            {/* Only where the effect runs: touch screens and reduced motion
                get the photo in full colour instead. */}
            <p
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-4.5 left-1/2 z-5 hidden -translate-x-1/2 items-center gap-2.5 rounded-pill bg-bg px-4 py-2.25 text-[12.5px] font-semibold tracking-[0.06em] whitespace-nowrap text-tertiary uppercase shadow-neu-out-sm transition-[opacity,translate] duration-500 [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:flex ${
                hintVisible ? "" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="size-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(168,68,122,.18)]" />
              {HERO.imageHint}
            </p>
          </SaturationFocusImage>
        </div>
      </div>
    </section>
  );
}
