import type { AnalyticsConfig, TrackEventOptions } from "./type";

let analyticsConfig: AnalyticsConfig | null = null;
let isInitialized = false;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const loadGoogleAnalytics = (measurementId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="googletagmanager"]`)) {
      console.log("[Analytics] GA script already loaded");
      resolve();
      return;
    }

    window.dataLayer = window.dataLayer || [];
    // TODO: 타입 지정
    const gtag = function (...args: unknown[]) {
      window.dataLayer.push(...args);
      console.log("[Analytics] gtag call:", args);
    };
    window.gtag = gtag;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    script.onload = () => {
      console.log("[Analytics] GA script loaded successfully");
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        send_page_view: false,
      });
      resolve();
    };
    script.onerror = (error) => {
      console.error("[Analytics] Failed to load GA script:", error);
      reject(error);
    };

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
    console.log("[Analytics] GA script injected");
  });
};

export const initializeAnalytics = async (config: AnalyticsConfig) => {
  if (isInitialized) {
    console.log("[Analytics] Already initialized");
    return;
  }

  console.log("[Analytics] Initializing with config:", config);
  analyticsConfig = config;

  try {
    await loadGoogleAnalytics(config.measurementId);
    isInitialized = true;

    if (config.debug) {
      console.log("[Analytics] Debug mode enabled");
    }
  } catch (error) {
    console.error("[Analytics] Initialization failed:", error);
    throw error;
  }
};

export const trackPageView = (path: string) => {
  if (!analyticsConfig || !isInitialized) {
    console.warn(
      "[Analytics] Not initialized. Call initializeAnalytics first."
    );
    return;
  }

  try {
    window.gtag("event", "page_view", {
      page_path: path,
      send_to: analyticsConfig.measurementId,
    });

    if (analyticsConfig.debug) {
      console.log("[Analytics] Page View:", path);
    }
  } catch (error) {
    console.error("[Analytics] Failed to track page view:", error);
  }
};

export const trackEvent = (options: TrackEventOptions) => {
  if (!analyticsConfig || !isInitialized) {
    console.warn(
      "[Analytics] Not initialized. Call initializeAnalytics first."
    );
    return;
  }

  try {
    window.gtag("event", options.action, {
      event_category: options.category,
      event_label: options.label,
      value: options.value,
      send_to: analyticsConfig.measurementId,
    });

    if (analyticsConfig.debug) {
      console.log("[Analytics] Event:", options);
    }
  } catch (error) {
    console.error("[Analytics] Failed to track event:", error);
  }
};
