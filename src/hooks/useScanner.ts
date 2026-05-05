import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseScannerOptions {
  onScan: (barcode: string) => void;
  elementId: string;
}

/**
 * Custom hook that manages barcode scanner lifecycle.
 * Handles camera permissions, start/stop, and cleanup.
 */
export function useScanner({ onScan, elementId }: UseScannerOptions) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScanned = useRef(false);

  const start = useCallback(async () => {
    setError(null);
    hasScanned.current = false;

    try {
      const scanner = new Html5Qrcode(elementId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
          if (!hasScanned.current) {
            hasScanned.current = true;
            onScan(decodedText);
            stop();
          }
        },
        () => {} // ignore scan failures
      );

      setIsActive(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Camera access denied';
      setError(msg.includes('NotAllowed') ? 'Camera permission denied. Please allow camera access.' : msg);
    }
  }, [elementId, onScan]);

  const stop = useCallback(async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
    }
    scannerRef.current = null;
    setIsActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  return { isActive, error, start, stop };
}
