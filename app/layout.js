import localFont from "next/font/local";
import "./globals.css";
import SmoothScrolling from "../components/SmoothScrolling";

const schabo = localFont({
  src: "../public/fonts/SCHABO-Condensed.otf",
  variable: "--font-schabo",
});

const comedik = localFont({
  src: "../public/fonts/Comedik Regular Font from FC88.woff2",
  variable: "--font-comedik",
});

const objectSans = localFont({
  src: [
    {
      path: "../public/fonts/ObjectSansRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ObjectSansSlanted.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/ObjectSansHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/ObjectSansHeavySlanted.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-object",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://tuf.org",
  ),
  title: {
    default: "TUF 2026 | Ultimate Cultural & Tech Experience",
    template: "%s | TUF 2026",
  },
  description:
    "Take You Forward - Experience TUF 2026, the ultimate cultural and tech festival. Join thousands of innovators, creators, and dreamers for unforgettable events, workshops, and performances.",
  applicationName: "TUF 2026",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "TUF",
    "Take You Forward",
  ],
  authors: [{ name: "TUF Team", url: "https://tuf.org/teams" }],
  creator: "TUF INTERN",
  publisher: "TUF",
  icons: {
    icon: [
      { url: "/logo.avif", sizes: "32x32", type: "image/avif" },
      { url: "/logo.avif", sizes: "16x16", type: "image/avif" },
    ],
    shortcut: "/logo.avif",
    apple: {
      url: "/logo.avif",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    title: "TUF 2026 | FRONTEND CHALLENGE",
    description:
      "Take You Forward - FRONTEND CHALLENGE.",
    url: "https://tuf.org",
    siteName: "TUF 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TUF 2026 | FRONTEND CHALLENGE",
    description:
      "Take You Forward - FRONTEND CHALLENGE.",
    creator: "@takeyouforward",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  verification: {
    google: "process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

import Providers from "./providers";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${schabo.variable} ${comedik.variable} ${objectSans.variable} antialiased`}
      >
        <Suspense>
          <Providers>
              <SmoothScrolling />
              {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
