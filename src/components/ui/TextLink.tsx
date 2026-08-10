import type { ReactNode } from "react";

type TextLinkColor = "primary" | "tertiary" | "ink";

type TextLinkProps = {
  href: string;
  color?: TextLinkColor;
  external?: boolean;
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
  children,
}: TextLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`border-b-2 text-[15px] font-semibold ${COLOR_CLASSES[color]}`}
    >
      {children}
    </a>
  );
}
