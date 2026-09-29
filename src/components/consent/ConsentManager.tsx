"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { setConsent, useConsent, useConsentReopened } from "@/lib/consent";
import { COOKIES } from "@/lib/constants";

// Same look as the raised PillLink, as a button. Accept and Decline share it
// so saying no is exactly as easy as saying yes.
const BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center rounded-pill bg-bg px-5.5 py-3 text-[15px] font-semibold text-ink shadow-neu-out-sm transition-[box-shadow,color] duration-300 hover:text-primary hover:shadow-neu-in-sm";

type ConsentManagerProps = { gtmId: string };

// Loads GTM only after the visitor accepts, so a visitor who declines or
// ignores the banner never sends a request to Google. The Sanity Studio is an
// admin tool: no banner and no tracking there.
export function ConsentManager({ gtmId }: ConsentManagerProps) {
  const pathname = usePathname();
  const consent = useConsent();
  const reopened = useConsentReopened();
  const acceptRef = useRef<HTMLButtonElement>(null);

  // Opened from the footer button: move focus into the banner so keyboard
  // users land on the choice they just asked for. A first visit doesn't
  // steal focus.
  useEffect(() => {
    if (reopened) acceptRef.current?.focus();
  }, [reopened]);

  if (pathname.startsWith("/studio")) return null;

  const showBanner = consent === null || reopened;

  return (
    <>
      {consent === "granted" ? <GoogleTagManager gtmId={gtmId} /> : null}
      {showBanner ? (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 z-60 animate-fade-up rounded-card-lg bg-bg p-6 shadow-neu-out sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-100 print:hidden"
        >
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
            {COOKIES.eyebrow}
          </p>
          <h2
            id="cookie-consent-title"
            className="mb-2.5 font-serif text-[28px] leading-[1.1] font-normal"
          >
            {COOKIES.heading}
          </h2>
          <p className="mb-5.5 text-[15px] leading-[1.6] opacity-85">
            {COOKIES.body}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              ref={acceptRef}
              type="button"
              onClick={() => setConsent("granted")}
              className={BUTTON_CLASSES}
            >
              {COOKIES.acceptLabel}
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className={BUTTON_CLASSES}
            >
              {COOKIES.declineLabel}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
