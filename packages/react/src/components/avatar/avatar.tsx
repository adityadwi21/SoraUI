import { forwardRef, useState } from "react";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./avatar.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = "md", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("sora-avatar", `sora-avatar--${size}`, className)}
      {...props}
    />
  ),
);
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt, className, onError, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        className={cx("sora-avatar__image", className)}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("sora-avatar__fallback", className)}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";
