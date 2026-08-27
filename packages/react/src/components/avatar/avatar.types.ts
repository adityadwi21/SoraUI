import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarBadgeStatus =
  | "online"
  | "offline"
  | "busy"
  | "away"
  | "verified"
  | "custom";
export type AvatarBadgePosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  bordered?: boolean;
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (
    status: "idle" | "loading" | "loaded" | "error"
  ) => void;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
}

export interface AvatarBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: AvatarBadgeStatus;
  position?: AvatarBadgePosition;
  pulse?: boolean;
  children?: ReactNode;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: AvatarSize;
  dir?: "ltr" | "rtl";
}
