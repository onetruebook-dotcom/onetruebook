import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "One True Book — find the book you actually need";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/one-true-book-original.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFF3E0",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <img src={src} width={600} height={600} alt="One True Book" />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: -54, maxWidth: 510 }}>
          <div style={{ color: "#B39450", fontSize: 20, letterSpacing: 4 }}>ONETRUEBOOK.COM</div>
          <div style={{ color: "#003C2D", fontSize: 54, lineHeight: 1.08, marginTop: 15 }}>
            Find the book that actually fits you.
          </div>
          <div style={{ color: "#003C2D", fontSize: 24, marginTop: 20 }}>
            Take the free 90-second quiz.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
