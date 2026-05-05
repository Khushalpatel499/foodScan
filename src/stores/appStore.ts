import { create } from 'zustand';
import type { Product, HistoryEntry } from '../types';
import type { Locale } from '../utils/i18n';
import { getItem, setItem } from '../services/storage';

const HISTORY_KEY = 'foodscan_history';
const FAVORITES_KEY = 'foodscan_favorites';
const DARK_MODE_KEY = 'foodscan_dark';
const LOCALE_KEY = 'foodscan_locale';

interface AppState {
  // History
  history: HistoryEntry[];
  addToHistory: (product: Product) => void;
  clearHistory: () => void;

  // Favorites
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (barcode: string) => boolean;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Language
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  history: getItem<HistoryEntry[]>(HISTORY_KEY, []),

  addToHistory: (product) => {
    const entry: HistoryEntry = { product, scannedAt: new Date().toISOString() };
    const updated = [entry, ...get().history.filter(h => h.product.barcode !== product.barcode)].slice(0, 50);
    set({ history: updated });
    setItem(HISTORY_KEY, updated);
  },

  clearHistory: () => {
    set({ history: [] });
    setItem(HISTORY_KEY, []);
  },

  favorites: getItem<Product[]>(FAVORITES_KEY, []),

  toggleFavorite: (product) => {
    const exists = get().favorites.some(f => f.barcode === product.barcode);
    const updated = exists
      ? get().favorites.filter(f => f.barcode !== product.barcode)
      : [product, ...get().favorites];
    set({ favorites: updated });
    setItem(FAVORITES_KEY, updated);
  },

  isFavorite: (barcode) => get().favorites.some(f => f.barcode === barcode),

  darkMode: getItem<boolean>(DARK_MODE_KEY, false),

  toggleDarkMode: () => {
    const next = !get().darkMode;
    set({ darkMode: next });
    setItem(DARK_MODE_KEY, next);
    document.documentElement.classList.toggle('dark', next);
  },

  locale: getItem<Locale>(LOCALE_KEY, 'en'),

  setLocale: (locale) => {
    set({ locale });
    setItem(LOCALE_KEY, locale);
  },
}));
