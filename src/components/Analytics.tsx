import {
  type PropsWithChildren,
  type ReactElement,
  type MouseEvent,
  Children,
  cloneElement,
} from "react";
import type { ChildProps, LogEventProps, PageViewProps } from "./type";
import { useEventTracking, usePageViewTracking } from "@/hooks";

export const PageView = ({
  children,
  path,
}: PropsWithChildren<PageViewProps>) => {
  usePageViewTracking(path);
  return <>{children}</>;
};

export const LogEvent = ({
  children,
  category = "interaction",
  action = "click",
  label,
  value,
  on = "click",
}: PropsWithChildren<LogEventProps>) => {
  const { handleClick } = useEventTracking({
    category,
    action,
    label,
    value,
    on,
  });

  if (!Children.only(children)) {
    throw new Error("LogEvent must have exactly one child element");
  }

  const child = Children.only(children) as ReactElement<ChildProps>;

  return cloneElement(child, {
    onClick: (e: MouseEvent<Element>) => handleClick(e, child.props.onClick),
  });
};
