import { useRef, useState, type ReactNode } from 'react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => void | Promise<void>;
}

/**
 * Reusable pull-to-refresh wrapper.
 * Shows a spinner when pulled down, triggers onRefresh callback.
 */
export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only activate if scrolled to top
    const el = e.currentTarget;
    if (el.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!pulling.current || refreshing) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.4, 80)); // damped pull
    }
  };

  const handleTouchEnd = async () => {
    pulling.current = false;
    if (pullDistance > 50) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    setPullDistance(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all"
        style={{ height: `${pullDistance}px` }}
      >
        <div className={`w-6 h-6 border-2 border-primary border-t-transparent rounded-full ${refreshing || pullDistance > 50 ? 'animate-spin' : ''}`}
          style={{ opacity: pullDistance / 60, transform: `rotate(${pullDistance * 3}deg)` }}
        />
      </div>

      {children}
    </div>
  );
}
