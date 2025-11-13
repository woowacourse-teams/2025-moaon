import { useCallback, useEffect, useState } from "react";
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
        console.log("[App] 새 버전 감지됨");
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
      onWaiting: (registration) => {
        console.log("[App] 새 버전이 대기 중입니다");
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
    });

    return () => {};
  }, []);

  const handleUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowUpdateBanner(false);
    }
  }, [waitingWorker]);

  useEffect(() => {
    console.log(waitingWorker);
    if (waitingWorker?.state === "installed") {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowUpdateBanner(false);
    }
  }, [waitingWorker?.state, waitingWorker?.postMessage, waitingWorker]);

  const handleDismiss = () => {
    setShowUpdateBanner(false);
  };

  return { handleUpdate, handleDismiss, showUpdateBanner };
};
