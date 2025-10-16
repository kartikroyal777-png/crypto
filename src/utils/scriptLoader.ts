// A map to store promises for scripts that are currently being loaded or have been loaded.
const loadedScripts = new Map<string, Promise<Event>>();

export function loadScriptOnce(src: string, attrs: Record<string, string> = {}): Promise<Event> {
  if (!src) {
    return Promise.reject(new Error('loadScriptOnce: src is required.'));
  }

  // A unique key for each script based on its source and attributes.
  const scriptKey = `${src}?${new URLSearchParams(attrs).toString()}`;

  // If the script is already loaded or loading, return the existing promise.
  if (loadedScripts.has(scriptKey)) {
    return loadedScripts.get(scriptKey)!;
  }

  const promise = new Promise<Event>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = (e) => {
      resolve(e);
    };

    script.onerror = (e) => {
      console.warn(
        `[scriptLoader] Failed to load script: ${src}. This might be due to an ad-blocker or network issue. The loader will try again if the component re-renders.`,
        e
      );
      // Remove the promise from the map on failure.
      // This allows subsequent attempts to create a new script element and try loading again.
      loadedScripts.delete(scriptKey);
      reject(e);
    };

    document.head.appendChild(script);
  });

  // Store the promise in the map to prevent duplicate script injections.
  loadedScripts.set(scriptKey, promise);
  return promise;
}
