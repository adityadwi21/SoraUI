import { forwardRef } from "react";
import type { AspectRatioProps } from "./aspect-ratio.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, style, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("sora-aspect-ratio", className)}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          className="sora-aspect-ratio__content"
        >
          {children}
        </div>
      </div>
    );
  },
);
AspectRatio.displayName = "AspectRatio";
