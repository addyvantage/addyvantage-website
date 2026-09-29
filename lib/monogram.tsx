import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const loadDisplayFont = () => readFile(join(process.cwd(), "public/fonts/delicatus.ttf"));

/** The "AS" pixel monogram on ink, legible in light and dark tab bars. */
export async function monogram(px: number) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111111", color: "#f2f2f2", fontFamily: "Delicatus", fontSize: px * 0.5, borderRadius: px * 0.18 }}>AS</div>,
    { width: px, height: px, fonts: [{ name: "Delicatus", data: await loadDisplayFont(), style: "normal", weight: 400 }] },
  );
}
