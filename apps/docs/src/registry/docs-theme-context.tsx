import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type DocsThemeMode = "light" | "dark";

export interface DocsThemeContextValue {
  mode: DocsThemeMode;
  toggle: () => void;
  setMode: (mode: DocsThemeMode) => void;
}

const DocsThemeContext = createContext<DocsThemeContextValue>({
  mode: "light",
  toggle: () => {},
  setMode: () => {},
});

export const DocsThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<DocsThemeMode>(() => {
    try {
      const s = localStorage.getItem("docs-theme") as DocsThemeMode | null;
      if (s === "light" || s === "dark") return s;
    } catch {
      /* noop */
    }
    return typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-docs-theme", mode);
    try {
      localStorage.setItem("docs-theme", mode);
    } catch {
      /* noop */
    }
  }, [mode]);

  const toggle = useCallback(() => {
    setModeState((p) => (p === "dark" ? "light" : "dark"));
  }, []);

  const setMode = useCallback((m: DocsThemeMode) => {
    setModeState(m);
  }, []);

  return (
    <DocsThemeContext.Provider value={{ mode, toggle, setMode }}>
      {children}
    </DocsThemeContext.Provider>
  );
};

export function useDocsTheme(): DocsThemeContextValue {
  return useContext(DocsThemeContext);
}
