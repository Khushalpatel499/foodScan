import { useAppStore } from '../stores/appStore';

export function SettingsPage() {
  const { darkMode, toggleDarkMode, history, favorites } = useAppStore();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Easier on the eyes at night</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
          role="switch"
          aria-checked={darkMode}
          aria-label="Toggle dark mode"
        >
          <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-5' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
          <p className="text-2xl font-bold text-primary">{history.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Products Scanned</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
          <p className="text-2xl font-bold text-red-500">{favorites.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
        </div>
      </div>

      {/* About */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
        <p className="font-medium text-gray-900 dark:text-white">About FoodScan</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A free, open-source food scanner that helps you make healthier choices.
          Data powered by Open Food Facts.
        </p>
        <p className="text-xs text-gray-400">Version 1.0.0</p>
      </div>
    </div>
  );
}
