/**
 * Provides voice feedback using Web Speech API.
 * Gracefully degrades if not supported.
 */
export function speak(text: string): void {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
