"use client";

import { type RefObject, useEffect, useEffectEvent, useRef } from "react";

// After a slide change, ignore the wheel for this long so one flick of a
// trackpad (which keeps firing momentum events) moves exactly one slide.
const WHEEL_LOCK_MS = 1000;
// A slide whose content scrolls has to be held at its top/bottom edge this
// long before the wheel moves on, so reaching the end doesn't skip ahead.
const EDGE_DWELL_MS = 350;
const SWIPE_MIN_PX = 70;

// Keys inside these belong to the element, not to slide navigation.
const OWN_KEYS_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [role="tablist"], [data-slide-nav]';

type SlideNavigationOptions = {
  /** Off on phones, where the page scrolls normally. */
  enabled: boolean;
  deckRef: RefObject<HTMLElement | null>;
  index: number;
  go: (index: number) => void;
  /** Slide index for a `#hash`, or -1 when it isn't on any slide. */
  resolveHash: (hash: string) => number;
};

/**
 * Wires the whole window to the slide deck: wheel and trackpad, arrow/Page
 * keys, horizontal swipes, same-page `#links`, and manual hash edits.
 */
export function useSlideNavigation({
  enabled,
  deckRef,
  index,
  go,
  resolveHash,
}: SlideNavigationOptions) {
  const lockUntil = useRef(0);
  const edgeSince = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-arm the wheel lock on every slide change, however it happened
  useEffect(() => {
    lockUntil.current = Date.now() + WHEEL_LOCK_MS;
    edgeSince.current = null;
  }, [index]);

  const onWheel = useEffectEvent((e: WheelEvent) => {
    if (!enabled) return;
    if (e.ctrlKey || Date.now() < lockUntil.current) return;
    if ((e.target as Element | null)?.closest?.("[data-slide-nav]")) return;

    const ax = Math.abs(e.deltaX);
    const ay = Math.abs(e.deltaY);
    if (ax > ay && ax > 30) {
      go(index + (e.deltaX > 0 ? 1 : -1));
      return;
    }
    if (ay < 12) return;

    const down = e.deltaY > 0;
    const panel = deckRef.current?.querySelector<HTMLElement>(
      `[data-slide="${index}"]`,
    );
    const scrollable =
      panel != null && panel.scrollHeight > panel.clientHeight + 4;
    if (!scrollable) {
      go(index + (down ? 1 : -1));
      return;
    }

    const atEdge = down
      ? panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
      : panel.scrollTop <= 0;
    if (!atEdge) {
      edgeSince.current = null;
      return;
    }
    const now = Date.now();
    if (edgeSince.current === null) {
      edgeSince.current = now;
      return;
    }
    if (now - edgeSince.current > EDGE_DWELL_MS) go(index + (down ? 1 : -1));
  });

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!enabled) return;
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if ((e.target as Element | null)?.closest?.(OWN_KEYS_SELECTOR)) return;

    let target: number;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        target = index + 1;
        break;
      case "ArrowLeft":
      case "PageUp":
        target = index - 1;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = Number.POSITIVE_INFINITY;
        break;
      default:
        return;
    }
    e.preventDefault();
    go(target);
  });

  const onTouchStart = useEffectEvent((e: TouchEvent) => {
    if (!enabled) return;
    const touch = e.touches[0];
    touchStart.current =
      e.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
  });

  const onTouchEnd = useEffectEvent((e: TouchEvent) => {
    if (!enabled) return;
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.4) {
      go(index + (dx < 0 ? 1 : -1));
    }
  });

  // Same-page links (#services, #contact…) switch slides instead of letting
  // the browser try to scroll to an element on a hidden panel.
  const onClick = useEffectEvent((e: MouseEvent) => {
    if (!enabled) return;
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
    if (!link) return;
    const target = resolveHash(link.getAttribute("href") ?? "");
    if (target < 0) return;
    e.preventDefault();
    go(target);
  });

  const onHashChange = useEffectEvent(() => {
    if (!enabled) return;
    const target = resolveHash(window.location.hash);
    if (target >= 0) go(target);
  });

  useEffect(() => {
    const wheel = (e: WheelEvent) => onWheel(e);
    const keydown = (e: KeyboardEvent) => onKeyDown(e);
    const touchstart = (e: TouchEvent) => onTouchStart(e);
    const touchend = (e: TouchEvent) => onTouchEnd(e);
    const click = (e: MouseEvent) => onClick(e);
    const hashchange = () => onHashChange();

    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("keydown", keydown);
    window.addEventListener("touchstart", touchstart, { passive: true });
    window.addEventListener("touchend", touchend, { passive: true });
    document.addEventListener("click", click);
    window.addEventListener("hashchange", hashchange);
    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("touchstart", touchstart);
      window.removeEventListener("touchend", touchend);
      document.removeEventListener("click", click);
      window.removeEventListener("hashchange", hashchange);
    };
  }, []);
}
