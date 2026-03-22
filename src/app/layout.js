import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { DemoModeProvider } from "@/components/providers/DemoModeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "CredSense — AI Credit Analytics for SMEs",
  description: "AI-powered Alternative Data Credit Scoring System for SME Financing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}>
        <DemoModeProvider>
          <Navbar />
          <main className="pt-14 min-h-screen">
            {children}
          </main>
        </DemoModeProvider>
      </body>
    </html>
  );
}
