// components/CardImage.tsx
import Image from 'next/image';

interface CardImageProps {
  imageSrc: string;
  alt?: string;
  profileSrc?: string;
  profileAlt?: string;
  role?: string;
  publishDate?: string;
  description?: string;
}

export default function CardImage({
  imageSrc,
  alt = 'Imagem do card',
  profileSrc = '/perfil.png',
  profileAlt = 'Foto do perfil',
  role = 'Colaborador Pedagogo',
  publishDate = 'Publicado em 2, Jun 2025',
  description = 'Impacto nos Alunos Neurodivergentes',
}: CardImageProps) {
  return (
    <div className="w-[292px] h-[334px] rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
      {/* Imagem principal */}
      <Image
        src={imageSrc}
        alt={alt}
        width={292}
        height={160}
        className="w-full h-[160px] border-t border-gray-300 object-cover"
        priority
      />

      
      <div className="p-4">
        {/* Linha com foto de perfil e informações */}
        <div className="flex items-center gap-2 border-t border-gray-300 pt-2">
          <Image
            src={profileSrc}
            alt={profileAlt}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-[#1C398E] bg-[#FFFFFF] px-2 py-1 rounded">
              {role}
            </p>
            <p className="text-sm ml-2 text-[#62748E]">{publishDate}</p>
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-4">
          <p className="w-[260px] h-[56px] text-lg font-semibold leading-7 text-[#1C398E] bg-white px-2 py-2 rounded">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
