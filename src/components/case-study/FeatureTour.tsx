"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProductFrame } from "@/components/case-study/ProductFrame";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type TourStep = {
  id: string;
  label: string;
  description: string;
  src: string;
  /** CSS `object-position`, from the image's hotspot in the Studio. */
  focus: string;
  alt: string;
};

// Every screenshot is shown in the same 5:4 frame and fills it. What stays in
// view when a screenshot has another shape comes from its crop and hotspot in
// the Studio.
const SCREEN_CLASSES =
  "relative aspect-5/4 overflow-hidden rounded-[12px] lg:rounded-[18px]";

// Must match --breakpoint-nav in globals.css.
const DESKTOP_QUERY = "(width >= 47.5rem)";

// The product, feature by feature. On phones each step is its own screenshot
// above its text, an ordinary stack that needs no script. From the `nav`
// breakpoint the screenshots collapse into one sticky frame beside the text
// and the frame swaps as each step reaches the middle of the screen.
export function FeatureTour({ steps }: { steps: TourStep[] }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The active step is the one under the middle of the screen, worked out on
  // every scroll. (An IntersectionObserver only reports steps entering or
  // leaving, so after scrolling back and forth across a boundary the frame
  // could show a different step from the one in the middle.)
  useEffect(() => {
    if (!isDesktop) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      const index = stepRefs.current.findIndex((element) => {
        if (!element) return false;
        const { top, bottom } = element.getBoundingClientRect();
        return top <= middle && bottom > middle;
      });
      // Above the first step or below the last, keep the one showing.
      if (index >= 0) setActive(index);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isDesktop]);

  return (
    <div className="flex flex-col gap-17 nav:flex-row nav:items-start nav:gap-12">
      <ol className="flex min-w-0 list-none flex-col gap-17 nav:flex-[1_1_360px] nav:gap-0">
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
            className="nav:flex nav:min-h-110 nav:flex-col nav:justify-center nav:py-6"
          >
            <h3 className="mb-3.5 font-serif text-[28px] leading-[1.1] font-normal nav:mb-4 nav:text-[40px]">
              {step.label}
            </h3>
            <div className="mb-4 nav:hidden">
              <ProductFrame>
                <div className={SCREEN_CLASSES}>
                  <Image
                    src={step.src}
                    fill
                    alt={step.alt}
                    sizes="90vw"
                    className="object-cover"
                    style={{ objectPosition: step.focus }}
                  />
                </div>
              </ProductFrame>
            </div>
            <p className="text-[16px] leading-[1.65] nav:text-[17px] nav:leading-[1.7]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="hidden min-w-0 nav:sticky nav:top-28 nav:block nav:flex-[1.3_1_520px]">
        <ProductFrame>
          <div className="grid">
            {steps.map((step, index) => (
              <div
                key={step.id}
                aria-hidden={index !== active}
                className={`[grid-area:1/1] transition-opacity duration-500 ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className={SCREEN_CLASSES}>
                  <Image
                    src={step.src}
                    fill
                    alt={step.alt}
                    sizes="(min-width: 1240px) 700px, 56vw"
                    className="object-cover"
                    style={{ objectPosition: step.focus }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ProductFrame>
      </div>
    </div>
  );
}
