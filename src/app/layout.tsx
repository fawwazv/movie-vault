import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieVault | Explore Your Favorite Movies",
  description: "Platform eksplorasi film modern untuk tugas Pengembangan Aplikasi Berbasis Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Navbar diletakkan di luar {children} agar muncul di semua halaman */}
        <Navbar />
        
        {/* children adalah konten dari page.tsx kamu */}
        {children}
      </body>
    </html>
  );
}