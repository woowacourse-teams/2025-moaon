import { LoadingSpinner } from "@shared/components/LoadingSpinner/LoadingSpinner";
import { ScrollToTop } from "@shared/components/ScrollToTop/ScrollToTop";
import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router";
import useTrackPageTimeGA from "./libs/googleAnalytics/hooks/useTrackPageTimeGA";
import TestPage from "./pages/TestPage";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";

// const ProjectListPage = lazy(
//   () => import("./pages/project-list/ProjectListPage"),
// );
// const ProjectDetailPage = lazy(
//   () => import("./pages/project-detail/ProjectDetailPage"),
// );
// const ArticlePage = lazy(() => import("./pages/article/ArticlePage"));
// const WootecoEventPage = lazy(() => import("./pages/wooteco/WootecoEventPage"));
// const CompanyEventPage = lazy(
//   () => import("./pages/wooteco/company/CompanyEventPage"),
// );
// const EventLandingPage = lazy(
//   () => import("./pages/eventLanding/EventLandingPage"),
// );
// const OAuthCallback = lazy(() => import("./pages/oauth/OAuthCallback"));
// const RegisterPage = lazy(() => import("./pages/register/RegisterPage"));

function App() {
  // useTrackPageTimeGA();
  return (
    <>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/" element={<EventLandingPage />} />
            <Route path="/project" element={<ProjectListPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/wooteco" element={<WootecoEventPage />} />
            <Route path="/wooteco/:company" element={<CompanyEventPage />} />
            <Route path="/oauth/callback/:result" element={<OAuthCallback />} /> */}
            <Route path="/test" element={<TestPage />} />
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
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </Routes>
        </Suspense>
      </GlobalLayout>
    </>
  );
}

export default App;
