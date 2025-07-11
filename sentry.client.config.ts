import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f823858c67aca3d1cc548cef96e68128@o4509642881368064.ingest.us.sentry.io/4509642882940928", // ✅ Use the one in your screenshot
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({ colorScheme: "system" }),
  ],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
