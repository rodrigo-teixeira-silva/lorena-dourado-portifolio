"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  showControls = true,
  showIndicators = true,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = useCallback(
    () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1)),
    [slides.length]
  );

  const goToIndex = (index: number) => {
    setCurr(index);
  };

  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }

    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      {showControls && slides.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <button
            onClick={prev}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`transition-all w-3 h-3 rounded-full ${
                  curr === i ? "bg-white w-6" : "bg-white/50"
                }`}
                onClick={() => goToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}