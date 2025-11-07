import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

// precacheAndRoute 실행
console.log("hi");
precacheAndRoute(self.__WB_MANIFEST);

// // HTML - 네트워크 우선 (3초 타임아웃)
// registerRoute(
//   ({ request }) => request.mode === "navigate",
//   new NetworkFirst({
//     cacheName: "pages",
//     networkTimeoutSeconds: 3,
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 50,
//       }),
//     ],
//   }),
// );

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

// 이미지 - 캐시 우선
// registerRoute(
//   ({ request }) => request.destination === "image",
//   new CacheFirst({
//     cacheName: "images",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 60 * 24 * 60 * 60, // 60일
//       }),
//     ],
//   }),
// );

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

// // API 요청 - 네트워크 우선
// registerRoute(
//   ({ url }) => url.pathname.startsWith("/api/"),
//   new NetworkFirst({
//     cacheName: "api-cache",
//     networkTimeoutSeconds: 5,
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 60, // 5분
//       }),
//     ],
//   }),
// );

// 새 Service Worker 활성화 메시지 처리
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 설치 이벤트
self.addEventListener("install", (event) => {
  console.log("[SW] Installing new version...");
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
      console.log("제어권 변경!");
    })(),
  );
});
