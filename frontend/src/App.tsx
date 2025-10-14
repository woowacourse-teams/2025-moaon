import { LoadingSpinner } from "@shared/components/LoadingSpinner/LoadingSpinner";
import { ScrollToTop } from "@shared/components/ScrollToTop/ScrollToTop";
import { Suspense } from "react";
import { Link, Route, Routes } from "react-router";
import useTrackPageTimeGA from "./libs/googleAnalytics/hooks/useTrackPageTimeGA";
import ArticlePage from "./pages/article/ArticlePage";
import LandingPage from "./pages/landing/LandingPage";
import ProjectDetailPage from "./pages/project-detail/ProjectDetailPage";
import ProjectListPage from "./pages/project-list/ProjectListPage";
import RegisterPage from "./pages/register/RegisterPage";
import Header from "./shared/components/Header/Header";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";

function App() {
  useTrackPageTimeGA();
  return (
    <>
      <ScrollToTop />
      <Header />
      <GlobalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/project" element={<ProjectListPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
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
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </GlobalLayout>
    </>
  );
}

export default App;
