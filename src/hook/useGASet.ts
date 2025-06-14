import type { GtagConfigParams, GtagSetArgs } from '@/core'
import { useGA } from '@/provider'
import { useEffect } from 'react'

export function useGASet<K extends GtagSetArgs>({
  args,
  params,
  enabled = true,
}: {
  args: K
  params: GtagConfigParams[K]
  enabled?: boolean
}) {
  const { ga4Set } = useGA()

  useEffect(() => {
    if (!enabled) return

    ga4Set(args, params)
  }, [args, params, enabled, ga4Set])
}
