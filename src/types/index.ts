/** Core product data from Open Food Facts API */
export interface Product {
  barcode: string;
  name: string;
  brand: string;
  image: string;
  ingredients: string;
  allergens: string[];
  nutriments: Nutriments;
  nutriScore: string;
  categories: string;
  quantity: string;
}

export interface Nutriments {
  energy: number;       // kcal per 100g
  fat: number;
  saturatedFat: number;
  sugars: number;
  salt: number;
  fiber: number;
  proteins: number;
}

/** Health score calculated by our algorithm */
export interface HealthScore {
  score: number;        // 0-100
  label: 'Healthy' | 'Moderate' | 'Avoid';
  color: 'green' | 'yellow' | 'red';
  insights: string[];
}

/** History entry stored in localStorage */
export interface HistoryEntry {
  product: Product;
  scannedAt: string;    // ISO date string
}

/** API response shape from Open Food Facts */
export interface OpenFoodFactsResponse {
  status: number;
  product: {
    product_name?: string;
    brands?: string;
    image_url?: string;
    ingredients_text?: string;
    allergens_tags?: string[];
    nutriments?: Record<string, number>;
    nutriscore_grade?: string;
    categories?: string;
    quantity?: string;
  };
}

/** Scanner state */
export type ScannerStatus = 'idle' | 'scanning' | 'loading' | 'success' | 'error';
