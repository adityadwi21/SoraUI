import React, { type ReactNode } from "react";
import { LoginForm, type LoginFormProps } from "../blocks/auth/login-form";

export interface LoginPageTemplateProps extends LoginFormProps {
  brandName?: string;
  brandTagline?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  sidePanelContent?: ReactNode;
}

export function LoginPageTemplate({
  brandName = "SoraUI",
  brandTagline = "Build fast. Ship less. Own your UI.",
  testimonial = {
    quote:
      "SoraUI gave our team the freedom to ship beautiful, accessible interfaces in record time without dependency bloat.",
    author: "Sofia Davis",
    role: "Head of Engineering at Acme Corp",
  },
  sidePanelContent,
  ...loginFormProps
}: LoginPageTemplateProps) {
  return (
    <div
      style={{
        display: "grid",
        minHeight: "100vh",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        backgroundColor: "var(--ui-background, #ffffff)",
      }}
    >
      {/* Left Brand Panel (Desktop) */}
      <div
        style={{
          backgroundColor: "var(--ui-muted, #f4f4f5)",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid var(--ui-border, #e4e4e7)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--ui-primary, #0ea5e9)",
          }}
        >
          {brandName}
        </div>

        {sidePanelContent || (
          <div style={{ maxWidth: "420px", margin: "auto 0" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--ui-foreground, #0c1a2b)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {brandTagline}
            </h2>
            <blockquote style={{ margin: 0, padding: 0, border: "none" }}>
              <p
                style={{
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "var(--ui-muted-foreground, #71717a)",
                  lineHeight: 1.6,
                }}
              >
                "{testimonial.quote}"
              </p>
              <footer
                style={{
                  marginTop: "0.75rem",
                  fontWeight: 600,
                  fontSize: "var(--sora-text-sm, 0.875rem)",
                  color: "var(--ui-foreground, #0c1a2b)",
                }}
              >
                {testimonial.author}
                <span
                  style={{
                    display: "block",
                    fontWeight: 400,
                    color: "var(--ui-muted-foreground, #71717a)",
                  }}
                >
                  {testimonial.role}
                </span>
              </footer>
            </blockquote>
          </div>
        )}

        <div
          style={{
            fontSize: "var(--sora-text-xs, 0.75rem)",
            color: "var(--ui-muted-foreground, #71717a)",
          }}
        >
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </div>

      {/* Right Form Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
          <LoginForm {...loginFormProps} />
        </div>
      </div>
    </div>
  );
}
