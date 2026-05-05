/**
 * Type-safe localStorage wrapper with JSON serialization.
 * Decouples storage mechanism from business logic.
 */
export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full - silently fail
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}
