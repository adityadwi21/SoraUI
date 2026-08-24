import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Attachment,
  AttachmentItem,
  AttachmentIcon,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  AttachmentRemove,
} from "./attachment";

describe("Attachment component", () => {
  it("renders file name, size, and remove button", () => {
    render(
      <Attachment>
        <AttachmentItem>
          <AttachmentIcon type="pdf" />
          <AttachmentInfo>
            <AttachmentName>annual_report.pdf</AttachmentName>
            <AttachmentSize>2.4 MB</AttachmentSize>
          </AttachmentInfo>
          <AttachmentRemove />
        </AttachmentItem>
      </Attachment>,
    );

    expect(screen.getByText("annual_report.pdf")).toBeDefined();
    expect(screen.getByText("2.4 MB")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /remove attachment/i }),
    ).toBeDefined();
  });
});
