const APP_VERSION = process.env.APP_VERSION;

function TestPage() {
  const bigObj = Array(1_000_000).fill("x");
  const bigObj1 = Array(1_000_000).fill("x");
  const bigObj2 = Array(1_000_000).fill("x");
  const bigObj3 = Array(1_000_000).fill("x");
  const bigObj4 = Array(1_000_000).fill("x");
  const bigObj5 = Array(1_000_000).fill("x");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        {/* 배포 버전 텍스트 */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#ffffff",
            margin: "0 0 24px 0",
            letterSpacing: "-1px",
            lineHeight: "1.2",
          }}
        >
          배포 버전
        </h1>

        {/* 버전 정보 박스 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "32px",
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              color: "#999999",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: "500",
            }}
          >
            현재 버전
          </p>
          <p
            style={{
              fontSize: "36px",
              fontWeight: "600",
              color: "#00d9ff",
              margin: "0",
              fontFamily: '"Courier New", monospace',
            }}
          >
            {APP_VERSION}
          </p>
        </div>

        {/* 새로고침 버튼 */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 32px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#0a0a0a",
            background: "linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 24px rgba(0, 217, 255, 0.3)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform =
              "translateY(-2px)";
            (e.target as HTMLButtonElement).style.boxShadow =
              "0 12px 32px rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            (e.target as HTMLButtonElement).style.boxShadow =
              "0 8px 24px rgba(0, 217, 255, 0.3)";
          }}
        >
          🔄 새로고침
        </button>

        {/* 하단 정보 텍스트 */}
        <p
          style={{
            marginTop: "48px",
            fontSize: "13px",
            color: "#666666",
            lineHeight: "1.6",
          }}
        >
          이 페이지는 배포된 애플리케이션의 버전을 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default TestPage;
