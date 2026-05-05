import { useCallback } from 'react';
import { BarcodeScanner } from '../components/scanner/BarcodeScanner';
import { ManualEntry } from '../components/scanner/ManualEntry';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { useProduct } from '../hooks/useProduct';
import { useTranslation } from '../hooks/useTranslation';

export function ScanPage() {
  const { product, loading, error, lookup, reset } = useProduct();
  const t = useTranslation();

  const handleScan = useCallback((barcode: string) => {
    lookup(barcode);
  }, [lookup]);

  if (product) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={reset} className="gap-1">
          {t.scanAnother}
        </Button>
        <ProductCard product={product} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.scanTitle}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.scanSubtitle}</p>
      </div>

      {loading && <ProductSkeleton />}

      {error && !loading && (
        <div className="text-center space-y-3 p-6 rounded-2xl bg-red-50 dark:bg-red-900/10">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button variant="secondary" onClick={reset}>{t.tryAgain}</Button>
        </div>
      )}

      {!loading && !error && (
        <>
          <BarcodeScanner onScan={handleScan} />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 uppercase">{t.orManually}</span>
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
