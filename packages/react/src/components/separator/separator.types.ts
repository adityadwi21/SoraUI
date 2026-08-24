import type { HTMLAttributes } from "react";
export type SeparatorOrientation = "horizontal" | "vertical";
export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}
