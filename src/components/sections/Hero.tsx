"use client";

import { useState } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { SaturationFocusImage } from "@/components/ui/SaturationFocusImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EMAIL, HERO } from "@/lib/constants";

export function Hero() {
  const [hintVisible, setHintVisible] = useState(true);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto grid w-full max-w-310 grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-16"
    >
      <div className="min-w-0">
        <SectionLabel variant="inset" className="mb-6.5">
          {HERO.eyebrow}
        </SectionLabel>
        <h1
          id="hero-title"
          className="mb-6.5 font-serif text-[clamp(48px,6.4vw,96px)] leading-[1.02] font-normal text-balance"
        >
          {HERO.headingLine1}
          <br />
          <span className="text-tertiary italic">{HERO.headingLine2}</span>
        </h1>
        <p className="mb-2 max-w-140 text-[19px] leading-[1.6] opacity-85">
          {HERO.body}
        </p>
        <p className="mb-10 max-w-140 text-[19px] leading-[1.6] opacity-85">
          {HERO.status}
        </p>
        <div className="flex flex-wrap gap-5">
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

      {/* Raised frame → inset well → floating photo. */}
      <div className="w-full max-w-130 min-w-0 justify-self-center rounded-[44px] p-4.5 shadow-neu-out">
        <div className="rounded-[30px] p-5 shadow-neu-in">
          {/* A portrait crop of hero-bg.png (its centre 4:5 slice, at full
              resolution). Loading the wide original left only ~460px of
              height to fill a ~1100px-tall retina canvas, so it was blurry. */}
          <SaturationFocusImage
            src="/_next/image?url=%2Fhero-portrait.jpg&w=1200&q=75"
            autoPlay
            onUserHover={() => setHintVisible(false)}
            className="relative aspect-4/5 max-h-[calc(100svh-300px)] w-full animate-neu-float cursor-crosshair overflow-hidden rounded-[20px] will-change-transform"
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
