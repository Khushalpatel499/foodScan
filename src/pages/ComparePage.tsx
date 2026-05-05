import { useState, useCallback } from 'react';
import type { Product } from '../types';
import { fetchProductByBarcode } from '../services/productApi';
import { useAppStore } from '../stores/appStore';
import { ComparisonView } from '../components/product/ComparisonView';
import { Button } from '../components/ui/Button';
import { ManualEntry } from '../components/scanner/ManualEntry';
import { Skeleton } from '../components/ui/Skeleton';

type Slot = 'A' | 'B';

export function ComparePage() {
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { history } = useAppStore();

  const handleBarcode = useCallback(async (barcode: string, slot: Slot) => {
    setLoading(true);
    setError(null);
    try {
      const product = await fetchProductByBarcode(barcode);
      if (product) {
        slot === 'A' ? setProductA(product) : setProductB(product);
        setActiveSlot(null);
      } else {
        setError('Product not found');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectFromHistory = (product: Product, slot: Slot) => {
    slot === 'A' ? setProductA(product) : setProductB(product);
    setActiveSlot(null);
  };

  const reset = () => {
    setProductA(null);
    setProductB(null);
    setActiveSlot(null);
    setError(null);
  };

  // Both products selected — show comparison
  if (productA && productB) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Compare</h1>
          <Button variant="ghost" size="sm" onClick={reset}>↻ Reset</Button>
        </div>
        <ComparisonView productA={productA} productB={productB} />
      </div>
    );
  }

  // Slot selection UI
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Compare Products</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Select two products to compare side-by-side</p>

      {/* Slots */}
      <div className="grid grid-cols-2 gap-3">
        <SlotCard
          label="Product A"
          product={productA}
          isActive={activeSlot === 'A'}
          onSelect={() => setActiveSlot('A')}
          onClear={() => setProductA(null)}
        />
        <SlotCard
          label="Product B"
          product={productB}
          isActive={activeSlot === 'B'}
          onSelect={() => setActiveSlot('B')}
          onClear={() => setProductB(null)}
        />
      </div>

      {/* Input area for active slot */}
      {activeSlot && (
        <div className="space-y-4 animate-fade-in">
          {loading && <Skeleton className="w-full h-12 rounded-xl" />}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {!loading && (
            <>
              <div className="flex justify-center">
                <ManualEntry onSubmit={(barcode) => handleBarcode(barcode, activeSlot)} />
              </div>

              {/* Quick pick from history */}
              {history.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Or pick from history</p>
                  <div className="max-h-48 overflow-y-auto space-y-2 rounded-xl">
                    {history.map(({ product }) => (
                      <button
                        key={product.barcode}
                        onClick={() => selectFromHistory(product, activeSlot)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-left"
                      >
                        {product.image ? (
                          <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-contain bg-white" />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm">🍽️</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">{product.brand}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SlotCard({ label, product, isActive, onSelect, onClear }: {
  label: string;
  product: Product | null;
  isActive: boolean;
  onSelect: () => void;
  onClear: () => void;
}) {
  if (product) {
    return (
      <div className="relative p-3 rounded-xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 text-center">
        <button onClick={onClear} className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] text-gray-500">✕</button>
        {product.image ? (
          <img src={product.image} alt="" className="w-12 h-12 mx-auto rounded-lg object-contain" />
        ) : (
          <div className="w-12 h-12 mx-auto rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">🍽️</div>
        )}
        <p className="text-xs font-medium text-gray-900 dark:text-white mt-2 line-clamp-2">{product.name}</p>
      </div>
    );
  }

  return (
    <button
      onClick={onSelect}
      className={`p-6 rounded-xl border-2 border-dashed transition-colors text-center ${
        isActive
          ? 'border-primary bg-primary/5 dark:bg-primary/10'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <p className="text-2xl mb-1">+</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </button>
  );
}
