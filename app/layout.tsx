import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { PageShell } from "@/components/ui/PageShell";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  fallback: ["sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  fallback: ["sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "LMS — The AI Growth Engine",
    template: "%s | LMS",
  },
  description:
    "One operator. Every capability. No ceiling. AI-powered marketing infrastructure for companies that refuse to move slowly.",
  metadataBase: new URL("https://linearmarketingsolutions.com"),
  openGraph: {
    title: "LMS — The AI Growth Engine",
    description:
      "One operator. Every capability. No ceiling. AI-powered marketing infrastructure for companies that refuse to move slowly.",
    url: "https://linearmarketingsolutions.com",
    siteName: "LMS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 675,
        alt: "LMS — The AI Growth Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LMS — The AI Growth Engine",
    description:
      "One operator. Every capability. No ceiling. AI-powered marketing infrastructure for companies that refuse to move slowly.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <CustomCursor />
          <PageShell>{children}</PageShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
