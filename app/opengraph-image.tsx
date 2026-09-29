import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadDisplayFont } from "@/lib/monogram";

export const alt = "Aditya “Addy” Singh: I build software for the moments after the first answer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/addy-portrait-og.jpg"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#111111", fontFamily: "Delicatus", padding: 64, gap: 56 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 26, color: "#666666", letterSpacing: 1 }}>ADDY / ADITYA SINGH</div>
        <div style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -1 }}>I build software for the moments after the first answer.</div>
        <div style={{ fontSize: 26, color: "#666666", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #111111", paddingTop: 20 }}>
          <span>AI PRODUCTS · DEVELOPER TOOLS</span>
          <span>ADDYVANTAGE.ME</span>
        </div>
      </div>
      <img alt="" height={500} src={`data:image/jpeg;base64,${portrait.toString("base64")}`} style={{ borderRadius: 12, objectFit: "cover" }} width={400} />
    </div>,
    { ...size, fonts: [{ name: "Delicatus", data: await loadDisplayFont(), style: "normal", weight: 400 }] },
  );
}
