"use client";

import { useCallback, useMemo } from "react";
import { SectionPager } from "@/components/layout/SectionPager";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CASE_STUDY } from "@/lib/constants";

type CaseStudyNavProps = {
  items: { id: string; label: string }[];
};

// Bottom pager for the case study's sections, following the reader's scroll,
// with a way back to the portfolio at the end of its menu.
export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(ids);
  // Before the observer reports (first paint), the reader is at the top.
  const index = Math.max(0, ids.indexOf(activeId));

  // Scrolls there (smoothly unless reduced motion, via `scroll-behavior`) and
  // updates the hash without a history entry, so Back still leaves the case
  // study in one step.
  const go = useCallback(
    (target: number) => {
      const id = ids[target];
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      section.scrollIntoView();
      window.history.replaceState(null, "", `#${id}`);
    },
    [ids],
  );

  if (items.length === 0) return null;

  return (
    <SectionPager
      items={items}
      index={index}
      onSelect={go}
      exitLink={{ href: "/#work", label: CASE_STUDY.backLinkLabel }}
    />
  );
}
