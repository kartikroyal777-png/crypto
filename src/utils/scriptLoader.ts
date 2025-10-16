// A map to store promises for scripts that are currently being loaded or have been loaded.
const loadedScripts = new Map<string, Promise<Event>>();
// A set to track script source URLs that have already failed to load.
const failedScriptSources = new Set<string>();

export function loadScriptOnce(src: string, attrs: Record<string, string> = {}): Promise<Event> {
  if (!src) {
    return Promise.reject(new Error('loadScriptOnce: src is required.'));
  }

  // If this source URL has failed before, immediately reject without a new network request.
  if (failedScriptSources.has(src)) {
    return Promise.reject(new Error(`Script source has previously failed to load: ${src}`));
  }

  const scriptKey = `${src}?${new URLSearchParams(attrs).toString()}`;

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

    script.onload = (e) => resolve(e);

    script.onerror = (e) => {
      // If this is the first time this *source* URL has failed, log a detailed warning.
      if (!failedScriptSources.has(src)) {
        console.warn(
          `[scriptLoader] Failed to load script source: ${src}. This is likely due to network restrictions or an ad-blocker in the development environment. All subsequent requests for this source will be blocked to prevent network noise.`,
          e
        );
        // Add the source URL to our set of failed scripts.
        failedScriptSources.add(src);
      }
      // Reject the promise so the individual component can update its UI.
      reject(e);
    };

    document.head.appendChild(script);
  });

  loadedScripts.set(scriptKey, promise);
  return promise;
}
