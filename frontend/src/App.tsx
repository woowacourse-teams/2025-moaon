import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1>모아온 테스트 - 7월 19일 토요일 17:45</h1>}
      />
      <Route
        path="*"
        element={
          <h1>
            에러 페이지 <br />
            <br />
            <br />
            <a href="/">메인 페이지로 돌아가기</a>
          </h1>
        }
      />
    </Routes>
  );
}

export default App;
