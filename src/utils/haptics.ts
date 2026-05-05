/**
 * Haptic feedback utility using Vibration API.
 * Gracefully degrades on unsupported devices.
 */
export function hapticSuccess(): void {
  navigator?.vibrate?.([50, 30, 50]);
}

export function hapticLight(): void {
  navigator?.vibrate?.(10);
}

export function hapticError(): void {
  navigator?.vibrate?.([100, 50, 100, 50, 100]);
}
