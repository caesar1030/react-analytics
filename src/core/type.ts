export interface AnalyticsConfig {
  measurementId: string;
  debug?: boolean;
}

export interface TrackEventOptions {
  category: string;
  action: string;
  label?: string;
  value?: number;
}
