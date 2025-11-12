export default function UpdateBanner({
  onUpdate,
  onDismiss,
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
