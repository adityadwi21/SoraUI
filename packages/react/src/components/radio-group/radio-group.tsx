import {
  createContext,
  useContext,
  useState,
  forwardRef,
  useId,
  type ChangeEvent,
} from "react";
import type { RadioGroupProps, RadioGroupItemProps } from "./radio-group.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  disabled: boolean;
  onSelect: (val: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      name: customName,
      disabled = false,
      orientation = "vertical",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const generatedName = useId();
    const name = customName || generatedName;

    const handleSelect = (newVal: string) => {
      if (!isControlled) setUncontrolledValue(newVal);
      onValueChange?.(newVal);
    };

    return (
      <RadioGroupContext.Provider
        value={{ name, value, disabled, onSelect: handleSelect }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          className={cx(
            "sora-radio-group",
            `sora-radio-group--${orientation}`,
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      value,
      disabled: itemDisabled,
      className,
      children,
      id: customId,
      ...props
    },
    ref,
  ) => {
    const context = useContext(RadioGroupContext);
    if (!context)
      throw new Error("RadioGroupItem must be used within a RadioGroup");

    const generatedId = useId();
    const id = customId || generatedId;
    const isChecked = context.value === value;
    const disabled = itemDisabled || context.disabled;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.target.checked) context.onSelect(value);
    };

    return (
      <label
        htmlFor={id}
        className={cx(
          "sora-radio-item",
          disabled && "sora-radio-item--disabled",
          className,
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sora-radio-item__input"
          {...props}
        />
        <span
          className={cx(
            "sora-radio-item__circle",
            isChecked && "sora-radio-item__circle--checked",
          )}
          aria-hidden="true"
        >
          {isChecked && <span className="sora-radio-item__dot" />}
        </span>
        {children && <span className="sora-radio-item__label">{children}</span>}
      </label>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";
