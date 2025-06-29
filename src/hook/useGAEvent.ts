import type { GtagEventName, GtagEventParams } from '@/core'
import { useGA } from '@/provider'
import type { MouseEvent } from 'react'

interface UseGAEventProps {
  eventName: GtagEventName
  eventParams: GtagEventParams
  enabled?: boolean
}

export function useGAEvent({
  eventName,
  eventParams,
  enabled = true,
}: UseGAEventProps) {
  const { ga4Event } = useGA()

  const handleEvent = (
    e: MouseEvent<Element>,
    originalHandler?: (e: MouseEvent<Element>) => void,
  ) => {
    if (enabled) ga4Event(eventName, eventParams)

    originalHandler?.(e)
  }

  return { handleEvent }
}
