import React, { createContext, useContext, forwardRef } from "react";
import { cx } from "@soraui/core";

export interface ThemeScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: string;
  mode?: "light" | "dark";
  children?: React.ReactNode;
}

export const ScopedThemeContext = createContext<string | null>(null);

/**
 * Hook to retrieve the nearest active ThemeScope theme name, if any.
 */
export function useScopedTheme(): string | null {
  return useContext(ScopedThemeContext);
}

const DARK_PRESETS = new Set([
  "midnight",
  "aurora",
  "twilight",
  "nebula",
  "eclipse",
  "starlight",
]);

/**
 * Scoped theme wrapper that overrides the visual palette for a subtree.
 * Relies purely on CSS cascade ([data-theme="..."][data-mode="..."]) without unnecessary React re-renders,
 * while propagating theme context to teleported Portal modals (AlertDialog, Dialog, Drawer, etc.).
 */
export const ThemeScope = forwardRef<HTMLDivElement, ThemeScopeProps>(
  ({ theme, mode, className, children, ...props }, ref) => {
    const resolvedMode =
      mode || (DARK_PRESETS.has(theme) ? "dark" : "light");

    return (
      <ScopedThemeContext.Provider value={theme}>
        <div
          ref={ref}
          data-theme={theme}
          data-mode={resolvedMode}
          className={cx("sora-theme-scope", className)}
          {...props}
        >
          {children}
        </div>
      </ScopedThemeContext.Provider>
    );
  },
);

ThemeScope.displayName = "ThemeScope";
