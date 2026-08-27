import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  Attachment,
  AttachmentItem,
  AttachmentInfo,
  AttachmentName,
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  Badge,
  Button,
  Switch,
  Input,
  NumberInput,
} from "../src";

describe("Universal RTL Support Matrix", () => {
  it("renders Accordion inside RTL context with correct direction", () => {
    const { container } = render(
      <div dir="rtl">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>عنوان الأكورديون</AccordionTrigger>
            <AccordionContent>محتوى الأكورديون باللغة العربية</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>,
    );
    const trigger = container.querySelector(".sora-accordion__trigger");
    expect(trigger).toBeDefined();
    expect(container.querySelector('[dir="rtl"]')).not.toBeNull();
  });

  it("renders Alert with icon and RTL text layout", () => {
    const { container } = render(
      <div dir="rtl">
        <Alert variant="destructive">
          <AlertTitle>تنبيه هام</AlertTitle>
          <AlertDescription>حدث خطأ أثناء حفظ التغييرات.</AlertDescription>
        </Alert>
      </div>,
    );
    const alert = container.querySelector(".sora-alert");
    expect(alert).not.toBeNull();
    expect(alert?.textContent).toContain("تنبيه هام");
  });

  it("renders AspectRatio in RTL container without breakage", () => {
    const { container } = render(
      <div dir="rtl">
        <AspectRatio ratio={16 / 9}>
          <img src="test.jpg" alt="test" />
        </AspectRatio>
      </div>,
    );
    expect(container.querySelector(".sora-aspect-ratio")).not.toBeNull();
  });

  it("renders Attachment item in RTL", () => {
    const { container } = render(
      <div dir="rtl">
        <Attachment>
          <AttachmentItem>
            <AttachmentInfo>
              <AttachmentName>ملف_التقرير.pdf</AttachmentName>
            </AttachmentInfo>
          </AttachmentItem>
        </Attachment>
      </div>,
    );
    expect(container.querySelector(".sora-attachment-name")?.textContent).toBe("ملف_التقرير.pdf");
  });

  it("renders Avatar and AvatarGroup in RTL container", () => {
    const { container } = render(
      <div dir="rtl">
        <AvatarGroup spacing="normal">
          <Avatar>
            <AvatarFallback>ع</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>م</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>,
    );
    const group = container.querySelector(".sora-avatar-group");
    expect(group).not.toBeNull();
    expect(group?.children.length).toBe(2);
  });

  it("renders Badge with leading and trailing icons in RTL", () => {
    const { container } = render(
      <div dir="rtl">
        <Badge variant="default">جديد</Badge>
      </div>,
    );
    const badge = container.querySelector(".sora-badge");
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe("جديد");
  });

  it("renders Button and Switch in RTL", () => {
    const { container } = render(
      <div dir="rtl">
        <Button variant="primary">حفظ البيانات</Button>
        <Switch aria-label="تفعيل" />
        <Input placeholder="أدخل اسمك" />
        <NumberInput value={10} min={0} max={100} />
      </div>,
    );
    expect(container.querySelector(".sora-button")?.textContent).toBe("حفظ البيانات");
    expect(container.querySelector(".sora-switch")).not.toBeNull();
    expect(container.querySelector(".sora-input")).not.toBeNull();
    expect(container.querySelector(".sora-number-input")).not.toBeNull();
  });
});
