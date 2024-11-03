// make sure to change the versioning when deploying a new update (otherwise will give infinite reloads)
const staticCache = "static-cache-v1";
const dynamicCache = "dynamic-cache-v1";
const dataCache = "data-cache-v1";
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
  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll(staticAssets);
      console.info("service worker: adding static assets");
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (
            key !== staticCache &&
            key !== dynamicCache &&
            key !== dataCache
          ) {
            console.info("service worker: deleting old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      if (requestUrl.pathname.startsWith("/api/")) {
        console.info("service worker: fetching data from network or cache");
        return fetchAndSaveToCache(event, dataCache).catch(() => cacheRes);
      } else {
        console.info(
          "service worker: fetching static or dynamic content from cache or network"
        );
        return cacheRes || fetchAndSaveToCache(event, dynamicCache);
      }
    })
  );
});

const fetchAndSaveToCache = async (event, cacheName) => {
  try {
    const fetchRes = await fetch(event.request);
    const cache = await caches.open(cacheName);
    cache.put(event.request.url, fetchRes.clone());
    return fetchRes;
  } catch (error) {
    throw error;
  }
};
