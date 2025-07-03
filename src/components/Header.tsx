"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const linkClass =
    "text-[#000000] font-medium text-base relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#000000] after:w-0 hover:after:w-full after:transition-all after:duration-300";

  return (
    <header className="w-full h-[80px] border-b border-[#E2E8F0] bg-white fixed top-0 z-50 shadow-md transition-all duration-300 left-0 right-0">
      <div className="flex items-center justify-between px-4 md:px-10 py-4 mx-auto">
        {/* Logo (ajustado para subir) */}
        <div className="flex justify-center items-center mt-[-12]">
          <img
            src="/logo.svg"
            alt="Lorena Dourado"
            className="w-[55px] h-auto cursor-pointer"
          />
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/About" className={linkClass}>
            Sobre
          </Link>
        </nav>

        {/* Menu Hamburguer (Mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {isOpen && isMobile && (
  <div className="absolute top-full right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 w-auto min-w-[150px]">
    <Link href="/" className={linkClass} onClick={() => setIsOpen(false)}>
      Home
    </Link>
    <Link href="/About" className={linkClass} onClick={() => setIsOpen(false)}>
      Sobre
    </Link>
  </div>
)}
      </div>
    </header>
  );
}