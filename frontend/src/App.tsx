import { Link, Route, Routes } from "react-router";
import DetailPage from "./pages/detail/DetailPage";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";
import ListPage from "./pages/list/ListPage";

function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<h1>모아온 프로덕션 배포</h1>} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
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
    </GlobalLayout>
  );
}

export default App;
