import "./globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Header from "@/components/Header";
import { SchoolProvider } from "@/contexts/SchoolContext";

// Fontes do Google
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

// Metadata exportada diretamente (evita erro de build)
export const metadata = {
  title: "Portfólio - Lorena Dourado",
  description: "Site pessoal de Lorena Dourado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white text-black`}
      >
        <SchoolProvider>
          <Header />
          {children}
        </SchoolProvider>
      </body>
    </html>
  );
}
