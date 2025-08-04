import { Link, Route, Routes } from "react-router";
import ArticlePage from "./pages/article/ArticlePage";
import DetailPage from "./pages/detail/DetailPage";
import ListPage from "./pages/list/ListPage";
import Header from "./shared/components/Header/Header";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";

function App() {
  return (
    <>
      <Header />
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<h1>모아온 프로덕션 배포</h1>} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/article" element={<ArticlePage />} />
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
    </>
  );
}

export default App;
