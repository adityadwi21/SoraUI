/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Textarea,
  Separator,
  Skeleton,
  Typography,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  ToastProvider,
  Calendar,
  DatePicker,
  Combobox,
  FileUploader,
  DataTable,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  InputOTP,
  NumberInput,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Stepper,
  StepperItem,
  CommandPalette,
  CommandItem,
  AlertDialog,
  AlertDialogTrigger,
  Drawer,
  DrawerTrigger,
  HoverCard,
  HoverCardTrigger,
  ContextMenu,
  ContextMenuTrigger,
  Progress,
  Avatar,
  AvatarFallback,
  Collapsible,
  CollapsibleTrigger,
  Timeline,
  TimelineItem,
  Statistic,
  TreeView,
  ThemeProvider,
  ThemeScope,
} from "./index";

describe("Server-Side Rendering (SSR) — Node Environment", () => {
  it("renders all Level 1 components to HTML string without errors", () => {
    const html = renderToString(
      <div>
        <Button variant="primary">Submit</Button>
        <Input placeholder="Enter email..." />
        <Label required>Email</Label>
        <Card elevated>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Body</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
        <Badge variant="success">Active</Badge>
        <Textarea placeholder="Notes..." />
        <Separator />
        <Skeleton width={100} height={20} />
        <Typography variant="h1">Header</Typography>
      </div>,
    );

    expect(html).toContain("sora-button");
    expect(html).toContain("sora-input");
    expect(html).toContain("sora-card");
    expect(html).toContain("sora-badge");
    expect(html).toContain("sora-skeleton");
  });

  it("renders all Level 2 interactive components safely during SSR", () => {
    const html = renderToString(
      <ToastProvider>
        <div>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Info</TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Popover body</PopoverContent>
          </Popover>

          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
          </Tabs>

          <Accordion type="single" defaultValue="acc-1">
            <AccordionItem value="acc-1">
              <AccordionTrigger>Accordion Trigger</AccordionTrigger>
              <AccordionContent>Accordion Content</AccordionContent>
            </AccordionItem>
          </Accordion>

          <Dialog>
            <DialogTrigger>Open Modal</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modal Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dropdown>
            <DropdownTrigger>Options</DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>Label</DropdownLabel>
              <DropdownItem>Action</DropdownItem>
              <DropdownSeparator />
            </DropdownContent>
          </Dropdown>

          <Select defaultValue="opt1">
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opt1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ToastProvider>,
    );

    expect(html).toContain("sora-tooltip__trigger");
    expect(html).toContain("sora-popover__trigger");
    expect(html).toContain("sora-tabs");
    expect(html).toContain("sora-accordion");
    expect(html).toContain("sora-dialog__trigger");
    expect(html).toContain("sora-dropdown__trigger");
    expect(html).toContain("sora-select__trigger");
  });

  it("renders all Level 3 advanced components safely during SSR", () => {
    const html = renderToString(
      <div>
        <Calendar defaultValue={new Date(2026, 7, 1)} />
        <DatePicker defaultValue={new Date(2026, 7, 1)} />
        <Combobox options={[{ value: "1", label: "Option 1" }]} />
        <FileUploader />
        <DataTable
          data={[{ id: 1, name: "Alice" }]}
          columns={[
            { header: "ID", accessorKey: "id" },
            { header: "Name", accessorKey: "name" },
          ]}
        />
      </div>,
    );

    expect(html).toContain("sora-calendar");
    expect(html).toContain("sora-date-picker");
    expect(html).toContain("sora-combobox");
    expect(html).toContain("sora-file-uploader");
    expect(html).toContain("sora-data-table");
  });

  it("renders all Phase 7 expansion components safely during SSR", () => {
    const html = renderToString(
      <div>
        <Checkbox defaultChecked />
        <RadioGroup defaultValue="1">
          <RadioGroupItem value="1">Item 1</RadioGroupItem>
        </RadioGroup>
        <Switch defaultChecked />
        <Slider defaultValue={30} />
        <InputOTP length={4} defaultValue="1234" />
        <NumberInput defaultValue={5} />
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
        </Breadcrumb>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Nav</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Menu</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="/1" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Stepper>
          <StepperItem step={1} completed>
            Step 1
          </StepperItem>
        </Stepper>
        <CommandPalette open={false}>
          <CommandItem>Command</CommandItem>
        </CommandPalette>
        <AlertDialog>
          <AlertDialogTrigger>Alert</AlertDialogTrigger>
        </AlertDialog>
        <Drawer>
          <DrawerTrigger>Drawer</DrawerTrigger>
        </Drawer>
        <HoverCard>
          <HoverCardTrigger>Hover</HoverCardTrigger>
        </HoverCard>
        <ContextMenu>
          <ContextMenuTrigger>Context</ContextMenuTrigger>
        </ContextMenu>
        <Progress value={60} />
        <Avatar>
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <Collapsible>
          <CollapsibleTrigger>Expand</CollapsibleTrigger>
        </Collapsible>
        <Timeline>
          <TimelineItem>Event 1</TimelineItem>
        </Timeline>
        <Statistic title="Revenue" value="$100k" />
        <TreeView items={[{ id: "1", label: "Root" }]} />
      </div>,
    );

    expect(html).toContain("sora-checkbox");
    expect(html).toContain("sora-radio-group");
    expect(html).toContain("sora-switch");
    expect(html).toContain("sora-slider");
    expect(html).toContain("sora-input-otp");
    expect(html).toContain("sora-number-input");
    expect(html).toContain("sora-breadcrumb");
    expect(html).toContain("sora-nav-menu");
    expect(html).toContain("sora-menubar");
    expect(html).toContain("sora-pagination");
    expect(html).toContain("sora-stepper");
    expect(html).toContain("sora-progress");
    expect(html).toContain("sora-avatar");
    expect(html).toContain("sora-collapsible");
    expect(html).toContain("sora-timeline");
    expect(html).toContain("sora-statistic");
    expect(html).toContain("sora-tree-view");
  });

  it("renders ThemeProvider and nested ThemeScope safely during SSR", () => {
    const html = renderToString(
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <ThemeScope theme="midnight">
          <Button>Themed Button</Button>
        </ThemeScope>
      </ThemeProvider>,
    );

    expect(html).toContain('data-theme="midnight"');
    expect(html).toContain("sora-theme-scope");
    expect(html).toContain("sora-button");
  });
});
