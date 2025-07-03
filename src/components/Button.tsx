'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'white' | 'ghost' | 'invisible';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const baseStyles =
    'py-2 px-4 font-semibold transition-colors flex items-center justify-center gap-2 rounded-md'; 
    // <-- "rounded-md" para cantos arredondados suaves

  const variants = {
    default: 'bg-[#155DFC] text-white hover:bg-blue-700',
    white:
      'bg-white text-[#1C398E] border border-[#155DFC] hover:bg-white hover:text-[#1C398E] hover:border-[#155DFC]',
    ghost:
      'bg-transparent text-[#1C398E] border border-[#155DFC] hover:bg-[#F5F5F5]',
    invisible:
      'bg-transparent text-[#1C398E] border border-[##F5F5F5] hover:bg-[#F5F5F5]',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
