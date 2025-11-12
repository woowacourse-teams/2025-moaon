import { useEffect, useState } from "react";
import { register } from "@/worker";

const APP_VERSION = process.env.APP_VERSION;
const CURRENT_VERSION = process.env.BUILD_HASH;

function TestPage() {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
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
    const messageHandler = async (event: MessageEvent) => {
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

  return (
    <div>
      {showUpdateBanner && (
        <UpdateBanner
          onUpdate={handleUpdate}
          onDismiss={handleDismiss}
          newVersion={APP_VERSION}
        />
      )}
      <h1>배포 ver: {APP_VERSION}</h1>
      <p>현재 빌드: {CURRENT_VERSION}</p>
      <button type="button" onClick={() => window.location.reload()}>
        윈도우 리로드
      </button>
    </div>
  );
}

export default TestPage;

function UpdateBanner({
  onUpdate,
  onDismiss,
  newVersion,
}: {
  onUpdate: () => void;
  onDismiss: () => void;
  newVersion?: string;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "75px",
        left: 0,
        background: "rgba(33, 128, 141, 0.95)",
        color: "#fff",
        padding: "16px",
        width: "100vw",
        textAlign: "center",
        zIndex: 9999,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
        🚀 새로운 버전({newVersion})이 준비되었습니다.
        <br />
        <small style={{ opacity: 0.8 }}>
          업데이트하면 최신 기능을 사용할 수 있습니다.
        </small>
      </p>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <button
          type="button"
          onClick={onUpdate}
          style={{
            padding: "8px 24px",
            background: "#fff",
            color: "#21808d",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          지금 업데이트
        </button>
        <button
          type="button"
          onClick={onDismiss}
          style={{
            padding: "8px 24px",
            background: "transparent",
            color: "#fff",
            border: "1px solid #fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          나중에
        </button>
      </div>
    </div>
  );
}
