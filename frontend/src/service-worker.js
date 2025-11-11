import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import * as navigationPreload from "workbox-navigation-preload";
import { NavigationRoute, precacheAndRoute, Route } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

// precacheAndRoute 실행
// precacheAndRoute(self.__WB_MANIFEST);

navigationPreload.enable();

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
  }),
);

// Register the navigation route
registerRoute(navigationRoute);

// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.
const staticAssetsRoute = new Route(
  ({ request }) => {
    return ["image", "script", "style"].includes(request.destination);
  },
  new StaleWhileRevalidate({
    cacheName: "static-assets",
  }),
);

// Register the route handling static assets
registerRoute(staticAssetsRoute);

// // HTML - 네트워크 우선 (3초 타임아웃)
registerRoute(
  ({ request }) => {
    console.log(request);
    return request.mode === "navigate";
  },
  new NetworkFirst({
    cacheName: "pages",
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  }),
);

// JS/CSS - Stale While Revalidate
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
      }),
    ],
  }),
);

// 폰트 - 캐시 우선
registerRoute(
  ({ request }) => request.destination === "font",
  new CacheFirst({
    cacheName: "fonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1년
      }),
    ],
  }),
);

// 새 Service Worker 활성화 메시지 처리
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 설치 이벤트
self.addEventListener("install", (event) => {
  console.log("[SW] Installing new version...");
  // self.skipWaiting();
  // console.log("skip!");
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
