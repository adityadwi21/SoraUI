import {
  forwardRef,
  useState,
  useEffect,
  createContext,
  useContext,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarBadgeProps,
  AvatarGroupProps,
  AvatarSize,
} from "./avatar.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarGroupContextValue {
  size?: AvatarSize;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue>({});

interface AvatarContextValue {
  size?: AvatarSize;
  status: ImageLoadingStatus;
  onImageStatusChange: (status: ImageLoadingStatus) => void;
}

const AvatarContext = createContext<AvatarContextValue>({
  status: "idle",
  onImageStatusChange: () => {},
});

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size: sizeProp, shape = "circle", bordered = false, className, children, ...props }, ref) => {
    const groupContext = useContext(AvatarGroupContext);
    const size = sizeProp ?? groupContext.size ?? "md";
    const [status, setStatus] = useState<ImageLoadingStatus>("idle");

    return (
      <AvatarContext.Provider value={{ size, status, onImageStatusChange: setStatus }}>
        <span
          ref={ref}
          className={cx(
            "sora-avatar",
            `sora-avatar--${size}`,
            `sora-avatar--${shape}`,
            bordered && "sora-avatar--bordered",
            className
          )}
          {...props}
        >
          {children}
        </span>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt, className, onError, onLoad, onLoadingStatusChange, ...props }, ref) => {
    const { onImageStatusChange } = useContext(AvatarContext);

    useEffect(() => {
      if (!src) {
        onImageStatusChange("error");
        onLoadingStatusChange?.("error");
        return undefined;
      }

      // Check if image is already cached or complete
      const img = new Image();
      img.src = src;
      if (img.complete && img.naturalWidth > 0) {
        onImageStatusChange("loaded");
        onLoadingStatusChange?.("loaded");
      } else {
        onImageStatusChange("loading");
        onLoadingStatusChange?.("loading");
      }
      return undefined;
    }, [src, onImageStatusChange, onLoadingStatusChange]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      onImageStatusChange("loaded");
      onLoadingStatusChange?.("loaded");
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      onImageStatusChange("error");
      onLoadingStatusChange?.("error");
      onError?.(e);
    };

    if (!src) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cx("sora-avatar__image", className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ delayMs, className, children, ...props }, ref) => {
    const { status } = useContext(AvatarContext);
    const [canRender, setCanRender] = useState(delayMs === undefined);

    useEffect(() => {
      if (delayMs === undefined) {
        return undefined;
      }
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }, [delayMs]);

    // Only render fallback if image is NOT loaded and delay timer passed
    if (status === "loaded" || !canRender) return null;

    return (
      <span
        ref={ref}
        className={cx("sora-avatar__fallback", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

export const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ status = "online", position = "bottom-right", pulse = false, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(
          "sora-avatar__badge",
          `sora-avatar__badge--${status}`,
          `sora-avatar__badge--${position}`,
          pulse && "sora-avatar__badge--pulse",
          Boolean(children) && "sora-avatar__badge--with-icon",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, spacing = "normal", size = "md", dir, className, children, ...props }, ref) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const hasMax = typeof max === "number" && max > 0 && childArray.length > max;
    const visibleChildren = hasMax ? childArray.slice(0, max) : childArray;
    const remainingCount = hasMax ? childArray.length - max : 0;

    return (
      <AvatarGroupContext.Provider value={{ size }}>
        <div
          ref={ref}
          dir={dir}
          className={cx(
            "sora-avatar-group",
            `sora-avatar-group--${spacing}`,
            dir === "rtl" && "sora-avatar-group--rtl",
            className
          )}
          {...props}
        >
          {visibleChildren}
          {remainingCount > 0 && (
            <Avatar size={size} className="sora-avatar--more">
              <AvatarFallback>+{remainingCount}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
