"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { HERO, HERO_ANIMATION } from "@/lib/constants";

function petalAnimation(
  bloomDelay: number,
  morphDur: number,
  morphDelay: number,
) {
  const bloom = `petalBloom 0.9s ease ${bloomDelay}s both`;
  if (HERO_ANIMATION !== "float") return bloom;
  return `${bloom}, petalMorph1 ${morphDur}s ease-in-out ${morphDelay}s infinite`;
}

export function Hero() {
  const { ref, mx, my } = useHeroParallax();

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[8vw]"
    >
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={100}
        className="pointer-events-none z-0 animate-bg-reveal object-cover opacity-90"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-b from-transparent from-40% to-bg to-96%" />

      <div
        className="pointer-events-none absolute top-[-90px] right-[6%] z-[2] transition-transform duration-[350ms] ease-out"
        style={{ transform: `translate(${mx * 26}px, ${my * 26}px)` }}
      >
        <div
          className="h-[380px] w-[420px] bg-[radial-gradient(circle_at_35%_30%,var(--color-primary),transparent_72%)] blur-[10px]"
          style={{ opacity: 0.375, animation: petalAnimation(0.05, 14.4, 1) }}
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-[-80px] left-[-6%] z-[2] transition-transform duration-[350ms] ease-out"
        style={{ transform: `translate(${mx * 34}px, ${my * -20}px)` }}
      >
        <div
          className="h-[260px] w-[280px] bg-[radial-gradient(circle_at_45%_35%,var(--color-tertiary),transparent_72%)] blur-[14px]"
          style={{ opacity: 0.225, animation: petalAnimation(0.35, 17.6, 0.8) }}
        />
      </div>

      <div className="relative z-[3] max-w-[900px] animate-hero-in">
        <SectionEyebrow>{HERO.eyebrow}</SectionEyebrow>
        <h1 className="mb-[26px] font-serif text-[clamp(48px,7.5vw,104px)] leading-[1.02] font-normal">
          {HERO.headingLine1}
          <br />
          <span className="text-tertiary italic">{HERO.headingLine2}</span>
        </h1>
        <p className="mb-10 max-w-[600px] text-[19px] leading-[1.6] text-ink opacity-85">
          {HERO.body}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="#work">{HERO.primaryCtaLabel}</Button>
          <Button href={HERO.resumeHref} variant="outline">
            {HERO.resumeCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
