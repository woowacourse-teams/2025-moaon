import * as Sentry from "@sentry/react";
import type { MutationCache, QueryCache } from "@tanstack/react-query";
import type { RootOptions } from "react-dom/client";
import { sentryMutationError, sentryQueryError, sentryRenderError, sentryRenderRecoverable } from "./errorReporter";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  Sentry.init({
    dsn: process.env.SENTRY_API_DSN,
    sendDefaultPii: true,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    enableLogs: true,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export const reactRootOptions: RootOptions | undefined = isProduction
  ? {
      onUncaughtError: (error, errorInfo) => {
        sentryRenderError(error, errorInfo, "react-uncaught-error");
      },
      onCaughtError: (error, errorInfo) => {
        sentryRenderError(error, errorInfo, "react-caught-error");
      },
      onRecoverableError: (error, errorInfo) => {
        sentryRenderRecoverable(error, errorInfo);
      },
    }
  : undefined;

export const queryCacheErrorOptions: ConstructorParameters<typeof QueryCache>[0] = {
  onError: isProduction
    ? (error, query) => {
        sentryQueryError(error, query);
      }
    : undefined,
};

export const mutationCacheErrorOptions: ConstructorParameters<typeof MutationCache>[0] = {
  onError: isProduction
    ? (error, variables, _, mutation) => {
        sentryMutationError(error, variables, mutation);
      }
    : undefined,
};
