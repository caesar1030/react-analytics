import type { MouseEvent } from "react";
import type { TrackEventOptions } from "@/core/type";

export interface PageViewProps {
  path?: string;
}

export interface LogEventProps extends Omit<TrackEventOptions, "action"> {
  action?: string;
  on?: "mount" | "click" | "both";
}

export interface ChildProps {
  onClick?: (event: MouseEvent<Element>) => void;
}
