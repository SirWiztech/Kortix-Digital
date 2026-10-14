import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingChatbot from "@/components/FloatingChatbot";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Homepage title carries the two business lines, not just the tagline.
    default: "Kortix Digital | Web Development & Tech Training in Nigeria",
    template: "%s | Kortix Digital",
  },
  description:
    "Kortix Digital is a Nigerian digital agency and tech training platform. We build websites and mobile apps, and run mentorship cohorts in web development, data, cybersecurity and design.",
  applicationName: "Kortix Digital",
  authors: [{ name: "Kortix Digital" }],
  creator: "Kortix Digital",
  publisher: "Kortix Digital",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Kortix Digital",
    title: "Kortix Digital | Web Development & Tech Training in Nigeria",
    description:
      "A Nigerian digital agency and mentorship platform: we build websites and apps, and run cohorts in web development, data, cybersecurity and design.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kortix Digital | Web Development & Tech Training in Nigeria",
    description:
      "A Nigerian digital agency and mentorship platform: web development, app development and paid skills cohorts.",
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to emit the Search Console tag.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kortix Digital",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description:
      "Digital agency services and mentorship cohorts for the next generation. Web development, design, video editing, app development, and 9 skill tracks.",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "kortixdigital@gmail.com",
      telephone: "+234-707-161-7216",
    },
    sameAs: [
      "https://wa.me/2347071617216",
      "https://discordapp.com/users/1466951307708469516",
      "mailto:kortixdigital@gmail.com",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 relative z-10 bg-background/70 backdrop-blur-[2px]">{children}</main>
          <Footer />
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <FloatingChatbot />
            <FloatingCTA />
          </div>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
