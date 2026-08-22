import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/card/card';
import { InputOTP } from '../../components/input-otp/input-otp';
import { Button } from '../../components/button/button';

export interface OTPVerificationProps {
  title?: string;
  description?: string;
  recipient?: string;
  length?: number;
  loading?: boolean;
  error?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  className?: string;
}

export function OTPVerification({
  title = 'Two-Factor Authentication',
  description = 'Enter the 6-digit code sent to your device',
  recipient,
  length = 6,
  loading = false,
  error,
  onVerify,
  onResend,
  className,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState('');

  const handleComplete = (completedOtp: string) => {
    setOtp(completedOtp);
    onVerify?.(completedOtp);
  };

  return (
    <Card className={className} elevated>
      <CardHeader style={{ textAlign: 'center' }}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
          {recipient && <strong style={{ display: 'block', marginTop: '0.25rem' }}>{recipient}</strong>}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {error && (
          <div
            role="alert"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--ui-radius, 0.5rem)',
              backgroundColor: 'var(--ui-muted, #f4f4f5)',
              color: 'var(--ui-destructive, #ef4444)',
              fontSize: 'var(--sora-text-sm, 0.875rem)',
              border: '1px solid var(--ui-border, #e4e4e7)',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <InputOTP
          length={length}
          value={otp}
          onValueChange={handleComplete}
          disabled={loading}
        />

        <Button
          type="button"
          variant="primary"
          loading={loading}
          disabled={otp.length !== length}
          onClick={() => onVerify?.(otp)}
          style={{ width: '100%' }}
        >
          Verify Code
        </Button>
      </CardContent>
      <CardFooter style={{ justifyContent: 'center', fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
        <span style={{ color: 'var(--ui-muted-foreground, #71717a)' }}>Didn't receive code? </span>
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            marginLeft: '0.25rem',
            color: 'var(--ui-primary, #0ea5e9)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Resend
        </button>
      </CardFooter>
    </Card>
  );
}
