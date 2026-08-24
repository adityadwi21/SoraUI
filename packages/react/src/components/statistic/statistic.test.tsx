import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Statistic } from "./statistic";

describe("Statistic Component & A11y", () => {
  it("renders metric card with title, prefix, value, and trend", () => {
    render(
      <Statistic
        title="Monthly Revenue"
        value="48,250"
        prefix="$"
        trend="up"
        trendValue="+14.2%"
      />,
    );

    expect(screen.getByText("Monthly Revenue")).toBeInTheDocument();
    expect(screen.getByText("48,250")).toBeInTheDocument();
    expect(screen.getByText("+14.2%")).toBeInTheDocument();
  });
});
