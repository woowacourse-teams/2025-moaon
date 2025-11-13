import {
  cleanupOutdatedCaches,
  getCacheKeyForURL,
  precacheAndRoute,
} from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("fetch", (event) => {
  const req = event.request;

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
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    window.location.reload();
  }
});

// 활성화 이벤트
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated new version");

  // 오래된 캐시 정리
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => !cacheName.startsWith("workbox-"))
          .map((cacheName) => caches.delete(cacheName)),
      );
      // 모든 클라이언트 즉시 제어
      await self.clients.claim();
    })(),
  );
});
