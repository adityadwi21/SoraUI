import {
  forwardRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { NumberInputProps } from "./number-input.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      onValueChange,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const update = (newVal: number) => {
      const clamped = Math.min(max, Math.max(min, newVal));
      if (!isControlled) setUncontrolledValue(clamped);
      onValueChange?.(clamped);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) update(parsed);
      else if (e.target.value === "") update(0);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        update(value + step);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        update(value - step);
      }
    };

    return (
      <div
        className={cx(
          "sora-number-input",
          disabled && "sora-number-input--disabled",
          className,
        )}
      >
        <input
          ref={ref}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="sora-number-input__input"
          {...props}
        />
        <div className="sora-number-input__steppers">
          <button
            type="button"
            disabled={disabled || value >= max}
            aria-label="Increment value"
            onClick={() => update(value + step)}
            className="sora-number-input__btn"
          >
            <ChevronUp size={11} aria-hidden="true" />
          </button>
          <button
            type="button"
            disabled={disabled || value <= min}
            aria-label="Decrement value"
            onClick={() => update(value - step)}
            className="sora-number-input__btn"
          >
            <ChevronDown size={11} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";
