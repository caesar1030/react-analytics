import type { GtagEventName, GtagEventParams } from '@/core'
import { useGAEvent } from '@/hook'
import {
  Children,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
  cloneElement,
} from 'react'

export interface LogEventProps {
  eventName: GtagEventName
  eventParams: GtagEventParams
  enabled?: boolean
}

export interface ChildProps {
  onClick?: (event: MouseEvent<Element>) => void
}

export function GAEvent({
  children,
  eventName,
  eventParams,
  enabled = true,
}: PropsWithChildren<LogEventProps>) {
  const { handleClick } = useGAEvent({ eventName, eventParams, enabled })
  const child = Children.only(children) as ReactElement<ChildProps>

  return cloneElement(child, {
    onClick: (e: MouseEvent<Element>) => handleClick(e, child.props.onClick),
  })
}
