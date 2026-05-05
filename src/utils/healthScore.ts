import type { Nutriments, HealthScore } from '../types';

/**
 * Calculates a health score (0-100) based on nutrient values per 100g.
 * Uses WHO guidelines for sugar, fat, and salt thresholds.
 * Pure function - no side effects.
 */
export function calculateHealthScore(nutriments: Nutriments): HealthScore {
  const insights: string[] = [];
  let deductions = 0;

  // Sugar: WHO recommends <5g/100g as ideal
  if (nutriments.sugars > 15) {
    deductions += 30;
    insights.push('⚠️ Very high sugar content');
  } else if (nutriments.sugars > 5) {
    deductions += 15;
    insights.push('⚠️ High sugar content');
  }

  // Saturated fat: >5g/100g is high
  if (nutriments.saturatedFat > 5) {
    deductions += 25;
    insights.push('⚠️ High in saturated fat');
  } else if (nutriments.saturatedFat > 2) {
    deductions += 10;
  }

  // Salt: >1.5g/100g is high
  if (nutriments.salt > 1.5) {
    deductions += 25;
    insights.push('⚠️ High salt content');
  } else if (nutriments.salt > 0.6) {
    deductions += 10;
  }

  // Bonus for fiber and protein
  if (nutriments.fiber > 3) deductions -= 10;
  if (nutriments.proteins > 10) deductions -= 5;

  const score = Math.max(0, Math.min(100, 100 - deductions));

  let label: HealthScore['label'];
  let color: HealthScore['color'];

  if (score >= 70) {
    label = 'Healthy';
    color = 'green';
    if (insights.length === 0) insights.push('✅ Good nutritional profile');
  } else if (score >= 40) {
    label = 'Moderate';
    color = 'yellow';
  } else {
    label = 'Avoid';
    color = 'red';
    insights.push('🚫 Consider healthier alternatives');
  }

  return { score, label, color, insights };
}

/** Known allergens for detection */
const ALLERGEN_MAP: Record<string, string> = {
  milk: '🥛 Milk',
  gluten: '🌾 Gluten',
  nuts: '🥜 Nuts',
  peanuts: '🥜 Peanuts',
  soybeans: '🫘 Soy',
  eggs: '🥚 Eggs',
  fish: '🐟 Fish',
  shellfish: '🦐 Shellfish',
  sesame: '🌱 Sesame',
  celery: '🥬 Celery',
  mustard: '🟡 Mustard',
  sulphites: '🧪 Sulphites',
};

/** Formats allergen tags into readable labels */
export function formatAllergens(allergens: string[]): string[] {
  return allergens.map(a => {
    const key = a.toLowerCase().replace(/[-_]/g, '');
    for (const [allergen, label] of Object.entries(ALLERGEN_MAP)) {
      if (key.includes(allergen)) return label;
    }
    return `⚠️ ${a}`;
  });
}
