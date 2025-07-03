'use client';

import React from "react";
import { IMaskInput } from "react-imask";

type MaskType = string | { mask: string };

export interface InputMaskProps {
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  mask: MaskType;
  unmask?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export default function InputMask({
  name,
  value,
  onChange,
  placeholder,
  mask,
  unmask = false,
  label,
  disabled,
  required,
  inputMode,
}: InputMaskProps) {
  // Converter para string se for número
  const stringValue = typeof value === 'number' 
    ? value.toString() 
    : value || '';

  const handleAccept = (value: string) => {
    const event = {
      target: {
        name,
        value,
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 text-[#155DFC] font-medium">
          {label}
        </label>
      )}

      <IMaskInput
        id={name}
        name={name}
        mask={typeof mask === 'string' ? mask : mask.mask}
        unmask={unmask}
        value={stringValue}
        onAccept={handleAccept}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        required={required}
        className="w-full h-12 px-4 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic
          placeholder:text-gray-400 transition-all"
      />
    </div>
  );
}