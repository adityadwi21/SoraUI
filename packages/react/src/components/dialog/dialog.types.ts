import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** If true, clicking on overlay backdrop will close dialog */
  closeOnOverlayClick?: boolean;
  children?: ReactNode;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}