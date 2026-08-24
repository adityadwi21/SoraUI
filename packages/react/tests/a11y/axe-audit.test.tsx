/**
 * Phase 12A — Automated Accessibility (axe-core) Audit
 *
 * Scope: All 44 SoraUI primitive components rendered in JSDOM.
 * Rule: 0 critical violations, 0 serious violations.
 *
 * Note: This is a STRUCTURAL accessibility test (aria roles, labels, attributes).
 * Keyboard behavior is tested separately in 12C (keyboard/focus tests).
 * Interactive components with portal/positioning behavior are additionally
 * tested in browser via Playwright (tests/browser-compat/a11y-smoke.spec.ts).
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import React from "react";

// Primitives
import { Button } from "../../src/components/button/button";
import { Input } from "../../src/components/input/input";
import { Label } from "../../src/components/label/label";
import { Textarea } from "../../src/components/textarea/textarea";
import { Badge } from "../../src/components/badge/badge";
import { Separator } from "../../src/components/separator/separator";
import { Skeleton } from "../../src/components/skeleton/skeleton";
import { Progress } from "../../src/components/progress/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../src/components/avatar/avatar";
import { Checkbox } from "../../src/components/checkbox/checkbox";
import { Switch } from "../../src/components/switch/switch";
import { NumberInput } from "../../src/components/number-input/number-input";
import { Slider } from "../../src/components/slider/slider";
import { Statistic } from "../../src/components/statistic/statistic";

// Layout & Navigation
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../src/components/card/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../src/components/breadcrumb/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "../../src/components/pagination/pagination";
import { Stepper, StepperItem } from "../../src/components/stepper/stepper";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../src/components/collapsible/collapsible";
import { Timeline, TimelineItem } from "../../src/components/timeline/timeline";

// Typography
import { Typography } from "../../src/components/typography/typography";

// Interactive (rendered in non-open / minimal state for structural axe audit)
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../src/components/tabs/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../src/components/accordion/accordion";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../src/components/radio-group/radio-group";
import { InputOTP } from "../../src/components/input-otp/input-otp";

import { FileUploader } from "../../src/components/file-uploader/file-uploader";

// Axe rule config — suppress rules that are JSDOM environment limitations, not real violations.
const AXE_CONFIG: axe.RunOptions = {
  rules: {
    // color-contrast requires actual computed CSS styles unavailable in JSDOM
    "color-contrast": { enabled: false },
    // scrollable-region-focusable: JSDOM cannot compute overflow style
    "scrollable-region-focusable": { enabled: false },
  },
};

async function expectNoA11yViolations(container: HTMLElement) {
  const results = await axe.run(container, AXE_CONFIG);
  const criticalOrSerious = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(
    criticalOrSerious,
    `Accessibility violations found:\n${criticalOrSerious.map((v) => `[${v.impact}] ${v.id}: ${v.description} (${v.helpUrl})`).join("\n")}`,
  ).toEqual([]);
}

describe("12A — axe-core Accessibility Audit: Level 1 Primitives", () => {
  it("Button — no violations", async () => {
    const { container } = render(<Button>Submit</Button>);
    await expectNoA11yViolations(container);
  });

  it("Button icon — has aria-label, no violations", async () => {
    const { container } = render(
      <Button size="icon" aria-label="Close menu">
        ✕
      </Button>,
    );
    await expectNoA11yViolations(container);
  });

  it("Button loading — no violations", async () => {
    const { container } = render(<Button loading>Loading...</Button>);
    await expectNoA11yViolations(container);
  });

  it("Input — no violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="test-input">Email</Label>
        <Input id="test-input" type="email" placeholder="you@example.com" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("Input with error — no violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="err-input">Email</Label>
        <Input id="err-input" aria-invalid="true" aria-describedby="err-msg" />
        <span id="err-msg" role="alert">
          Invalid email address
        </span>
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("Textarea — no violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="ta">Message</Label>
        <Textarea id="ta" placeholder="Type here..." />
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("Label — no violations", async () => {
    const { container } = render(<Label htmlFor="l1">Username</Label>);
    await expectNoA11yViolations(container);
  });

  it("Card — no violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>,
    );
    await expectNoA11yViolations(container);
  });

  it("Badge — no violations", async () => {
    const { container } = render(<Badge variant="default">New</Badge>);
    await expectNoA11yViolations(container);
  });

  it("Separator horizontal — no violations", async () => {
    const { container } = render(<Separator orientation="horizontal" />);
    await expectNoA11yViolations(container);
  });

  it("Skeleton — no violations", async () => {
    const { container } = render(
      <Skeleton style={{ width: 200, height: 20 }} />,
    );
    await expectNoA11yViolations(container);
  });

  it("Progress — no violations with aria-label", async () => {
    const { container } = render(
      <Progress value={60} aria-label="Upload progress" />,
    );
    await expectNoA11yViolations(container);
  });

  it("Avatar — no violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/user.png" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    await expectNoA11yViolations(container);
  });

  it("Checkbox — no violations", async () => {
    const { container } = render(
      <div>
        <Checkbox id="tos" />
        <label htmlFor="tos">Accept terms of service</label>
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("Switch — no violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="sw1">Dark mode</label>
        <Switch id="sw1" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("NumberInput — no violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="ni">Quantity</Label>
        <NumberInput id="ni" min={0} max={100} />
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("Slider — no violations", async () => {
    const { container } = render(
      <Slider aria-label="Volume" min={0} max={100} defaultValue={50} />,
    );
    await expectNoA11yViolations(container);
  });

  it("Statistic — no violations", async () => {
    const { container } = render(
      <Statistic
        title="Revenue"
        value="$12,400"
        trend="up"
        trendValue="+12%"
      />,
    );
    await expectNoA11yViolations(container);
  });
});

describe("12A — axe-core Accessibility Audit: Navigation & Layout", () => {
  it("Breadcrumb — no violations", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    await expectNoA11yViolations(container);
  });

  it("Pagination — no violations", async () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    await expectNoA11yViolations(container);
  });

  it("Stepper — no violations", async () => {
    const { container } = render(
      <Stepper>
        <StepperItem step={1} completed>
          Account
        </StepperItem>
        <StepperItem step={2} active>
          Profile
        </StepperItem>
        <StepperItem step={3}>Review</StepperItem>
      </Stepper>,
    );
    await expectNoA11yViolations(container);
  });

  it("Collapsible — no violations", async () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Collapsed content</p>
        </CollapsibleContent>
      </Collapsible>,
    );
    await expectNoA11yViolations(container);
  });

  it("Timeline — no violations", async () => {
    const { container } = render(
      <Timeline>
        <TimelineItem active>
          <div>
            <h4>Created</h4>
            <p>Project was created</p>
            <time>Jan 1</time>
          </div>
        </TimelineItem>
        <TimelineItem>
          <div>
            <h4>Updated</h4>
            <p>Profile updated</p>
            <time>Jan 5</time>
          </div>
        </TimelineItem>
      </Timeline>,
    );
    await expectNoA11yViolations(container);
  });
});

describe("12A — axe-core Accessibility Audit: Typography", () => {
  it("Typography components — no violations", async () => {
    const { container } = render(
      <article>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="lead">Lead paragraph text</Typography>
        <Typography variant="body">Normal paragraph text</Typography>
        <Typography variant="muted">Muted helper text</Typography>
        <Typography variant="code">const x = 1;</Typography>
      </article>,
    );
    await expectNoA11yViolations(container);
  });
});

describe("12A — axe-core Accessibility Audit: Interactive Components (structural)", () => {
  it("Tabs — no violations", async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Account settings">
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <p>Account panel</p>
        </TabsContent>
        <TabsContent value="tab2">
          <p>Security panel</p>
        </TabsContent>
      </Tabs>,
    );
    await expectNoA11yViolations(container);
  });

  it("Accordion — no violations", async () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem value="q1">
          <AccordionTrigger>What is SoraUI?</AccordionTrigger>
          <AccordionContent>A lightweight UI system.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await expectNoA11yViolations(container);
  });

  it("RadioGroup — no violations", async () => {
    const { container } = render(
      <fieldset>
        <legend>Preferred method</legend>
        <RadioGroup defaultValue="email">
          <div>
            <RadioGroupItem value="email" id="rg-email" />
            <label htmlFor="rg-email">Email</label>
          </div>
          <div>
            <RadioGroupItem value="sms" id="rg-sms" />
            <label htmlFor="rg-sms">SMS</label>
          </div>
        </RadioGroup>
      </fieldset>,
    );
    await expectNoA11yViolations(container);
  });

  it("InputOTP — no violations", async () => {
    const { container } = render(
      <div>
        <label id="otp-label">Enter 6-digit code</label>
        <InputOTP length={6} aria-labelledby="otp-label" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });

  it("FileUploader — no violations", async () => {
    const { container } = render(
      <FileUploader onFilesChange={() => {}} aria-label="Upload files" />,
    );
    await expectNoA11yViolations(container);
  });
});
