"use client";

import type { CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HOW_I_WORK } from "@/lib/constants";

const ICON_POP_DELAYS = [0.1, 0.25, 0.4, 0.55];

export function HowIWork() {
  const { ref, style, visible } = useScrollReveal();

  return (
    <section
      id="howiwork"
      ref={ref}
      style={style}
      className="mx-auto max-w-[1240px] px-[8vw] py-[100px]"
    >
      <p className="mb-[18px] flex items-center gap-[9px] text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
        {HOW_I_WORK.eyebrow}
      </p>
      <h2 className="mb-[60px] max-w-[760px] font-serif text-[clamp(32px,4vw,52px)] font-normal">
        {HOW_I_WORK.heading}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {HOW_I_WORK.cards.map((card, index) => {
          const cardStyle: CSSProperties = {
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.96)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.6s",
            transitionTimingFunction: "ease",
            transitionDelay: `${index * 0.12}s`,
          };

          return (
            <div
              key={card.heading}
              style={cardStyle}
              className="rounded-card border border-line bg-paper p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-24px_rgba(20,24,43,0.28)]"
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-xl text-white ${card.iconBgClass}`}
                style={{
                  animation: `iconPop 0.6s ease ${ICON_POP_DELAYS[index]}s both`,
                }}
              >
                ◆
              </div>
              <h3 className="mb-2.5 text-[17px] font-bold">{card.heading}</h3>
              <p className="text-[14.5px] leading-[1.65] opacity-85">
                {card.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
