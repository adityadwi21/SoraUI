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
import { Checkbox } from "../../components/checkbox/checkbox";
import { Separator } from "../../components/separator/separator";
import { Progress } from "../../components/progress/progress";
import type { SocialProvider } from "../types";

export interface RegisterFormProps {
  title?: string;
  description?: string;
  socialProviders?: SocialProvider[];
  loading?: boolean;
  error?: string;
  loginHref?: string;
  termsHref?: string;
  privacyHref?: string;
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  onSocialLogin?: (providerId: string) => void;
  onLoginClick?: () => void;
  className?: string;
}

function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
} {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^a-zA-Z0-9]/.test(password)) score += 25;

  let label = "Weak";
  if (score >= 75) label = "Strong";
  else if (score >= 50) label = "Fair";

  return { score, label };
}

export function RegisterForm({
  title = "Create an account",
  description = "Start building faster with SoraUI components",
  socialProviders,
  loading = false,
  error,
  loginHref = "#login",
  termsHref = "#terms",
  privacyHref = "#privacy",
  onSubmit,
  onSocialLogin,
  onLoginClick,
  className,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { score: strengthScore, label: strengthLabel } =
    calculatePasswordStrength(password);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setValidationError("Please complete all required fields.");
      return;
    }
    if (!agreeTerms) {
      setValidationError("You must agree to the Terms and Privacy Policy.");
      return;
    }
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }
    setValidationError(null);
    onSubmit?.({ name, email, password });
  };

  const displayError = error || validationError;

  return (
    <Card className={className} elevated>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {displayError && (
          <div
            role="alert"
            style={{
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
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

        {socialProviders && socialProviders.length > 0 && (
          <>
            <div
              style={{ display: "grid", gap: "0.5rem", marginBottom: "1rem" }}
            >
              {socialProviders.map((provider) => (
                <Button
                  key={provider.id}
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => onSocialLogin?.(provider.id)}
                >
                  {provider.icon && (
                    <span style={{ marginRight: "0.5rem" }}>
                      {provider.icon}
                    </span>
                  )}
                  {provider.label}
                </Button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "1rem 0",
              }}
            >
              <Separator style={{ flex: 1 }} />
              <span
                style={{
                  fontSize: "var(--sora-text-xs, 0.75rem)",
                  color: "var(--ui-muted-foreground, #71717a)",
                  textTransform: "uppercase",
                }}
              >
                or register with email
              </span>
              <Separator style={{ flex: 1 }} />
            </div>
          </>
        )}

        <form
          noValidate
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1rem" }}
        >
          <div style={{ display: "grid", gap: "0.375rem" }}>
            <Label htmlFor="register-name" required>
              Full Name
            </Label>
            <Input
              id="register-name"
              type="text"
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
              required
            />
          </div>

          <div style={{ display: "grid", gap: "0.375rem" }}>
            <Label htmlFor="register-email" required>
              Email Address
            </Label>
            <Input
              id="register-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div style={{ display: "grid", gap: "0.375rem" }}>
            <Label htmlFor="register-password" required>
              Password
            </Label>
            <Input
              id="register-password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              required
            />
            {password && (
              <div
                style={{
                  marginTop: "0.25rem",
                  display: "grid",
                  gap: "0.25rem",
                }}
              >
                <Progress value={strengthScore} style={{ height: "4px" }} />
                <span
                  style={{
                    fontSize: "var(--sora-text-xs, 0.75rem)",
                    color:
                      strengthScore >= 75
                        ? "var(--ui-success, #10b981)"
                        : strengthScore >= 50
                          ? "var(--ui-warning, #f59e0b)"
                          : "var(--ui-destructive, #ef4444)",
                  }}
                >
                  Password strength: {strengthLabel}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            <Checkbox
              id="register-terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              disabled={loading}
            />
            <Label
              htmlFor="register-terms"
              style={{
                cursor: "pointer",
                fontSize: "var(--sora-text-xs, 0.75rem)",
                lineHeight: 1.4,
              }}
            >
              I agree to the{" "}
              <a
                href={termsHref}
                style={{
                  color: "var(--ui-primary, #0ea5e9)",
                  textDecoration: "none",
                }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href={privacyHref}
                style={{
                  color: "var(--ui-primary, #0ea5e9)",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </a>
              .
            </Label>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter
        style={{
          justifyContent: "center",
          fontSize: "var(--sora-text-sm, 0.875rem)",
        }}
      >
        <span style={{ color: "var(--ui-muted-foreground, #71717a)" }}>
          Already have an account?{" "}
        </span>
        <a
          href={loginHref}
          onClick={(e) => {
            if (onLoginClick) {
              e.preventDefault();
              onLoginClick();
            }
          }}
          style={{
            marginLeft: "0.25rem",
            color: "var(--ui-primary, #0ea5e9)",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Sign in
        </a>
      </CardFooter>
    </Card>
  );
}
