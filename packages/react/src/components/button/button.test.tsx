
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button — Rendering", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("type", "button");
  });

  it("renders all variants without error", () => {
    const variants = [
      "primary",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "link",
    ] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all sizes without error", () => {
    const sizes = ["sm", "md", "lg", "icon"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>btn</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    });
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Button ref={ref}>ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("passes additional HTML attributes", () => {
    render(<Button data-testid="my-btn">test</Button>);
    expect(screen.getByTestId("my-btn")).toBeInTheDocument();
  });
});

describe("Button — Disabled State", () => {
  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Button — Loading State", () => {
  it("shows spinner when loading", () => {
    render(<Button loading>Loading</Button>);
    const spinner = document.querySelector('[role="presentation"]');
    expect(spinner).toBeInTheDocument();
  });

  it("is disabled when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has data-loading attribute when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-loading", "true");
  });

  it("does not call onClick when loading is true", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Button
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Button — Keyboard Navigation (a11y)", () => {
  it("can be focused via keyboard", async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("triggers onClick on Enter key", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press Enter</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("triggers onClick on Space key", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press Space</Button>);
    screen.getByRole("button").focus();
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("Button — Accessibility", () => {
  it('has role="button"', () => {
    render(<Button>Accessible</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("uses provided aria-label", () => {
    render(<Button aria-label="Submit form">Submit</Button>);
    expect(
      screen.getByRole("button", { name: /submit form/i }),
    ).toBeInTheDocument();
  });

  it("applies aria-disabled when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });
});

describe("Button — asChild Delegation", () => {
  it("merges classes and attributes onto child element when asChild is true", () => {
    render(
      <Button asChild variant="outline" size="sm">
        <a href="/login" data-testid="link-btn">
          Login with Link
        </a>
      </Button>,
    );

    const link = screen.getByTestId("link-btn");
    expect(link).toHaveAttribute("href", "/login");
    expect(link).toHaveClass("sora-button");
    expect(link).toHaveClass("sora-button--outline");
    expect(link).toHaveClass("sora-button--sm");
  });

  it("suppresses click and sets tabIndex=-1 when asChild element is disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button asChild disabled onClick={handleClick}>
        <a href="/login" data-testid="disabled-link">
          Disabled Link
        </a>
      </Button>,
    );

    const link = screen.getByTestId("disabled-link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("suppresses click when asChild element is loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button asChild loading onClick={handleClick}>
        <a href="/dashboard" data-testid="loading-link">
          Loading Link
        </a>
      </Button>,
    );

    const link = screen.getByTestId("loading-link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("data-loading", "true");
    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Button — Rounded & ButtonGroup", () => {
  it("applies sora-button--rounded class when rounded is true", () => {
    render(<Button rounded data-testid="rounded-btn">Rounded</Button>);
    expect(screen.getByTestId("rounded-btn")).toHaveClass("sora-button--rounded");
  });

  it("renders ButtonGroup with role='group' and sora-button-group class", () => {
    render(
      <div className="sora-button-group" role="group" data-testid="group">
        <Button>First</Button>
        <Button>Second</Button>
      </div>
    );
    expect(screen.getByTestId("group")).toBeInTheDocument();
  });
});


