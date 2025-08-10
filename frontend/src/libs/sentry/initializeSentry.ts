import * as Sentry from "@sentry/react";

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

export { isProduction };
