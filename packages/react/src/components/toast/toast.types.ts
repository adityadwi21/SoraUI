import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type ToastVariant = 'default' | 'success' | 'destructive';

export interface ToastData {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: ReactNode;
}

export interface ToastProviderProps {
  /** Maximum number of toasts visible simultaneously */
  maxToasts?: number;
  children?: ReactNode;
}

export interface ToastViewportProps extends HTMLAttributes<HTMLDivElement> {}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  variant?: ToastVariant;
  children?: ReactNode;
}

export interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}