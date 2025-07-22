"use client";

export default function About() {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden 
      flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/loreBackground.png')" }}
    >
      <div className="absolute inset-0 bg-#d8c36d bg-opacity-30"></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl h-full gap-8 md:gap-12 z-10">
        {/* Imagem - aparece primeiro em mobile */}
        <div className="w-full lg:w-1/2 flex justify-center order-first lg:order-none px-4">
          <div className="relative">
            <img
              className="h-auto max-w-full lg:max-w-md xl:max-w-lg rounded-[50%] shadow-xl border-4 border-yellow-500 border-opacity-50 animate-fadeIn object-cover aspect-square"
              src="/lorena.png"
              alt="Lorena Dourado, profissional de estética"
              style={{ width: '600px', height: '700px' }} 
              />
          </div>
        </div>

        {/* Texto - aparece depois em mobile */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-black font-inter mb-6 drop-shadow-lg">
            Lorena Dourado
          </h1>

          <div className="bg-transluced bg-opacity-80 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-base sm:text-lg text-black font-medium leading-relaxed whitespace-pre-line">
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
        </div>
      </div>
    </section>
  );
}