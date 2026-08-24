import React, { useState, type FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/card/card";
import { Input } from "../../components/input/input";
import { Label } from "../../components/label/label";
import { Button } from "../../components/button/button";

export interface ForgotPasswordFormProps {
  title?: string;
  description?: string;
  loading?: boolean;
  success?: boolean;
  error?: string;
  loginHref?: string;
  onSubmit?: (email: string) => void;
  onLoginClick?: () => void;
  className?: string;
}

export function ForgotPasswordForm({
  title = "Reset your password",
  description = "Enter your email address and we will send you password reset instructions.",
  loading = false,
  success = false,
  error,
  loginHref = "#login",
  onSubmit,
  onLoginClick,
  className,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setValidationError("Please enter your email address.");
      return;
    }
    setValidationError(null);
    onSubmit?.(email);
  };

  const displayError = error || validationError;

  return (
    <Card className={className} elevated>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div
            role="status"
            style={{
              padding: "1rem",
              borderRadius: "var(--ui-radius, 0.5rem)",
              backgroundColor: "var(--ui-muted, #f0fdf4)",
              color: "var(--ui-foreground, #0c1a2b)",
              fontSize: "var(--sora-text-sm, 0.875rem)",
              border: "1px solid var(--ui-border, #bae6fd)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                color: "var(--ui-success, #10b981)",
                marginBottom: "0.25rem",
              }}
            >
              Check your inbox
            </p>
            <p
              style={{
                color: "var(--ui-muted-foreground, #71717a)",
                margin: 0,
              }}
            >
              We sent password reset instructions to{" "}
              <strong>{email || "your email"}</strong>.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "1rem" }}
          >
            {displayError && (
              <div
                role="alert"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--ui-radius, 0.5rem)",
                  backgroundColor: "var(--ui-muted, #f4f4f5)",
                  color: "var(--ui-destructive, #ef4444)",
                  fontSize: "var(--sora-text-sm, 0.875rem)",
                  border: "1px solid var(--ui-border, #e4e4e7)",
                }}
              >
                {displayError}
              </div>
            )}

            <div style={{ display: "grid", gap: "0.375rem" }}>
              <Label htmlFor="forgot-email" required>
                Email Address
              </Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              Send Reset Link
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter
        style={{
          justifyContent: "center",
          fontSize: "var(--sora-text-sm, 0.875rem)",
        }}
      >
        <a
          href={loginHref}
          onClick={(e) => {
            if (onLoginClick) {
              e.preventDefault();
              onLoginClick();
            }
          }}
          style={{
            color: "var(--ui-primary, #0ea5e9)",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          ← Back to sign in
        </a>
      </CardFooter>
    </Card>
  );
}
