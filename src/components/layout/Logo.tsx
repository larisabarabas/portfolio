import Link from "next/link";
import { LOGO_TEXT } from "@/lib/constants";

type LogoProps = {
  href: string;
};

const CLASSES =
  "flex items-baseline gap-0.5 font-serif text-[28px] leading-none font-bold text-tertiary italic no-underline transition-colors hover:text-primary";

export function Logo({ href }: LogoProps) {
  const content = (
    <>
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </>
  );

  // Same-page anchors stay plain <a>: the home page's slide deck intercepts
  // them, and a same-page `<Link href="/#hero">` doesn't scroll to the anchor
  // in a production build (the router treats it as a no-op navigation).
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        aria-label={`${LOGO_TEXT} — back to the start`}
        className={CLASSES}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={`${LOGO_TEXT} — home`} className={CLASSES}>
      {content}
    </Link>
  );
}
