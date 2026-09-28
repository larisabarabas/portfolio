import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO, JOB_TITLE } from "@/lib/constants";

export const alt = `stefania. — ${JOB_TITLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "src/app/fonts");
const [serifRegular, serifItalic, sansRegular, sansBold] = await Promise.all([
  readFile(join(fontsDir, "InstrumentSerif-Regular.ttf")),
  readFile(join(fontsDir, "InstrumentSerif-Italic.ttf")),
  readFile(join(fontsDir, "SpaceGrotesk-Regular.woff")),
  readFile(join(fontsDir, "SpaceGrotesk-Bold.woff")),
]);

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 90px",
        background: "#F8EFE6",
        fontFamily: "Space Grotesk",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #A8447A, transparent 72%)",
          opacity: 0.35,
        }}
      />
      <p
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#A8447A",
          margin: "0 0 28px",
        }}
      >
        {JOB_TITLE}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Instrument Serif",
          fontSize: 76,
          lineHeight: 1.05,
          color: "#2A2430",
        }}
      >
        <span>{HERO.headingLine1}</span>
        <span style={{ fontStyle: "italic", color: "#5A4A73" }}>
          {HERO.headingLine2}
        </span>
      </div>
      <p
        style={{
          fontSize: 30,
          lineHeight: 1.5,
          color: "#2A2430",
          opacity: 0.85,
          maxWidth: 780,
          margin: "36px 0 0",
        }}
      >
        {HERO.status}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          marginTop: "auto",
          paddingTop: 56,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: "#2A2430",
            opacity: 0.6,
          }}
        >
          www.stefaniabarabas.com
        </span>
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
