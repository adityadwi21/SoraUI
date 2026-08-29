import React, { useState, useMemo } from "react";
import type { ComponentDoc } from "../registry/types";
import { COMPONENT_DOCS } from "../registry/components";
import { ComponentPreview } from "../components/component-preview";
import { PropTable } from "../components/prop-table";
import { CodeBlock } from "../components/code-block";
import { PackageManagerBlock } from "../components/package-manager-block";
import { getManualComponentCode } from "../registry/manual-source";
import { Terminal, FileCode2 } from "lucide-react";

export interface ComponentPageProps {
  doc: ComponentDoc;
  onNavigate?: (path: string) => void;
}

function getImportSnippet(doc: ComponentDoc): string {
  switch (doc.id) {
    case "accordion":
      return `import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n} from '@soraui/react';`;
    case "alert":
      return `import {\n  Alert,\n  AlertTitle,\n  AlertDescription,\n} from '@soraui/react';\nimport { Terminal } from 'lucide-react';`;
    case "alert-dialog":
      return `import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from '@soraui/react';`;
    case "aspect-ratio":
      return `import { AspectRatio } from '@soraui/react';`;
    case "attachment":
      return `import {\n  Attachment,\n  AttachmentItem,\n  AttachmentIcon,\n  AttachmentInfo,\n  AttachmentName,\n  AttachmentSize,\n  AttachmentActions,\n  AttachmentRemove,\n} from '@soraui/react';`;
    case "avatar":
      return `import {\n  Avatar,\n  AvatarImage,\n  AvatarFallback,\n} from '@soraui/react';`;
    case "badge":
      return `import { Badge } from '@soraui/react';`;
    case "breadcrumb":
      return `import {\n  Breadcrumb,\n  BreadcrumbList,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from '@soraui/react';`;
    case "button":
      return `import { Button } from '@soraui/react';`;
    case "calendar":
      return `import { Calendar } from '@soraui/react';`;
    case "card":
      return `import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from '@soraui/react';`;
    case "checkbox":
      return `import { Checkbox, Label } from '@soraui/react';`;
    case "collapsible":
      return `import {\n  Collapsible,\n  CollapsibleTrigger,\n  CollapsibleContent,\n} from '@soraui/react';`;
    case "combobox":
      return `import {\n  Combobox,\n  ComboboxInput,\n  ComboboxTrigger,\n  ComboboxContent,\n  ComboboxList,\n  ComboboxItem,\n  ComboboxEmpty,\n} from '@soraui/react';`;
    case "command-palette":
      return `import { CommandPalette, CommandItem } from '@soraui/react';`;
    case "context-menu":
      return `import {\n  ContextMenu,\n  ContextMenuTrigger,\n  ContextMenuContent,\n  ContextMenuItem,\n} from '@soraui/react';`;
    case "data-table":
      return `import { DataTable } from '@soraui/react';`;
    case "date-picker":
      return `import { DatePicker } from '@soraui/react';`;
    case "dialog":
      return `import {\n  Dialog,\n  DialogTrigger,\n  DialogContent,\n  DialogHeader,\n  DialogTitle,\n  DialogDescription,\n  DialogFooter,\n} from '@soraui/react';`;
    case "drawer":
      return `import {\n  Drawer,\n  DrawerTrigger,\n  DrawerContent,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerDescription,\n  DrawerFooter,\n  DrawerClose,\n} from '@soraui/react';`;
    case "dropdown":
      return `import {\n  Dropdown,\n  DropdownTrigger,\n  DropdownContent,\n  DropdownItem,\n  DropdownSeparator,\n  DropdownLabel,\n} from '@soraui/react';`;
    case "file-uploader":
      return `import { FileUploader } from '@soraui/react';`;
    case "hover-card":
      return `import {\n  HoverCard,\n  HoverCardTrigger,\n  HoverCardContent,\n} from '@soraui/react';`;
    case "input":
      return `import { Input } from '@soraui/react';`;
    case "input-otp":
      return `import { InputOTP } from '@soraui/react';`;
    case "label":
      return `import { Label } from '@soraui/react';`;
    case "menubar":
      return `import {\n  Menubar,\n  MenubarMenu,\n  MenubarTrigger,\n  MenubarContent,\n  MenubarItem,\n  MenubarSeparator,\n} from '@soraui/react';`;
    case "navigation-menu":
      return `import {\n  NavigationMenu,\n  NavigationMenuList,\n  NavigationMenuItem,\n  NavigationMenuTrigger,\n  NavigationMenuContent,\n} from '@soraui/react';`;
    case "number-input":
      return `import { NumberInput } from '@soraui/react';`;
    case "pagination":
      return `import {\n  Pagination,\n  PaginationContent,\n  PaginationItem,\n  PaginationLink,\n  PaginationPrevious,\n  PaginationNext,\n  PaginationEllipsis,\n} from '@soraui/react';`;
    case "popover":
      return `import {\n  Popover,\n  PopoverTrigger,\n  PopoverContent,\n} from '@soraui/react';`;
    case "progress":
      return `import { Progress } from '@soraui/react';`;
    case "radio-group":
      return `import { RadioGroup, RadioGroupItem, Label } from '@soraui/react';`;
    case "select":
      return `import {\n  Select,\n  SelectTrigger,\n  SelectValue,\n  SelectContent,\n  SelectItem,\n  SelectGroup,\n  SelectLabel,\n} from '@soraui/react';`;
    case "separator":
      return `import { Separator } from '@soraui/react';`;
    case "skeleton":
      return `import { Skeleton } from '@soraui/react';`;
    case "slider":
      return `import { Slider } from '@soraui/react';`;
    case "statistic":
      return `import { Statistic } from '@soraui/react';`;
    case "stepper":
      return `import { Stepper, StepperItem } from '@soraui/react';`;
    case "switch":
      return `import { Switch, Label } from '@soraui/react';`;
    case "tabs":
      return `import {\n  Tabs,\n  TabsList,\n  TabsTrigger,\n  TabsContent,\n} from '@soraui/react';`;
    case "textarea":
      return `import { Textarea } from '@soraui/react';`;
    case "timeline":
      return `import { Timeline, TimelineItem } from '@soraui/react';`;
    case "toast":
      return `import {\n  ToastProvider,\n  useToast,\n  Button,\n} from '@soraui/react';`;
    case "tooltip":
      return `import {\n  Tooltip,\n  TooltipTrigger,\n  TooltipContent,\n} from '@soraui/react';`;
    case "tree-view":
      return `import { TreeView } from '@soraui/react';`;
    case "typography":
      return `import { Typography } from '@soraui/react';`;
    default: {
      const cleanName = doc.name.replace(/\s+/g, "");
      return `import { ${cleanName} } from '@soraui/react';`;
    }
  }
}

function getMinimalUsageSnippet(doc: ComponentDoc): string {
  switch (doc.id) {
    case "accordion":
      return `<Accordion type="single" collapsible defaultValue="item-1">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`;
    case "alert":
      return `<Alert>\n  <Terminal className="h-4 w-4" />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>\n    You can add components to your app using the cli.\n  </AlertDescription>\n</Alert>`;
    case "alert-dialog":
      return `<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="outline">Show Dialog</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n      <AlertDialogDescription>\n        This action cannot be undone. This will permanently delete your account\n        and remove your data from our servers.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Continue</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`;
    case "aspect-ratio":
      return `<div style={{ width: 400 }}>\n  <AspectRatio ratio={16 / 9}>\n    <img\n      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"\n      alt="Photo"\n      style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 'calc(var(--ui-radius, 8px) - 2px)' }}\n    />\n  </AspectRatio>\n</div>`;
    case "attachment":
      return `<Attachment layout="list">\n  <AttachmentItem>\n    <AttachmentIcon type="pdf" />\n    <AttachmentInfo>\n      <AttachmentName>annual_report.pdf</AttachmentName>\n      <AttachmentSize>4.2 MB</AttachmentSize>\n    </AttachmentInfo>\n    <AttachmentActions>\n      <AttachmentRemove />\n    </AttachmentActions>\n  </AttachmentItem>\n</Attachment>`;
    case "avatar":
      return `<Avatar>\n  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`;
    case "badge":
      return `<Badge variant="primary">Badge</Badge>`;
    case "breadcrumb":
      return `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/components">Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`;
    case "button":
      return `<Button variant="primary">Button</Button>`;
    case "calendar":
      return `const [date, setDate] = React.useState<Date | undefined>(new Date());\n\n<Calendar\n  mode="single"\n  selected={date}\n  onSelect={setDate}\n/>`;
    case "card":
      return `<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n  <CardFooter>\n    <p>Card Footer</p>\n  </CardFooter>\n</Card>`;
    case "checkbox":
      return `<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms and conditions</Label>\n</div>`;
    case "collapsible":
      return `<Collapsible>\n  <CollapsibleTrigger asChild>\n    <Button variant="ghost" size="sm">Toggle Details</Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>\n    <div style={{ padding: '0.75rem', border: '1px solid var(--ui-border)', borderRadius: 'var(--ui-radius)' }}>\n      Hidden content revealed upon toggle.\n    </div>\n  </CollapsibleContent>\n</Collapsible>`;
    case "combobox":
      return `<Combobox>\n  <ComboboxTrigger>\n    <ComboboxInput placeholder="Select framework..." />\n  </ComboboxTrigger>\n  <ComboboxContent>\n    <ComboboxList>\n      <ComboboxItem value="next">Next.js</ComboboxItem>\n      <ComboboxItem value="svelte">SvelteKit</ComboboxItem>\n      <ComboboxItem value="remix">Remix</ComboboxItem>\n    </ComboboxList>\n    <ComboboxEmpty>No framework found.</ComboboxEmpty>\n  </ComboboxContent>\n</Combobox>`;
    case "command-palette":
      return `<CommandPalette placeholder="Type a command or search...">\n  <CommandItem>Search Documentation</CommandItem>\n  <CommandItem>Open Settings</CommandItem>\n</CommandPalette>`;
    case "context-menu":
      return `<ContextMenu>\n  <ContextMenuTrigger style={{ display: 'flex', height: 150, width: 300, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--ui-radius)', border: '1px dashed var(--ui-border)' }}>\n    Right click here\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Back</ContextMenuItem>\n    <ContextMenuItem>Forward</ContextMenuItem>\n    <ContextMenuItem>Reload</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`;
    case "data-table":
      return `const columns = [\n  { key: "name", header: "Name" },\n  { key: "email", header: "Email" },\n  { key: "role", header: "Role" },\n];\n\nconst data = [\n  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },\n  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Member" },\n];\n\n<DataTable columns={columns} data={data} />`;
    case "date-picker":
      return `const [date, setDate] = React.useState<Date | undefined>();\n\n<DatePicker\n  value={date}\n  onChange={setDate}\n  placeholder="Pick a date"\n/>`;
    case "dialog":
      return `<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Edit Profile</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>\n        Make changes to your profile here. Click save when you're done.\n      </DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button type="submit">Save changes</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`;
    case "drawer":
      return `<Drawer side="right">\n  <DrawerTrigger asChild>\n    <Button variant="outline">Open Drawer</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Are you sure?</DrawerTitle>\n      <DrawerDescription>This action cannot be undone.</DrawerDescription>\n    </DrawerHeader>\n    <DrawerFooter>\n      <Button>Submit</Button>\n      <DrawerClose asChild>\n        <Button variant="outline">Cancel</Button>\n      </DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`;
    case "dropdown":
      return `<Dropdown>\n  <DropdownTrigger asChild>\n    <Button variant="outline">Open Menu</Button>\n  </DropdownTrigger>\n  <DropdownContent>\n    <DropdownLabel>My Account</DropdownLabel>\n    <DropdownSeparator />\n    <DropdownItem>Profile</DropdownItem>\n    <DropdownItem>Billing</DropdownItem>\n    <DropdownItem>Settings</DropdownItem>\n  </DropdownContent>\n</Dropdown>`;
    case "file-uploader":
      return `<FileUploader\n  accept="image/*,.pdf"\n  maxSizeMB={10}\n  onFilesChange={(files) => console.log(files)}\n/>`;
    case "hover-card":
      return `<HoverCard>\n  <HoverCardTrigger asChild>\n    <Button variant="link">@nextjs</Button>\n  </HoverCardTrigger>\n  <HoverCardContent>\n    The React Framework – created and maintained by @vercel.\n  </HoverCardContent>\n</HoverCard>`;
    case "input":
      return `<Input type="email" placeholder="Email" />`;
    case "input-otp":
      return `const [value, setValue] = React.useState("");\n\n<InputOTP\n  length={6}\n  value={value}\n  onChange={setValue}\n/>`;
    case "label":
      return `<Label htmlFor="email">Your email address</Label>`;
    case "menubar":
      return `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New Tab</MenubarItem>\n      <MenubarItem>New Window</MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Share</MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Print</MenubarItem>\n    </MenubarContent>\n  </Menubar>\n</Menubar>`;
    case "navigation-menu":
      return `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <ul style={{ display: 'grid', gap: '0.5rem', padding: '1rem', width: 300 }}>\n          <li>Introduction</li>\n          <li>Installation</li>\n          <li>Typography</li>\n        </ul>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`;
    case "number-input":
      return `<NumberInput min={0} max={100} defaultValue={1} step={1} />`;
    case "pagination":
      return `<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#" />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#" isActive>1</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationLink href="#">2</PaginationLink>\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationEllipsis />\n    </PaginationItem>\n    <PaginationItem>\n      <PaginationNext href="#" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`;
    case "popover":
      return `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open Popover</Button>\n  </PopoverTrigger>\n  <PopoverContent style={{ width: 260 }}>\n    <div style={{ display: 'grid', gap: '0.5rem' }}>\n      <h4 style={{ fontWeight: 600 }}>Dimensions</h4>\n      <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground)' }}>Set the dimensions for the layer.</p>\n    </div>\n  </PopoverContent>\n</Popover>`;
    case "progress":
      return `<Progress value={66} />`;
    case "radio-group":
      return `<RadioGroup defaultValue="comfortable">\n  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n    <RadioGroupItem value="default" id="r1" />\n    <Label htmlFor="r1">Default</Label>\n  </div>\n  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n    <RadioGroupItem value="comfortable" id="r2" />\n    <Label htmlFor="r2">Comfortable</Label>\n  </div>\n</RadioGroup>`;
    case "select":
      return `<Select>\n  <SelectTrigger style={{ width: 180 }}>\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectLabel>Fruits</SelectLabel>\n      <SelectItem value="apple">Apple</SelectItem>\n      <SelectItem value="banana">Banana</SelectItem>\n      <SelectItem value="blueberry">Blueberry</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>`;
    case "separator":
      return `<div>\n  <h4>SoraUI Primitives</h4>\n  <p>An open-source UI component library.</p>\n  <Separator style={{ margin: '1rem 0' }} />\n  <div style={{ display: 'flex', gap: '1rem' }}>\n    <span>Blog</span>\n    <Separator orientation="vertical" />\n    <span>Docs</span>\n    <Separator orientation="vertical" />\n    <span>Source</span>\n  </div>\n</div>`;
    case "skeleton":
      return `<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>\n  <Skeleton style={{ width: 48, height: 48, borderRadius: '50%' }} />\n  <div style={{ display: 'grid', gap: '0.5rem' }}>\n    <Skeleton style={{ width: 200, height: 16 }} />\n    <Skeleton style={{ width: 150, height: 14 }} />\n  </div>\n</div>`;
    case "slider":
      return `<Slider defaultValue={[50]} max={100} step={1} />`;
    case "statistic":
      return `<Statistic\n  title="Total Revenue"\n  value={45231.89}\n  prefix="$"\n  trend={{ direction: 'up', value: '12.5%' }}\n/>`;
    case "stepper":
      return `<Stepper>\n  <StepperItem step={1} completed>Account</StepperItem>\n  <StepperItem step={2} active>Profile</StepperItem>\n  <StepperItem step={3}>Review</StepperItem>\n</Stepper>`;
    case "switch":
      return `<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n  <Switch id="airplane-mode" />\n  <Label htmlFor="airplane-mode">Airplane Mode</Label>\n</div>`;
    case "tabs":
      return `<Tabs defaultValue="account" style={{ width: 400 }}>\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">\n    <p>Make changes to your account here.</p>\n  </TabsContent>\n  <TabsContent value="password">\n    <p>Change your password here.</p>\n  </TabsContent>\n</Tabs>`;
    case "textarea":
      return `<Textarea placeholder="Type your message here." />`;
    case "timeline":
      return `<Timeline>\n  <TimelineItem title="Project Created" timestamp="2 days ago" status="completed">\n    Initial project commit and repository initialized.\n  </TimelineItem>\n  <TimelineItem title="Version 1.0 Release" timestamp="Just now" status="active">\n    Production build deployed to edge servers.\n  </TimelineItem>\n</Timeline>`;
    case "toast":
      return `function ToastDemo() {\n  const { toast } = useToast();\n\n  return (\n    <Button\n      variant="outline"\n      onClick={() => {\n        toast({\n          title: "Scheduled: Catch up",\n          description: "Friday, February 10, 2026 at 5:57 PM",\n        });\n      }}\n    >\n      Show Toast\n    </Button>\n  );\n}`;
    case "tooltip":
      return `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="outline">Hover me</Button>\n  </TooltipTrigger>\n  <TooltipContent>\n    <p>Add to library</p>\n  </TooltipContent>\n</Tooltip>`;
    case "tree-view":
      return `const data = [\n  {\n    id: "1",\n    label: "src",\n    children: [\n      { id: "2", label: "components" },\n      { id: "3", label: "App.tsx" },\n    ],\n  },\n];\n\n<TreeView data={data} />`;
    case "typography":
      return `<Typography variant="h1">The Joke Tax Chronicles</Typography>`;
    default: {
      const cleanTag = doc.name.replace(/\s+/g, "");
      return `<${cleanTag} />`;
    }
  }
}

function getCompositionSnippet(docId: string): string | null {
  switch (docId) {
    case "accordion":
      return `Accordion\n├── AccordionItem\n│   ├── AccordionTrigger\n│   └── AccordionContent\n└── AccordionItem\n    ├── AccordionTrigger\n    └── AccordionContent`;
    case "alert":
      return `Alert\n├── AlertTitle\n└── AlertDescription`;
    case "alert-dialog":
      return `AlertDialog\n├── AlertDialogTrigger\n└── AlertDialogContent\n    ├── AlertDialogHeader\n    │   ├── AlertDialogTitle\n    │   └── AlertDialogDescription\n    └── AlertDialogFooter\n        ├── AlertDialogCancel\n        └── AlertDialogAction`;
    case "attachment":
      return `Attachment\n└── AttachmentItem\n    ├── AttachmentIcon\n    ├── AttachmentInfo\n    │   ├── AttachmentName\n    │   └── AttachmentSize\n    └── AttachmentActions\n        └── AttachmentRemove`;
    case "avatar":
      return `Avatar\n├── AvatarImage\n└── AvatarFallback`;
    case "breadcrumb":
      return `Breadcrumb\n└── BreadcrumbList\n    ├── BreadcrumbItem\n    │   └── BreadcrumbLink\n    ├── BreadcrumbSeparator\n    └── BreadcrumbItem\n        └── BreadcrumbPage`;
    case "card":
      return `Card\n├── CardHeader\n│   ├── CardTitle\n│   └── CardDescription\n├── CardContent\n└── CardFooter`;
    case "collapsible":
      return `Collapsible\n├── CollapsibleTrigger\n└── CollapsibleContent`;
    case "combobox":
      return `Combobox\n├── ComboboxTrigger\n│   └── ComboboxInput\n└── ComboboxContent\n    ├── ComboboxList\n    │   └── ComboboxItem\n    └── ComboboxEmpty`;
    case "context-menu":
      return `ContextMenu\n├── ContextMenuTrigger\n└── ContextMenuContent\n    └── ContextMenuItem`;
    case "dialog":
      return `Dialog\n├── DialogTrigger\n└── DialogContent\n    ├── DialogHeader\n    │   ├── DialogTitle\n    │   └── DialogDescription\n    └── DialogFooter`;
    case "drawer":
      return `Drawer\n├── DrawerTrigger\n└── DrawerContent\n    ├── DrawerHeader\n    │   ├── DrawerTitle\n    │   └── DrawerDescription\n    └── DrawerFooter\n        └── DrawerClose`;
    case "dropdown":
      return `Dropdown\n├── DropdownTrigger\n└── DropdownContent\n    ├── DropdownLabel\n    ├── DropdownSeparator\n    └── DropdownItem`;
    case "hover-card":
      return `HoverCard\n├── HoverCardTrigger\n└── HoverCardContent`;
    case "menubar":
      return `Menubar\n└── MenubarMenu\n    ├── MenubarTrigger\n    └── MenubarContent\n        ├── MenubarItem\n        └── MenubarSeparator`;
    case "navigation-menu":
      return `NavigationMenu\n└── NavigationMenuList\n    └── NavigationMenuItem\n        ├── NavigationMenuTrigger\n        └── NavigationMenuContent`;
    case "pagination":
      return `Pagination\n└── PaginationContent\n    ├── PaginationItem (PaginationPrevious)\n    ├── PaginationItem (PaginationLink)\n    ├── PaginationItem (PaginationEllipsis)\n    └── PaginationItem (PaginationNext)`;
    case "popover":
      return `Popover\n├── PopoverTrigger\n└── PopoverContent`;
    case "radio-group":
      return `RadioGroup\n└── RadioGroupItem`;
    case "select":
      return `Select\n├── SelectTrigger\n│   └── SelectValue\n└── SelectContent\n    └── SelectGroup\n        ├── SelectLabel\n        └── SelectItem`;
    case "stepper":
      return `Stepper\n└── StepperItem`;
    case "tabs":
      return `Tabs\n├── TabsList\n│   ├── TabsTrigger\n│   └── TabsTrigger\n├── TabsContent\n└── TabsContent`;
    case "timeline":
      return `Timeline\n└── TimelineItem`;
    case "tooltip":
      return `Tooltip\n├── TooltipTrigger\n└── TooltipContent`;
    default:
      return null;
  }
}

import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { GitHubIcon } from "../components/brand-icons";

export const ComponentPage: React.FC<ComponentPageProps> = ({
  doc,
  onNavigate,
}) => {
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [pageCopied, setPageCopied] = useState(false);

  // Find previous and next components in registry
  const { prevComp, nextComp } = useMemo(() => {
    const idx = COMPONENT_DOCS.findIndex((c) => c.id === doc.id);
    return {
      prevComp: idx > 0 ? COMPONENT_DOCS[idx - 1] : null,
      nextComp:
        idx < COMPONENT_DOCS.length - 1 ? COMPONENT_DOCS[idx + 1] : null,
    };
  }, [doc.id]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate full markdown for "Copy Page"
  const handleCopyPage = async () => {
    const md = `# ${doc.name}

${doc.description}

## Installation

\`\`\`bash
npx @soraui/cli add ${doc.id}
\`\`\`

## Usage

\`\`\`tsx
import { ${doc.name} } from '@soraui/react';

${getMinimalUsageSnippet(doc)}
\`\`\`

## API Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
${doc.props.map((p) => `| ${p.name} | \`${p.type}\` | \`${p.default || "-"}\` | ${p.description} |`).join("\n")}
`;

    try {
      await navigator.clipboard.writeText(md);
      setPageCopied(true);
      setTimeout(() => setPageCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const cliCommands = {
    pnpm: `pnpm dlx @soraui/cli add ${doc.id}`,
    npm: `npx @soraui/cli add ${doc.id}`,
    yarn: `yarn dlx @soraui/cli add ${doc.id}`,
    bun: `bunx @soraui/cli add ${doc.id}`,
  };

  const pkgInstallCommands = {
    pnpm: `pnpm add @soraui/react`,
    npm: `npm install @soraui/react`,
    yarn: `yarn add @soraui/react`,
    bun: `bun add @soraui/react`,
  };

  const manualSourceCode = getManualComponentCode(doc.id, doc.name);
  const minimalUsage = getMinimalUsageSnippet(doc);

  return (
    <div className="docs-page sora-shadcn-page">
      {/* ─── 1. HEADER ─── */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">{doc.name}</h1>

          {/* Quick Header Actions */}
          <div className="docs-intro-actions">
            {/* Source Link */}
            <a
              href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/components/${doc.id}`}
              target="_blank"
              rel="noreferrer"
              className="docs-intro-copy-btn"
              title="View component source on GitHub"
            >
              <GitHubIcon size={13} />
              <span>Source</span>
              <ExternalLink size={11} style={{ opacity: 0.6 }} />
            </a>

            {/* Copy Page Button */}
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy full page markdown"
              aria-label="Copy Page Markdown"
            >
              {pageCopied ? (
                <>
                  <Check size={13} style={{ color: "#22c55e" }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            {/* Quick Prev / Next jump buttons */}
            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() =>
                  prevComp && handleNav(`/docs/components/base/${prevComp.id}`)
                }
                disabled={!prevComp}
                title={
                  prevComp
                    ? `Previous: ${prevComp.name}`
                    : "No previous component"
                }
                aria-label="Previous component"
                style={
                  !prevComp
                    ? { opacity: 0.35, cursor: "not-allowed" }
                    : undefined
                }
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() =>
                  nextComp && handleNav(`/docs/components/base/${nextComp.id}`)
                }
                disabled={!nextComp}
                title={
                  nextComp ? `Next: ${nextComp.name}` : "No next component"
                }
                aria-label="Next component"
                style={
                  !nextComp
                    ? { opacity: 0.35, cursor: "not-allowed" }
                    : undefined
                }
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="sora-doc-lead">{doc.description}</p>
      </div>

      {/* ─── 2. MAIN HERO PREVIEW ─── */}
      {doc.examples[0] && (
        <div className="sora-hero-preview-section">
          <ComponentPreview code={doc.examples[0].code}>
            {doc.examples[0].render()}
          </ComponentPreview>
        </div>
      )}

      {/* Context Alert / Callout */}
      <div className="sora-doc-callout">
        <div className="sora-doc-callout-icon">
          <Info size={16} />
        </div>
        <div className="sora-doc-callout-content">
          {doc.id === "label" ? (
            <p>
              For form fields, use the <code>&lt;Label htmlFor="..."&gt;</code>{" "}
              component paired with form controls like <code>Input</code> or{" "}
              <code>Checkbox</code> for built-in label click-to-focus and screen
              reader accessibility.
            </p>
          ) : (
            <p>
              This component is part of SoraUI design system with zero runtime
              CSS dependencies and full theme customization support.
            </p>
          )}
        </div>
      </div>

      {/* ─── 3. INSTALLATION ─── */}
      <section className="sora-doc-section">
        <h2 id="installation" className="sora-doc-h2">
          <span>Installation</span>
          <a
            href="#installation"
            className="sora-doc-anchor"
            aria-label="Link to Installation section"
          >
            #
          </a>
        </h2>

        {/* Segmented Tab: CLI / Manual */}
        <div className="sora-tabs-container">
          <div className="sora-segmented-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={installTab === "cli"}
              className={`sora-segmented-tab${installTab === "cli" ? " active" : ""}`}
              onClick={() => setInstallTab("cli")}
            >
              <Terminal
                size={13}
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "0.35rem",
                }}
              />
              <span>CLI</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={installTab === "manual"}
              className={`sora-segmented-tab${installTab === "manual" ? " active" : ""}`}
              onClick={() => setInstallTab("manual")}
            >
              <FileCode2
                size={13}
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "0.35rem",
                }}
              />
              <span>Manual</span>
            </button>
          </div>
        </div>

        {/* CLI Tab Content */}
        {installTab === "cli" ? (
          <div className="sora-tab-content">
            <p className="sora-subtext">Install dependencies:</p>
            <PackageManagerBlock
              commands={cliCommands}
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        ) : (
          /* Manual Tab Content */
          <div className="sora-tab-content">
            <div className="sora-step-list">
              <div className="sora-step-item">
                <span className="sora-step-num">1</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">
                    Install the following dependencies:
                  </p>
                  <PackageManagerBlock
                    commands={pkgInstallCommands}
                    style={{ marginTop: "0.5rem" }}
                  />
                </div>
              </div>

              <div className="sora-step-item">
                <span className="sora-step-num">2</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">
                    Copy and paste the following code into your project:
                  </p>
                  <CodeBlock
                    code={manualSourceCode}
                    language="typescript"
                    filename={`components/ui/${doc.id}.tsx`}
                    expandable
                    style={{ marginTop: "0.5rem" }}
                  />
                </div>
              </div>

              <div className="sora-step-item">
                <span className="sora-step-num">3</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">
                    Update the import paths to match your project setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── 4. USAGE ─── */}
      <section className="sora-doc-section">
        <h2 id="usage" className="sora-doc-h2">
          <span>Usage</span>
          <a
            href="#usage"
            className="sora-doc-anchor"
            aria-label="Link to Usage section"
          >
            #
          </a>
        </h2>

        <div className="sora-usage-steps">
          <div className="sora-usage-step">
            <p className="sora-usage-step-title">
              <span className="sora-step-num">1</span>
              <span>Import the component and its sub-components</span>
            </p>
            <CodeBlock code={getImportSnippet(doc)} language="typescript" />
          </div>
          <div className="sora-usage-step">
            <p className="sora-usage-step-title">
              <span className="sora-step-num">2</span>
              <span>Use the component in your JSX template</span>
            </p>
            <CodeBlock code={minimalUsage} language="tsx" />
          </div>
        </div>
      </section>

      {/* ─── 4.5. COMPOSITION ─── */}
      {getCompositionSnippet(doc.id) && (
        <section className="sora-doc-section">
          <h2 id="composition" className="sora-doc-h2">
            <span>Composition</span>
            <a
              href="#composition"
              className="sora-doc-anchor"
              aria-label="Link to Composition section"
            >
              #
            </a>
          </h2>
          <p className="sora-subtext">
            Use the following composition to build a {doc.name}:
          </p>
          <div style={{ marginTop: "0.75rem" }}>
            <CodeBlock
              code={getCompositionSnippet(doc.id)!}
              language="text"
            />
          </div>
        </section>
      )}

      {/* ─── 5. EXAMPLES & VARIATIONS ─── */}
      {doc.examples.length > 0 && (
        <section className="sora-doc-section">
          <div style={{ display: "grid", gap: "2.5rem" }}>
            {doc.examples.map((ex, index) => {
              const exampleSlug = ex.id || `example-${index}`;
              return (
                <div key={ex.id || index} className="sora-example-block">
                  <h2 id={exampleSlug} className="sora-doc-h2">
                    <span>{ex.title}</span>
                    <a
                      href={`#${exampleSlug}`}
                      className="sora-doc-anchor"
                      aria-label={`Link to ${ex.title}`}
                    >
                      #
                    </a>
                  </h2>
                  {ex.description && (
                    <p className="sora-subtext">{ex.description}</p>
                  )}
                  <ComponentPreview code={ex.code}>
                    {ex.render()}
                  </ComponentPreview>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── 6. API REFERENCE / PROPS ─── */}
      <section className="sora-doc-section">
        <h2 id="api-reference" className="sora-doc-h2">
          <span>API Reference</span>
          <a
            href="#api-reference"
            className="sora-doc-anchor"
            aria-label="Link to API Reference section"
          >
            #
          </a>
        </h2>

        <PropTable props={doc.props} />

        {/* Theming Tokens */}
        {doc.themingTokens && doc.themingTokens.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3 id="theming-tokens" className="sora-doc-h3">
              <span>CSS Variables &amp; Tokens</span>
              <a
                href="#theming-tokens"
                className="sora-doc-anchor"
                aria-label="Link to CSS Variables section"
              >
                #
              </a>
            </h3>
            <p className="sora-subtext">
              The following CSS custom properties control the appearance of this
              component:
            </p>
            <div className="sora-tokens-list">
              {doc.themingTokens.map((token) => (
                <code key={token} className="sora-token-item">
                  {token}
                </code>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
