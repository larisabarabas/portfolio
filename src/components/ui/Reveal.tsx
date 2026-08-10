"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, style } = useScrollReveal({ delay });
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
