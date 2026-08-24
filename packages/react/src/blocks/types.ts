import type { ReactNode } from "react";

// Categories
export type BlockCategory = "auth" | "dashboard" | "marketing" | "forms";
export type TemplateCategory = "auth" | "dashboard" | "marketing" | "settings";

// Metadata Schemas
export interface BlockMetadata {
  kind: "block";
  id: string;
  name: string;
  category: BlockCategory;
  description: string;
  version: string;
  dependencies: string[];
  optionalDependencies?: string[];
  tags?: string[];
  preview?: {
    desktop: boolean;
    mobile: boolean;
  };
}

export interface TemplateMetadata {
  kind: "template";
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  version: string;
  blocks: string[];
  dependencies: string[];
  tags?: string[];
  preview?: {
    desktop: boolean;
    mobile: boolean;
  };
}

// ----------------------------------------------------
// Block Props Interfaces (Data-driven, UI-only)
// ----------------------------------------------------

export interface SocialProvider {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface MetricItem {
  id?: string;
  label: string;
  value: string | number;
  trend?: {
    value: string | number;
    direction: "up" | "down" | "neutral";
  };
  comparison?: string;
  icon?: ReactNode;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: string | number;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: string[];
  ctaLabel?: string;
  disabled?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  component?: ReactNode;
}
