import React, { type ReactNode } from "react";
import { Button } from "../../components/button/button";
import { Badge } from "../../components/badge/badge";

export interface HeroSectionProps {
  badge?: {
    text: string;
    href?: string;
  };
  title: ReactNode;
  description: ReactNode;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  preview?: ReactNode;
  className?: string;
}

export function HeroSection({
  badge = { text: "✨ SoraUI v0.1.0 Released" },
  title,
  description,
  primaryCta = { label: "Get Started" },
  secondaryCta = { label: "Documentation" },
  preview,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={className}
      style={{
        padding: "5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Token-driven ambient glow backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, var(--ui-primary, #0ea5e9) 0%, transparent 70%)",
          opacity: 0.15,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        {badge && (
          <div style={{ marginBottom: "1.5rem" }}>
            <Badge
              variant="secondary"
              style={{
                padding: "0.375rem 0.875rem",
                fontSize: "var(--sora-text-sm, 0.875rem)",
                cursor: badge.href ? "pointer" : "default",
              }}
            >
              {badge.text}
            </Badge>
          </div>
        )}

        <h1
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--ui-foreground, #0c1a2b)",
            margin: "0 0 1.25rem 0",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
            lineHeight: 1.6,
            color: "var(--ui-muted-foreground, #71717a)",
            margin: "0 auto 2rem auto",
            maxWidth: "650px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {primaryCta &&
            (primaryCta.href ? (
              <a
                href={primaryCta.href}
                className="sora-button sora-button--primary sora-button--lg"
                style={{ textDecoration: "none" }}
                onClick={primaryCta.onClick}
              >
                {primaryCta.label}
              </a>
            ) : (
              <Button variant="primary" size="lg" onClick={primaryCta.onClick}>
                {primaryCta.label}
              </Button>
            ))}

          {secondaryCta &&
            (secondaryCta.href ? (
              <a
                href={secondaryCta.href}
                className="sora-button sora-button--outline sora-button--lg"
                style={{ textDecoration: "none" }}
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </a>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            ))}
        </div>
      </div>

      {preview && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "3.5rem",
            width: "100%",
            maxWidth: "1000px",
            borderRadius: "var(--ui-radius, 0.75rem)",
            border: "1px solid var(--ui-border, #e4e4e7)",
            backgroundColor: "var(--ui-card, #ffffff)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {preview}
        </div>
      )}
    </section>
  );
}
