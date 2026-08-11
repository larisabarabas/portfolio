import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="mb-4.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
      {children}
    </p>
  );
}
