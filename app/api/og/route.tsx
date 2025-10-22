import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const subtitle =
    searchParams.get("subtitle") ??
    "Boutique social talent agency representing TikTok & Instagram creators.";

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
            "radial-gradient(circle at top left, hsl(243, 75%, 59%), hsl(243, 64%, 45%) 65%, hsl(243, 70%, 18%) 95%)",
          color: "hsl(210, 40%, 98%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ maxWidth: 820 }}>
            <p style={{ letterSpacing: "0.45em", fontSize: 18, textTransform: "uppercase", opacity: 0.7 }}>
              SW Talents
            </p>
            <h1 style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.1 }}>{title}</h1>
          </div>
          <div
            style={{
              borderRadius: "999px",
              padding: "12px 28px",
              border: "1px solid hsla(210, 40%, 98%, 0.35)",
              fontSize: 22,
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
            alignItems: "flex-end",
            gap: "40px",
          }}
        >
          <p style={{ fontSize: 26, lineHeight: 1.4, maxWidth: 700, opacity: 0.85 }}>{subtitle}</p>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 18, letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.65 }}>
              sw-entertainment.com
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
