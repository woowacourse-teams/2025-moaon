import { BroadcastUpdatePlugin } from "workbox-broadcast-update";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// precacheAndRoute 실행
precacheAndRoute(self.__WB_MANIFEST);

const APP_VERSION = process.env.APP_VERSION;
const CACHE_NAME = `cache-v${APP_VERSION}`;

// SWR 전략 + BroadcastUpdatePlugin 적용 (index.html 포함 문서, JS, CSS)
registerRoute(
  ({ request }) =>
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50 }),
      new BroadcastUpdatePlugin(),
    ],
  }),
);

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
          .filter((cacheName) => cacheName === CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});
