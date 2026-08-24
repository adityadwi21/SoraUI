import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional elevated shadow variant */
  elevated?: boolean;
  children?: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}
