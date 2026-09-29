"use client";

import { reopenConsent } from "@/lib/consent";
import { COOKIES, GTM_ID } from "@/lib/constants";

// Lets visitors change their answer later. Hidden when analytics is off,
// since there'd be nothing to change.
export function CookieSettingsButton() {
  if (!GTM_ID) return null;

  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="cursor-pointer border-b border-current text-[13px] print:hidden"
    >
      {COOKIES.settingsLabel}
    </button>
  );
}
