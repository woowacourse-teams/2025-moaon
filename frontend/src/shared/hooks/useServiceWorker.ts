import { useEffect, useState } from "react";
import { register } from "@/worker";

export const useServiceWorker = () => {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );

  useEffect(() => {
    // Service Worker 등록
    const wb = register({
      onUpdate: (registration) => {
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
      onSuccess: () => {
        console.log("[App] Service Worker 등록 성공");
      },
      onWaiting: (registration) => {
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
    });

    // BroadcastUpdatePlugin에서 보내는 메시지 수신
    const messageHandler = (event: MessageEvent) => {
      console.log("Received message:", event.data);

      if (event.data?.meta === "workbox-broadcast-update") {
        const { cacheName, updatedURL } = event.data.payload;
        console.log("[Broadcast] 업데이트 감지:", cacheName, updatedURL);
        setShowUpdateBanner(true);
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", messageHandler);
    }

    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("message", messageHandler);
      }
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowUpdateBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdateBanner(false);
  };

  return { handleUpdate, handleDismiss, showUpdateBanner };
};
