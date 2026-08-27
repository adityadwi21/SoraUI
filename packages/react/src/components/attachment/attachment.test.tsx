import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import {
  Attachment,
  AttachmentItem,
  AttachmentIcon,
  AttachmentPreview,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  AttachmentStatus,
  AttachmentProgress,
  AttachmentActions,
  AttachmentRemove,
} from "./attachment";

describe("Attachment component", () => {
  it("renders file name, size, and remove button", () => {
    const handleRemove = vi.fn();
    render(
      <Attachment>
        <AttachmentItem>
          <AttachmentIcon type="pdf" />
          <AttachmentInfo>
            <AttachmentName>annual_report.pdf</AttachmentName>
            <AttachmentSize>2.4 MB</AttachmentSize>
          </AttachmentInfo>
          <AttachmentActions>
            <AttachmentRemove onClick={handleRemove} />
          </AttachmentActions>
        </AttachmentItem>
      </Attachment>,
    );

    expect(screen.getByText("annual_report.pdf")).toBeDefined();
    expect(screen.getByText("2.4 MB")).toBeDefined();
    const removeBtn = screen.getByRole("button", { name: /remove attachment/i });
    expect(removeBtn).toBeDefined();

    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("supports layout variants (list and grid)", () => {
    const { container: listContainer } = render(
      <Attachment layout="list">
        <AttachmentItem>List Item</AttachmentItem>
      </Attachment>,
    );
    expect(listContainer.firstChild).toHaveProperty(
      "className",
      expect.stringContaining("sora-attachment-group--list"),
    );

    const { container: gridContainer } = render(
      <Attachment layout="grid">
        <AttachmentItem>Grid Item</AttachmentItem>
      </Attachment>,
    );
    expect(gridContainer.firstChild).toHaveProperty(
      "className",
      expect.stringContaining("sora-attachment-group--grid"),
    );
  });

  it("supports AttachmentItem variants (elevated, pill, loading)", () => {
    const { container } = render(
      <>
        <AttachmentItem elevated data-testid="elevated-item" />
        <AttachmentItem variant="pill" data-testid="pill-item" />
        <AttachmentItem loading data-testid="loading-item" />
      </>,
    );

    const elevated = screen.getByTestId("elevated-item");
    expect(elevated.className).toContain("sora-attachment-item--elevated");

    const pill = screen.getByTestId("pill-item");
    expect(pill.className).toContain("sora-attachment-item--pill");

    const loading = screen.getByTestId("loading-item");
    expect(loading.className).toContain("sora-attachment-item--loading");
  });

  it("renders AttachmentIcon with different types and spinner", () => {
    const { container } = render(
      <>
        <AttachmentIcon type="image" data-testid="icon-image" />
        <AttachmentIcon type="video" data-testid="icon-video" />
        <AttachmentIcon type="archive" data-testid="icon-archive" />
        <AttachmentIcon spinner data-testid="icon-spinner" />
      </>,
    );

    expect(screen.getByTestId("icon-image").className).toContain(
      "sora-attachment-icon--image",
    );
    expect(screen.getByTestId("icon-video").className).toContain(
      "sora-attachment-icon--video",
    );
    expect(screen.getByTestId("icon-archive").className).toContain(
      "sora-attachment-icon--archive",
    );
    expect(screen.getByTestId("icon-spinner").className).toContain(
      "sora-attachment-icon--spinner",
    );
  });

  it("renders AttachmentPreview with image src and fallback children", () => {
    render(
      <>
        <AttachmentPreview src="https://example.com/photo.jpg" alt="Preview Image" />
        <AttachmentPreview data-testid="preview-fallback">
          <span>Custom Preview</span>
        </AttachmentPreview>
      </>,
    );

    const img = screen.getByRole("img", { name: /preview image/i });
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("https://example.com/photo.jpg");
    expect(screen.getByText("Custom Preview")).toBeDefined();
  });

  it("renders AttachmentStatus with variant and shimmer", () => {
    render(
      <>
        <AttachmentStatus variant="success" data-testid="status-success">
          Uploaded
        </AttachmentStatus>
        <AttachmentStatus variant="error" shimmer data-testid="status-error">
          Failed
        </AttachmentStatus>
      </>,
    );

    const success = screen.getByTestId("status-success");
    expect(success.className).toContain("sora-attachment-status--success");

    const error = screen.getByTestId("status-error");
    expect(error.className).toContain("sora-attachment-status--error");
    expect(error.className).toContain("sora-attachment-status--shimmer");
  });

  it("renders AttachmentProgress with accessible attributes and clamped width", () => {
    const { rerender } = render(
      <AttachmentProgress value={45} data-testid="progress-bar" />,
    );

    const progress = screen.getByRole("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBe("45");
    expect(progress.getAttribute("aria-valuemin")).toBe("0");
    expect(progress.getAttribute("aria-valuemax")).toBe("100");

    const bar = progress.querySelector(".sora-attachment-progress__bar");
    expect(bar?.getAttribute("style")).toContain("width: 45%");

    // Test clamping > 100
    rerender(<AttachmentProgress value={150} />);
    const clampedBar = screen.getByRole("progressbar").querySelector(
      ".sora-attachment-progress__bar",
    );
    expect(clampedBar?.getAttribute("style")).toContain("width: 100%");
  });

  it("forwards ref to DOM elements", () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const iconRef = createRef<HTMLDivElement>();
    const removeRef = createRef<HTMLButtonElement>();

    render(
      <Attachment ref={groupRef}>
        <AttachmentItem ref={itemRef}>
          <AttachmentIcon ref={iconRef} />
          <AttachmentRemove ref={removeRef} />
        </AttachmentItem>
      </Attachment>,
    );

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
    expect(iconRef.current).toBeInstanceOf(HTMLDivElement);
    expect(removeRef.current).toBeInstanceOf(HTMLButtonElement);
  });
});
