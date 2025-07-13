import {
  type GtagConfigParams,
  type GtagEventName,
  type GtagEventParams,
  type GtagConsentArg,
  type GtagConsentParams,
  type GtagSetArgs,
  GA4,
} from '@/core'
import type { Nullable, DeepReadonly } from '@/util'
import React, { createContext, useContext, useEffect } from 'react'

interface GAContextValue {
  config: Nullable<DeepReadonly<GtagConfigParams>>
  ga4Event: (eventName: GtagEventName, eventParams: GtagEventParams) => void
  ga4Config: (config: GtagConfigParams) => void
  ga4Consent: (args: GtagConsentArg, params: GtagConsentParams) => void
  ga4Set: <K extends GtagSetArgs<string>>(
    args: K,
    params: K extends keyof GtagConfigParams ? GtagConfigParams[K] : any,
  ) => void
}

const GAContext = createContext<GAContextValue | null>(null)

interface GAProviderProps {
  measurementId: string
  config?: GtagConfigParams
}

export const GAProvider = ({
  measurementId,
  config,
  children,
}: React.PropsWithChildren<GAProviderProps>) => {
  const analytics = React.useMemo(() => new GA4(measurementId), [measurementId])

  useEffect(() => {
    analytics.initialize(config)
  }, [config, analytics])

  const value = React.useMemo(
    () => ({
      config: analytics.configInfo,
      ga4Event: analytics.event.bind(analytics),
      ga4Config: analytics.config.bind(analytics),
      ga4Consent: analytics.consent.bind(analytics),
      ga4Set: analytics.set.bind(analytics),
    }),
    [analytics],
  )

  return <GAContext.Provider value={value}>{children}</GAContext.Provider>
}

export const useGA = () => {
  const context = useContext(GAContext)
  if (!context) throw new Error('useGA must be used within a GAProvider')

  return context
}
