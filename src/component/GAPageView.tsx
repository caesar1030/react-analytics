import type { GtagEventParams } from '@/core'
import { useGAPageView } from '@/hook'

export interface PageViewProps {
  children?: React.ReactNode
  enabled?: boolean
  eventParams?: GtagEventParams
}

export function GAPageView({
  children,
  enabled = true,
  eventParams,
}: PageViewProps) {
  useGAPageView({ eventParams, enabled })

  return <>{children}</>
}
