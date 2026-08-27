import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";

describe("Card", () => {
  it("renders basic card", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("renders all sub-components including CardAction", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("supports size='sm' and elevated props", () => {
    const { container } = render(
      <Card size="sm" elevated data-testid="card-sm">
        <CardContent>Small Card</CardContent>
      </Card>,
    );
    const card = screen.getByTestId("card-sm");
    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).toHaveClass("sora-card--sm");
    expect(card).toHaveClass("sora-card--elevated");
  });

  it("CardTitle uses an h3 element", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Heading</CardTitle>
        </CardHeader>
      </Card>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Heading" }),
    ).toBeInTheDocument();
  });

  it("forwards refs to all 7 sub-components DOM elements", () => {
    const cardRef = { current: null };
    const headerRef = { current: null };
    const titleRef = { current: null };
    const descRef = { current: null };
    const actionRef = { current: null };
    const contentRef = { current: null };
    const footerRef = { current: null };
    render(
      <Card ref={cardRef}>
        <CardHeader ref={headerRef}>
          <CardTitle ref={titleRef}>Card Ref Title</CardTitle>
          <CardDescription ref={descRef}>Card Ref Desc</CardDescription>
          <CardAction ref={actionRef}>Action</CardAction>
        </CardHeader>
        <CardContent ref={contentRef}>Content</CardContent>
        <CardFooter ref={footerRef}>Footer</CardFooter>
      </Card>,
    );
    expect(cardRef.current).toBeInstanceOf(HTMLDivElement);
    expect(headerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(descRef.current).toBeInstanceOf(HTMLParagraphElement);
    expect(actionRef.current).toBeInstanceOf(HTMLDivElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    expect(footerRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom --card-spacing style property", () => {
    render(
      <Card
        data-testid="spaced-card"
        style={{ "--card-spacing": "20px" } as React.CSSProperties}
      >
        <CardHeader>
          <CardTitle>Spaced</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    );
    const card = screen.getByTestId("spaced-card");
    expect(card).toHaveStyle({ "--card-spacing": "20px" });
  });
});

