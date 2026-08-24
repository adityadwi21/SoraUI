import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio component", () => {
  it("renders children with correct padding percentage", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
          alt="Landscape"
        />
      </AspectRatio>,
    );

    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingBottom).toBe("56.25%");
    expect(screen.getByAltText("Landscape")).toBeDefined();
  });
});
