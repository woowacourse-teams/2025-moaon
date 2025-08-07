import "./libs/sentry/initializeSentry";
import { Global } from "@emotion/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot, type RootOptions } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import GAInitializer from "./libs/googleAnalytics/components/GAInitializer";
import {
  sentryMutationError,
  sentryQueryError,
  sentryRenderError,
  sentryRenderRecoverable,
} from "./libs/sentry/errorReporter";
import { resetStyle } from "./styles/reset.styled";

const createRootOptions: RootOptions = {
  onUncaughtError: (error, errorInfo) => {
    sentryRenderError(error, errorInfo, "react-uncaught-error");
  },
  onCaughtError: (error, errorInfo) => {
    sentryRenderError(error, errorInfo, "react-caught-error");
  },
  onRecoverableError: (error, errorInfo) => {
    sentryRenderRecoverable(error, errorInfo);
  },
};

const container = document.getElementById("root");
const root = createRoot(container!, createRootOptions);

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      sentryQueryError(error, query);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, _, mutation) => {
      sentryMutationError(error, variables, mutation);
    },
  }),
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={resetStyle} />
        <GAInitializer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
