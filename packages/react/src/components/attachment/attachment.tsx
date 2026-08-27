import { forwardRef } from "react";
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  File,
  Loader2,
  X,
} from "lucide-react";
import type {
  AttachmentProps,
  AttachmentItemProps,
  AttachmentIconProps,
  AttachmentInfoProps,
  AttachmentNameProps,
  AttachmentSizeProps,
  AttachmentStatusProps,
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
  ({ elevated, variant = "default", loading, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          "sora-attachment-item",
          (elevated || variant === "elevated") && "sora-attachment-item--elevated",
          variant === "pill" && "sora-attachment-item--pill",
          loading && "sora-attachment-item--loading",
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
  ({ type = "file", spinner, className, children, ...props }, ref) => {
    const isSpinner = spinner || type === "spinner";
    const defaultIcon = isSpinner ? (
      <Loader2 size={18} className="sora-attachment-spinner" aria-hidden="true" />
    ) : (
      {
        pdf: <FileText size={18} aria-hidden="true" />,
        document: <FileText size={18} aria-hidden="true" />,
        image: <Image size={18} aria-hidden="true" />,
        video: <Video size={18} aria-hidden="true" />,
        audio: <Music size={18} aria-hidden="true" />,
        archive: <Archive size={18} aria-hidden="true" />,
        code: <Code size={18} aria-hidden="true" />,
        file: <File size={18} aria-hidden="true" />,
      }[type as string] || <File size={18} aria-hidden="true" />
    );

    return (
      <div
        ref={ref}
        className={cx(
          "sora-attachment-icon",
          "sora-attachment-icon--" + type,
          isSpinner && "sora-attachment-icon--spinner",
          className,
        )}
        {...props}
      >
        {children || defaultIcon}
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
  ({ shimmer, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(
          "sora-attachment-name",
          shimmer && "sora-attachment-name--shimmer",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AttachmentName.displayName = "AttachmentName";

export const AttachmentSize = forwardRef<HTMLSpanElement, AttachmentSizeProps>(
  ({ status, shimmer, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(
          "sora-attachment-size",
          status && "sora-attachment-size--" + status,
          shimmer && "sora-attachment-size--shimmer",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AttachmentSize.displayName = "AttachmentSize";

export const AttachmentStatus = forwardRef<HTMLSpanElement, AttachmentStatusProps>(
  ({ variant = "info", shimmer, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cx(
          "sora-attachment-status",
          "sora-attachment-status--" + variant,
          shimmer && "sora-attachment-status--shimmer",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
AttachmentStatus.displayName = "AttachmentStatus";

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
      {children || <X size={14} aria-hidden="true" />}
    </button>
  );
});
AttachmentRemove.displayName = "AttachmentRemove";

