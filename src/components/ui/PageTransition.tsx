import { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps page content with a smooth enter animation.
 * Uses CSS animations for performance (no JS animation library needed).
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}
