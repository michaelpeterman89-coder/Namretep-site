import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Namretep",
  description: "Casino Games for now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 text-white flex flex-col">
        {/* Top Navigation */}
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-yellow-400 hover:text-yellow-300 transition">
              Namretep
            </Link>
            
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
              <Link href="/games/blackjack" className="hover:text-yellow-400 transition">Blackjack</Link>
              <Link href="/stats" className="hover:text-yellow-400 transition">Stats</Link>
              <Link href="/admin" className="hover:text-yellow-400 transition">Admin</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}