import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  width?: string | number;
  height?: string | number;
  iconSize?: number;
  iconBackgroundColor?: string;
  showIconBackground?: boolean;
  iconRounded?: "none" | "md" | "full"; // novo
  showButton?: boolean;
  buttonText?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "#62748E",
  width = 590,
  height = 190,
  iconSize = 30,
  iconBackgroundColor = "#EAF0FF",
  showIconBackground = false,
  iconRounded = "md", // valor padrão
  showButton = false,
  buttonText = "Saiba mais",
}: FeatureCardProps) {
  const roundedClass =
    iconRounded === "full"
      ? "rounded-full"
      : iconRounded === "none"
      ? ""
      : "rounded-md";

  return (
    <div
      className="flex flex-col justify-between p-6 border border-gray-300 bg-white rounded-md"
      style={{ width, height }}
    >
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

      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#1C398E] mb-2">{title}</h3>
        <p className="text-sm whitespace-pre-line text-[#62748E] flex-grow">
          {description}
        </p>
      </div>

      {showButton && (
        <Button
          variant="ghost"
          className="w-[110px] h-[40px] px-[10px] rounded-full border border-white text-white text-sm font-medium mt-4 self-start"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
