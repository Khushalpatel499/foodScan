import type { Nutriments } from '../../types';

interface NutritionGridProps {
  nutriments: Nutriments;
}

const nutrients: { key: keyof Nutriments; label: string; unit: string; threshold: number }[] = [
  { key: 'energy', label: 'Calories', unit: 'kcal', threshold: 300 },
  { key: 'fat', label: 'Fat', unit: 'g', threshold: 17 },
  { key: 'sugars', label: 'Sugars', unit: 'g', threshold: 12 },
  { key: 'salt', label: 'Salt', unit: 'g', threshold: 1.5 },
  { key: 'proteins', label: 'Protein', unit: 'g', threshold: 999 },
  { key: 'fiber', label: 'Fiber', unit: 'g', threshold: 999 },
];

function getColor(value: number, threshold: number): string {
  if (threshold === 999) return 'text-green-600 dark:text-green-400'; // always good (protein, fiber)
  if (value > threshold) return 'text-red-600 dark:text-red-400';
  if (value > threshold * 0.6) return 'text-amber-600 dark:text-amber-400';
  return 'text-green-600 dark:text-green-400';
}

export function NutritionGrid({ nutriments }: NutritionGridProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        Nutrition per 100g
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {nutrients.map(({ key, label, unit, threshold }) => (
          <div key={key} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
            <p className={`text-lg font-bold ${getColor(nutriments[key], threshold)}`}>
              {nutriments[key].toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label} ({unit})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
