import { Link, Route, Routes } from "react-router";
import DetailPage from "./pages/detail/DetailPage";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";

function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<h1>모아온 프로덕션 배포 ㅇ_ㅇ</h1>} />
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
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </GlobalLayout>
  );
}

export default App;
