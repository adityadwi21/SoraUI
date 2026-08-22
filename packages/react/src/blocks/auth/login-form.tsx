import React, { useState, type FormEvent } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/card/card';
import { Input } from '../../components/input/input';
import { Label } from '../../components/label/label';
import { Button } from '../../components/button/button';
import { Checkbox } from '../../components/checkbox/checkbox';
import { Separator } from '../../components/separator/separator';
import type { SocialProvider } from '../types';

export interface LoginFormProps {
  title?: string;
  description?: string;
  socialProviders?: SocialProvider[];
  loading?: boolean;
  error?: string;
  forgotPasswordHref?: string;
  registerHref?: string;
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => void;
  onSocialLogin?: (providerId: string) => void;
  onForgotPasswordClick?: () => void;
  onRegisterClick?: () => void;
  className?: string;
}

export function LoginForm({
  title = 'Welcome back',
  description = 'Enter your credentials to access your account',
  socialProviders,
  loading = false,
  error,
  forgotPasswordHref = '#forgot-password',
  registerHref = '#register',
  onSubmit,
  onSocialLogin,
  onForgotPasswordClick,
  onRegisterClick,
  className,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setValidationError('Please enter both email and password.');
      return;
    }
    setValidationError(null);
    onSubmit?.({ email, password, rememberMe });
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
            className="sora-alert-box sora-alert-box--destructive"
            style={{
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderRadius: 'var(--ui-radius, 0.5rem)',
              backgroundColor: 'var(--ui-muted, #f4f4f5)',
              color: 'var(--ui-destructive, #ef4444)',
              fontSize: 'var(--sora-text-sm, 0.875rem)',
              border: '1px solid var(--ui-border, #e4e4e7)',
            }}
          >
            {displayError}
          </div>
        )}

        {socialProviders && socialProviders.length > 0 && (
          <>
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
              {socialProviders.map((provider) => (
                <Button
                  key={provider.id}
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => onSocialLogin?.(provider.id)}
                >
                  {provider.icon && <span style={{ marginRight: '0.5rem' }}>{provider.icon}</span>}
                  {provider.label}
                </Button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
              <Separator style={{ flex: 1 }} />
              <span
                style={{
                  fontSize: 'var(--sora-text-xs, 0.75rem)',
                  color: 'var(--ui-muted-foreground, #71717a)',
                  textTransform: 'uppercase',
                }}
              >
                or continue with email
              </span>
              <Separator style={{ flex: 1 }} />
            </div>
          </>
        )}

        <form noValidate onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gap: '0.375rem' }}>
            <Label htmlFor="login-email" required>
              Email Address
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div style={{ display: 'grid', gap: '0.375rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="login-password" required>
                Password
              </Label>
              <a
                href={forgotPasswordHref}
                onClick={(e) => {
                  if (onForgotPasswordClick) {
                    e.preventDefault();
                    onForgotPasswordClick();
                  }
                }}
                style={{
                  fontSize: 'var(--sora-text-xs, 0.75rem)',
                  color: 'var(--ui-primary, #0ea5e9)',
                  textDecoration: 'none',
                }}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Checkbox
              id="login-remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={loading}
            />
            <Label htmlFor="login-remember" style={{ cursor: 'pointer', fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
              Remember me for 30 days
            </Label>
          </div>

          <Button type="submit" variant="primary" loading={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter style={{ justifyContent: 'center', fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
        <span style={{ color: 'var(--ui-muted-foreground, #71717a)' }}>Don't have an account? </span>
        <a
          href={registerHref}
          onClick={(e) => {
            if (onRegisterClick) {
              e.preventDefault();
              onRegisterClick();
            }
          }}
          style={{
            marginLeft: '0.25rem',
            color: 'var(--ui-primary, #0ea5e9)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Sign up
        </a>
      </CardFooter>
    </Card>
  );
}
