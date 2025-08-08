import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_API_DNS,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  enableLogs: true,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
