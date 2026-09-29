import type { ReactNode } from "react";

type SectionLabelProps = {
  /** `inset` sits in a pressed-in pill (hero and contact). */
  variant?: "plain" | "inset";
  /** Bottom margin; the design varies it per section. */
  className?: string;
  children: ReactNode;
};

export function SectionLabel({
  variant = "plain",
  className = "mb-3.5",
  children,
}: SectionLabelProps) {
  const variantClass =
    variant === "inset"
      ? "inline-flex rounded-pill px-4 py-2.25 shadow-neu-in-sm"
      : "";

  return (
    <p
      className={`text-[13px] font-semibold uppercase tracking-[0.16em] text-primary ${variantClass} ${className}`}
    >
      {children}
    </p>
  );
}
