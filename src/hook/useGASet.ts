import type { GtagConfigParams, GtagSetArgs } from '@/core'
import { useGA } from '@/provider'
import { useEffect } from 'react'

export function useGASet<K extends string>({
  args,
  params,
  enabled = true,
}: {
  args: GtagSetArgs<K>
  params: K extends keyof GtagConfigParams ? GtagConfigParams[K] : any
  enabled?: boolean
}) {
  const { ga4Set } = useGA()

  useEffect(() => {
    if (!enabled) return

    ga4Set(args, params)
  }, [args, params, enabled, ga4Set])
}
