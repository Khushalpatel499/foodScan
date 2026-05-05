import { useAppStore } from '../stores/appStore';
import { getTranslations } from '../utils/i18n';

/**
 * Hook that returns current translations based on selected locale.
 * Components use this to get translated strings — fully decoupled from i18n implementation.
 */
export function useTranslation() {
  const locale = useAppStore(s => s.locale);
  return getTranslations(locale);
}
