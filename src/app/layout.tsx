//'use client';

import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { metadata } from "./metadata";

import { SchoolProvider } from "@/contexts/SchoolContext";

export { metadata };

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white text-black`}
      >
        {" "}
    
          <SchoolProvider>
            <Header />
            {children}
           
          </SchoolProvider>
        
      </body>
    </html>
  );
}
