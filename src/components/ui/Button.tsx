import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ExternalMark } from "@/components/ui/ExternalMark";

type ButtonVariant = "solid" | "outline";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  /** External links get ↗ automatically; use this for other arrows. */
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-tertiary text-paper hover:bg-primary",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
};

export function Button({
  href,
  variant = "solid",
  external = false,
  icon: Icon,
  iconPosition = "end",
  children,
}: ButtonProps) {
  const icon = Icon && (
    <Icon size={16} strokeWidth={2.25} className="shrink-0" />
  );

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-pill px-6.5 py-3.5 text-[15px] font-semibold transition-colors duration-300 ${VARIANT_CLASSES[variant]}`}
    >
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
      {external && <ExternalMark />}
    </a>
  );
}
