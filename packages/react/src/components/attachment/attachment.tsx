import { forwardRef } from "react";
import type {
  AttachmentProps,
  AttachmentItemProps,
  AttachmentIconProps,
  AttachmentInfoProps,
  AttachmentNameProps,
  AttachmentSizeProps,
  AttachmentProgressProps,
  AttachmentActionsProps,
  AttachmentRemoveProps,
  AttachmentPreviewProps,
} from "./attachment.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>(
  ({ layout = "list", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "sora-attachment-group",
          "sora-attachment-group--" + layout,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Attachment.displayName = "Attachment";

export const AttachmentItem = forwardRef<HTMLDivElement, AttachmentItemProps>(
  ({ elevated, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "sora-attachment-item",
          elevated && "sora-attachment-item--elevated",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AttachmentItem.displayName = "AttachmentItem";

export const AttachmentIcon = forwardRef<HTMLDivElement, AttachmentIconProps>(
  ({ type = "file", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "sora-attachment-icon",
          "sora-attachment-icon--" + type,
          className,
        )}
        {...props}
      >
        {children || (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        )}
      </div>
    );
  },
);
AttachmentIcon.displayName = "AttachmentIcon";

export const AttachmentPreview = forwardRef<
  HTMLDivElement,
  AttachmentPreviewProps
>(({ src, alt = "", className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("sora-attachment-preview", className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="sora-attachment-preview__img" />
      ) : (
        children
      )}
    </div>
  );
});
AttachmentPreview.displayName = "AttachmentPreview";

export const AttachmentInfo = forwardRef<HTMLDivElement, AttachmentInfoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("sora-attachment-info", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AttachmentInfo.displayName = "AttachmentInfo";

export const AttachmentName = forwardRef<HTMLSpanElement, AttachmentNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx("sora-attachment-name", className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AttachmentName.displayName = "AttachmentName";

export const AttachmentSize = forwardRef<HTMLSpanElement, AttachmentSizeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx("sora-attachment-size", className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AttachmentSize.displayName = "AttachmentSize";

export const AttachmentProgress = forwardRef<
  HTMLDivElement,
  AttachmentProgressProps
>(({ value = 0, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("sora-attachment-progress", className)}
      {...props}
    >
      <div
        className="sora-attachment-progress__bar"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
});
AttachmentProgress.displayName = "AttachmentProgress";

export const AttachmentActions = forwardRef<
  HTMLDivElement,
  AttachmentActionsProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("sora-attachment-actions", className)}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentActions.displayName = "AttachmentActions";

export const AttachmentRemove = forwardRef<
  HTMLButtonElement,
  AttachmentRemoveProps
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Remove attachment"
      className={cx("sora-attachment-remove", className)}
      {...props}
    >
      {children || (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </button>
  );
});
AttachmentRemove.displayName = "AttachmentRemove";
