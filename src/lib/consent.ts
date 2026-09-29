import { useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY } from "@/lib/constants";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    // Defined by the inline consent script in layout.tsx, before GTM loads.
    gtag?: (...args: unknown[]) => void;
  }
}

// Fallback for when localStorage throws (private mode, blocked storage), so
// the banner still closes for the rest of the visit.
let memoryConsent: Consent | null = null;
// Set by the footer's "Cookie settings" button to show the banner again.
let reopened = false;
const listeners = new Set<() => void>();

function readConsent(): Consent | null {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === "granted" || saved === "denied") return saved;
  } catch {}
  return memoryConsent;
}

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keeps other open tabs in step with a choice made here.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

// GA's cookies are set on the root domain (.stefaniabarabas.com), so try the
// bare host and every parent domain.
function clearAnalyticsCookies() {
  const names = document.cookie
    .split("; ")
    .map((pair) => pair.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  for (const name of names) {
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is missing in older Safari
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < parts.length - 1; i++) {
      const domain = parts.slice(i).join(".");
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is missing in older Safari
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

export function setConsent(consent: Consent) {
  memoryConsent = consent;
  reopened = false;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {}
  window.gtag?.("consent", "update", { analytics_storage: consent });
  if (consent === "denied") clearAnalyticsCookies();
  notify();
}

export function reopenConsent() {
  reopened = true;
  notify();
}

/**
 * The saved choice, null if the visitor hasn't made one, and undefined during
 * SSR and hydration, when localStorage can't be read yet. Keeping "unknown"
 * apart from "no choice" stops the banner flashing for returning visitors.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => undefined);
}

/** True when the visitor opened the banner again from the footer. */
export function useConsentReopened() {
  return useSyncExternalStore(
    subscribe,
    () => reopened,
    () => false,
  );
}
