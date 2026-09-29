import type { ReactNode } from "react";

// Neumorphic pill-shaped link for the home page. `cta` is the one coloured
// action per screen; `raised` sits flush with the page and presses in on hover.
// The case-study pages still use the flat `Button` until they're redesigned.

type PillLinkVariant = "cta" | "raised";
type PillLinkSize = "sm" | "md" | "lg";

type PillLinkProps = {
  href: string;
  variant?: PillLinkVariant;
  /** Text colour of the `raised` variant. */
  tone?: "ink" | "tertiary";
  size?: PillLinkSize;
  external?: boolean;
  children: ReactNode;
};

const SIZE_CLASSES: Record<PillLinkSize, string> = {
  sm: "px-5.5 py-3",
  md: "px-7 py-3.75",
  lg: "px-7.5 py-4",
};

const TONE_CLASSES = {
  ink: "text-ink",
  tertiary: "text-tertiary",
};

export function PillLink({
  href,
  variant = "raised",
  tone = "ink",
  size = "md",
  external = false,
  children,
}: PillLinkProps) {
  const variantClass =
    variant === "cta"
      ? "bg-cta text-cta-fg shadow-cta transition-colors hover:bg-cta-hover hover:text-cta-hover-fg active:shadow-neu-in-sm"
      : `bg-bg shadow-neu-out-sm transition-[box-shadow,color] hover:text-primary hover:shadow-neu-in-sm ${TONE_CLASSES[tone]}`;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center rounded-pill text-[15px] font-semibold [overflow-wrap:anywhere] duration-300 ${SIZE_CLASSES[size]} ${variantClass}`}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
