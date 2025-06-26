// NOTES: https://developers.google.com/analytics/devguides/collection/ga4/reference/config?hl=ko
export interface GtagConfigParams {
  allow_google_signals?: boolean
  allow_ad_personalization_signals?: boolean

  campaign_id?: string
  campaign_source?: string
  campaign_medium?: string
  campaign_name?: string
  campaign_term?: string
  campaign_content?: string

  client_id?: string
  user_id?: string

  user_properties?: Record<string, string>

  content_group?: string

  cookie_domain?: string
  cookie_expires?: number
  cookie_flags?: string
  cookie_path?: string
  cookie_prefix?: string
  cookie_update?: boolean

  ignore_referrer?: boolean
  language?: string
  page_location?: string
  page_referrer?: string
  page_title?: string
  screen_resolution?: string

  send_page_view?: boolean

  // [key: string]: unknown;
}

// NOTES:https://support.google.com/analytics/answer/9267735
export type RecommendedEventName =
  | 'ad_impression'
  | 'earn_virtual_currency'
  | 'generate_lead'
  | 'join_group'
  | 'login'
  | 'purchase'
  | 'refund'
  | 'search'
  | 'select_content'
  | 'share'
  | 'sign_up'
  | 'spend_virtual_currency'
  | 'tutorial_begin'
  | 'tutorial_complete'
  // NOTES: Online Sales
  | 'add_payment_info'
  | 'add_shipping_info'
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'begin_checkout'
  | 'remove_from_cart'
  | 'select_item'
  | 'select_promotion'
  | 'view_cart'
  | 'view_item'
  | 'view_item_list'
  | 'view_promotion'
  // NOTES: Leads
  | 'qualify_lead'
  | 'disqualify_lead'
  | 'working_lead'
  | 'close_convert_lead'
  | 'close_unconvert_lead'
  // NOTES: Games
  | 'level_end'
  | 'level_start'
  | 'level_up'
  | 'post_score'
  | 'unlock_achievement'
// NOTES: https://developers.google.com/tag-platform/gtagjs/reference?hl=ko#event
export type GtagEventName = RecommendedEventName | (string & {})
export type GtagEventParams = { [key: string]: unknown }

export type GtagSetArgs<T extends string> = keyof GtagConfigParams | T

// NOTES: https://developers.google.com/tag-platform/gtagjs/reference?hl=ko#consent
export type GtagConsentArg = 'default' | 'update'
export type GtagConsentStatus = 'granted' | 'denied'
export type GtagConsentParams = {
  ad_storage?: GtagConsentStatus
  ad_user_data?: GtagConsentStatus
  ad_personalization?: GtagConsentStatus
  analytics_storage?: GtagConsentStatus
  wait_for_update?: number
}

export type CommandMap = {
  event: { eventName: GtagEventName; params: GtagEventParams }
  set: {
    setArgs: GtagSetArgs<string>
    params: unknown
  }
  config: { params: GtagConfigParams }
  consent: { consentArgs: GtagConsentArg; params: GtagConsentParams }
}

export type QueuedCommand = {
  [K in keyof CommandMap]: { command: K } & CommandMap[K]
}[keyof CommandMap]
