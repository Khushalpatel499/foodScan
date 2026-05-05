import { useAppStore } from '../stores/appStore';
import { useTranslation } from '../hooks/useTranslation';
import { localeNames, type Locale } from '../utils/i18n';

const locales: Locale[] = ['en', 'hi', 'es', 'fr'];

export function SettingsPage() {
  const { darkMode, toggleDarkMode, locale, setLocale, history, favorites } = useAppStore();
  const t = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.settingsTitle}</h1>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{t.darkMode}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.darkModeDesc}</p>
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

      {/* Language selector */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{t.language}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.languageDesc}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {locales.map(l => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                locale === l
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-primary'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
          <p className="text-2xl font-bold text-primary">{history.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.productsScanned}</p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
          <p className="text-2xl font-bold text-red-500">{favorites.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.favorites}</p>
        </div>
      </div>

      {/* About */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
        <p className="font-medium text-gray-900 dark:text-white">{t.about}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.aboutDesc}</p>
        <p className="text-xs text-gray-400">Version 1.0.0</p>
      </div>
    </div>
  );
}
