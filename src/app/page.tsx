"use client";

import Image from "next/image";
import {
  Folder,
  UserRoundCheck,
  AlignEndHorizontal,
  Watch,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import BenefitCard from "@/components/BenefitCard";
import { useState, useEffect, useCallback } from "react";

// Enhanced Carousel Component
function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = useCallback(
    () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)),
    [slides.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative overflow-hidden w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
        <button
          onClick={prev}
          className="p-1 sm:p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10 transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={next}
          className="p-1 sm:p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10 transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`
                transition-all w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer
                ${curr === i ? "bg-white sm:w-6" : "bg-white/50 hover:bg-white/70"}
              `}
              onClick={() => setCurr(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Quanto tempo dura uma aplicação de cílios?",
      answer:
        "A aplicação de cílios postiços geralmente dura entre 1h30 a 2h30, dependendo da técnica utilizada e da experiência do profissional.",
    },
    {
      question: "Preciso de algum cuidado especial após a aplicação?",
      answer:
        "Sim, recomendamos evitar molhar os cílios nas primeiras 24 horas, não usar maquiagem oleosa na região dos olhos e não esfregar os olhos.",
    },
    {
      question: "Posso usar maquiagem após a aplicação?",
      answer:
        "Pode usar maquiagem após 24 horas da aplicação, porém evite produtos oleosos e demaquilantes à base de óleo, pois podem dissolver a cola.",
    },
    {
      question: "Quanto tempo dura o efeito do Lash Lifting?",
      answer:
        "O Lash Lifting dura em média de 6 a 8 semanas, que é o tempo natural do ciclo de crescimento dos cílios.",
    },
    {
      question: "Com que frequência devo fazer a manutenção?",
      answer:
        "A manutenção deve ser feita a cada 2-3 semanas para repor os cílios que caíram naturalmente e manter o volume uniforme.",
    },
    {
      question: "Os procedimentos são doloridos?",
      answer:
        "Não, os procedimentos são indolores. Algumas pessoas podem sentir um leve desconforto no início, mas isso passa rapidamente.",
    },
    {
      question: "Posso fazer se tiver cílios curtos?",
      answer:
        "Sim, existem técnicas específicas para cílios curtos. Nossos profissionais podem recomendar a melhor opção para o seu caso.",
    },
    {
      question: "Qual técnica é mais indicada para mim?",
      answer:
        "A técnica ideal varia conforme a estrutura dos seus cílios naturais, seu estilo de vida e preferências. Recomendamos uma avaliação personalizada.",
    },
    {
      question: "Preciso fazer teste alérgico antes?",
      answer:
        "Sim, especialmente se você tem histórico de alergias. Realizamos um teste 24h antes do procedimento para sua segurança.",
    },
    {
      question: "Como devo preparar meus cílios antes da aplicação?",
      answer:
        "Chegue sem maquiagem na região dos olhos, evite usar máscara de cílios no dia do procedimento e lave bem o rosto com um sabonete suave.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#f8f7f3]">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[90vh] sm:min-h-screen bg-[#f8f7f3] overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1560px] mx-auto z-20 gap-8 md:gap-12 lg:gap-16">
          <div className="md:flex-1 text-center md:text-left flex flex-col items-center md:items-start px-4 sm:px-0">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-none text-black font-serif">
              Lorena Dourado
            </h1>
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4 md:mt-6 leading-tight text-black font-serif">
              Beleza, Elegância e Autoestima
            </h2>
          </div>

          <div className="md:flex-1 flex w-full justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-square">
              <Image
                src="/loren1.png"
                alt="Lorena Dourado"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Carousel Section */}
      <section className="relative z-20 bg-white w-full py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-[#000000]">
            Nossos Trabalhos
          </h2>
          <Carousel autoSlide autoSlideInterval={5000}>
            {[
              <div key={1} className="flex-[0_0_100%] h-full w-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/cartalogo_1.png"
                    alt="Volume Brasileiro"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority
                  />
                </div>
              </div>,
              <div key={2} className="flex-[0_0_100%] h-full w-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/cartalogo_2.png"
                    alt="Volume Russo"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              </div>,
              <div key={3} className="flex-[0_0_100%] h-full w-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/cartalogo_3.png"
                    alt="Fio a Fio"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              </div>,
              <div key={4} className="flex-[0_0_100%] h-full w-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/cartalogo_4.png"
                    alt="Lash Lifting"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              </div>,
              <div key={5} className="flex-[0_0_100%] h-full w-full">
                <div className="relative w-full h-full">
                  <Image
                    src="/cartalogo_5.png"
                    alt="Design de Sobrancelhas"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              </div>,
            ]}
          </Carousel>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-40 bg-white flex flex-col items-center w-full py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1C398E] font-sans mb-8 sm:mb-12 text-center">
          Serviços disponíveis
        </h2>

        <div className="w-full max-w-7xl space-y-8 sm:space-y-12 md:space-y-16">
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
            subtitle="Extensão de cílios natural"
            image="/fio_a_fio.jpeg"
            benefits={[
              "Aplicação individual de fios ultrafinos.",
              "Resultado natural e refinado.",
              "Ideal para quem busca um efeito discreto e elegante.",
            ]}
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

      {/* FAQ Section */}
      <section className="relative z-40 bg-white flex flex-col items-center w-full py-12 sm:py-16 px-4 sm:px-6">
        <Button
          variant="ghost"
          className="w-auto px-4 py-1 rounded-full border border-[#E2E8F0] text-sm font-medium mb-6"
        >
          Dúvidas Frequentes <ArrowRight size={18} className="ml-2" />
        </Button>

        <h2 className="font-bold text-2xl sm:text-3xl text-[#1C398E] font-sans text-center max-w-3xl">
          Perguntas mais comuns sobre nossos serviços
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-center mt-4 max-w-3xl text-[#155DFC] font-medium">
          Tem dúvidas sobre nossos procedimentos, cuidados ou agendamentos?
          Confira as respostas para as perguntas mais frequentes!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 w-full max-w-6xl">
          <div className="space-y-3 sm:space-y-4">
            {faqs.slice(0, 5).map((faq, index) => (
              <div
                key={index}
                className="border border-[#E2E8F0] rounded-lg p-3 sm:p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#155DFC] font-medium text-sm sm:text-base">
                    {faq.question}
                  </span>
                  {activeFaqIndex === index ? (
                    <ChevronUp className="text-[#155DFC] w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="text-[#155DFC] w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                {activeFaqIndex === index && (
                  <p className="mt-2 sm:mt-3 text-[#64748B] text-sm sm:text-base">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.slice(5).map((faq, index) => (
              <div
                key={index + 5}
                className="border border-[#E2E8F0] rounded-lg p-3 sm:p-4 bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                onClick={() => toggleFaq(index + 5)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#155DFC] font-medium text-sm sm:text-base">
                    {faq.question}
                  </span>
                  {activeFaqIndex === index + 5 ? (
                    <ChevronUp className="text-[#155DFC] w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="text-[#155DFC] w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                {activeFaqIndex === index + 5 && (
                  <p className="mt-2 sm:mt-3 text-[#64748B] text-sm sm:text-base">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="white"
          className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium mt-8 sm:mt-12 rounded-sm hover:bg-[#1C398E] hover:text-white transition-colors"
          onClick={() => window.open("https://wa.me/559281452595", "_blank")}
        >
          Agendar Consulta
        </Button>
      </section>
    </div>
  );
}