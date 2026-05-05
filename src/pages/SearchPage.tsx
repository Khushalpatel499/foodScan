import { useState } from 'react';
import type { Product } from '../types';
import { useProductSearch } from '../hooks/useProductSearch';
import { calculateHealthScore } from '../utils/healthScore';
import { ProductCard } from '../components/product/ProductCard';
import { BottomSheet } from '../components/ui/BottomSheet';
import { Skeleton } from '../components/ui/Skeleton';
import { ImageWithSkeleton } from '../components/ui/ImageWithSkeleton';

export function SearchPage() {
  const { query, setQuery, results, loading, clear } = useProductSearch();
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Search Products</h1>

      {/* Search input */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by product name..."
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          aria-label="Search products"
        />
        {query && (
          <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500" aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && query.length < 2 && (
        <div className="text-center py-12 space-y-2">
          <p className="text-3xl">🔍</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Type at least 2 characters to search</p>
        </div>
      )}

      {/* No results */}
      {!loading && query.length >= 2 && results.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <p className="text-3xl">😕</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No products found for "{query}"</p>
        </div>
      )}

      {/* Results grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {results.map(product => (
            <SearchResultCard key={product.barcode} product={product} onSelect={setSelected} />
          ))}
        </div>
      )}

      {/* Bottom Sheet with product details */}
      <BottomSheet open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <ProductCard product={selected} />}
      </BottomSheet>
    </div>
  );
}

function SearchResultCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const score = calculateHealthScore(product.nutriments);
  const badgeColor = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    yellow: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  }[score.color];

  return (
    <button
      onClick={() => onSelect(product)}
      className="flex flex-col rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 overflow-hidden text-left hover:shadow-md transition-shadow animate-fade-in"
    >
      <ImageWithSkeleton
        src={product.image}
        alt={product.name}
        className="h-28 bg-gray-50 dark:bg-gray-800 p-3"
      />
      <div className="p-2.5 space-y-1.5 flex-1">
        <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">{product.name}</p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{product.brand}</p>
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
          {score.score}/100 • {score.label}
        </span>
      </div>
    </button>
  );
}
