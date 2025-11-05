import { useEffect, useState } from "react";

const APP_VERSION = process.env.APP_VERSION;
const CURRENT_VERSION = process.env.BUILD_HASH;
const VERSION_CHECK_INTERVAL = 1 * 60 * 1000;

export const checkForNewVersion = async () => {
  try {
    const response = await fetch("/asset-manifest.json", {
      cache: "no-cache", // 캐시 우회
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) return false;

    const manifest = await response.json();
    const latestVersion = manifest.buildHash;

    return latestVersion !== CURRENT_VERSION;
  } catch (error) {
    console.error("Failed to check version:", error);
    return false;
  }
};

export const startVersionCheck = (onNewVersion: () => void) => {
  const checkInterval = setInterval(async () => {
    const hasNewVersion = await checkForNewVersion();

    if (hasNewVersion) {
      clearInterval(checkInterval);
      onNewVersion();
    }
  }, VERSION_CHECK_INTERVAL);

  return () => clearInterval(checkInterval);
};

function TestPage() {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);

  useEffect(() => {
    // 버전 체크 시작
    const cleanup = startVersionCheck(() => {
      setShowUpdateBanner(true);
    });

    // 페이지 포커스 시에도 체크
    const handleFocus = async () => {
      const hasNewVersion = await checkForNewVersion();
      if (hasNewVersion) {
        setShowUpdateBanner(true);
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      cleanup();
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <div>
      {showUpdateBanner && <UpdateBanner onUpdate={handleUpdate} />}
      <h1>배포 ver: {APP_VERSION}</h1>
    </div>
  );
}

export default TestPage;

function UpdateBanner({ onUpdate }: { onUpdate: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "75px",
        left: 0,
        background: "rgba(255, 99, 71, 0.7)",
        color: "#fff",
        padding: "12px",
        width: "100vw",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <p>새로운 버전이 있습니다. 업데이트하시겠습니까?</p>
      <button type="button" onClick={onUpdate}>
        업데이트
      </button>
    </div>
  );
}
