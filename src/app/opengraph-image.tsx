import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO, JOB_TITLE } from "@/lib/constants";

export const alt = `stefania. — ${JOB_TITLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The design's light palette and "soft" neumorphic shadows (see globals.css);
// the preview is always light, whatever theme the sharer uses.
const BG = "#F8EFE6";
const INK = "#2A2430";
const PRIMARY = "#A8447A";
const TERTIARY = "#5A4A73";
const DARK = "rgba(178,150,128,0.42)";
const LIGHT = "rgba(255,255,255,0.9)";
const RAISED = `10px 10px 24px ${DARK}, -10px -10px 24px ${LIGHT}`;
const INSET = `inset 5px 5px 10px ${DARK}, inset -5px -5px 10px ${LIGHT}`;
const INSET_SM = `inset 2px 2px 5px ${DARK}, inset -2px -2px 5px ${LIGHT}`;

const appDir = join(process.cwd(), "src/app");
const [serifRegular, serifItalic, sansRegular, sansBold, heroPhoto] =
  await Promise.all([
    readFile(join(appDir, "fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(appDir, "fonts/InstrumentSerif-Italic.ttf")),
    readFile(join(appDir, "fonts/SpaceGrotesk-Regular.woff")),
    readFile(join(appDir, "fonts/SpaceGrotesk-Bold.woff")),
    // A 720×900 copy of public/hero-portrait.jpg, small enough to inline.
    readFile(join(appDir, "og/hero-portrait-og.jpg"), "base64"),
  ]);
const heroPhotoSrc = `data:image/jpeg;base64,${heroPhoto}`;

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 56,
        padding: "64px 72px",
        background: BG,
        fontFamily: "Space Grotesk",
        color: INK,
      }}
    >
      {/* Left: the hero's pitch, set as on the site. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <p
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: PRIMARY,
              margin: 0,
              padding: "11px 20px",
              borderRadius: 100,
              boxShadow: INSET_SM,
            }}
          >
            {JOB_TITLE}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Instrument Serif",
            fontSize: 58,
            lineHeight: 1.04,
            margin: "28px 0 0",
          }}
        >
          <span>{HERO.headingLine1}</span>
          <span style={{ fontStyle: "italic", color: TERTIARY }}>
            {HERO.headingLine2}
          </span>
        </div>
        <p
          style={{
            fontSize: 23,
            lineHeight: 1.5,
            opacity: 0.85,
            margin: "26px 0 0",
          }}
        >
          {HERO.status}
        </p>
        <p
          style={{
            fontSize: 18,
            opacity: 0.7,
            margin: "auto 0 0",
            paddingTop: 24,
          }}
        >
          www.stefaniabarabas.com
        </p>
      </div>

      {/* Right: raised frame → inset well → the hero photo, in its muted
          resting state (a preview can't show the colour reveal). */}
      <div
        style={{
          display: "flex",
          padding: 14,
          borderRadius: 38,
          background: BG,
          boxShadow: RAISED,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 14,
            borderRadius: 28,
            boxShadow: INSET,
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain HTML, next/image doesn't apply */}
          <img
            src={heroPhotoSrc}
            alt=""
            width={330}
            height={412}
            style={{
              borderRadius: 18,
              objectFit: "cover",
              filter: "saturate(0.35) brightness(0.92)",
            }}
          />
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: serifRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "Space Grotesk",
          data: sansRegular,
          style: "normal",
          weight: 400,
        },
        { name: "Space Grotesk", data: sansBold, style: "normal", weight: 700 },
      ],
    },
  );
}
