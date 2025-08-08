import type { Context } from "@sentry/react";
import * as Sentry from "@sentry/react";
import type { Component } from "react";
import type { ErrorInfo } from "react-dom/client";
import { typeSafeError } from "./utils/typeSafeError";

interface QueryLike {
  queryKey: readonly unknown[];
}

interface MutationLike {
  options: {
    mutationKey?: readonly unknown[];
  };
}

interface ErrorInfoWithErrorBoundary extends ErrorInfo {
  errorBoundary?: Component<unknown>;
}

export const sentryRenderError = (error: unknown, errorInfo: ErrorInfoWithErrorBoundary, errorType: string) => {
  const errorObj = typeSafeError(error);

  Sentry.captureException(errorObj, {
    tags: { errorType },
    contexts: {
      react: errorInfo as Context,
    },
  });
};

export const sentryRenderRecoverable = (error: unknown, errorInfo: ErrorInfo) => {
  const errorObj = typeSafeError(error);

  Sentry.captureException(errorObj, {
    tags: { errorType: "react-recoverable-error" },
    level: "warning",
    contexts: {
      react: {
        componentStack: errorInfo?.componentStack || "No component stack",
        errorBoundary: true,
        recoverable: true,
      },
    },
  });
};

export const sentryQueryError = (error: Error, query: QueryLike) => {
  Sentry.captureException(error, {
    tags: {
      errorType: "api-query",
    },
    contexts: {
      api: {
        type: "query",
        queryKey: query.queryKey,
        message: error.message || "Unknown error",
        name: error.name || "Error",
        url: (error as any)?.url || "unknown",
        status: (error as any)?.status || "unknown",
      },
    },
  });
};

export const sentryMutationError = (error: Error, variables: unknown, mutation: MutationLike) => {
  Sentry.captureException(error, {
    tags: {
      errorType: "api-mutation",
    },
    contexts: {
      api: {
        type: "mutation",
        mutationKey: mutation.options.mutationKey,
        message: error.message || "Unknown error",
        name: error.name || "Error",
        url: (error as any)?.url || "unknown",
        status: (error as any)?.status || "unknown",
      },
    },
    extra: {
      variables,
    },
  });
};
