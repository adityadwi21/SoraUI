import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ThemeContext,
  type ThemeMode,
  type ResolvedThemeMode,
  type ThemeContextValue,
} from "./use-theme";

export interface ThemeProviderProps {
  children?: React.ReactNode;
  defaultTheme?: string;
  defaultMode?: ThemeMode;
  storageKey?: string;
  modeStorageKey?: string;
  attribute?: string;
  modeAttribute?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "sky",
  defaultMode = "system",
  storageKey = "soraui-theme",
  modeStorageKey = "soraui-mode",
  attribute = "data-theme",
  modeAttribute = "data-mode",
  enableSystem = true,
}: ThemeProviderProps) {
  // Reconcile initial state from existing DOM attributes (set by getThemeInitScript) or defaults
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const domTheme = document.documentElement.getAttribute(attribute);
      if (domTheme) return domTheme;
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) return stored;
      } catch {
        // Storage access restricted
      }
    }
    return defaultTheme;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedMode = localStorage.getItem(
          modeStorageKey,
        ) as ThemeMode | null;
        if (storedMode) return storedMode;
      } catch {
        // Storage access restricted
      }
    }
    return defaultMode;
  });

  // Calculate resolved brightness mode
  const [systemDark, setSystemDark] = useState<boolean>(() => {
    if (
      typeof window !== "undefined" &&
      enableSystem &&
      typeof window.matchMedia === "function"
    ) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Subscribe to system color scheme changes
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !enableSystem ||
      typeof window.matchMedia !== "function"
    )
      return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [enableSystem]);

  const resolvedMode: ResolvedThemeMode = useMemo(() => {
    if (mode === "system") {
      return systemDark ? "dark" : "light";
    }
    return mode;
  }, [mode, systemDark]);

  // Apply theme & mode to DOM root whenever changed
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.setAttribute(attribute, theme);
    root.setAttribute(modeAttribute, resolvedMode);

    try {
      localStorage.setItem(storageKey, theme);
      localStorage.setItem(modeStorageKey, mode);
    } catch {
      // Storage access restricted
    }
  }, [
    theme,
    mode,
    resolvedMode,
    attribute,
    modeAttribute,
    storageKey,
    modeStorageKey,
  ]);

  const setTheme = useCallback((newTheme: string) => {
    setThemeState(newTheme);
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const currentResolved =
        prev === "system" ? (systemDark ? "dark" : "light") : prev;
      return currentResolved === "dark" ? "light" : "dark";
    });
  }, [systemDark]);

  const contextValue: ThemeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      mode,
      setMode,
      resolvedMode,
      toggleMode,
    }),
    [theme, setTheme, mode, setMode, resolvedMode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
