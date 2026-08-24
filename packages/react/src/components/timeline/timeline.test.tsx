import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline, TimelineItem } from "./timeline";

describe("Timeline Component & A11y", () => {
  it("renders timeline items", () => {
    render(
      <Timeline>
        <TimelineItem active>Release v0.1.0</TimelineItem>
        <TimelineItem>Initial Commit</TimelineItem>
      </Timeline>,
    );

    expect(screen.getByText("Release v0.1.0")).toBeInTheDocument();
  });
});
