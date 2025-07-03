'use client';

import React, { forwardRef } from "react";

export interface InputProps {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  label?: string;
  inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
  pattern?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;

}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  label,
  inputMode,
  pattern,
  disabled,
  required,
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        disabled={disabled}
        required={required}
        className="w-full h-12 px-4 border border-gray-300 rounded-md
         focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic
         placeholder:text-gray-400 transition-all"
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
