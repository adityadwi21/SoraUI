import type { HTMLAttributes, ReactNode } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export interface FileUploaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** Comma-separated list of accepted file extensions or MIME types */
  accept?: string;
  /** Maximum file size in bytes (e.g. 5 * 1024 * 1024 for 5MB) */
  maxSize?: number;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Callback fired when files list changes */
  onFilesChange?: (files: File[]) => void;
  /** Custom drag prompt */
  promptText?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}
