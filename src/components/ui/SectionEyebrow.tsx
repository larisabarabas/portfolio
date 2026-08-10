import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="mb-[18px] text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
      {children}
    </p>
  );
}
