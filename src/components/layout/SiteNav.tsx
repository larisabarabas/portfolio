"use client";

import { MobileNav } from "@/components/layout/MobileNav";
import { NavDots } from "@/components/layout/NavDots";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS } from "@/lib/constants";

const NAV_IDS = NAV_LINKS.map((link) => link.id);

// One scroll-spy observer shared by both navs; each hides itself at the
// breakpoint where the other takes over.
export function SiteNav() {
  const activeId = useActiveSection(NAV_IDS);

  return (
    <>
      <NavDots activeId={activeId} />
      <MobileNav activeId={activeId} />
    </>
  );
}
