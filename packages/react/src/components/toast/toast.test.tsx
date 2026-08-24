import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ToastProvider, useToast } from "./toast";

function TestComponent() {
  const { toast } = useToast();
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Success!",
            description: "Your changes have been saved.",
            variant: "success",
            duration: 3000,
          })
        }
      >
        Show Toast
      </button>
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Error!",
            description: "Failed to delete record.",
            variant: "destructive",
          })
        }
      >
        Show Error
      </button>
    </div>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders toast with title, description, and dismisses after duration", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const btn = screen.getByRole("button", { name: "Show Toast" });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    act(() => {
      btn.click();
    });

    const toast = screen.getByRole("status");
    expect(toast).toBeInTheDocument();
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("Your changes have been saved."),
    ).toBeInTheDocument();

    // Auto-dismiss after 3000ms
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it('renders destructive toast with role="alert" for high-priority a11y', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const btn = screen.getByRole("button", { name: "Show Error" });

    act(() => {
      btn.click();
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
