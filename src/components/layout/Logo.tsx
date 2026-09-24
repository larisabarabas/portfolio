import { LOGO_TEXT } from "@/lib/constants";

export function Logo() {
  return (
    // Plain fragment anchor, not next/link: the logo only renders on the home
    // page, and a same-page `<Link href="/#main">` doesn't scroll to the anchor
    // in a production build (the router treats it as a no-op navigation).
    <a
      href="#main"
      aria-label={`${LOGO_TEXT} — back to top`}
      className="absolute top-5.5 left-7 z-50 flex items-baseline gap-0.5 font-serif text-2xl italic font-bold text-tertiary no-underline transition-colors hover:text-primary"
    >
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </a>
  );
}
