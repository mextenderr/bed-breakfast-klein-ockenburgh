import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Official website for Bed & Breakfast Klein Ockenburgh in The Hague.",
  referrer: "origin-when-cross-origin",
  category: "travel",
  manifest: "/manifest.webmanifest",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={playfairDisplay.variable}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
