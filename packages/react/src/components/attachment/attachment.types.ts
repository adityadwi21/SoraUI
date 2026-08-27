import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

export interface AttachmentProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "grid" | "list";
}

export interface AttachmentItemProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  variant?: "default" | "pill" | "elevated";
  loading?: boolean;
}

export interface AttachmentIconProps extends HTMLAttributes<HTMLDivElement> {
  type?:
    | "image"
    | "pdf"
    | "video"
    | "audio"
    | "archive"
    | "code"
    | "document"
    | "file"
    | "spinner";
  spinner?: boolean;
}

export interface AttachmentInfoProps extends HTMLAttributes<HTMLDivElement> {}

export interface AttachmentNameProps extends HTMLAttributes<HTMLSpanElement> {
  shimmer?: boolean;
}

export interface AttachmentSizeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: "uploading" | "processing" | "completed" | "error";
  shimmer?: boolean;
}

export interface AttachmentStatusProps extends HTMLAttributes<HTMLSpanElement> {
  shimmer?: boolean;
  variant?: "info" | "success" | "warning" | "error";
}

export interface AttachmentProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export interface AttachmentActionsProps extends HTMLAttributes<HTMLDivElement> {}

export interface AttachmentRemoveProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AttachmentPreviewProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

