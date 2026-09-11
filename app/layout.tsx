import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Mengatur font untuk Heading (Judul)
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Mengatur font untuk Body (Teks biasa)
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "WITHCABOX | Studio Fotografi Terfavorit",
  description: "Abadikan momen terbaikmu bersama orang tersayang dengan frame custom unik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-[#FAFAFA] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}