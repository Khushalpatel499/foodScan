import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchAlternatives } from '../services/productApi';

/**
 * Hook that fetches healthier alternatives for a given product.
 * Only triggers when the product's health score is below "Healthy".
 */
export function useAlternatives(product: Product | null, shouldFetch: boolean) {
  const [alternatives, setAlternatives] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product || !shouldFetch) {
      setAlternatives([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchAlternatives(product)
      .then(results => { if (!cancelled) setAlternatives(results); })
      .catch(() => { if (!cancelled) setAlternatives([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [product?.barcode, shouldFetch]);

  return { alternatives, loading };
}
