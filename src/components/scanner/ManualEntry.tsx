import { useState } from 'react';
import { Button } from '../ui/Button';

interface ManualEntryProps {
  onSubmit: (barcode: string) => void;
}

export function ManualEntry({ onSubmit }: ManualEntryProps) {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) onSubmit(barcode.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
      <input
        type="text"
        inputMode="numeric"
        placeholder="Enter barcode manually..."
        value={barcode}
        onChange={e => setBarcode(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Barcode number"
      />
      <Button type="submit" disabled={!barcode.trim()}>Search</Button>
    </form>
  );
}
