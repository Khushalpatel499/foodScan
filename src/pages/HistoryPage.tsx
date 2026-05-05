import { useAppStore } from '../stores/appStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { calculateHealthScore } from '../utils/healthScore';
import { Button } from '../components/ui/Button';
import { SwipeableRow } from '../components/ui/SwipeableRow';
import { PullToRefresh } from '../components/ui/PullToRefresh';
import type { Product } from '../types';

export function HistoryPage() {
  const { history, clearHistory } = useAppStore();
  const navigate = useNavigate();
  const t = useTranslation();

  const handleRefresh = () => new Promise<void>(r => setTimeout(r, 500));

  if (history.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="text-4xl">📋</p>
        <p className="text-gray-500 dark:text-gray-400">{t.noHistory}</p>
        <Button variant="secondary" onClick={() => navigate('/')}>{t.startScanning}</Button>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.historyTitle}</h1>
          <Button variant="ghost" size="sm" onClick={clearHistory}>{t.clearAll}</Button>
        </div>

        <p className="text-[10px] text-gray-400 dark:text-gray-500">{t.swipeToDelete}</p>

        <div className="space-y-2">
          {history.map(({ product, scannedAt }) => (
            <HistoryItem key={product.barcode + scannedAt} product={product} scannedAt={scannedAt} />
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
}

function HistoryItem({ product, scannedAt }: { product: Product; scannedAt: string }) {
  const { history } = useAppStore();
  const score = calculateHealthScore(product.nutriments);
  const date = new Date(scannedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const dotColor = { green: 'bg-green-500', yellow: 'bg-amber-500', red: 'bg-red-500' }[score.color];

  const handleDelete = () => {
    const updated = history.filter(h => !(h.product.barcode === product.barcode && h.scannedAt === scannedAt));
    useAppStore.setState({ history: updated });
    localStorage.setItem('foodscan_history', JSON.stringify(updated));
  };

  return (
    <SwipeableRow onDelete={handleDelete}>
      <div className="flex items-center gap-3 p-3 animate-fade-in">
        {product.image ? (
          <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-white" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">🍽️</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{product.brand} • {date}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${dotColor}`} title={score.label} />
      </div>
    </SwipeableRow>
  );
}
