import type { GtagConsentArg, GtagConsentParams } from '@/core'
import { useGAConsent } from '@/hook'
import type { PropsWithChildren } from 'react'

export interface GAConsentProps {
  args: GtagConsentArg
  params: GtagConsentParams
  enabled?: boolean
}

export function GAConsent({
  children,
  args,
  params,
  enabled = true,
}: PropsWithChildren<GAConsentProps>) {
  useGAConsent({ args, params, enabled })

  return <>{children}</>
}
