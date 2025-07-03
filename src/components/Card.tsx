import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="relative w-[550px] h-[190px] p-4 border border-gray-300"
      style={{ background: "#DBEAFE" }}
    >
      <div className="absolute top-2 left-2 w-[60px] h-[60px] rounded-full bg-blue-600 
      flex items-center justify-center">
        <Icon className="text-white" size={30} />
      </div>
      <div className="ml-[80px] mt-2">
        <h3 className="text-xl font-bold text-[#1C398E]">{title}</h3>
        <p className="text-sm text-[#155DFC] mt-2 whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
