import type { GtagSetArgs, GtagConfigParams } from '@/core'
import { useGASet } from '@/hook'
import type { PropsWithChildren } from 'react'

export function GASet<K extends string>({
  children,
  args,
  params,
  enabled = true,
}: PropsWithChildren<{
  args: GtagSetArgs<K>
  params: K extends keyof GtagConfigParams ? GtagConfigParams[K] : any
  enabled?: boolean
}>) {
  useGASet({ args, params, enabled })

  return <>{children}</>
}
