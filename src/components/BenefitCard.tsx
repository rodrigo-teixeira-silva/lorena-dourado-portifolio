import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";

interface BenefitCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  image: string;
  alt?: string;
  reverse?: boolean;
}

export default function BenefitCard({
  title,
  subtitle,
  benefits,
  image,
  alt = "Benefício",
  reverse = false,
}: BenefitCardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto p-4 md:p-0 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Imagem (responsiva) */}
      <div className="w-full md:w-1/2 h-48 md:h-64 lg:h-72 relative">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Texto (responsivo) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">
        <h3 className="font-semibold text-lg md:text-xl text-[#1C398E] font-inter">
          {title}
        </h3>

        <p className="text-sm md:text-base leading-5 text-[#155DFC] font-inter">
          {subtitle}
        </p>

        <ul className="flex flex-col gap-2 text-sm md:text-base leading-5 text-[#155DFC] font-inter">
          {benefits.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="mt-0.5 flex-shrink-0 text-[#155DFC]" size={14} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button
          type="submit"
          className="w-fit mt-2 px-4 h-9 md:h-10 rounded-md active:opacity-70 text-sm md:text-base"
        >
          Saiba mais <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}