import {
  forwardRef,
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react';
import type { InputOTPProps } from './input-otp.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      disabled = false,
      autoFocus = false,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const rawVal = isControlled ? controlledValue : uncontrolledValue;
    const digits = rawVal.split('').slice(0, length);
    while (digits.length < length) digits.push('');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const updateDigits = (newDigits: string[]) => {
      const code = newDigits.join('');
      if (!isControlled) setUncontrolledValue(code);
      onValueChange?.(code);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
      const char = e.target.value.slice(-1);
      const next = [...digits];
      next[idx] = char;
      updateDigits(next);
      if (char && idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === 'Backspace') {
        if (!digits[idx] && idx > 0) {
          e.preventDefault();
          const next = [...digits];
          next[idx - 1] = '';
          updateDigits(next);
          inputRefs.current[idx - 1]?.focus();
        }
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        inputRefs.current[idx - 1]?.focus();
      } else if (e.key === 'ArrowRight' && idx < length - 1) {
        e.preventDefault();
        inputRefs.current[idx + 1]?.focus();
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').trim().slice(0, length);
      const next = pasted.split('');
      while (next.length < length) next.push('');
      updateDigits(next);
      const targetIdx = Math.min(length - 1, pasted.length);
      inputRefs.current[targetIdx]?.focus();
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label="One-time password input"
        className={cx('sora-input-otp', className)}
        {...props}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className="sora-input-otp__slot"
          />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = 'InputOTP';