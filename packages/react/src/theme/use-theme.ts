import { useContext, createContext } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = "light" | "dark";

export interface ThemeContextValue {
  theme: string;
  setTheme: (theme: string) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedMode: ResolvedThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Hook to access and modify the current global SoraUI theme and brightness mode.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
