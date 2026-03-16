import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bed & Breakfast Klein Ockenburgh",
  description: "Official website for Bed & Breakfast Klein Ockenburgh in The Hague.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfairDisplay.variable}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
