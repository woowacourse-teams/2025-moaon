import { Workbox } from "workbox-window";

interface ServiceWorkerConfig {
  onUpdate: (registration: ServiceWorkerRegistration) => void;
  onWaiting: (registration: ServiceWorkerRegistration) => void;
}

export function register(config: ServiceWorkerConfig) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[SW] Service Worker는 프로덕션에서만 실행됩니다.");
    return;
  }

  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    // // 새 Service Worker가 설치되고 대기 중일 때
    wb.addEventListener("waiting", (event) => {
      console.log("[SW] 새 버전이 설치되었습니다. 업데이트 대기 중...");
      config.onWaiting({
        ...event,
        waiting: event.sw,
      } as unknown as ServiceWorkerRegistration);
    });

    // Service Worker 업데이트 감지
    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log("[SW] Service Worker가 업데이트되었습니다.");
        config.onUpdate({
          ...event,
          waiting: event?.sw,
        } as unknown as ServiceWorkerRegistration);
      }
    });

    // Service Worker 등록
    wb.register();

    setInterval(() => {
      wb.update();
    }, 1 * 60 * 1000);

    return wb;
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error("[SW] Service Worker 등록 해제 실패:", error.message);
      });
  }
}
