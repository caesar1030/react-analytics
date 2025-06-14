import type { GtagConfigParams } from '@/core'
import { useGAConfig } from '@/hook'
import type { PropsWithChildren } from 'react'

export interface GAConfigProps {
  config: GtagConfigParams
  enabled?: boolean
}

export function GAConfig({
  children,
  config,
  enabled = true,
}: PropsWithChildren<GAConfigProps>) {
  useGAConfig({ config, enabled })

  return <>{children}</>
}
