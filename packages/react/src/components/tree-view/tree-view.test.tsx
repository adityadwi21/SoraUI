import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TreeView } from "./tree-view";

const treeData = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "components", label: "components" },
      { id: "index", label: "index.ts" },
    ],
  },
];

describe("TreeView Component & A11y", () => {
  it("renders tree items and toggles nested group expansion", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<TreeView items={treeData} onSelectNode={handleSelect} />);

    expect(screen.getByRole("tree")).toBeInTheDocument();
    const srcNode = screen.getByText("src");
    const treeItem = screen.getByRole("treeitem");
    expect(treeItem).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("components")).not.toBeInTheDocument();

    await user.click(srcNode);
    expect(treeItem).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("components")).toBeInTheDocument();
    expect(handleSelect).toHaveBeenCalledWith(treeData[0]);
  });

  it("supports keyboard navigation (ArrowRight to expand, ArrowLeft to collapse)", async () => {
    const user = userEvent.setup();
    render(<TreeView items={treeData} />);

    const srcNode = screen
      .getByText("src")
      .closest<HTMLElement>(".sora-tree-view__node")!;
    srcNode.focus();

    // ArrowRight expands
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("components")).toBeInTheDocument();

    // ArrowLeft collapses
    await user.keyboard("{ArrowLeft}");
    expect(screen.queryByText("components")).not.toBeInTheDocument();
  });

  it("selects and toggles node on Enter key", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(<TreeView items={treeData} onSelectNode={handleSelect} />);

    const srcNode = screen
      .getByText("src")
      .closest<HTMLElement>(".sora-tree-view__node")!;
    srcNode.focus();

    await user.keyboard("{Enter}");
    expect(screen.getByText("components")).toBeInTheDocument();
    expect(handleSelect).toHaveBeenCalledWith(treeData[0]);
  });
});
