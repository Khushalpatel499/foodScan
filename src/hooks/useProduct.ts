import { useState, useCallback } from 'react';
import type { Product } from '../types';
import { fetchProductByBarcode } from '../services/productApi';
import { useAppStore } from '../stores/appStore';

/**
 * Hook for fetching product data by barcode.
 * Manages loading/error states and auto-adds to history.
 */
export function useProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addToHistory = useAppStore(s => s.addToHistory);

  const lookup = useCallback(async (barcode: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      const result = await fetchProductByBarcode(barcode);
      if (result) {
        setProduct(result);
        addToHistory(result);
      } else {
        setError('Product not found. Try manual entry.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [addToHistory]);

  const reset = useCallback(() => {
    setProduct(null);
    setError(null);
    setLoading(false);
  }, []);

  return { product, loading, error, lookup, reset };
}
