import {
  forwardRef,
  useState,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { SliderProps } from "./slider.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
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

    const trackRef = useRef<HTMLDivElement | null>(null);

    const updateValue = (newVal: number) => {
      const clamped = Math.min(
        max,
        Math.max(min, Math.round(newVal / step) * step),
      );
      if (!isControlled) setUncontrolledValue(clamped);
      onValueChange?.(clamped);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        updateValue(value + step);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        updateValue(value - step);
      } else if (e.key === "Home") {
        e.preventDefault();
        updateValue(min);
      } else if (e.key === "End") {
        e.preventDefault();
        updateValue(max);
      }
    };

    const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      updateValue(min + pct * (max - min));
    };

    const percentage = Math.max(
      0,
      Math.min(100, ((value - min) / (max - min)) * 100),
    );

    return (
      <div
        ref={ref}
        className={cx(
          "sora-slider",
          disabled && "sora-slider--disabled",
          className,
        )}
        {...props}
      >
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="sora-slider__track"
        >
          <div
            className="sora-slider__range"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          role="slider"
          tabIndex={disabled ? undefined : 0}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-disabled={disabled || undefined}
          aria-label={props["aria-label"]}
          aria-labelledby={props["aria-labelledby"]}
          aria-describedby={props["aria-describedby"]}
          onKeyDown={handleKeyDown}
          style={{ left: `${percentage}%` }}
          className="sora-slider__thumb"
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";
