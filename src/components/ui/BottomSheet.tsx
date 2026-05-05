import { useEffect, useRef, useState, type ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

/**
 * Reusable bottom sheet component.
 * Slides up from bottom with backdrop, draggable to dismiss.
 */
export function BottomSheet({ open, onClose, children, title }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const startY = useRef(0);
  const dragging = useRef(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    dragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) setDragY(diff); // only allow downward drag
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    if (dragY > 120) {
      onClose();
    }
    setDragY(0);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 inset-x-0 max-h-[85vh] bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragging.current ? 'none' : 'transform 0.3s ease',
          animation: 'slide-up 0.3s ease',
        }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
