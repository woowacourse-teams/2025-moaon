import {
  cleanupOutdatedCaches,
  getCacheKeyForURL,
  precacheAndRoute,
} from "workbox-precaching";

// precacheAndRoute 실행
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // CSR 라우트 요청(일반적으로 mode가 'navigate')이면 처리
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(
          "workbox-precache-v2-https://moaon.site/",
        );
        const oldCacheKey = getCacheKeyForURL("/index.html");
        const oldHTML = await cache.match(oldCacheKey);

        const keys = await cache.keys();
        for (const key of keys) {
          if (key.url.includes("/index.html") && key.url !== oldCacheKey) {
            const newHTML = await cache.match(key);
            if (newHTML) {
              return newHTML;
            }
          }
        }

        return oldHTML || fetch(req);
      })(),
    );
    return;
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
