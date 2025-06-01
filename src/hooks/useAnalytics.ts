import {
  type AnalyticsConfig,
  initializeAnalytics,
  trackPageView,
  trackEvent,
} from "@/core";
import { useEffect } from "react";
import type { MouseEvent } from "react";
import type { UseEventTrackingOptions } from "./type";

export const useInitializeAnalytics = (config: AnalyticsConfig) => {
  useEffect(() => {
    initializeAnalytics(config);
  }, [config.measurementId, config.debug, config]);
};

export const usePageViewTracking = (path?: string) => {
  useEffect(() => {
    const currentPath =
      path || window.location.pathname + window.location.search;
    trackPageView(currentPath);
  }, [path]);
};

export const useEventTracking = ({
  category = "interaction",
  action = "click",
  label,
  value,
  on = "click",
}: UseEventTrackingOptions) => {
  useEffect(() => {
    if (on === "mount" || on === "both") {
      trackEvent({ category, action, label, value });
    }
  }, [category, action, label, value, on]);

  const handleClick = (
    e: MouseEvent<Element>,
    originalOnClick?: (e: MouseEvent<Element>) => void
  ) => {
    if (on === "click" || on === "both") {
      trackEvent({ category, action, label, value });
    }

    if (originalOnClick) {
      originalOnClick(e);
    }
  };

  return { handleClick };
};
