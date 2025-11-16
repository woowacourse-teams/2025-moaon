import { LoadingSpinner } from "@shared/components/LoadingSpinner/LoadingSpinner";
import { ScrollToTop } from "@shared/components/ScrollToTop/ScrollToTop";
import { Suspense } from "react";
import { Link, Route, Routes } from "react-router";
import useTrackPageTimeGA from "./libs/googleAnalytics/hooks/useTrackPageTimeGA";
import {
  ArticlePage,
  CompanyEventPage,
  EventLandingPage,
  NotFoundPage,
  OAuthCallback,
  ProjectDetailPage,
  ProjectListPage,
  RegisterPage,
  WootecoEventPage,
} from "./pages";
import GlobalLayout from "./shared/components/Layout/GlobalLayout";

function App() {
  useTrackPageTimeGA();
  return (
    <>
      <ScrollToTop />
      <GlobalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<EventLandingPage />} />
            <Route path="/project" element={<ProjectListPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth/callback/:result" element={<OAuthCallback />} />
            <Route path="/wooteco" element={<WootecoEventPage />} />
            <Route path="/wooteco/:company" element={<CompanyEventPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </GlobalLayout>
    </>
  );
}

export default App;
