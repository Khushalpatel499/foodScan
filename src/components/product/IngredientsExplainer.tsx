import { useState } from 'react';
import { parseIngredients, type IngredientInfo } from '../../utils/ingredients';

interface IngredientsExplainerProps {
  ingredientsText: string;
}

const riskStyles = {
  safe: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  caution: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
  avoid: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  unknown: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
};

const riskLabels = {
  safe: '✅ Safe',
  caution: '⚠️ Use Caution',
  avoid: '🚫 Best to Avoid',
  unknown: 'ℹ️ No data available',
};

export function IngredientsExplainer({ ingredientsText }: IngredientsExplainerProps) {
  const [selected, setSelected] = useState<IngredientInfo | null>(null);
  const ingredients = parseIngredients(ingredientsText);

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        Ingredients <span className="normal-case font-normal">(tap to learn)</span>
      </h3>

      {/* Ingredient chips */}
      <div className="flex flex-wrap gap-1.5">
        {ingredients.map((ing, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected?.original === ing.original ? null : ing)}
            className={`px-2.5 py-1 rounded-lg text-xs border transition-all active:scale-95 ${
              selected?.original === ing.original
                ? riskStyles[ing.risk]
                : ing.risk === 'unknown'
                  ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  : `border-transparent ${ing.risk === 'avoid' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : ing.risk === 'caution' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'}`
            }`}
            aria-label={`Learn about ${ing.original}`}
          >
            {ing.original}
          </button>
        ))}
      </div>

      {/* Explanation popup */}
      {selected && selected.description && (
        <div className={`mt-3 p-3 rounded-xl border animate-fade-in ${riskStyles[selected.risk]}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm">{selected.name}</p>
              <p className="text-xs mt-1 opacity-90">{selected.description}</p>
              <p className="text-[10px] mt-1.5 font-bold uppercase tracking-wide">{riskLabels[selected.risk]}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs flex-shrink-0"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-3 mt-3 text-[10px] text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /> Safe</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Caution</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Avoid</span>
      </div>
    </div>
  );
}
