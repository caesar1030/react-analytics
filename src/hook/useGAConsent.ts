import type { GtagConsentArg, GtagConsentParams } from '@/core'
import { useGA } from '@/provider'
import { useEffect } from 'react'

interface UseGAConsentProps {
  args: GtagConsentArg
  params: GtagConsentParams
  enabled?: boolean
}

export function useGAConsent({
  args,
  params,
  enabled = true,
}: UseGAConsentProps) {
  const { ga4Consent } = useGA()

  useEffect(() => {
    if (!enabled) return

    ga4Consent(args, params)
  }, [args, params, enabled, ga4Consent])
}
