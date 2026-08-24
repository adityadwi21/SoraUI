import {
  forwardRef,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import type { SwitchProps } from "./switch.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setUncontrolledChecked(next);
      onCheckedChange?.(next);
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggle();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cx(
          "sora-switch",
          isChecked && "sora-switch--checked",
          disabled && "sora-switch--disabled",
          className,
        )}
        {...props}
      >
        <span className="sora-switch__thumb" />
      </button>
    );
  },
);
Switch.displayName = "Switch";
