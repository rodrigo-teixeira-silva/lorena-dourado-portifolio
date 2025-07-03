"use client";

import FormSchoolManager from "./FormSchoolManager";

type ModalFormSchoolManagerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (novoGestor: { id: number; name: string; email: string }) => void;
  schoolId: number | null;
  schoolName?: string;
};

export default function ModalFormSchoolManager({
  isOpen,
  onClose,
  onSuccess,
  schoolId,
  schoolName = "",
}: ModalFormSchoolManagerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Cadastrar Gestor</h2>

        <FormSchoolManager
          schoolId={schoolId}
          schoolName={schoolName}
          onSuccess={(novoGestor) => {
            const gestorComId = { id: Date.now(), ...novoGestor };
            onSuccess?.(gestorComId);
            onClose();
          }}
        />
      </div>
    </div>
  );
}