import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BackLinkProps = { href: string; label: string };

// Raised pill for the header on inner pages. Icon-only on phones, where the
// full label wouldn't fit beside the logo and theme toggle.
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-pill bg-bg text-[13.5px] font-semibold text-ink shadow-neu-out-sm transition-[box-shadow,color] duration-300 hover:text-primary hover:shadow-neu-in-sm nav:px-4.5"
    >
      <ArrowLeft size={16} strokeWidth={2.25} className="shrink-0" />
      <span aria-hidden="true" className="hidden nav:inline">
        {label}
      </span>
    </Link>
  );
}
