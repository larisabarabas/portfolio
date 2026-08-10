import type { ReactNode } from "react";

type DotColor = "primary" | "secondary" | "tertiary" | "soft";

type SectionEyebrowProps = {
  children: ReactNode;
  dotColor?: DotColor;
};

const DOT_CLASSES: Record<DotColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  soft: "bg-soft",
};

export function SectionEyebrow({ children, dotColor }: SectionEyebrowProps) {
  return (
    <p className="mb-[18px] flex items-center gap-[9px] text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
      {dotColor && (
        <span
          className={`inline-block h-2 w-2 rounded-full ${DOT_CLASSES[dotColor]}`}
        />
      )}
      {children}
    </p>
  );
}
