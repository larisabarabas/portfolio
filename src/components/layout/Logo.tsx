import { LOGO_TEXT } from "@/lib/constants";

export function Logo() {
  return (
    // Plain fragment anchor, not next/link: the logo only renders on the home
    // page, and a same-page `<Link href="/#hero">` doesn't scroll to the anchor
    // in a production build (the router treats it as a no-op navigation).
    <a
      href="#hero"
      aria-label={`${LOGO_TEXT} — back to the start`}
      className="flex items-baseline gap-0.5 font-serif text-2xl font-bold text-tertiary italic no-underline transition-colors hover:text-primary"
    >
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </a>
  );
}
