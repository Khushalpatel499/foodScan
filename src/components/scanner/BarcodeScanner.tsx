import { useCallback } from 'react';
import { useScanner } from '../../hooks/useScanner';
import { Button } from '../ui/Button';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const { isActive, error, start, stop } = useScanner({
    onScan,
    elementId: 'scanner-viewport',
  });

  const handleStart = useCallback(() => { start(); }, [start]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scanner viewport */}
      <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900">
        <div id="scanner-viewport" className="w-full h-full" />

        {!isActive && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900/90">
            <svg className="w-16 h-16 mb-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
            </svg>
            <p className="text-sm opacity-75">Tap to start scanning</p>
          </div>
        )}

        {/* Scan line animation */}
        {isActive && (
          <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none">
            <div className="scan-line absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="w-full max-w-sm p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm text-center" role="alert">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!isActive ? (
          <Button onClick={handleStart} size="lg" className="gap-2" aria-label="Start barcode scanner">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9V5a2 2 0 012-2h4M15 3h4a2 2 0 012 2v4M21 15v4a2 2 0 01-2 2h-4M9 21H5a2 2 0 01-2-2v-4" />
            </svg>
            Scan Barcode
          </Button>
        ) : (
          <Button onClick={stop} variant="secondary" aria-label="Stop scanner">
            Stop Scanner
          </Button>
        )}
      </div>
    </div>
  );
}
