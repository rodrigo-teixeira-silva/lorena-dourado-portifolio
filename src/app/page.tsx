"use client";

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
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-center h-screen bg-[#BEDBFF] pt-30 overflow-hidden">

    

    
        {/* Conteúdo principal */}
        <div className="flex flex-col items-center -translate-y-60 z-20">
        

          <h1
            className="font-bold mt-1 text-4xl leading-[42px] text-center"
            style={{
              width: "1560px",
              fontFamily: "inter",
              color: "#1C398E",
            }}
          >
            Lorena Dourado 
            <br />
            Beleza, Elegância e Autoestima
          </h1>

          

 
        </div>
      </section>

      {/* Seção: Cards informativos */}
      <section
        className="relative z-30 bg-[#EFF6FF] w-full"
        style={{ padding: "62px 15px 48px" }}
      >
        <div
          className="font-bold text-3xl leading-[42px] text-start mx-auto"
          style={{
            width: "1120px",
            fontFamily: "inter",
            color: "#1C398E",
          }}
        >
          O futuro da Educação
          <br />
          começa aqui
        </div>

        <div className="flex flex-wrap w-full max-w-[1500px] gap-4 mt-26 justify-center mx-auto">
          <Card
            icon={UserRoundCheck}
            title="Reconhecimento Facial & Chamada Automatizada"
            description={
              "Monitora a frequência cardíaca e variação emocional durante as aulas\nIdentifica padrões de estresse, cansaço e ansiedade"
            }
          />
          <Card
            icon={Folder}
            title="Análise de emoções"
            description={`Utiliza câmeras inteligentes para detectar expressões faciais 
                \nIndica níveis de engajamento, frustração ou ansiedade 
                \nAlerta educadores sobre alunos que necessitam de atenção especial.`}
          />

          <Card
            icon={Watch}
            title="Dispositivos Vestíveis (Wearables & Biomarcadores)"
            description={`Monitora a frequência cardíaca e variação emocional durante as aulas
                \nIdentifica padrões de estresse, cansaço e ansiedade`}
          />

          <Card
            icon={AlignEndHorizontal}
            title="Painéis Inteligentes de Dashboards"
            description={`Exibe dados sobre presenças, engajamento e emoções Permite que professores, pais e gestores acompanhem o desenvolvimento dos alunos.`}
          />
        </div>

       
      </section>

      {/* Benefícios e Diferenciais - padding reduzido */}
      <section
        className="relative z-40 bg-white flex flex-col items-center w-full"
        style={{
          padding: "50px 15px", // <--- reduzido de 80px para 40px
        }}
      >
        <h2
          className="font-bold text-4xl leading-[22px] mb-16 text-center"
          style={{
            width: "920px",
            fontFamily: "inter",
            color: "#1C398E",
          }}
        >
          Serviços
        </h2>

        <BenefitCard
          title="Volume Brasileiro"
          subtitle=""
          image="/volume_brasileiro.jpeg"
          benefits={[
            "Técnica de extensão de cílios que utiliza fios mais curvados e volumosos.",
            " Proporciona um olhar marcante, com mais densidade e profundidade.",
            "Pode durar até 4 semanas com manutenções periódicas, dependendo dos cuidados diários.",
          ]}
        />

        <BenefitCard
          title="Fio a Fio"
          subtitle=""
          image="/fio_a_fio.jpeg"
          reverse
          benefits={[
            "Fios ultrafinos aplicados um a um para um efeito incrivelmente natural.",
            "Mais tempo para focar no ensino.",
            "Apoio na identificação precoce de dificuldades.",
          ]}
        />

        {/* <BenefitCard
          title="Para os Pais e Responsáveis"
          subtitle="A Sala do Futuro foi desenvolvida para atender os pais."
          image="/image3.png"
          benefits={[
            "Transparência no acompanhamento acadêmico e emocional.",
            "Leve, sem peso e resistente à água. Permite você acordar já linda, sem preocupações com maquiagem!",
            "Realça o formato dos seus olhos, dando um efeito de alongamento e um toque de glamour ao seu olhar.",
            
          ]}
        /> */}
      </section>

      {/* FAQ - padding reduzido */}
      <section
        className="relative z-40 bg-white flex flex-col items-center w-full"
        style={{
          padding: "40px 15px", // <--- reduzido de 95px para 40px
        }}
      >
        <Button
          variant="ghost"
          className="w-[151px] h-[24px] pt-1 pb-1 px-[10px] rounded-full border border-[#E2E8F0] text-sm font-medium"
        >
          Sala do futuro <ArrowRight size={18} />
        </Button>

        <h2
          className="font-bold text-3xl leading-[32px] text-center pt-5"
          style={{
            width: "920px",
            fontFamily: "inter",
            color: "#1C398E",
          }}
        >
          Tudo que você precisa saber sobre a Sala do Futuro
        </h2>

        <div
          className="text-base leading-snug text-center mt-2 z-50"
          style={{
            maxWidth: "800px",
            fontFamily: "inter",
            fontWeight: 600,
            color: "#155DFC",
          }}
        >
          Tem dúvidas sobre como funciona a Sala do Futuro, quais tecnologias
          utilizamos ou como trazer essa inovação para sua escola? <br />
          Veja abaixo as respostas para as perguntas mais frequentes! 🚀
        </div>

        <div className="flex gap-[16px] overflow-x-auto mt-10">
          {/* Tabela 1 */}
          <table className="w-130 border-collapse border border-[#E2E8F0] text-[#155DFC] text-left">
            <tbody className="bg-[#F8FAFC]">
              {[
                "O que é a Sala do Futuro",
                "Como a tecnologia é utilizada no projeto",
                "Como a Sala do Futuro ajuda alunos neurodivergentes?",
                "Os professores precisam de treinamento para usar a plataforma?",
                "Como os pais podem acessar os relatórios dos alunos?",
                "Como a privacidade e a segurança dos dados são garantidas?",
              ].map((text, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between">
                      <span>{text}</span>
                      <ChevronDown />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tabela 2 */}
          <table className="w-130 border-collapse border border-[#E2E8F0] text-[#155DFC] text-left">
            <tbody className="bg-[#F8FAFC]">
              {[
                "A Sala do Futuro é acessível para todas as escolas?",
                "Quais dispositivos são necessários para usar a plataforma?",
                "Como posso trazer a Sala do Futuro para minha escola?",
                "Quais são os benefícios para o corpo docente?",
                "A plataforma é compatível com dispositivos móveis?",
                "Como são feitas as atualizações do sistema?",
              ].map((text, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 border border-[#E2E8F0]">
                    <div className="flex items-center justify-between">
                      <span>{text}</span>
                      <ChevronDown />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button
          variant="white"
          className="w-[220px] h-[40px] text-sm font-medium mt-10 rounded-sm"
        >
          Quero saber mais
        </Button>
      </section>
    </div>
  );
}
