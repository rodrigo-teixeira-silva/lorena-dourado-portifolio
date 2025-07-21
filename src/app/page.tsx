import Image from "next/image";
import {
  Folder,
  UserRoundCheck,
  AlignEndHorizontal,
  Watch,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import BenefitCard from "@/components/BenefitCard";

export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundImage: "url('/loreBackground.png')" }}
    >
      {/* Seção Hero responsiva */}
      <section className="relative flex items-center justify-center min-h-screen bg-[#f8f7f3] overflow-hidden">
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1560px] mx-auto z-20 gap-8 md:gap-0">
    {/* Texto à esquerda */}
    <div className="md:flex-1 text-center md:text-left flex flex-col items-center md:items-start">
      <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl leading-tight md:leading-none text-black font-serif">
        Lorena Dourado
      </h1>
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-4 md:mt-6 leading-tight text-black font-serif">
        Beleza, Elegância e Autoestima
      </h2>
    </div>

    {/* Imagem à direita sem espaço acima */}
    <div className="md:flex-1 flex w-full">
      <div className="relative w-600 max-w-5xl  aspect-square">
        <Image
          src="/loren1.png"
          alt="Lorena Dourado"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  </div>
</section>


      {/* Seção: Cards informativos responsivos */}
      <section className="relative z-30 bg-[#EFF6FF] w-full py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-[#1C398E] font-sans mb-8 md:mb-12">
            Nossos Serviços
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-46">
            <Card
              icon={UserRoundCheck}
              title="Volume Brasileiro"
              description="Técnica que utiliza fios curvados para um olhar marcante com densidade e profundidade."
            />
            <Card
              icon={Folder}
              title="Volume Russo"
              description="Técnica avançada que cria um efeito 3D intenso com múltiplos fios por extensão."
            />
            <Card
              icon={Watch}
              title="Fio a Fio"
              description="Aplicação individual para um efeito natural e refinado, perfeito para looks discretos."
            />
            <Card
              icon={AlignEndHorizontal}
              title="Lash Lifting"
              description="Realce natural dos seus cílios com curvatura perfeita que dura semanas."
            />
          </div>
        </div>
      </section>

      {/* Seção: Benefícios responsiva */}
      <section className="relative z-40 bg-white flex flex-col items-center w-full py-12 md:py-16 px-4">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-[#1C398E] font-sans mb-8 md:mb-12 text-center">
          Serviços disponíveis
        </h2>

        <div className="w-full max-w-7xl space-y-12 md:space-y-16">
          <BenefitCard
            title="Volume Brasileiro"
            image="/volume_brasileiro.jpeg"
            benefits={[
              "Técnica de extensão de cílios que utiliza fios mais curvados e volumosos.",
              "Proporciona um olhar marcante, com mais densidade e profundidade.",
              "Duração de até 4 semanas com manutenções periódicas.",
            ]}
            subtitle={""}
          />

          <BenefitCard
            title="Volume Russo"
            subtitle="Extensão de cílios com efeito 3D"
            image="/volume_russo.jpeg"
            reverse
            benefits={[
              "Técnica avançada que aplica múltiplos fios em cada cílio natural.",
              "Efeito 3D intenso e cheio de glamour.",
              "Requer manutenção a cada 2-3 semanas.",
            ]}
          />

          <BenefitCard
            title="Fio a Fio"
            image="/fio_a_fio.jpeg"
            benefits={[
              "Aplicação individual de fios ultrafinos.",
              "Resultado natural e refinado.",
              "Ideal para quem busca um efeito discreto e elegante.",
            ]}
            subtitle={""}
          />

          <BenefitCard
            title="Híbrido"
            image="/hibrido.jpeg"
            reverse
            benefits={[
              "Combinação perfeita entre volume e fio a fio.",
              "Proporciona densidade com naturalidade.",
              "Versátil para diferentes ocasiões.",
            ]}
            subtitle={""}
          />

          <BenefitCard
            title="Lash Lifting"
            image="/last_leaft.jpeg"
            benefits={[
              "Realce natural dos seus próprios cílios.",
              "Curvatura perfeita que dura semanas.",
              "Ótima opção para quem não quer extensões.",
            ]}
            subtitle={""}
          />
        </div>
      </section>

      {/* Seção: FAQ responsivo */}
      <section className="relative z-40 bg-white flex flex-col items-center w-full py-12 md:py-16 px-4">
        <Button
          variant="ghost"
          className="w-auto px-4 py-1 rounded-full border border-[#E2E8F0] text-sm font-medium mb-6"
        >
          Dúvidas Frequentes <ArrowRight size={18} className="ml-2" />
        </Button>

        <h2 className="font-bold text-2xl md:text-3xl text-[#1C398E] font-sans text-center max-w-3xl">
          Perguntas mais comuns sobre nossos serviços
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-center mt-4 max-w-3xl text-[#155DFC] font-medium">
          Tem dúvidas sobre nossos procedimentos, cuidados ou agendamentos?
          Confira as respostas para as perguntas mais frequentes!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 w-full max-w-6xl">
          {/* Coluna 1 */}
          <div className="space-y-4">
            {[
              "Quanto tempo dura uma aplicação de cílios?",
              "Preciso de algum cuidado especial após a aplicação?",
              "Posso usar maquiagem após a aplicação?",
              "Quanto tempo dura o efeito do Lash Lifting?",
              "Com que frequência devo fazer a manutenção?",
            ].map((text, index) => (
              <div
                key={index}
                className="border border-[#E2E8F0] rounded-lg p-4 bg-[#F8FAFC]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#155DFC] font-medium">{text}</span>
                  <ChevronDown className="text-[#155DFC]" />
                </div>
              </div>
            ))}
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            {[
              "Os procedimentos são doloridos?",
              "Posso fazer se tiver cílios curtos?",
              "Qual técnica é mais indicada para mim?",
              "Preciso fazer teste alérgico antes?",
              "Como devo preparar meus cílios antes da aplicação?",
            ].map((text, index) => (
              <div
                key={index}
                className="border border-[#E2E8F0] rounded-lg p-4 bg-[#F8FAFC]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#155DFC] font-medium">{text}</span>
                  <ChevronDown className="text-[#155DFC]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="white"
          className="w-full sm:w-auto px-8 py-3 text-sm font-medium mt-8 md:mt-12 rounded-sm"
        >
          Agendar Consulta
        </Button>
      </section>
    </div>
  );
}
