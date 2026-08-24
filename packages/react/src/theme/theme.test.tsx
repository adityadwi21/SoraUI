import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./theme-provider";
import { ThemeScope } from "./theme-scope";
import { useTheme } from "./use-theme";
import { Button } from "../components/button/button";

function ThemeConsumer() {
  const { theme, setTheme, mode, setMode, resolvedMode, toggleMode } =
    useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="current-mode">{mode}</span>
      <span data-testid="resolved-mode">{resolvedMode}</span>
      <button onClick={() => setTheme("midnight")}>Set Midnight</button>
      <button onClick={() => setMode("dark")}>Set Dark</button>
      <button onClick={() => toggleMode()}>Toggle Mode</button>
    </div>
  );
}

describe("ThemeProvider & ThemeScope", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-mode");
    localStorage.clear();
  });

  it("renders with default theme and applies attributes to document root", () => {
    render(
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("sky");
    expect(screen.getByTestId("current-mode").textContent).toBe("light");
    expect(screen.getByTestId("resolved-mode").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("sky");
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });

  it("updates theme and mode via useTheme hook", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByText("Set Midnight"));
    expect(screen.getByTestId("current-theme").textContent).toBe("midnight");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "midnight",
    );

    await user.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("current-mode").textContent).toBe("dark");
    expect(screen.getByTestId("resolved-mode").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");

    await user.click(screen.getByText("Toggle Mode"));
    expect(screen.getByTestId("resolved-mode").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });

  it("throws error when useTheme is called outside of ThemeProvider", () => {
    // Suppress console.error in test for expected error boundary
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a <ThemeProvider>",
    );
    consoleError.mockRestore();
  });

  it("supports nested ThemeScope without altering global document attributes", () => {
    render(
      <ThemeProvider defaultTheme="sky" defaultMode="dark">
        <div data-testid="global-area">
          <ThemeScope theme="midnight" data-testid="scope-midnight">
            <ThemeScope theme="aurora" data-testid="scope-aurora">
              <Button>Aurora Action</Button>
            </ThemeScope>
          </ThemeScope>
        </div>
      </ThemeProvider>,
    );

    // Global remains sky
    expect(document.documentElement.getAttribute("data-theme")).toBe("sky");
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");

    // Scopes have their respective data-theme
    const midnightScope = screen.getByTestId("scope-midnight");
    expect(midnightScope).toHaveAttribute("data-theme", "midnight");
    expect(midnightScope).toHaveClass("sora-theme-scope");

    const auroraScope = screen.getByTestId("scope-aurora");
    expect(auroraScope).toHaveAttribute("data-theme", "aurora");
    expect(auroraScope).toHaveClass("sora-theme-scope");
  });

  it("reconciles with DOM attributes previously injected by getThemeInitScript", () => {
    document.documentElement.setAttribute("data-theme", "twilight");
    document.documentElement.setAttribute("data-mode", "dark");

    render(
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("twilight");
  });
});
