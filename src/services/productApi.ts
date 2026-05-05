import type { Product, OpenFoodFactsResponse } from '../types';

const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

/**
 * Fetches product data from Open Food Facts by barcode.
 * Returns null if product not found.
 */
export async function fetchProductByBarcode(barcode: string): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/product/${barcode}.json`);

  if (!response.ok) throw new Error('Network error');

  const data: OpenFoodFactsResponse = await response.json();

  if (data.status === 0 || !data.product) return null;

  return mapToProduct(barcode, data);
}

/** Maps raw API response to our clean Product type */
function mapToProduct(barcode: string, data: OpenFoodFactsResponse): Product {
  const p = data.product;
  const n = p.nutriments || {};

  return {
    barcode,
    name: p.product_name || 'Unknown Product',
    brand: p.brands || 'Unknown Brand',
    image: p.image_url || '',
    ingredients: p.ingredients_text || 'No ingredients listed',
    allergens: (p.allergens_tags || []).map(a => a.replace('en:', '')),
    nutriments: {
      energy: n['energy-kcal_100g'] || 0,
      fat: n['fat_100g'] || 0,
      saturatedFat: n['saturated-fat_100g'] || 0,
      sugars: n['sugars_100g'] || 0,
      salt: n['salt_100g'] || 0,
      fiber: n['fiber_100g'] || 0,
      proteins: n['proteins_100g'] || 0,
    },
    nutriScore: p.nutriscore_grade || '',
    categories: p.categories || '',
    quantity: p.quantity || '',
  };
}

/**
 * Search products by name (for alternative suggestions).
 */
export async function searchProducts(query: string, limit = 5): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/search?search_terms=${encodeURIComponent(query)}&page_size=${limit}&json=true`
  );

  if (!response.ok) return [];

  const data = await response.json();
  return (data.products || [])
    .filter((p: Record<string, unknown>) => p.product_name)
    .map((p: Record<string, unknown>) =>
      mapToProduct(
        (p.code as string) || '',
        { status: 1, product: p as OpenFoodFactsResponse['product'] }
      )
    );
}

/**
 * Fetches healthier alternatives from the same category.
 * Filters out the original product and returns only those with better nutri-scores.
 */
export async function fetchAlternatives(product: Product, limit = 6): Promise<Product[]> {
  // Extract first meaningful category
  const category = product.categories.split(',')[0]?.trim();
  if (!category) return [];

  const response = await fetch(
    `${BASE_URL}/search?categories_tags_en=${encodeURIComponent(category)}&sort_by=nutriscore_score&page_size=${limit + 5}&json=true`
  );

  if (!response.ok) return [];

  const data = await response.json();
  return (data.products || [])
    .filter((p: Record<string, unknown>) => p.product_name && p.code !== product.barcode)
    .slice(0, limit)
    .map((p: Record<string, unknown>) =>
      mapToProduct(
        (p.code as string) || '',
        { status: 1, product: p as OpenFoodFactsResponse['product'] }
      )
    );
}
