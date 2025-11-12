const APP_VERSION = process.env.APP_VERSION;

function TestPage() {
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ fontSize: "20px" }}>배포 ver: {APP_VERSION}</h1>
      <button type="button" onClick={() => window.location.reload()}>
        요청 보내기
      </button>
    </div>
  );
}

export default TestPage;
