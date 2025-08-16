import "./libs/sentry/initializeSentry";
import { Global } from "@emotion/react";
import { ErrorBoundary } from "@sentry/react";
import { ToastContainer } from "@shared/components/Toast/components/ToastContainer/ToastContainer";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import GAInitializer from "./libs/googleAnalytics/components/GAInitializer";
import {
  mutationCacheErrorOptions,
  queryCacheErrorOptions,
  reactRootOptions,
} from "./libs/sentry/initializeSentry";
import { resetStyle } from "./styles/reset.styled";

const container = document.getElementById("root");
const root = createRoot(container!, reactRootOptions);

const queryClient = new QueryClient({
  queryCache: new QueryCache(queryCacheErrorOptions),
  mutationCache: new MutationCache(mutationCacheErrorOptions),
});

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>에러가 발생했습니다.</h1>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Global styles={resetStyle} />
          <GAInitializer />
          <App />
          <ToastContainer />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
