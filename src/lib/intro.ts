// Coordinates the first-load sequence: the preloader marks the intro done, the hero waits for it.

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

export function markIntroDone() {
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
}

export function onIntroDone(callback: () => void) {
  if (window.__introDone) {
    callback();
    return () => {};
  }
  window.addEventListener("intro:done", callback, { once: true });
  return () => window.removeEventListener("intro:done", callback);
}
