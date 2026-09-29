import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type TextLinkColor = "primary" | "tertiary" | "ink";

type TextLinkProps = {
  href: string;
  color?: TextLinkColor;
  size?: "sm" | "md";
  external?: boolean;
  /** Trailing icon, e.g. an arrow. */
  icon?: LucideIcon;
  children: ReactNode;
};

const COLOR_CLASSES: Record<TextLinkColor, string> = {
  primary: "border-primary",
  tertiary: "border-tertiary",
  ink: "border-ink text-ink",
};

export function TextLink({
  href,
  color = "primary",
  size = "md",
  external = false,
  icon: Icon,
  children,
}: TextLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-1 border-b-2 font-semibold ${size === "sm" ? "text-sm" : "text-[15px]"} ${COLOR_CLASSES[color]}`}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2.25} className="shrink-0" />}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
