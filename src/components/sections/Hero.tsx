"use client";

import { Button } from "@/components/ui/Button";
import { SaturationFocusImage } from "@/components/ui/SaturationFocusImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <SaturationFocusImage
        src="/_next/image?url=%2Fhero-bg.png&w=2048&q=100"
        className="absolute inset-0 z-0 h-full w-full animate-bg-reveal"
      >
        <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent from-40% to-bg to-96%" />

        <div className="relative z-3 flex h-full flex-col justify-center px-[8vw]">
          <div className="max-w-225 animate-hero-in">
            <SectionLabel>{HERO.eyebrow}</SectionLabel>
            <h1 className="mb-6.5 font-serif text-[clamp(48px,7.5vw,104px)] leading-[1.02] font-normal">
              {HERO.headingLine1}
              <br />
              <span className="text-tertiary italic">{HERO.headingLine2}</span>
            </h1>
            <p className="mb-2 max-w-150 text-[19px] leading-[1.6] text-ink opacity-85">
              {HERO.body}
            </p>
            <p className="mb-10 max-w-150 text-[19px] leading-[1.6] text-ink opacity-85">
              {HERO.status}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="#work">{HERO.primaryCtaLabel}</Button>
              <Button href={HERO.resumeHref} variant="outline">
                {HERO.resumeCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      </SaturationFocusImage>
    </section>
  );
}
