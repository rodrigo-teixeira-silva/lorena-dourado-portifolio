import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import Image from "next/image";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string | string[];
  iconColor?: string;
  width?: string | number;
  height?: string | number;
  iconSize?: number;
  iconBackgroundColor?: string;
  showIconBackground?: boolean;
  iconRounded?: "none" | "md" | "full";
  showButton?: boolean;
  buttonText?: string;
  bulletPoints?: boolean;
  borderColor?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  imageClassName?: string;
  imageCover?: boolean;
}

export default function Card_trasparency_Portal({
  icon: Icon,
  title,
  description,
  iconColor = "#62748E",
  width = 350,
  height = 400,
  iconSize = 30,
  iconBackgroundColor = "#EAF0FF",
  showIconBackground = false,
  iconRounded = "md",
  showButton = false,
  buttonText = "Saiba mais",
  bulletPoints = false,
  borderColor = "#E5E7EB",
  imageSrc,
  imageAlt = "",
  imagePriority = false,
  imageClassName = "",
}: FeatureCardProps) {
  const roundedClass =
    iconRounded === "full"
      ? "rounded-full"
      : iconRounded === "none"
      ? ""
      : "rounded-md";

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              {bulletPoints && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#62748E] mt-2 mr-2"></span>
              )}
              <span className="text-sm text-[#62748E]">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-sm text-[#62748E] line-clamp-3">{description}</p>
    );
  };

  return (
    <div
      className="flex flex-col border rounded-md bg-white overflow-hidden"
      style={{
        width,
        height,
        borderColor,
      }}
    >
      {/* Imagem */}
      {imageSrc && (
        <div className="relative w-full h-[200px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={imagePriority}
            className={`object-cover ${imageClassName}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between">
          {Icon && (
            <div className="flex items-center mb-3">
              {showIconBackground ? (
                <div
                  className={`w-12 h-12 flex items-center justify-center ${roundedClass}`}
                  style={{ backgroundColor: iconBackgroundColor }}
                >
                  <Icon size={iconSize} style={{ color: iconColor }} />
                </div>
              ) : (
                <Icon size={iconSize} style={{ color: iconColor }} />
              )}
            </div>
          )}

          <h3 className="text-xl font-bold text-[#1C398E] mb-2 flex-grow line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="flex flex-col flex-grow">{renderDescription()}</div>

        {showButton && (
          <Button
            variant="ghost"
            className="w-[110px] h-[40px] px-[10px] rounded-full border border-white text-white text-sm font-medium mt-4 self-start"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
