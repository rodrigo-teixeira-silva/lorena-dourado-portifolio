"use client";

import { Phone, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative w-full h-screen bg-[#f8f7f3] overflow-hidden flex items-center justify-center px-6">
      <div className="flex flex-col items-center justify-center text-center gap-6 max-w-[700px] z-10">
        <h1 className="text-5xl font-bold text-[#000000] font-inter">
          Onde me contactar:
        </h1>

        <h2 className="text-lg text-[#000000] font-inter leading-relaxed">
          Entre em contato para agendar seu horário ou tirar dúvidas:
        </h2>

        <div className="flex flex-col gap-4 text-[#000000] text-lg font-medium">
          <div className="flex items-center gap-3">
            <Phone className="w-8 h-8 text-[#000000]" />
            <span>(92) 9 8145-2595</span>
          </div>

<p className="text-[#000000] font-bold text-3xl">Rede Social</p>
          <div className="flex items-center gap-3">
            <Instagram className="w-8 h-8 text-[#000000]" />
            <a
              href="https://www.instagram.com/lorenadourado_esteta?igsh=dXpkd3ViMmprdG9t"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#000000]"
            >
              @lorena_dourado_estetica
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
