"use client";

import { CircleX } from "lucide-react";
import { ReactNode } from "react";
import FormEditSchoolManager from "./FormEditSchoolManager";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  schoolId?: number | null;
}

export default function ModalFormSchoolManager({ 
  isOpen, 
  onClose, 
  
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white border rounded-2xl p-8 flex flex-col gap-8 w-full max-w-7xl mx-auto
      h-[90vh] overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <CircleX size={20} color="#155DFC" />
        </button>
        
        {/* Renderize diretamente o FormEditSchoolManager */}
        <FormEditSchoolManager />
      </div>
    </div>
  );
}