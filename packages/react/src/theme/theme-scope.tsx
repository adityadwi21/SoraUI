import React, { forwardRef } from "react";
import { cx } from "@soraui/core";

export interface ThemeScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: string;
  children?: React.ReactNode;
}

/**
 * Scoped theme wrapper that overrides the visual palette for a subtree.
 * Relies purely on CSS cascade ([data-theme="..."]) without unnecessary React re-renders.
 */
export const ThemeScope = forwardRef<HTMLDivElement, ThemeScopeProps>(
  ({ theme, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-theme={theme}
        className={cx("sora-theme-scope", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ThemeScope.displayName = "ThemeScope";
