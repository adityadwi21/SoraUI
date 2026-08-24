import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress Component & A11y", () => {
  it("sets correct progressbar attributes with default and custom values", () => {
    render(<Progress value={40} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("correctly adapts to dynamic max prop (e.g. max=150)", () => {
    render(<Progress value={75} max={150} data-testid="custom-progress" />);
    const bar = screen.getByTestId("custom-progress");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "150");
    const indicator = bar.querySelector(
      ".sora-progress__indicator",
    ) as HTMLElement;
    expect(indicator.style.width).toBe("50%");
  });

  it("renders indeterminate state properly without aria-valuenow when value is undefined", () => {
    render(<Progress data-testid="indeterminate-progress" />);
    const bar = screen.getByTestId("indeterminate-progress");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).not.toHaveAttribute("aria-valuemin");
    expect(bar).not.toHaveAttribute("aria-valuemax");
    expect(bar.className).toContain("sora-progress--indeterminate");
  });
});
