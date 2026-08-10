"use client";

import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHeroParallax } from "@/hooks/useHeroParallax";

const SECTION_IDS = ["one", "two", "three"];

export default function Home() {
  const activeId = useActiveSection(SECTION_IDS);
  const { ref, mx, my } = useHeroParallax();

  return (
    <div className="flex flex-col gap-2">
      <div className="fixed top-4 right-4 z-50 rounded-lg bg-paper p-3 text-xs shadow">
        active: {activeId} · mx: {mx.toFixed(2)} my: {my.toFixed(2)}
      </div>

      <section
        ref={ref}
        className="flex h-screen flex-col items-center justify-center gap-6 bg-bg"
      >
        <SectionEyebrow dotColor="secondary">Smoke test</SectionEyebrow>
        <div className="flex flex-wrap items-center gap-3">
          <Pill tone="solid" color="primary" size="sm">
            Side project · Live
          </Pill>
          <Pill tone="solid" color="tertiary" size="sm">
            Product · MVP
          </Pill>
          <Pill tone="solid" color="soft" size="sm">
            Concept · Design
          </Pill>
          <Pill tone="outline" size="md">
            Next.js
          </Pill>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#two">See my work ↓</Button>
          <Button href="#" variant="outline">
            Download résumé
          </Button>
          <Button href="https://example.com" external>
            External
          </Button>
        </div>
        <div className="flex gap-6">
          <ImagePlaceholder
            alt="Portrait"
            placeholder="Drop a portrait photo"
            aspectRatio="280/340"
            className="w-[200px]"
          />
        </div>
        <p className="text-xs opacity-60">
          Move your pointer around this section to test parallax values above.
        </p>
      </section>

      <section
        id="one"
        className="flex h-screen items-center justify-center bg-bg"
      >
        <Reveal>
          <h2 className="text-4xl">Section one — scroll to reveal</h2>
        </Reveal>
      </section>

      <section
        id="two"
        className="flex h-screen items-center justify-center bg-bg"
      >
        <Reveal delay={0.12}>
          <h2 className="text-4xl">Section two — delayed reveal</h2>
        </Reveal>
      </section>

      <section
        id="three"
        className="flex h-screen items-center justify-center bg-bg"
      >
        <h2 className="text-4xl">Section three</h2>
      </section>
    </div>
  );
}
