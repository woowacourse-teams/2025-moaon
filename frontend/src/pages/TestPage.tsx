import { useEffect, useState } from "react";

const APP_VERSION = process.env.APP_VERSION;
const CURRENT_VERSION = process.env.BUILD_HASH;
const VERSION_CHECK_INTERVAL = 1 * 60 * 1000;

interface AssetManifest {
  files: Record<string, string>;
  entrypoints: string[];
  version: string;
  buildHash: string;
  buildTime: string;
}

// 새 버전의 리소스를 백그라운드에서 프리페치
const prefetchNewAssets = async (manifest: AssetManifest) => {
  try {
    // entrypoints에 있는 주요 JS 파일들을 프리페치
    const prefetchPromises = manifest.entrypoints.map(async (entrypoint) => {
      const assetUrl = manifest.files[entrypoint] || `/${entrypoint}`;

      // link 태그로 prefetch 추가
      const link = document.createElement("link");
      link.rel = "prefetch";
      document.head.appendChild(link);

      // 실제로 fetch도 수행 (브라우저 캐시에 저장)
      return fetch(assetUrl, {
        cache: "force-cache",
        credentials: "same-origin",
      });
    });

    // 모든 주요 리소스를 병렬로 프리페치
    await Promise.all(prefetchPromises);

    console.log("✅ 새 버전의 리소스를 백그라운드에서 다운로드 완료");
    return true;
  } catch (error) {
    console.error("프리페치 실패:", error);
    return false;
  }
};

export const checkForNewVersion = async (): Promise<{
  hasNewVersion: boolean;
  manifest?: AssetManifest;
}> => {
  try {
    const response = await fetch("/asset-manifest.json", {
      cache: "no-cache",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) return { hasNewVersion: false };

    const manifest: AssetManifest = await response.json();
    const latestVersion = manifest.buildHash;
    const hasNewVersion = latestVersion !== CURRENT_VERSION;

    return {
      hasNewVersion,
      manifest: hasNewVersion ? manifest : undefined,
    };
  } catch (error) {
    console.error("Failed to check version:", error);
    return { hasNewVersion: false };
  }
};

export const startVersionCheck = (
  onNewVersion: (manifest: AssetManifest) => void,
) => {
  const checkInterval = setInterval(async () => {
    const { hasNewVersion, manifest } = await checkForNewVersion();

    if (hasNewVersion && manifest) {
      clearInterval(checkInterval);

      // 백그라운드에서 새 버전 리소스 프리페치
      await prefetchNewAssets(manifest);

      // 프리페치 완료 후 콜백 실행
      onNewVersion(manifest);
    }
  }, VERSION_CHECK_INTERVAL);

  return () => clearInterval(checkInterval);
};

function TestPage() {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [newManifest, setNewManifest] = useState<AssetManifest | null>(null);

  useEffect(() => {
    // 버전 체크 시작
    const cleanup = startVersionCheck((manifest) => {
      setNewManifest(manifest);
      setShowUpdateBanner(true);
    });

    // 페이지 포커스 시에도 체크
    const handleFocus = async () => {
      if (isPrefetching) return; // 이미 프리페치 중이면 무시

      setIsPrefetching(true);
      const { hasNewVersion, manifest } = await checkForNewVersion();

      if (hasNewVersion && manifest) {
        // 백그라운드에서 새 버전 리소스 프리페치
        await prefetchNewAssets(manifest);
        setNewManifest(manifest);
        setShowUpdateBanner(true);
      }

      setIsPrefetching(false);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      cleanup();
      window.removeEventListener("focus", handleFocus);
    };
  }, [isPrefetching]);

  const handleUpdate = () => {
    // 이미 새 리소스가 브라우저 캐시에 있으므로
    // 새로고침 시 즉시 로드됨 (네트워크 대기 없음)
    window.location.reload();
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
          newVersion={newManifest?.version}
        />
      )}
      <h1>배포 ver: {APP_VERSION}</h1>
      <p>현재 빌드: {CURRENT_VERSION}</p>
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
        새로운 버전({newVersion})이 준비되었습니다.
        <br />
        <small style={{ opacity: 0.8 }}>
          ✨ 업데이트 파일이 이미 다운로드되어 즉시 적용됩니다
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
