import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LumaBubble - Sonoluminescence Simulator",
  description: "Where sound meets light, and physics meets wonder. Explore the mysterious world of sonoluminescence through interactive simulations.",
  keywords: ["sonoluminescence", "physics", "simulation", "bubble collapse", "cavitation", "acoustics"],
  authors: [{ name: "LumaBubble Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overscroll-none overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none overflow-x-hidden`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overscroll-contain">
          <Navigation />
          <main className="relative overscroll-contain">
            {children}
          </main>
          <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8 text-center text-slate-400">
              <p>&copy; 2024 LumaBubble. Where sound meets light, and physics meets wonder.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
