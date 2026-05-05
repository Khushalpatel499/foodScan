import { useState } from 'react';
import type { Product, HealthScore } from '../../types';
import { shareProduct } from '../../utils/shareCard';
import { Button } from '../ui/Button';

interface ShareButtonProps {
  product: Product;
  healthScore: HealthScore;
}

export function ShareButton({ product, healthScore }: ShareButtonProps) {
  const [sharing, setSharing] = useState(false);
  const [done, setDone] = useState(false);

  const handleShare = async () => {
    setSharing(true);
    try {
      await shareProduct(product, healthScore);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      // User cancelled share or error — silently ignore
    } finally {
      setSharing(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleShare}
      disabled={sharing}
      aria-label="Share product health card"
    >
      {sharing ? '⏳ Generating...' : done ? '✅ Shared!' : '📤 Share'}
    </Button>
  );
}
