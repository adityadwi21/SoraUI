import type { HTMLAttributes } from "react";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The desired aspect ratio (e.g., 16/9, 4/3, 1, 21/9).
   * Default: 16 / 9 (1.7777777777777777)
   */
  ratio?: number;
}
