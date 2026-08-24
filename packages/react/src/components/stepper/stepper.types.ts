import type { HTMLAttributes, ReactNode } from "react";

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  currentStep?: number | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
}
export interface StepperItemProps extends HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean | undefined;
  active?: boolean | undefined;
}
