'use client'

import React from 'react'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder, type = 'text', ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
        {...props}
      />
    </div>
  )
}
