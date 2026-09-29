import type { ReactNode } from "react";

// Neumorphic pill for labels and tags on the home page. The case-study pages
// still use the flat `Pill` until they're redesigned.

type ChipVariant = "raised" | "inset" | "accent";
type ChipColor = "primary" | "secondary" | "tertiary" | "soft";
type ChipSize = "tag" | "md" | "lg" | "status";

type ChipProps = {
  variant?: ChipVariant;
  /** Fill colour, only used by the `accent` variant. */
  color?: ChipColor;
  size?: ChipSize;
  children: ReactNode;
};

const ACCENT_CLASSES: Record<ChipColor, string> = {
  primary: "bg-primary text-on-accent shadow-accent-primary",
  secondary: "bg-secondary-strong text-on-accent shadow-accent-secondary",
  tertiary: "bg-tertiary text-on-accent shadow-accent-tertiary",
  // Soft pink stays light in both themes, so its text stays dark too.
  soft: "bg-soft text-ink dark:text-bg shadow-neu-out-sm",
};

const VARIANT_CLASSES: Record<Exclude<ChipVariant, "accent">, string> = {
  raised: "bg-bg shadow-neu-out-sm",
  inset: "shadow-neu-in-sm",
};

const SIZE_CLASSES: Record<ChipSize, string> = {
  tag: "px-2.75 py-1.25 text-xs",
  md: "px-3.25 py-1.75 text-sm",
  lg: "px-3.75 py-2 text-[13px]",
  status:
    "px-3.25 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em]",
};

export function Chip({
  variant = "inset",
  color = "primary",
  size = "md",
  children,
}: ChipProps) {
  const variantClass =
    variant === "accent"
      ? `${ACCENT_CLASSES[color]} ${size === "status" ? "" : "font-medium"}`
      : VARIANT_CLASSES[variant];

  return (
    <span
      className={`inline-block rounded-pill ${variantClass} ${SIZE_CLASSES[size]}`}
    >
      {children}
    </span>
  );
}
