import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CredSense AI - Advanced Credit Analytics Platform",
  description: "Smarter Credit Decisions with AI. A modern, AI-powered credit scoring system.",
};

import Navbar from "@/components/layout/Navbar";
import { DemoModeProvider } from "@/components/providers/DemoModeProvider";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-foreground relative">
        <DemoModeProvider>
          <Navbar />
          <main className="flex-1 mt-16">{children}</main>
        </DemoModeProvider>
      </body>
    </html>
  );
}
