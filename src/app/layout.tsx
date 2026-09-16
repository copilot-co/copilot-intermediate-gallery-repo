import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Camera, Heart } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Gallery & Portfolio",
  description: "A curated collection of photographs and creative works showcasing a personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {/* Navigation Header */}
        <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Camera className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Portfolio Gallery
                </h1>
              </Link>
              <nav className="flex items-center gap-3 sm:gap-6 overflow-x-auto whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible">
                <Link href="/gallery" className="nav-link text-sm sm:text-base">
                  Gallery
                </Link>
                <Link href="/favorites" className="nav-link flex items-center gap-1 text-sm sm:text-base">
                  <Heart className="h-4 w-4 shrink-0" />
                  Favorites
                </Link>
                <Link href="/upload" className="nav-link text-sm sm:text-base">
                  Upload
                </Link>
                <Link href="/admin" className="btn-primary text-sm sm:text-base">
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
        {/* REPLACE THIS COMMENT */}
      </body>
    </html>
  );
}
