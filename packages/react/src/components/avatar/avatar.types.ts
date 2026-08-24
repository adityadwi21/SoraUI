import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | undefined;
}
export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}
export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {}
