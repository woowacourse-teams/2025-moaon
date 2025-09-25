import "./libs/sentry/initializeSentry";
import { Global } from "@emotion/react";
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";
import { FallbackErrorUi } from "@shared/components/FallbackErrorUi/FallbackErrorUi";
import {
  TOAST_DEFAULT_POSITION,
  TOAST_LIMIT,
} from "@shared/components/Toast/constants/toast.constants";
import { ToastContainer } from "@shared/components/Toast/ToastContainer/ToastContainer";
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={resetStyle} />
        <SentryErrorBoundary
          fallback={
            <FallbackErrorUi
              scope="viewport"
              title="오류 발생"
              message="페이지를 새로고침해주세요."
            />
          }
        >
          <GAInitializer />
          <App />
          <ToastContainer
            position={TOAST_DEFAULT_POSITION}
            limit={TOAST_LIMIT}
          />
        </SentryErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
