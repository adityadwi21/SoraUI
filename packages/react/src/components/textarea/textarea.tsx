import { forwardRef } from 'react';
import type { TextareaProps } from './textarea.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, resize = 'vertical', className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cx('sora-textarea', error && 'sora-textarea--error', resize !== 'vertical' && 'sora-textarea--resize-' + resize, className)}
      aria-invalid={error || undefined}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
export { Textarea };
export type { TextareaProps };