import localFont from "next/font/local";

/**
 * Brand font, self-hosted through `next/font/local`.
 *
 * Previously declared with a plain `@font-face` in globals.css pointing at
 * 46KB TTF files, which meant an extra render-blocking request, no preload and
 * no automatic fallback metrics. The files here are WOFF2 conversions of the
 * same Alro TTFs in /public/ttf, subset to Latin + the punctuation this site
 * actually uses: 92KB of TTF became ~28KB of WOFF2.
 *
 * NOTE: the Alro files do not contain a naira glyph (U+20A6), so ₦ prices fall
 * back to the system font while the digits render in Alro. That is a font
 * coverage gap in the source file, not something CSS can fix.
 */
export const alro = localFont({
  src: [
    { path: "./fonts/alro-regular-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/alro-bold-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-alro",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});
