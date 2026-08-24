import React from "react";
import {
  HeroSection,
  type HeroSectionProps,
} from "../blocks/marketing/hero-section";
import {
  FeatureGrid,
  type FeatureGridProps,
} from "../blocks/marketing/feature-grid";
import {
  PricingTable,
  type PricingTableProps,
} from "../blocks/marketing/pricing-table";
import {
  FAQSection,
  type FAQSectionProps,
} from "../blocks/marketing/faq-section";
import {
  FooterSection,
  type FooterSectionProps,
} from "../blocks/marketing/footer-section";

export interface SaaSLandingPageTemplateProps {
  hero: HeroSectionProps;
  features: FeatureGridProps;
  pricing: PricingTableProps;
  faq: FAQSectionProps;
  footer: FooterSectionProps;
}

export function SaaSLandingPageTemplate({
  hero,
  features,
  pricing,
  faq,
  footer,
}: SaaSLandingPageTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--ui-background, #ffffff)",
        color: "var(--ui-foreground, #0c1a2b)",
      }}
    >
      <HeroSection {...hero} />
      <FeatureGrid {...features} />
      <PricingTable {...pricing} />
      <FAQSection {...faq} />
      <FooterSection {...footer} />
    </div>
  );
}
