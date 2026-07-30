import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muse Studios — AI Transformation, Product Engineering, Gamification";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ICON_PATH =
  "M132.15,469.56h52.3c2.89,0,5.23,2.34,5.23,5.23v17.5c0,2.89,2.34,5.23,5.23,5.23h74.6c2.89,0,5.23,2.34,5.23,5.23v16.97c0,2.89,2.34,5.23,5.23,5.23h74.5c2.89,0,5.23,2.34,5.23,5.23v17.5c0,2.89-2.34,5.23-5.23,5.23h-47.07c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-74.5c0-2.89-2.34-5.23-5.23-5.23h-46.54c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-75.02c0-2.89-2.34-5.23-5.23-5.23h-46.65c-2.89,0-5.23,2.34-5.23,5.23v47.07c0,2.89-2.34,5.23-5.23,5.23h-17.5c-2.89,0-5.23-2.34-5.23-5.23v-75.02c0-2.89,2.34-5.23,5.23-5.23h22.73Z";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#060608",
          backgroundImage:
            "linear-gradient(135deg, rgba(253,70,1,0.18) 0%, rgba(6,6,8,0) 55%)",
        }}
      >
        <svg width="120" height="70" viewBox="96 461 272 157" fill="#fd4601">
          <path d={ICON_PATH} />
        </svg>
        <div
          style={{
            marginTop: 44,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          Muse Studios
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 820,
            display: "flex",
          }}
        >
          AI Transformation, Product Engineering &amp; Gamification — Riyadh
        </div>
      </div>
    ),
    { ...size }
  );
}
