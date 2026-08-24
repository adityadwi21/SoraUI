import type { HTMLAttributes, ReactNode } from "react";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {}
export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  active?: boolean | undefined;
}
