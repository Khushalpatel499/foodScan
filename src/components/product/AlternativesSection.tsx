import type { Product } from '../../types';
import { calculateHealthScore } from '../../utils/healthScore';
import { Skeleton } from '../ui/Skeleton';

interface AlternativesSectionProps {
  alternatives: Product[];
  loading: boolean;
}

export function AlternativesSection({ alternatives, loading }: AlternativesSectionProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Finding healthier options...
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="w-36 h-44 flex-shrink-0 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (alternatives.length === 0) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        🌿 Healthier Alternatives
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {alternatives.map(product => (
          <AlternativeCard key={product.barcode} product={product} />
        ))}
      </div>
    </div>
  );
}

function AlternativeCard({ product }: { product: Product }) {
  const score = calculateHealthScore(product.nutriments);
  const borderColor = {
    green: 'border-green-200 dark:border-green-800',
    yellow: 'border-amber-200 dark:border-amber-800',
    red: 'border-red-200 dark:border-red-800',
  }[score.color];
  const badgeColor = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    yellow: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  }[score.color];

  return (
    <div className={`flex-shrink-0 w-36 rounded-xl border ${borderColor} bg-white dark:bg-gray-800/50 overflow-hidden`}>
      {/* Image */}
      <div className="h-24 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-2">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full object-contain" loading="lazy" />
        ) : (
          <span className="text-2xl">🍽️</span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 space-y-1.5">
        <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {product.name}
        </p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{product.brand}</p>
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
          {score.score}/100
        </span>
      </div>
    </div>
  );
}
