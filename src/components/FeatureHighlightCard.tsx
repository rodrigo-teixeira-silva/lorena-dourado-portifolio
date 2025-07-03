//import Image from "next/image";
import { CSSProperties } from "react";

interface FeatureHighlightCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  width?: number | string;
  height?: number | string;
  imageWidth?: number;
  imageHeight?: number;
  titleStyle?: CSSProperties;
  descriptionStyle?: CSSProperties;
}

export function FeatureHighlightCard({
  title,
  description,
  // imageSrc,
  // imageAlt = "",
  width = 218,
  height = 94,
  // imageWidth = 32,
  // imageHeight = 32,
  titleStyle,
  descriptionStyle,
}: FeatureHighlightCardProps) {
  const cardStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      style={cardStyle}
      className="flex items-start gap-2 pl-6 pr-5 border-l-[4px] border-[#155DFC] bg-white rounded shadow-md relative"
    >
      {/* <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="absolute top-2 right-2"
      /> */}

      <div className="flex flex-col justify-center">
        <h3
          className="font-black text-3xl leading-[36px] tracking-normal text-[#1C398E]"
          style={titleStyle}
        >
          {title}
        </h3>
        <p
          className="font-normal text-base leading-6 tracking-normal text-[#62748E] mt-1"
          style={descriptionStyle}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
