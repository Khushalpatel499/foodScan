import { useAppStore } from '../stores/appStore';
import { useNavigate } from 'react-router-dom';
import { calculateHealthScore } from '../utils/healthScore';
import { Button } from '../components/ui/Button';
import type { Product } from '../types';

export function FavoritesPage() {
  const { favorites } = useAppStore();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="text-4xl">❤️</p>
        <p className="text-gray-500 dark:text-gray-400">No favorites yet</p>
        <Button variant="secondary" onClick={() => navigate('/')}>Start Scanning</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Favorites</h1>
      <div className="space-y-3">
        {favorites.map(product => (
          <FavoriteItem key={product.barcode} product={product} />
        ))}
      </div>
    </div>
  );
}

function FavoriteItem({ product }: { product: Product }) {
  const { toggleFavorite } = useAppStore();
  const score = calculateHealthScore(product.nutriments);
  const dotColor = { green: 'bg-green-500', yellow: 'bg-amber-500', red: 'bg-red-500' }[score.color];

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 animate-fade-in">
      {product.image ? (
        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-white" />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">🍽️</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
      </div>
      <div className={`w-3 h-3 rounded-full ${dotColor} mr-2`} title={score.label} />
      <button onClick={() => toggleFavorite(product)} className="text-red-400 hover:text-red-600" aria-label="Remove from favorites">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
      </button>
    </div>
  );
}
