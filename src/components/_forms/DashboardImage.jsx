// components/DashboardImage.jsx
"use client";

export default function DashboardImage({ imageUrl }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={imageUrl} 
        alt="Dashboard" 
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}