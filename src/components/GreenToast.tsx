"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react"; // Você precisará instalar lucide-react para os ícones

interface GreenToastProps {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function GreenToast({
  title,
  message,
  show,
  onClose,
  duration = 3000,
}: GreenToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="w-[374px] bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 mt-0.5 text-white" />
          <div>
            <h3 className="font-sans font-bold text-base leading-6 tracking-normal">
              {title}
            </h3>
            <p className="font-sans text-sm leading-6 tracking-normal">
              {message}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-green-200">
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}