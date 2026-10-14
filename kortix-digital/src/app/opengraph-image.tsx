import { ImageResponse } from "next/og";
import { SITE_HOST, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded social preview card used for every page that does not override it.
 * Generated at build time (static), so it costs nothing at request time.
 *
 * TODO(owner): swap in a per-cohort / per-service card later if you want each
 * page to show its own title — `generateImageMetadata` supports that.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(35,248,85,0.22), transparent 45%), radial-gradient(circle at 85% 85%, rgba(35,248,85,0.14), transparent 40%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              backgroundColor: "#23F855",
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#23F855",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Digital Agency &amp; Mentorship Platform
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: "#f5f5f5",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            We Build. We Teach.
          </div>
          <div
            style={{
              display: "flex",
              color: "#23F855",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            We Transform.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", color: "#f5f5f5", fontSize: 34 }}>
              Web development · App development · Design
            </div>
            <div style={{ display: "flex", color: "#9a9a9a", fontSize: 30 }}>
              Mentorship cohorts in 9 tracks
            </div>
          </div>
          <div style={{ display: "flex", color: "#23F855", fontSize: 30 }}>
            {SITE_HOST}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
