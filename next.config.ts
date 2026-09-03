import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * These are the low-risk, high-value ones: they harden transport, framing,
 * MIME sniffing, referrer leakage and browser feature access without touching
 * what scripts/styles/connections the page is allowed to make — so they can't
 * break hydration, Vercel Analytics or the embedded Sanity Studio at /studio.
 *
 * A full Content-Security-Policy (script-src / connect-src / img-src …) is
 * deliberately NOT set here. Without per-request nonces (which would force
 * every page into dynamic rendering) it still needs `script-src 'unsafe-inline'`
 * for Next's hydration bootstrap, which removes most of its XSS value, and a
 * strict policy needs careful carve-outs for /studio. If you want it, a working
 * starting point is commented out at the bottom of this file — test it on a
 * preview deploy (marketing pages AND /studio) before shipping.
 */
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains. Only takes effect over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Disallow this site being framed by other origins (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Don't let browsers MIME-sniff responses away from the declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send origin only on cross-origin navigations; full URL same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny powerful features outright — this site uses none of them.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Dev-only (ignored by production/preview builds): lets other devices on the
  // LAN — e.g. a phone — load `next dev` assets. Set DEV_ORIGIN in .env.local.
  allowedDevOrigins: process.env.DEV_ORIGIN ? [process.env.DEV_ORIGIN] : [],
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

/*
 * ── Opt-in: full Content-Security-Policy ──────────────────────────────────────
 * Replace the single `Content-Security-Policy: frame-ancestors 'self'` entry in
 * `securityHeaders` with two path-scoped entries so /studio keeps the looser
 * policy Sanity needs. `'unsafe-inline'` in script-src is required (no nonces);
 * `'unsafe-eval'` is added only in dev for React's error overlay.
 *
 * const isDev = process.env.NODE_ENV === "development";
 *
 * const siteCsp = [
 *   "default-src 'self'",
 *   "base-uri 'self'",
 *   "object-src 'none'",
 *   "form-action 'self'",
 *   "frame-ancestors 'self'",
 *   "frame-src 'self'",
 *   `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
 *   "style-src 'self' 'unsafe-inline'",
 *   "img-src 'self' blob: data: https://cdn.sanity.io",
 *   "font-src 'self'",
 *   `connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io https://vitals.vercel-insights.com${isDev ? " ws:" : ""}`,
 *   "upgrade-insecure-requests",
 * ].join("; ");
 *
 * const studioCsp = [
 *   "default-src 'self'",
 *   "base-uri 'self'",
 *   "object-src 'none'",
 *   "form-action 'self'",
 *   "frame-ancestors 'self'",
 *   "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
 *   "style-src 'self' 'unsafe-inline'",
 *   "img-src 'self' blob: data: https://cdn.sanity.io https://*.sanity.io",
 *   "font-src 'self' data:",
 *   "worker-src 'self' blob:",
 *   "frame-src 'self' https://*.sanity.io",
 *   "connect-src 'self' https://*.sanity.io wss://*.api.sanity.io https://*.apicdn.sanity.io",
 * ].join("; ");
 *
 * // in headers(): return [
 * //   { source: "/studio/:path*", headers: [...baseHeaders, { key: "Content-Security-Policy", value: studioCsp }] },
 * //   { source: "/((?!studio).*)", headers: [...baseHeaders, { key: "Content-Security-Policy", value: siteCsp }] },
 * // ];
 */
