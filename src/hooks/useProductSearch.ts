import { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import { searchProducts } from '../services/productApi';

/**
 * Hook for searching products by name with debounce.
 * Decouples search logic from UI.
 */
export function useProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchProducts(query, 12);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  const clear = () => { setQuery(''); setResults([]); };

  return { query, setQuery, results, loading, clear };
}
