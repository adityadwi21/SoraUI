import { forwardRef, useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';
import type { CheckboxProps } from './checkbox.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | 'indeterminate'>(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = isChecked === 'indeterminate';
      }
    }, [isChecked]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextChecked = isChecked === 'indeterminate' ? true : e.target.checked;
      if (!isControlled) setUncontrolledChecked(nextChecked);
      onCheckedChange?.(nextChecked);
    };

    const isTrueChecked = isChecked === true;
    const isIndeterminate = isChecked === 'indeterminate';

    return (
      <label className={cx('sora-checkbox', disabled && 'sora-checkbox--disabled', className)}>
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as any).current = node;
          }}
          type="checkbox"
          id={id}
          checked={isTrueChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sora-checkbox__input"
          {...props}
        />
        <span
          className={cx(
            'sora-checkbox__box',
            (isTrueChecked || isIndeterminate) && 'sora-checkbox__box--checked',
            isIndeterminate && 'sora-checkbox__box--indeterminate'
          )}
          aria-hidden="true"
        >
          {isTrueChecked && (
            <svg className="sora-checkbox__icon" viewBox="0 0 16 16" fill="none">
              <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" fill="currentColor" />
            </svg>
          )}
          {isIndeterminate && (
            <svg className="sora-checkbox__icon" viewBox="0 0 16 16" fill="none">
              <path d="M4 8a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z" fill="currentColor" />
            </svg>
          )}
        </span>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';