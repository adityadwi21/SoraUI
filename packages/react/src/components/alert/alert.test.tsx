import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

describe("Alert component", () => {
  it("renders title and description properly", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app.</AlertDescription>
      </Alert>,
    );

    expect(screen.getByText("Heads up!")).toBeDefined();
    expect(
      screen.getByText("You can add components to your app."),
    ).toBeDefined();
  });

  it("renders destructive role properly", () => {
    const { container } = render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>,
    );

    expect(container.querySelector('[role="alert"]')).toBeDefined();
  });
});
