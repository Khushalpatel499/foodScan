import { useState } from 'react';
import { onboardingSlides, completeOnboarding } from '../../utils/onboarding';
import { Button } from './Button';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [current, setCurrent] = useState(0);
  const slide = onboardingSlides[current];
  const isLast = current === onboardingSlides.length - 1;

  const next = () => {
    if (isLast) {
      completeOnboarding();
      onComplete();
    } else {
      setCurrent(c => c + 1);
    }
  };

  const skip = () => {
    completeOnboarding();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8">
      {/* Skip button */}
      <button onClick={skip} className="absolute top-6 right-6 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        Skip
      </button>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm text-center animate-fade-in" key={current}>
        {/* Emoji with colored background */}
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center text-6xl mb-8 shadow-lg"
          style={{ backgroundColor: `${slide.color}20` }}
        >
          {slide.emoji}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{slide.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{slide.description}</p>
      </div>

      {/* Bottom controls */}
      <div className="w-full max-w-sm pb-12 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {onboardingSlides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button onClick={next} size="lg" className="w-full">
          {isLast ? 'Get Started 🚀' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
