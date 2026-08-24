import { forwardRef, useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';
import { Check, Minus } from 'lucide-react';
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
            <Check size={12} strokeWidth={3} className="sora-checkbox__icon" aria-hidden="true" />
          )}
          {isIndeterminate && (
            <Minus size={12} strokeWidth={3} className="sora-checkbox__icon" aria-hidden="true" />
          )}
        </span>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';