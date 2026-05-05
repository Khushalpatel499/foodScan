import type { Product, Nutriments } from '../../types';
import { calculateHealthScore } from '../../utils/healthScore';

interface ComparisonViewProps {
  productA: Product;
  productB: Product;
}

const nutrientRows: { key: keyof Nutriments; label: string; unit: string; lowerIsBetter: boolean }[] = [
  { key: 'energy', label: 'Calories', unit: 'kcal', lowerIsBetter: true },
  { key: 'fat', label: 'Fat', unit: 'g', lowerIsBetter: true },
  { key: 'saturatedFat', label: 'Sat. Fat', unit: 'g', lowerIsBetter: true },
  { key: 'sugars', label: 'Sugars', unit: 'g', lowerIsBetter: true },
  { key: 'salt', label: 'Salt', unit: 'g', lowerIsBetter: true },
  { key: 'proteins', label: 'Protein', unit: 'g', lowerIsBetter: false },
  { key: 'fiber', label: 'Fiber', unit: 'g', lowerIsBetter: false },
];

export function ComparisonView({ productA, productB }: ComparisonViewProps) {
  const scoreA = calculateHealthScore(productA.nutriments);
  const scoreB = calculateHealthScore(productB.nutriments);

  const winnerColor = 'text-green-600 dark:text-green-400 font-bold';
  const loserColor = 'text-red-600 dark:text-red-400';

  return (
    <div className="animate-fade-in space-y-5">
      {/* Product headers */}
      <div className="grid grid-cols-2 gap-3">
        <ProductHeader product={productA} score={scoreA.score} color={scoreA.color} />
        <ProductHeader product={productB} score={scoreB.score} color={scoreB.color} />
      </div>

      {/* Winner banner */}
      <WinnerBanner productA={productA} productB={productB} scoreA={scoreA.score} scoreB={scoreB.score} />

      {/* Nutrient comparison table */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">
          <span className="text-left truncate">{productA.name.slice(0, 12)}</span>
          <span className="text-center px-2">per 100g</span>
          <span className="text-right truncate">{productB.name.slice(0, 12)}</span>
        </div>

        {nutrientRows.map(({ key, label, unit, lowerIsBetter }) => {
          const valA = productA.nutriments[key];
          const valB = productB.nutriments[key];
          const aWins = lowerIsBetter ? valA <= valB : valA >= valB;
          const bWins = !aWins;
          const tied = valA === valB;

          return (
            <div key={key} className="grid grid-cols-[1fr_auto_1fr] items-center px-3 py-2.5 border-t border-gray-50 dark:border-gray-800/50">
              <span className={`text-sm text-left ${!tied && aWins ? winnerColor : !tied ? loserColor : 'text-gray-700 dark:text-gray-300'}`}>
                {valA.toFixed(1)} {unit}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 px-3 text-center min-w-[70px]">
                {label}
              </span>
              <span className={`text-sm text-right ${!tied && bWins ? winnerColor : !tied ? loserColor : 'text-gray-700 dark:text-gray-300'}`}>
                {valB.toFixed(1)} {unit}
              </span>
            </div>
          );
        })}
      </div>

      {/* Visual bar comparison */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Visual Comparison</h3>
        {nutrientRows.slice(0, 5).map(({ key, label, lowerIsBetter }) => {
          const valA = productA.nutriments[key];
          const valB = productB.nutriments[key];
          const max = Math.max(valA, valB, 1);

          return (
            <div key={key} className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              <div className="flex gap-2 items-center">
                <div className="flex-1 flex justify-end">
                  <div
                    className={`h-5 rounded-l-full transition-all ${getBarColor(valA, valB, lowerIsBetter, true)}`}
                    style={{ width: `${(valA / max) * 100}%`, minWidth: '4px' }}
                  />
                </div>
                <div className="w-px h-5 bg-gray-300 dark:bg-gray-600" />
                <div className="flex-1">
                  <div
                    className={`h-5 rounded-r-full transition-all ${getBarColor(valB, valA, lowerIsBetter, true)}`}
                    style={{ width: `${(valB / max) * 100}%`, minWidth: '4px' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductHeader({ product, score, color }: { product: Product; score: number; color: string }) {
  const ringColors = { green: 'border-green-500', yellow: 'border-amber-500', red: 'border-red-500' };

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div className={`w-16 h-16 rounded-full border-3 ${ringColors[color as keyof typeof ringColors]} flex items-center justify-center overflow-hidden bg-white dark:bg-gray-800`}>
        {product.image ? (
          <img src={product.image} alt="" className="w-14 h-14 object-contain" />
        ) : (
          <span className="text-xl">🍽️</span>
        )}
      </div>
      <p className="text-xs font-medium text-gray-900 dark:text-white text-center line-clamp-2">{product.name}</p>
      <span className={`text-lg font-bold ${color === 'green' ? 'text-green-600' : color === 'yellow' ? 'text-amber-600' : 'text-red-600'}`}>
        {score}
      </span>
    </div>
  );
}

function WinnerBanner({ productA, productB, scoreA, scoreB }: { productA: Product; productB: Product; scoreA: number; scoreB: number }) {
  if (scoreA === scoreB) {
    return (
      <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">🤝 It's a tie!</p>
      </div>
    );
  }

  const winner = scoreA > scoreB ? productA : productB;
  const diff = Math.abs(scoreA - scoreB);

  return (
    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
      <p className="text-sm font-medium text-green-800 dark:text-green-300">
        🏆 <span className="font-bold">{winner.name}</span> wins by {diff} points!
      </p>
    </div>
  );
}

function getBarColor(val: number, other: number, lowerIsBetter: boolean, _isLeft: boolean): string {
  const isWinner = lowerIsBetter ? val <= other : val >= other;
  return isWinner ? 'bg-green-400 dark:bg-green-500' : 'bg-red-300 dark:bg-red-500/70';
}
