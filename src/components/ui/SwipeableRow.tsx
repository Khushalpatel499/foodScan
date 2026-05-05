import { useRef, useState, type ReactNode } from 'react';

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
}

/**
 * Reusable swipe-to-delete wrapper.
 * Wraps any list item — swipe left reveals delete action.
 * Uses touch events, no external library.
 */
export function SwipeableRow({ children, onDelete }: SwipeableRowProps) {
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const swiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    swiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swiping.current) return;
    const diff = e.touches[0].clientX - startX.current;
    // Only allow left swipe
    if (diff < 0) setOffset(Math.max(diff, -100));
  };

  const handleTouchEnd = () => {
    swiping.current = false;
    if (offset < -60) {
      // Trigger delete
      setOffset(-100);
      setTimeout(onDelete, 200);
    } else {
      setOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Delete background */}
      <div className="absolute inset-y-0 right-0 w-24 bg-red-500 flex items-center justify-center rounded-r-xl">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative bg-gray-50 dark:bg-gray-800/50 transition-transform"
        style={{ transform: `translateX(${offset}px)`, transition: swiping.current ? 'none' : 'transform 0.2s ease' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}
