const staticCache = "static-cache-v1";
const dynamicCache = "dynamic-cache-v1";
const staticAssets = [
  "/",
  "/index.html",
  "/images/favicon.ico",
  "/images/favicon.png",
  "/images/screenshotNarrow.png",
  "/images/screenshotWide.png",
  "/manifest.json",
  "/static/js/bundle.js",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: installed");
  event.waitUntil(
    // precache all staticAssets
    caches.open(staticCache).then((cache) => {
      cache.addAll(staticAssets);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== staticCache && key !== dynamicCache) {
            console.log("Service Worker: removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: fetching");
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        // return content from staticCache or dynamicCache
        cacheRes ||
        // if not found and online, return content from server via fetch
        fetch(event.request).then(async (fetchRes) => {
          // save content to dynamicCache
          const cache = await caches.open(dynamicCache);
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        })
      );
    })
  );
});
