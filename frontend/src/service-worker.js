import { matchPrecache, precacheAndRoute } from "workbox-precaching";

// precacheAndRoute 실행
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  console.log("==============================");
  console.log(url.pathname);

  // CSR 라우트 요청(일반적으로 mode가 'navigate')이면 처리
  if (req.mode === "navigate") {
    event.respondWith(
      matchPrecache("/index.html").then((response) => response || fetch(req)),
    );
    return;
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => !cacheName.startsWith("workbox-"))
          .map((cacheName) => caches.delete(cacheName)),
      );

      await self.clients.claim();
    })(),
  );
});
