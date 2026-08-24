import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders required indicator when required prop is set", () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("required indicator is aria-hidden", () => {
    render(<Label required>Email</Label>);
    const indicator = screen.getByText("*");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards htmlFor to label element", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });
});
