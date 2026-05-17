import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "@/components/PortfolioLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ahmed Essam — Architecture & Engineering Portfolio",
  description: "Portfolio of Ahmed Essam — Project Manager in Design & Development Management with 20 years of experience in hospitality, educational, commercial, residential, and urban planning sectors across 6+ countries.",
  keywords: ["Architecture", "Engineering", "Portfolio", "Ahmed Essam", "Project Manager", "Design", "Development", "Real Estate", "Luxury"],
  authors: [{ name: "Ahmed Essam" }],
  openGraph: {
    title: "Ahmed Essam — Architecture & Engineering Portfolio",
    description: "20 Years | 150+ Projects | 6+ Countries",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#0A0A0A] text-white`}
      >
        <PortfolioLayout>
          {children}
        </PortfolioLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
