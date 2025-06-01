import type { TrackEventOptions } from "@/core";

export type EventTiming = "mount" | "click" | "both";

export interface UseEventTrackingOptions
  extends Omit<TrackEventOptions, "action"> {
  action?: string;
  on?: EventTiming;
}
