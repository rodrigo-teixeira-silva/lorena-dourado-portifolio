"use client";

export default function About() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden 
      flex items-center justify-center"
      style={{ backgroundImage: "url('/loreBackground.png')" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-8 md:gap-4 px-6">
        {/* Texto à esquerda */}
        <div className="max-w-[700px] text-left z-10">
          <h1 className="text-5xl font-bold text-[#000000] font-inter mb-8">
            Lorena Dourado
          </h1>

          <h2 className="text-lg text-[#000000] font-bold leading-relaxed whitespace-pre-line">
            Olá! Meu nome é Lorena Dourado, sou profissional da área de estética e cosméticos,
            com 9 anos de experiência dedicada à beleza, bem-estar e autoestima.
            Minha missão é realçar a beleza natural de cada pessoa, promovendo
            não só resultados visíveis, mas também momentos de autocuidado e
            confiança. Sou especializada em: limpeza de pele, design de
            sobrancelhas, estética facial e corporal, maquiagem profissional,
            entre outros, e estou em constante atualização para oferecer o que
            há de mais moderno e seguro no mercado estético. Atuo com ética,
            carinho e profissionalismo, prezando sempre pela qualidade no
            atendimento, uso de produtos certificados e um ambiente acolhedor
            para todos os clientes. Atendimento personalizado. Capacitação
            contínua. Resultados que valorizam sua beleza. Vamos juntos cuidar
            de você com amor, técnica e responsabilidade. Agende um horário e
            descubra o poder do seu brilho natural!
          </h2>
        </div>

        {/* Imagem à direita */}
        <div className="z-10">
          <img
            className="h-auto max-w-2xl pt-10 h-auto max-w-2xl pt-10 opacity-80 animate-fadeIn"
            src="/lorena.png"
            alt="image description"
          />
        </div>
      </div>
    </section>
  );
}
