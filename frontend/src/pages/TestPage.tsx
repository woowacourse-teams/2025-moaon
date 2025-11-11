import { useEffect, useState } from "react";
import { register, unregister } from "@/worker";

const APP_VERSION = process.env.APP_VERSION;
const CURRENT_VERSION = process.env.BUILD_HASH;

function TestPage() {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Service Worker 등록
    console.log("[TestPage] Service Worker 등록 시도");
    const wb = register({
      onUpdate: (registration) => {
        console.log("[App] 새 버전 감지됨");
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
      onSuccess: () => {
        console.log("[App] Service Worker 등록 성공");
      },
      onWaiting: (registration) => {
        console.log("[App] 새 버전이 대기 중입니다");
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
    });

    return () => {
      // cleanup
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      // 새 Service Worker에게 즉시 활성화 메시지 전송
      waitingWorker.postMessage({ type: "SKIP_WAITING" });

      // controlling 이벤트에서 자동으로 reload 됨
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
      <p>카운트: {count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        카운트 증가
      </button>
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
