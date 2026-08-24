import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";
describe("Skeleton", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
  it("renders circle variant", () => {
    const { container } = render(<Skeleton circle width={40} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
