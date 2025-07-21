import { Link, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>모아온 프로덕션 배포</h1>} />
      <Route
        path="*"
        element={
          <>
            <h1>존재 하지 않는 페이지 입니다.</h1>
            <br />
            <br />
            <br />
            <Link to="/">메인 페이지로 이동</Link>
          </>
        }
      />
    </Routes>
  );
}

export default App;
