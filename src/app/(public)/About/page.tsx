"use client";


export default function About() {
  return (
    <section className="relative w-full h-screen bg-[#BEDBFF] overflow-hidden flex items-center justify-center px-6">
    

      {/* Conteúdo textual */}
      <div className="relative max-w-[700px] text-center z-10">
        <h1 className="text-5xl font-bold text-[#000000] font-inter mb-8">
          Lorena Dourado
        </h1>

        <h2 className="text-lg text-[#1C398E] font-inter leading-relaxed whitespace-pre-line">
          {`Texto informativo.`}
        </h2>
      </div>
    </section>
  );
}
