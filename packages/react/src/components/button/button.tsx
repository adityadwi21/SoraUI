/**
 * SoraUI — Button Component
 * Level 1: Zero/Minimal Runtime
 * 
 * Styling: CSS classes with sora- prefix for scoping (no CSS Modules runtime).
 * Import button.css separately in your app or via @soraui/react/styles.
 */
import { forwardRef } from 'react';
import type { ButtonProps } from './button.types';

function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          'sora-button',
          'sora-button--' + variant,
          'sora-button--' + size,
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        data-loading={loading ? 'true' : undefined}
        aria-label={loading && !ariaLabel ? 'Loading...' : ariaLabel}
        {...props}
      >
        {loading && (
          <span className="sora-button__spinner" aria-hidden="true" role="presentation" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
export type { ButtonProps };