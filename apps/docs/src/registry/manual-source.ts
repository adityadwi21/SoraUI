export function getManualComponentCode(id: string, name: string): string {
  switch (id) {
    case 'label':
      return `"use client";

import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, disabled, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={\`sora-label \${disabled ? "sora-label--disabled" : ""} \${className}\`.trim()}
        {...props}
      >
        {children}
        {required && (
          <span className="sora-label__required" aria-hidden="true" style={{ color: "var(--ui-destructive, #ef4444)", marginLeft: "0.25rem" }}>
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";
`;

    case 'button':
      return `"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className = "", children, ...props }, ref) => {
    const isDisabled = disabled ?? loading;
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        className={\`sora-button sora-button--\${variant} sora-button--\${size} \${className}\`.trim()}
        {...props}
      >
        {loading && <span className="sora-button__spinner" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
`;

    case 'input':
      return `"use client";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", error = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={\`sora-input sora-input--\${size} \${error ? "sora-input--error" : ""} \${className}\`.trim()}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
`;

    case 'checkbox':
      return `"use client";

import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, className = "", id, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const actualChecked = checked !== undefined ? checked : isChecked;

    return (
      <label className={\`sora-checkbox \${disabled ? "sora-checkbox--disabled" : ""} \${className}\`.trim()}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={actualChecked}
          disabled={disabled}
          onChange={(e) => {
            if (disabled) return;
            if (checked === undefined) setIsChecked(e.target.checked);
            onCheckedChange?.(e.target.checked);
          }}
          className="sora-checkbox__input"
          {...props}
        />
        <span className="sora-checkbox__box" aria-hidden="true">
          {actualChecked && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
`;

    case 'badge':
      return `"use client";

import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  return (
    <span className={\`sora-badge sora-badge--\${variant} sora-badge--\${size} \${className}\`.trim()} {...props}>
      {children}
    </span>
  );
};
Badge.displayName = "Badge";
`;

    case 'card':
      return `"use client";

import * as React from "react";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { elevated?: boolean }>(
  ({ elevated, className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card \${elevated ? "sora-card--elevated" : ""} \${className}\`.trim()} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__header \${className}\`.trim()} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={\`sora-card__title \${className}\`.trim()} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={\`sora-card__description \${className}\`.trim()} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__content \${className}\`.trim()} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__footer \${className}\`.trim()} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
`;

    case 'switch':
      return `"use client";

import * as React from "react";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className = "", ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const actualChecked = checked !== undefined ? checked : isChecked;

    const handleClick = () => {
      if (disabled) return;
      const next = !actualChecked;
      if (checked === undefined) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={actualChecked}
        disabled={disabled}
        onClick={handleClick}
        className={\`sora-switch \${actualChecked ? "sora-switch--checked" : ""} \${disabled ? "sora-switch--disabled" : ""} \${className}\`.trim()}
        {...props}
      >
        <span className="sora-switch__thumb" aria-hidden="true" />
      </button>
    );
  }
);
Switch.displayName = "Switch";
`;

    case 'select':
      return `"use client";

import * as React from "react";

interface SelectContextValue {
  value: string;
  setValue: (value: string, label: string) => void;
  selectedLabel: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

export function Select({ defaultValue = "", value: controlledValue, onValueChange, disabled, children }: any) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [selectedLabel, setSelectedLabel] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const setValue = (nextValue: string, nextLabel: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    setSelectedLabel(nextLabel);
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, setValue, selectedLabel, open, setOpen, disabled }}>
      <div className="sora-select">{children}</div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    return (
      <button
        ref={ref}
        type="button"
        disabled={ctx?.disabled}
        onClick={() => ctx?.setOpen(!ctx.open)}
        className={\`sora-select__trigger \${className}\`.trim()}
        {...props}
      >
        <span className="sora-select__trigger-content">{children}</span>
        <span className="sora-select__icon">▼</span>
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = ({ placeholder = "Select...", className = "" }: { placeholder?: string; className?: string }) => {
  const ctx = React.useContext(SelectContext);
  const display = ctx?.selectedLabel || ctx?.value || placeholder;
  return <span className={\`sora-select__value \${!ctx?.value ? "sora-select__value--placeholder" : ""} \${className}\`.trim()}>{display}</span>;
};

export const SelectContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx?.open) return null;
  return <div className={\`sora-select__content \${className}\`.trim()}>{children}</div>;
};

export const SelectItem = ({ value, children, className = "", disabled }: any) => {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx?.value === value;
  const label = typeof children === "string" ? children : value;
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => !disabled && ctx?.setValue(value, label)}
      className={\`sora-select__item \${isSelected ? "sora-select__item--selected" : ""} \${disabled ? "sora-select__item--disabled" : ""} \${className}\`.trim()}
    >
      <span>{children}</span>
      {isSelected && <span className="sora-select__item-indicator">✓</span>}
    </div>
  );
};
`;

    default:
      return `"use client";

import * as React from "react";

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add specific component props here
}

export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`sora-${id} \${className}\`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
${name}.displayName = "${name}";
`;
  }
}
