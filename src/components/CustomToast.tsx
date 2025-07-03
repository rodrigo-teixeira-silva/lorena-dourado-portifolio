"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ToastState = {
  id: string;
  visible: boolean;
};

type CustomToastProps = {
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  toast: ToastState;
  autoHideDuration?: number; 
  onClose?: () => void;      
};

export default function CustomToast({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  toast,
  autoHideDuration = 5000,
  onClose,
}: CustomToastProps) {
  
  useEffect(() => {
    if (toast.visible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [toast.visible, autoHideDuration, onClose]);

  if (!toast.visible) return null;

  return (
    <div
      className="fixed top-5 right-5 z-50 bg-white text-[#1C398E] p-6 rounded-lg shadow-lg w-[340px]
                 border border-[#1C398E] animate-fade-in"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold">{title}</h4>
          {description && <p className="mt-1 text-sm text-gray-700">{description}</p>}
        </div>

        <button onClick={() => onClose?.()} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {onCancel && (
          <button
            onClick={() => {
              onCancel();
              onClose?.();
            }}
            className="text-gray-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
        )}
        {onConfirm && (
          <button
            onClick={() => {
              onConfirm();
              onClose?.();
            }}
            className="bg-[#1C398E] text-white px-3 py-1 rounded hover:bg-[#153171] transition"
          >
            {confirmText}
          </button>
        )}
      </div>
    </div>
  );
}
