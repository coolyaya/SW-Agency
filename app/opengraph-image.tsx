import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${siteConfig.name} Open Graph Image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, hsla(243, 75%, 59%, 0.85), hsla(243, 75%, 35%, 0.95))",
          color: "hsl(210, 40%, 98%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ letterSpacing: "0.6em", fontSize: 20, textTransform: "uppercase", opacity: 0.8 }}>
              Social Talent Agency
            </p>
            <h1 style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, maxWidth: 900 }}>
              {siteConfig.name}
            </h1>
          </div>
          <div
            style={{
              borderRadius: "999px",
              padding: "12px 24px",
              border: "1px solid hsla(210, 40%, 98%, 0.35)",
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            swtalents.contact@gmail.com
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            alignItems: "flex-end",
          }}
        >
          <p style={{ fontSize: 28, lineHeight: 1.4, maxWidth: 720, opacity: 0.92 }}>
            Campaign strategy, creator development, and analytics for brands collaborating with
            TikTok and Instagram trailblazers worldwide.
          </p>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 18, letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.6 }}>
              sw-entertainment.com
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
