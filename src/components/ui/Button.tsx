import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-tertiary text-paper hover:bg-primary hover:text-ink",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
};

export function Button({
  href,
  variant = "solid",
  external = false,
  children,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-pill px-[26px] py-3.5 text-[15px] font-semibold transition-colors duration-300 ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </a>
  );
}
