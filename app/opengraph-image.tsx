import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#24332C",
          color: "#FBF8F2",
        }}
      >
        <div style={{ width: 120, height: 12, background: "#2F5D4A", marginBottom: 40 }} />
        <div style={{ fontSize: 88, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.75 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
