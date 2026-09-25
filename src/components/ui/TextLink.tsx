import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ExternalMark } from "@/components/ui/ExternalMark";

type TextLinkColor = "primary" | "tertiary" | "ink";

type TextLinkProps = {
  href: string;
  color?: TextLinkColor;
  external?: boolean;
  /** Trailing icon for internal links; external links get ↗ automatically. */
  icon?: LucideIcon;
  children: ReactNode;
};

const COLOR_CLASSES: Record<TextLinkColor, string> = {
  primary: "border-primary",
  tertiary: "border-tertiary",
  ink: "border-ink opacity-75",
};

export function TextLink({
  href,
  color = "primary",
  external = false,
  icon: Icon,
  children,
}: TextLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-1 border-b-2 text-[15px] font-semibold ${COLOR_CLASSES[color]}`}
    >
      {children}
      {Icon && <Icon size={16} strokeWidth={2.25} className="shrink-0" />}
      {external && <ExternalMark />}
    </a>
  );
}
