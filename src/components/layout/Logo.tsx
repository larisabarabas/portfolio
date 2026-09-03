import Link from "next/link";
import { LOGO_TEXT } from "@/lib/constants";

export function Logo() {
  return (
    <Link
      href="/#main"
      aria-label={`${LOGO_TEXT} — back to top`}
      className="fixed top-5.5 left-7 z-50 flex items-baseline gap-0.5 font-serif text-2xl italic font-bold text-tertiary no-underline transition-colors hover:text-primary"
    >
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </Link>
  );
}
