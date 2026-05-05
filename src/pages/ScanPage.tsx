import { useCallback } from 'react';
import { BarcodeScanner } from '../components/scanner/BarcodeScanner';
import { ManualEntry } from '../components/scanner/ManualEntry';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { useProduct } from '../hooks/useProduct';

export function ScanPage() {
  const { product, loading, error, lookup, reset } = useProduct();

  const handleScan = useCallback((barcode: string) => {
    lookup(barcode);
  }, [lookup]);

  // Show product result
  if (product) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={reset} className="gap-1">
          ← Scan Another
        </Button>
        <ProductCard product={product} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FoodScan</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Scan a barcode to get instant health insights</p>
      </div>

      {/* Loading state */}
      {loading && <ProductSkeleton />}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center space-y-3 p-6 rounded-2xl bg-red-50 dark:bg-red-900/10">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button variant="secondary" onClick={reset}>Try Again</Button>
        </div>
      )}

      {/* Scanner */}
      {!loading && !error && (
        <>
          <BarcodeScanner onScan={handleScan} />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 uppercase">or enter manually</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-center">
            <ManualEntry onSubmit={handleScan} />
          </div>
        </>
      )}
    </div>
  );
}
