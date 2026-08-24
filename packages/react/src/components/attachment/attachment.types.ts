import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

export interface AttachmentProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "grid" | "list";
}

export interface AttachmentItemProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
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
    | "file";
}

export interface AttachmentInfoProps extends HTMLAttributes<HTMLDivElement> {}

export interface AttachmentNameProps extends HTMLAttributes<HTMLSpanElement> {}

export interface AttachmentSizeProps extends HTMLAttributes<HTMLSpanElement> {}

export interface AttachmentProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export interface AttachmentActionsProps extends HTMLAttributes<HTMLDivElement> {}

export interface AttachmentRemoveProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AttachmentPreviewProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}
