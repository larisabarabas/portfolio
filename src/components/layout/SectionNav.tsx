"use client";

import { useCallback, useMemo } from "react";
import { SectionPager } from "@/components/layout/SectionPager";
import { SectionRail } from "@/components/layout/SectionRail";
import { useActiveSection } from "@/hooks/useActiveSection";

type SectionNavProps = {
  items: { id: string; label: string }[];
};

// One scroll-spy shared by the desktop rail and the bottom pager.
export function SectionNav({ items }: SectionNavProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(ids);
  // Before the observer reports (first paint), the page is at the top.
  const index = Math.max(0, ids.indexOf(activeId));

  // Like following a #link: scrolls there (smoothly, unless reduced motion —
  // see `scroll-behavior` in globals.css) and adds a history entry, so Back
  // returns to where you were.
  const go = useCallback(
    (target: number) => {
      const id = ids[target];
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      section.scrollIntoView();
      window.history.pushState(null, "", `#${id}`);
    },
    [ids],
  );

  return (
    <>
      <SectionRail items={items} index={index} />
      <SectionPager items={items} index={index} onSelect={go} />
    </>
  );
}
