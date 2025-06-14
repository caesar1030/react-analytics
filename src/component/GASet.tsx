import type { GtagSetArgs, GtagConfigParams } from '@/core'
import { useGASet } from '@/hook'
import type { PropsWithChildren } from 'react'

export function GASet<K extends GtagSetArgs>({
  children,
  args,
  params,
  enabled = true,
}: PropsWithChildren<{
  args: K
  params: GtagConfigParams[K]
  enabled?: boolean
}>) {
  useGASet({ args, params, enabled })

  return <>{children}</>
}
