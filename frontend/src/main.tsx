import "./libs/sentry/initializeSentry";
import { Global } from "@emotion/react";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { resetStyle } from "./styles/reset.styled";

const container = document.getElementById("root");
const root = createRoot(container!, {
  onUncaughtError: (error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: errorInfo,
      },
    });
  },
  onCaughtError: (error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: errorInfo,
      },
    });
  },
  onRecoverableError: (error, errorInfo) => {
    Sentry.captureException(error, {
      level: "warning",
      contexts: {
        react: {
          componentStack: errorInfo?.componentStack || "No component stack",
          errorBoundary: true,
          recoverable: true,
        },
      },
    });
  },
});
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={resetStyle} />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
