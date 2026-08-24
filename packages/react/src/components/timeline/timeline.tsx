import { forwardRef } from "react";
import type { TimelineProps, TimelineItemProps } from "./timeline.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cx("sora-timeline", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ active = false, className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cx(
        "sora-timeline__item",
        active && "sora-timeline__item--active",
        className,
      )}
      {...props}
    >
      <div className="sora-timeline__dot" aria-hidden="true" />
      <div className="sora-timeline__connector" aria-hidden="true" />
      <div className="sora-timeline__content">{children}</div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";
