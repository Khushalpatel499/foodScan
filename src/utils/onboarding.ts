import { getItem, setItem } from '../services/storage';

const ONBOARDING_KEY = 'foodscan_onboarded';

export function hasCompletedOnboarding(): boolean {
  return getItem<boolean>(ONBOARDING_KEY, false);
}

export function completeOnboarding(): void {
  setItem(ONBOARDING_KEY, true);
}

export interface OnboardingSlide {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    emoji: '📷',
    title: 'Scan Any Barcode',
    description: 'Point your camera at any food product barcode to instantly get health insights',
    color: '#10b981',
  },
  {
    emoji: '🏥',
    title: 'Know What You Eat',
    description: 'Get a health score, allergen warnings, and ingredient explanations for every product',
    color: '#f59e0b',
  },
  {
    emoji: '💪',
    title: 'Make Better Choices',
    description: 'Compare products, find healthier alternatives, and track your food habits',
    color: '#6366f1',
  },
];
