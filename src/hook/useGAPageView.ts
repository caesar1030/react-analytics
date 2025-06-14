import type { GtagEventParams } from '@/core'
import { useGA } from '@/provider'
import { useEffect } from 'react'

export interface UsePageViewTrackingProps {
  eventParams?: GtagEventParams
  enabled?: boolean
}

export const useGAPageView = ({
  eventParams,
  enabled = true,
}: UsePageViewTrackingProps) => {
  const { ga4Event } = useGA()

  useEffect(() => {
    if (!enabled) return

    ga4Event('page_view', {
      ...eventParams,
    })
  }, [enabled, eventParams, ga4Event])
}
