import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FloatingChatbot from "@/components/FloatingChatbot";
import ThemeProvider from "@/components/ThemeProvider";
import TargetCursor from "@/components/TargetCursor";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kortixdigital.com"),
  title: {
    default: "Kortix Digital — We Build. We Teach. We Transform.",
    template: "%s | Kortix Digital",
  },
  description:
    "Digital agency services and mentorship cohorts for the next generation. Web development, graphic design, video editing, UI/UX, app development, and 9 digital skill tracks.",
  keywords: [
    "digital agency Nigeria",
    "web development Nigeria",
    "mentorship cohorts",
    "tech bootcamp",
    "graphic design",
    "UI/UX design",
    "app development",
    "video editing",
    "cybersecurity",
    "data analysis",
    "digital marketing",
    "web3",
    "Kortix Digital",
    "learn tech skills",
    "digital skills training",
  ],
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
    title: "Kortix Digital — We Build. We Teach. We Transform.",
    description:
      "Digital agency services and mentorship cohorts for the next generation. Web development, design, video editing, app development, and 9 skill tracks.",
    url: "https://kortixdigital.com",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Kortix Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kortix Digital — We Build. We Teach. We Transform.",
    description:
      "Digital agency services and mentorship cohorts for the next generation.",
    images: ["/apple-touch-icon.png"],
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
  other: {
    "theme-color": "#050505",
  },
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
    url: "https://kortixdigital.com",
    logo: "https://kortixdigital.com/apple-touch-icon.png",
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
          <TargetCursor
            targetSelector="a, button, .cursor-target"
            spinDuration={3}
            hideDefaultCursor
            hoverDuration={0.3}
            cursorColor="#ffffff"
            cursorColorOnTarget="#23F855"
          />
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
