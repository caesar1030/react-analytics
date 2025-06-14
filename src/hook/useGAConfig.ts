import type { GtagConfigParams } from '@/core'
import { useGA } from '@/provider'
import { useEffect } from 'react'

interface UseGAConfigProps {
  config: GtagConfigParams
  enabled?: boolean
}

export function useGAConfig({ config, enabled = true }: UseGAConfigProps) {
  const { ga4Config } = useGA()

  useEffect(() => {
    if (!enabled) return

    ga4Config(config)
  }, [config, enabled, ga4Config])
}
