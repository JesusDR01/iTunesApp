/* eslint-disable @typescript-eslint/no-explicit-any */
export function debouncer() {
  let timeoutId: number | undefined = undefined;

  function clear() {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }

  function debounced(fun: (...args: any) => void, wait = 1000) {
    if (timeoutId) {
      clear();
    }

    timeoutId = window.setTimeout(() => {
      fun();
      timeoutId = undefined;
    }, wait);
  }

  return { exec: debounced, cancel: clear };
}
