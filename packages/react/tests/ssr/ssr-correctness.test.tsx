/**
 * @vitest-environment jsdom
 */
/**
 * Phase 12E — SSR Correctness Test
 *
 * Tests that React hydration produces 0 mismatch warnings.
 * Strategy: renderToString() → mount with hydrateRoot() → assert no console.error.
 *
 * Note: FOUC prevention is tested separately in tests/browser-compat/fouc-prevention.spec.ts
 * using Playwright (because FOUC verification requires real browser CSS evaluation).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import {
  Button, Input, Label, Card, CardHeader, CardTitle, CardContent,
  Badge, Textarea, Separator, Skeleton, Progress, Avatar, AvatarFallback,
  Checkbox, Switch, NumberInput, Slider,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  Stepper, StepperItem,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  Timeline, TimelineItem, Statistic,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  ThemeProvider, ThemeScope,
} from '../../src/index';

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

async function assertNoHydrationMismatch(jsx: React.ReactElement): Promise<void> {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  // Server render
  const html = renderToString(jsx);

  // Create real DOM container
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  // Hydrate
  await act(async () => {
    hydrateRoot(container, jsx);
  });

  // Check for React hydration mismatch messages
  const hydrationErrors = consoleSpy.mock.calls.filter((args) => {
    const msg = args.join(' ');
    return (
      msg.includes('did not match') ||
      msg.includes('Hydration') ||
      msg.includes('hydration') ||
      msg.includes('server HTML was replaced')
    );
  });

  expect(
    hydrationErrors,
    `React hydration mismatch detected:\n${hydrationErrors.map((a) => a.join(' ')).join('\n')}`
  ).toHaveLength(0);

  consoleSpy.mockRestore();
  document.body.removeChild(container);
}

// ──────────────────────────────────────────────────────────────────────────────
// Test Suite
// ──────────────────────────────────────────────────────────────────────────────

describe('12E — SSR Correctness: 0 React Hydration Mismatches', () => {
  it('Level 1 primitives hydrate without mismatch', async () => {
    await assertNoHydrationMismatch(
      <div>
        <Button>Submit</Button>
        <Input placeholder="Email" />
        <Label htmlFor="test">Label</Label>
        <Badge>New</Badge>
        <Textarea placeholder="Message" />
        <Separator />
        <Skeleton style={{ width: 100, height: 20 }} />
        <Progress value={50} aria-label="Upload" />
      </div>
    );
  });

  it('Avatar hydrates without mismatch', async () => {
    await assertNoHydrationMismatch(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
  });

  it('Form controls hydrate without mismatch', async () => {
    await assertNoHydrationMismatch(
      <div>
        <Checkbox id="c1" />
        <Switch id="s1" />
        <NumberInput id="n1" min={0} max={100} />
        <Slider aria-label="Volume" min={0} max={100} defaultValue={50} />
      </div>
    );
  });

  it('Navigation components hydrate without mismatch', async () => {
    await assertNoHydrationMismatch(
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          </PaginationContent>
        </Pagination>
        <Stepper>
          <StepperItem step={1} completed>Setup</StepperItem>
          <StepperItem step={2} active>Configure</StepperItem>
        </Stepper>
      </div>
    );
  });

  it('Collapsible and Timeline hydrate without mismatch', async () => {
    await assertNoHydrationMismatch(
      <div>
        <Collapsible>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent><p>Content</p></CollapsibleContent>
        </Collapsible>
        <Timeline>
          <TimelineItem active>
            <div>
              <h4>Event</h4>
              <p>Details</p>
            </div>
          </TimelineItem>
        </Timeline>
        <Statistic title="Revenue" value="$12,400" trend="up" trendValue="+12%" />
      </div>
    );
  });


  it('Tabs component hydrates without mismatch', async () => {
    await assertNoHydrationMismatch(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Settings">
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1"><p>Account settings</p></TabsContent>
        <TabsContent value="tab2"><p>Security settings</p></TabsContent>
      </Tabs>
    );
  });

  it('Accordion component hydrates without mismatch', async () => {
    await assertNoHydrationMismatch(
      <Accordion type="single">
        <AccordionItem value="q1">
          <AccordionTrigger>What is SoraUI?</AccordionTrigger>
          <AccordionContent>A lightweight UI system.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });

  it('ThemeProvider and nested ThemeScope hydrate without mismatch', async () => {
    await assertNoHydrationMismatch(
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <ThemeScope theme="midnight">
          <Button>Themed Button</Button>
        </ThemeScope>
      </ThemeProvider>
    );
  });

  it('Card composable hydrates without mismatch', async () => {
    await assertNoHydrationMismatch(
      <Card>
        <CardHeader><CardTitle>Card Title</CardTitle></CardHeader>
        <CardContent><p>Body content</p></CardContent>
      </Card>
    );
  });
});
