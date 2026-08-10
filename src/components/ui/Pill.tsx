import type { ReactNode } from "react";

type PillTone = "solid" | "outline";
type PillColor = "primary" | "secondary" | "tertiary" | "soft";
type PillSize = "sm" | "md";

type PillProps = {
  tone?: PillTone;
  color?: PillColor;
  size?: PillSize;
  children: ReactNode;
};

const SOLID_CLASSES: Record<PillColor, string> = {
  primary: "bg-primary text-paper",
  secondary: "bg-secondary text-paper",
  tertiary: "bg-tertiary text-paper",
  soft: "bg-soft text-ink",
};

const OUTLINE_CLASSES = "bg-paper border border-line text-ink";

const SIZE_CLASSES: Record<PillSize, string> = {
  sm: "px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em]",
  md: "px-3.5 py-2 text-sm",
};

export function Pill({
  tone = "outline",
  color = "primary",
  size = "md",
  children,
}: PillProps) {
  const weightClass =
    size === "sm" ? "" : tone === "solid" ? "font-medium" : "";

  return (
    <span
      className={`inline-block rounded-pill ${tone === "solid" ? SOLID_CLASSES[color] : OUTLINE_CLASSES} ${SIZE_CLASSES[size]} ${weightClass}`}
    >
      {children}
    </span>
  );
}
