import type { Product } from '../../types';
import { calculateHealthScore, formatAllergens } from '../../utils/healthScore';
import { speak } from '../../utils/voice';
import { useAppStore } from '../../stores/appStore';
import { useAlternatives } from '../../hooks/useAlternatives';
import { ScoreBadge } from '../ui/ScoreBadge';
import { Button } from '../ui/Button';
import { NutritionGrid } from './NutritionGrid';
import { AlternativesSection } from './AlternativesSection';
import { IngredientsExplainer } from './IngredientsExplainer';
import { useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const healthScore = calculateHealthScore(product.nutriments);
  const allergens = formatAllergens(product.allergens);
  const favorite = isFavorite(product.barcode);
  const altData = useAlternatives(product, healthScore.score < 70);

  // Voice feedback on load
  useEffect(() => {
    const msg = healthScore.label === 'Healthy'
      ? `${product.name} is a healthy choice`
      : healthScore.label === 'Avoid'
        ? `${product.name} is unhealthy. Consider alternatives.`
        : `${product.name} has moderate nutritional value`;
    speak(msg);
  }, [product.name, healthScore.label]);

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header with image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-52 object-contain p-4" loading="lazy" />
        ) : (
          <div className="w-full h-52 flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-md"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className={`w-5 h-5 ${favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Product info */}
      <div className="px-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{product.brand} {product.quantity && `• ${product.quantity}`}</p>
      </div>

      {/* Health Score */}
      <ScoreBadge healthScore={healthScore} />

      {/* Insights */}
      {healthScore.insights.length > 0 && (
        <div className="space-y-1.5">
          {healthScore.insights.map((insight, i) => (
            <p key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-1">{insight}</p>
          ))}
        </div>
      )}

      {/* Allergens */}
      {allergens.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Allergens</h3>
          <div className="flex flex-wrap gap-2">
            {allergens.map((a, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition */}
      <NutritionGrid nutriments={product.nutriments} />

      {/* Ingredients Explainer */}
      {product.ingredients && product.ingredients !== 'No ingredients listed' && (
        <IngredientsExplainer ingredientsText={product.ingredients} />
      )}

      {/* Healthier Alternatives - only show when score is not great */}
      <AlternativesSection alternatives={altData.alternatives} loading={altData.loading} />

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" size="sm" onClick={() => speak(
          `${product.name} by ${product.brand}. Health score: ${healthScore.score} out of 100. ${healthScore.label}.`
        )}>
          🔊 Read Aloud
        </Button>
      </div>
    </div>
  );
}
