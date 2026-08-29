import React from "react";
import type { ComponentDoc } from "./types";

// SoraUI Primitives
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
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  Toast,
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
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Stepper,
  StepperItem,
  CommandPalette,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  Progress,
  Avatar,
  AvatarFallback,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Timeline,
  TimelineItem,
  Statistic,
  TreeView,
  Alert,
  AlertTitle,
  AlertDescription,
  AspectRatio,
  Attachment,
  AttachmentItem,
  AttachmentIcon,
  AttachmentPreview,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  AttachmentProgress,
  AttachmentActions,
  AttachmentRemove,
} from "@soraui/react";
import {
  Terminal,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  Archive,
  Code,
} from "lucide-react";



export const COMPONENT_DOCS: ComponentDoc[] = [
  {
    id: "button",
    name: "Button",
    category: "General",
    level: 1,
    description:
      "Interactive button with multiple variants, sizes, loading spinners, and full focus rings.",
    dependencies: [],
    tags: ["button", "action", "cta", "click", "submit"],
    status: "stable",
    props: [
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'",
        default: "'primary'",
        description: "Visual style variant",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'icon'",
        default: "'md'",
        description: "Button size",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "Displays an animated spinner and disables clicks",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables button interactions",
      },
    ],
    accessibility: {
      role: "button",
      keyboard: [
        { key: "Enter / Space", action: "Triggers click event" },
        { key: "Tab", action: "Focuses next element" },
      ],
    },
    themingTokens: [
      "--ui-primary",
      "--ui-primary-foreground",
      "--ui-secondary",
      "--ui-radius",
    ],
    examples: [
      {
        id: "variants",
        title: "Variants",
        code: `<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>`,
        render: () => (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        ),
      },
      {
        id: "sizes",
        title: "Sizes & States",
        code: `<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button loading>Loading</Button>
  <Button disabled>Disabled</Button>
</div>`,
        render: () => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        ),
      },
    ],
  },
  {
    id: "input",
    name: "Input",
    category: "Forms",
    level: 1,
    description:
      "Accessible text field with error states, multiple sizes, and clean focus transitions.",
    dependencies: [],
    tags: ["input", "text", "form", "field", "textbox"],
    status: "stable",
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: "Input height size",
      },
      {
        name: "error",
        type: "boolean",
        default: "false",
        description: "Sets destructive red border and aria-invalid",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables user input",
      },
    ],
    themingTokens: [
      "--ui-input",
      "--ui-ring",
      "--ui-destructive",
      "--ui-radius",
    ],
    examples: [
      {
        id: "basic",
        title: "Input States",
        code: `<div style={{ display: 'grid', gap: '0.75rem', maxWidth: '320px' }}>
  <Input placeholder="Default input..." />
  <Input error placeholder="Error state..." />
  <Input disabled placeholder="Disabled input..." />
</div>`,
        render: () => (
          <div style={{ display: "grid", gap: "0.75rem", maxWidth: "320px" }}>
            <Input placeholder="Default input..." />
            <Input error placeholder="Error state..." />
            <Input disabled placeholder="Disabled input..." />
          </div>
        ),
      },
    ],
  },
  {
    id: "label",
    name: "Label",
    category: "Forms",
    level: 1,
    description:
      "Renders an accessible label associated with form controls, supporting required asterisks and disabled states.",
    dependencies: [],
    tags: ["label", "form", "text", "caption", "field"],
    status: "stable",
    props: [
      {
        name: "htmlFor",
        type: "string",
        description: "ID of target form input control",
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Displays red asterisk indicator",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Dims label opacity when control is disabled",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS class names",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Label text or nested elements",
      },
    ],
    accessibility: {
      role: "label",
      aria: [
        {
          attribute: "htmlFor",
          usage:
            "Binds label to form element ID for click-to-focus and screen readers",
        },
        {
          attribute: 'aria-hidden="true"',
          usage:
            "Hides the decorative asterisk indicator from assistive technology",
        },
      ],
      keyboard: [
        {
          key: "Click",
          action: "Transfers focus directly to the associated form control",
        },
      ],
    },
    themingTokens: [
      "--ui-foreground",
      "--ui-muted-foreground",
      "--ui-destructive",
    ],
    examples: [
      {
        id: "with-input",
        title: "Label in Field",
        description:
          "Pairing Label with an Input field using htmlFor for seamless click-to-focus.",
        code: `<div style={{ display: 'grid', gap: '0.375rem', maxWidth: '340px' }}>
  <Label htmlFor="work-email" required>Work Email</Label>
  <Input id="work-email" type="email" placeholder="name@company.com" />
</div>`,
        render: () => (
          <div
            style={{
              display: "grid",
              gap: "0.375rem",
              maxWidth: "340px",
              width: "100%",
            }}
          >
            <Label htmlFor="work-email" required>
              Work Email
            </Label>
            <Input
              id="work-email"
              type="email"
              placeholder="name@company.com"
            />
          </div>
        ),
      },
      {
        id: "with-checkbox",
        title: "With Checkbox",
        description:
          "Associate a Label with a Checkbox control. Clicking the label toggles the checkbox.",
        code: `<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms" style={{ cursor: 'pointer' }}>
    Accept terms and conditions
  </Label>
</div>`,
        render: () => (
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <Checkbox id="terms" defaultChecked />
            <Label
              htmlFor="terms"
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Accept terms and conditions
            </Label>
          </div>
        ),
      },
      {
        id: "states",
        title: "Required & Disabled States",
        description:
          "Demonstrating normal, required asterisk, and disabled label styling.",
        code: `<div style={{ display: 'grid', gap: '1rem', maxWidth: '340px' }}>
  <div style={{ display: 'grid', gap: '0.375rem' }}>
    <Label htmlFor="field-opt">Full Name (Optional)</Label>
    <Input id="field-opt" placeholder="John Doe" />
  </div>
  <div style={{ display: 'grid', gap: '0.375rem' }}>
    <Label htmlFor="field-req" required>Email Address</Label>
    <Input id="field-req" placeholder="john@example.com" />
  </div>
  <div style={{ display: 'grid', gap: '0.375rem' }}>
    <Label htmlFor="field-dis" disabled>Organization (Read Only)</Label>
    <Input id="field-dis" disabled value="Acme Corporation" />
  </div>
</div>`,
        render: () => (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              maxWidth: "340px",
              width: "100%",
            }}
          >
            <div style={{ display: "grid", gap: "0.375rem" }}>
              <Label htmlFor="field-opt">Full Name (Optional)</Label>
              <Input id="field-opt" placeholder="John Doe" />
            </div>
            <div style={{ display: "grid", gap: "0.375rem" }}>
              <Label htmlFor="field-req" required>
                Email Address
              </Label>
              <Input id="field-req" placeholder="john@example.com" />
            </div>
            <div style={{ display: "grid", gap: "0.375rem" }}>
              <Label htmlFor="field-dis" disabled>
                Organization (Read Only)
              </Label>
              <Input id="field-dis" disabled value="Acme Corporation" />
            </div>
          </div>
        ),
      },
      {
        id: "payment-card",
        title: "Payment Method & Billing Example",
        description:
          "A realistic card form layout demonstrating multiple grouped form controls with accessible labels.",
        code: `<Card elevated style={{ maxWidth: '420px', width: '100%' }}>
  <CardHeader>
    <CardTitle>Payment Method</CardTitle>
    <CardDescription>All transactions are secure and encrypted.</CardDescription>
  </CardHeader>
  <CardContent style={{ display: 'grid', gap: '1rem' }}>
    <div style={{ display: 'grid', gap: '0.375rem' }}>
      <Label htmlFor="card-num" required>Card Number</Label>
      <Input id="card-num" placeholder="1234 5678 9012 3456" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
      <div style={{ display: 'grid', gap: '0.375rem' }}>
        <Label htmlFor="card-exp" required>Expires</Label>
        <Input id="card-exp" placeholder="MM/YY" />
      </div>
      <div style={{ display: 'grid', gap: '0.375rem' }}>
        <Label htmlFor="card-cvc" required>CVC</Label>
        <Input id="card-cvc" placeholder="123" />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
      <Checkbox id="save-card" defaultChecked />
      <Label htmlFor="save-card" style={{ cursor: 'pointer', fontSize: '0.8125rem' }}>
        Save card for future billing
      </Label>
    </div>
  </CardContent>
  <CardFooter style={{ justifyContent: 'flex-end', gap: '0.5rem' }}>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="primary" size="sm">Submit Payment</Button>
  </CardFooter>
</Card>`,
        render: () => (
          <Card elevated style={{ maxWidth: "420px", width: "100%" }}>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                All transactions are secure and encrypted.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "grid", gap: "0.375rem" }}>
                <Label htmlFor="card-num" required>
                  Card Number
                </Label>
                <Input id="card-num" placeholder="1234 5678 9012 3456" />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                <div style={{ display: "grid", gap: "0.375rem" }}>
                  <Label htmlFor="card-exp" required>
                    Expires
                  </Label>
                  <Input id="card-exp" placeholder="MM/YY" />
                </div>
                <div style={{ display: "grid", gap: "0.375rem" }}>
                  <Label htmlFor="card-cvc" required>
                    CVC
                  </Label>
                  <Input id="card-cvc" placeholder="123" />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.25rem",
                }}
              >
                <Checkbox id="save-card" defaultChecked />
                <Label
                  htmlFor="save-card"
                  style={{
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    userSelect: "none",
                  }}
                >
                  Save card for future billing
                </Label>
              </div>
            </CardContent>
            <CardFooter style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Submit Payment
              </Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    level: 1,
    description:
      "Composable card container with header, title, description, content, and footer.",
    dependencies: [],
    tags: ["card", "container", "panel", "box"],
    status: "stable",
    props: [
      {
        name: "elevated",
        type: "boolean",
        default: "false",
        description: "Adds subtle shadow and primary border glow",
      },
    ],
    themingTokens: [
      "--ui-card",
      "--ui-card-foreground",
      "--ui-border",
      "--ui-radius",
    ],
    examples: [
      {
        id: "basic",
        title: "Card Preview",
        code: `<Card elevated style={{ maxWidth: '380px' }}>
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>Configure deployment preferences.</CardDescription>
  </CardHeader>
  <CardContent>
    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground)' }}>Your build pipeline is currently active.</p>
  </CardContent>
  <CardFooter style={{ justifyContent: 'flex-end', gap: '0.5rem' }}>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="primary" size="sm">Deploy</Button>
  </CardFooter>
</Card>`,
        render: () => (
          <Card elevated style={{ maxWidth: "380px" }}>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>
                Configure deployment preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                Your build pipeline is currently active.
              </p>
            </CardContent>
            <CardFooter style={{ justifyContent: "flex-end", gap: "0.5rem" }}>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Deploy
              </Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "General",
    level: 1,
    description: "Status indicator pill badge with semantic color variants.",
    dependencies: [],
    tags: ["badge", "pill", "tag", "status", "chip"],
    status: "stable",
    props: [
      {
        name: "variant",
        type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'",
        default: "'default'",
        description: "Color style",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Badge Variants",
        code: `<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
  <Badge variant="default">Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="destructive">Destructive</Badge>
</div>`,
        render: () => (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        ),
      },
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Forms",
    level: 1,
    description: "Multi-line text input with custom resize and error states.",
    dependencies: [],
    tags: ["textarea", "multiline", "input", "notes"],
    status: "stable",
    props: [
      {
        name: "error",
        type: "boolean",
        default: "false",
        description: "Error outline state",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables editing",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Textarea Preview",
        code: `<Textarea placeholder="Enter your detailed feedback..." style={{ maxWidth: '400px' }} />`,
        render: () => (
          <Textarea
            placeholder="Enter your detailed feedback..."
            style={{ maxWidth: "400px" }}
          />
        ),
      },
    ],
  },
  {
    id: "separator",
    name: "Separator",
    category: "Layout",
    level: 1,
    description:
      "Visual horizontal or vertical divider, semantic or decorative.",
    dependencies: [],
    tags: ["separator", "divider", "line", "hr"],
    status: "stable",
    props: [
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "Divider direction",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "true",
        description: "Whether divider is purely visual",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Horizontal and Vertical Separators",
        code: `<div>
  <div style={{ padding: '0.5rem 0' }}>Section Top</div>
  <Separator />
  <div style={{ display: 'flex', alignItems: 'center', height: '24px', gap: '0.5rem', marginTop: '0.5rem' }}>
    <span>Left</span>
    <Separator orientation="vertical" />
    <span>Right</span>
  </div>
</div>`,
        render: () => (
          <div>
            <div style={{ padding: "0.5rem 0" }}>Section Top</div>
            <Separator />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "24px",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Right</span>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    level: 1,
    description:
      "Loading placeholder with smooth shimmer animation, respecting reduced motion.",
    dependencies: [],
    tags: ["skeleton", "loading", "placeholder", "shimmer"],
    status: "stable",
    props: [
      {
        name: "variant",
        type: "'text' | 'circular' | 'rectangular'",
        default: "'text'",
        description: "Shape variant",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Card Skeleton Loading",
        code: `<div style={{ display: 'flex', gap: '1rem', alignItems: 'center', maxWidth: '360px' }}>
  <Skeleton variant="circular" style={{ width: '48px', height: '48px' }} />
  <div style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
    <Skeleton style={{ height: '16px', width: '80%' }} />
    <Skeleton style={{ height: '12px', width: '50%' }} />
  </div>
</div>`,
        render: () => (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              maxWidth: "360px",
            }}
          >
            <Skeleton circle style={{ width: "48px", height: "48px" }} />
            <div style={{ flex: 1, display: "grid", gap: "0.5rem" }}>
              <Skeleton style={{ height: "16px", width: "80%" }} />
              <Skeleton style={{ height: "12px", width: "50%" }} />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "typography",
    name: "Typography",
    category: "General",
    level: 1,
    description:
      "Polymorphic typography component with 10 heading, body, lead, code, and caption variants.",
    dependencies: [],
    tags: ["typography", "heading", "text", "h1", "p"],
    status: "stable",
    props: [
      {
        name: "variant",
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'lead' | 'muted' | 'code' | 'caption'",
        default: "'body'",
        description: "Type scale",
      },
      { name: "as", type: "ElementType", description: "HTML tag override" },
    ],
    examples: [
      {
        id: "basic",
        title: "Typography Variants",
        code: `<div style={{ display: 'grid', gap: '0.5rem' }}>
  <Typography variant="h2">Heading 2 Title</Typography>
  <Typography variant="lead">Lead paragraph describing feature details.</Typography>
  <Typography variant="body">Regular body typography using system font tokens.</Typography>
  <Typography variant="code">pnpm add @soraui/react</Typography>
</div>`,
        render: () => (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <Typography variant="h2">Heading 2 Title</Typography>
            <Typography variant="lead">
              Lead paragraph describing feature details.
            </Typography>
            <Typography variant="body">
              Regular body typography using system font tokens.
            </Typography>
            <Typography variant="code">pnpm add @soraui/react</Typography>
          </div>
        ),
      },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    level: 2,
    description:
      "Floating tooltip popup displayed on hover or keyboard focus with placement collision detection.",
    dependencies: ["@soraui/hooks"],
    tags: ["tooltip", "hint", "hover", "popover"],
    status: "stable",
    props: [
      {
        name: "content",
        type: "ReactNode",
        description: "Tooltip message",
        required: true,
      },
      {
        name: "placement",
        type: "Placement",
        default: "'top'",
        description: "Preferred direction",
      },
    ],
    accessibility: {
      role: "tooltip",
      keyboard: [{ key: "Escape", action: "Dismisses open tooltip" }],
      aria: [
        {
          attribute: "aria-describedby",
          usage: "Associates trigger with tooltip ID",
        },
      ],
    },
    examples: [
      {
        id: "basic",
        title: "Tooltip on Button",
        code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover or Focus Me</Button>
  </TooltipTrigger>
  <TooltipContent>
    Copy project API key to clipboard
  </TooltipContent>
</Tooltip>`,
        render: () => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover or Focus Me</Button>
            </TooltipTrigger>
            <TooltipContent>Copy project API key to clipboard</TooltipContent>
          </Tooltip>
        ),
      },
    ],
  },
  {
    id: "popover",
    name: "Popover",
    category: "Overlays",
    level: 2,
    description:
      "Floating overlay panel anchored to a trigger with click toggle, outside dismiss, and Escape closing.",
    dependencies: ["@soraui/hooks"],
    tags: ["popover", "popup", "floating", "menu"],
    status: "stable",
    props: [
      {
        name: "placement",
        type: "Placement",
        default: "'bottom'",
        description: "Position relative to trigger",
      },
    ],
    accessibility: {
      role: "dialog",
      keyboard: [
        {
          key: "Escape",
          action: "Closes popover and returns focus to trigger",
        },
      ],
    },
    examples: [
      {
        id: "basic",
        title: "Popover Panel",
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent style={{ padding: '1rem', width: '260px' }}>
    <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Dimensions</h4>
    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground)' }}>Configure custom width and height variables.</p>
  </PopoverContent>
</Popover>`,
        render: () => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent style={{ padding: "1rem", width: "260px" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>
                Dimensions
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                Configure custom width and height variables.
              </p>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    level: 2,
    description:
      "Tabbed content navigation with roving tabindex keyboard navigation and aria-selected states.",
    dependencies: [],
    tags: ["tabs", "navigation", "tablist", "panel"],
    status: "stable",
    props: [
      {
        name: "defaultValue",
        type: "string",
        description: "Initial active tab value",
        required: true,
      },
    ],
    accessibility: {
      role: "tablist / tab / tabpanel",
      keyboard: [{ key: "Arrow Left / Right", action: "Cycles between tabs" }],
    },
    examples: [
      {
        id: "basic",
        title: "Tabs Navigation",
        code: `<Tabs defaultValue="account" style={{ maxWidth: '400px' }}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account" style={{ padding: '1rem 0' }}>
    <p style={{ margin: 0, fontSize: '0.875rem' }}>Update your account details here.</p>
  </TabsContent>
  <TabsContent value="password" style={{ padding: '1rem 0' }}>
    <p style={{ margin: 0, fontSize: '0.875rem' }}>Change your secret password here.</p>
  </TabsContent>
</Tabs>`,
        render: () => (
          <Tabs defaultValue="account" style={{ maxWidth: "400px" }}>
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" style={{ padding: "1rem 0" }}>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>
                Update your account details here.
              </p>
            </TabsContent>
            <TabsContent value="password" style={{ padding: "1rem 0" }}>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>
                Change your secret password here.
              </p>
            </TabsContent>
          </Tabs>
        ),
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Navigation",
    level: 2,
    description:
      "Collapsible content panels with single and multiple expansion modes.",
    dependencies: [],
    tags: ["accordion", "collapsible", "collapse", "faq"],
    status: "stable",
    props: [
      {
        name: "type",
        type: "'single' | 'multiple'",
        default: "'single'",
        description: "Accordion mode",
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "false",
        description: "Whether active item can be collapsed (only in single mode)",
      },
      {
        name: "value",
        type: "string | string[]",
        description: "Controlled value of the active item(s)",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "Default active item(s) on initial render",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables interaction (used on AccordionItem)",
      },
    ],
    accessibility: {
      role: "region",
      keyboard: [
        { key: "Tab", action: "Moves focus to the next focusable element (skips closed items)" },
        { key: "Enter / Space", action: "Toggles the focused accordion trigger" },
        { key: "Arrow Down", action: "Moves focus to the next trigger" },
        { key: "Arrow Up", action: "Moves focus to the previous trigger" },
        { key: "Home / End", action: "Moves focus to the first or last trigger" },
      ]
    },
    examples: [
      {
        id: "basic",
        title: "Basic",
        description:
          "A basic accordion that shows one item at a time. The first item is open by default.",
        code: `<Accordion type="single" collapsible defaultValue="item-1" style={{ maxWidth: '480px', width: '100%' }}>
  <AccordionItem value="item-1">
    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
    <AccordionContent>
      Click on 'Forgot Password' on the login page, enter your email address,
      and we'll send you a link to reset your password. The link will expire in 24 hours.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
    <AccordionContent>
      Yes, you can upgrade or downgrade your plan at any time from your account settings.
      Changes take effect immediately.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
    <AccordionContent>
      We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        render: () => (
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            style={{ maxWidth: "480px", width: "100%" }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                Click on 'Forgot Password' on the login page, enter your email address,
                and we'll send you a link to reset your password. The link will expire in 24 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upgrade or downgrade your plan at any time from your account settings.
                Changes take effect immediately.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        id: "multiple",
        title: "Multiple",
        description:
          "Use the multiple prop to allow multiple items to be open at the same time.",
        code: `<Accordion type="multiple" defaultValue={["item-1"]} style={{ maxWidth: '480px', width: '100%' }}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Notification Settings</AccordionTrigger>
    <AccordionContent>
      Manage how you receive notifications. You can enable email alerts for updates
      or push notifications for mobile devices.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Privacy & Security</AccordionTrigger>
    <AccordionContent>
      Control your profile visibility, manage two-factor authentication, and
      review recent account activity.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Billing & Subscription</AccordionTrigger>
    <AccordionContent>
      View your invoices, update payment methods, and manage your current subscription plan.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        render: () => (
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            style={{ maxWidth: "480px", width: "100%" }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Notification Settings</AccordionTrigger>
              <AccordionContent>
                Manage how you receive notifications. You can enable email alerts for updates
                or push notifications for mobile devices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Privacy & Security</AccordionTrigger>
              <AccordionContent>
                Control your profile visibility, manage two-factor authentication, and
                review recent account activity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Billing & Subscription</AccordionTrigger>
              <AccordionContent>
                View your invoices, update payment methods, and manage your current subscription plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        id: "disabled",
        title: "Disabled",
        description:
          "Use the disabled prop on AccordionItem to disable individual items.",
        code: `<Accordion type="single" collapsible defaultValue="item-1" style={{ maxWidth: '480px', width: '100%' }}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I access my account history?</AccordionTrigger>
    <AccordionContent>
      Yes, your complete transaction and activity history is stored permanently
      and can be exported at any time.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Can I transfer my account ownership?</AccordionTrigger>
    <AccordionContent>
      Account ownership transfer is currently restricted. Please contact our support team for assistance.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How do I delete my account?</AccordionTrigger>
    <AccordionContent>
      You can request account deletion from your security settings. All personal
      data will be permanently removed after 30 days.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        render: () => (
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            style={{ maxWidth: "480px", width: "100%" }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I access my account history?</AccordionTrigger>
              <AccordionContent>
                Yes, your complete transaction and activity history is stored permanently
                and can be exported at any time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" disabled>
              <AccordionTrigger>Can I transfer my account ownership?</AccordionTrigger>
              <AccordionContent>
                Account ownership transfer is currently restricted. Please contact our support team for assistance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I delete my account?</AccordionTrigger>
              <AccordionContent>
                You can request account deletion from your security settings. All personal
                data will be permanently removed after 30 days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        id: "borders",
        title: "Borders",
        description:
          "Add border to the Accordion and border-b last:border-b-0 to the AccordionItem to add borders to the items.",
        code: `<Accordion
  type="single"
  collapsible
  defaultValue="item-1"
  style={{
    maxWidth: '480px',
    width: '100%',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radius, 8px)',
    padding: '0 1rem'
  }}
>
  <AccordionItem value="item-1">
    <AccordionTrigger>How does billing work?</AccordionTrigger>
    <AccordionContent>
      We offer monthly and annual subscription plans. Billing is charged at the beginning
      of each cycle, and you can cancel anytime. All plans include automatic backups,
      24/7 support, and unlimited team members.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is my data secure?</AccordionTrigger>
    <AccordionContent>
      Yes, all data is encrypted at rest using AES-256 and in transit using TLS 1.3.
      We perform regular security audits and maintain SOC 2 compliance.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3" style={{ borderBottom: 'none' }}>
    <AccordionTrigger>What integrations do you support?</AccordionTrigger>
    <AccordionContent>
      We integrate with Slack, GitHub, Jira, Discord, and over 50 other developer
      and productivity tools via webhooks.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        render: () => (
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            style={{
              maxWidth: "480px",
              width: "100%",
              border: "1px solid var(--ui-border)",
              borderRadius: "var(--ui-radius, 8px)",
              padding: "0 1rem",
            }}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How does billing work?</AccordionTrigger>
              <AccordionContent>
                We offer monthly and annual subscription plans. Billing is charged at the beginning
                of each cycle, and you can cancel anytime. All plans include automatic backups,
                24/7 support, and unlimited team members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Yes, all data is encrypted at rest using AES-256 and in transit using TLS 1.3.
                We perform regular security audits and maintain SOC 2 compliance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" style={{ borderBottom: "none" }}>
              <AccordionTrigger>What integrations do you support?</AccordionTrigger>
              <AccordionContent>
                We integrate with Slack, GitHub, Jira, Discord, and over 50 other developer
                and productivity tools via webhooks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
      {
        id: "card",
        title: "Card",
        description: "Wrap the Accordion in a Card component.",
        code: `<Card elevated style={{ maxWidth: '480px', width: '100%' }}>
  <CardHeader>
    <CardTitle>Subscription & Billing</CardTitle>
    <CardDescription>
      Common questions about your account, plans, payments and cancellations.
    </CardDescription>
  </CardHeader>
  <CardContent style={{ padding: '0 1.25rem 0.5rem' }}>
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What happens when my trial ends?</AccordionTrigger>
        <AccordionContent>
          At the end of your 14-day trial, you will be automatically switched to the free plan
          unless you choose to upgrade to Pro.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" style={{ borderBottom: 'none' }}>
        <AccordionTrigger>Can I get a refund?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee for all annual subscription purchases.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </CardContent>
</Card>`,
        render: () => (
          <Card elevated style={{ maxWidth: "480px", width: "100%" }}>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>
                Common questions about your account, plans, payments and cancellations.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: "0 1.25rem 0.5rem" }}>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What happens when my trial ends?</AccordionTrigger>
                  <AccordionContent>
                    At the end of your 14-day trial, you will be automatically switched to the free plan
                    unless you choose to upgrade to Pro.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" style={{ borderBottom: "none" }}>
                  <AccordionTrigger>Can I get a refund?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day money-back guarantee for all annual subscription purchases.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ),
      },
    ],
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    level: 2,
    description:
      "Modal dialog with focus trap, backdrop blur, scroll locking, and Escape dismiss.",
    dependencies: ["@soraui/hooks"],
    tags: ["dialog", "modal", "overlay", "alertdialog"],
    status: "stable",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state" },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Open change callback",
      },
    ],
    accessibility: {
      role: "dialog",
      keyboard: [
        { key: "Escape", action: "Closes dialog" },
        { key: "Tab", action: "Cycles focus strictly within modal" },
      ],
      aria: [
        { attribute: "aria-modal", usage: "true" },
        { attribute: "aria-labelledby", usage: "Links to DialogTitle" },
      ],
    },
    examples: [
      {
        id: "basic",
        title: "Modal Dialog",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile info here.</DialogDescription>
    </DialogHeader>
    <div style={{ display: 'grid', gap: '0.75rem', padding: '1rem 0' }}>
      <Label htmlFor="dlg-name">Full Name</Label>
      <Input id="dlg-name" defaultValue="Ada Lovelace" />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button variant="primary">Save changes</Button>
    </div>
  </DialogContent>
</Dialog>`,
        render: () => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile info here.
                </DialogDescription>
              </DialogHeader>
              <div
                style={{ display: "grid", gap: "0.75rem", padding: "1rem 0" }}
              >
                <Label htmlFor="dlg-name">Full Name</Label>
                <Input id="dlg-name" defaultValue="Ada Lovelace" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <Button variant="primary">Save changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  },
  {
    id: "dropdown",
    name: "Dropdown",
    category: "Overlays",
    level: 2,
    description:
      "Contextual action menu with keyboard roving navigation and customizable item actions.",
    dependencies: ["@soraui/hooks"],
    tags: ["dropdown", "menu", "actions", "context"],
    status: "stable",
    props: [
      {
        name: "placement",
        type: "Placement",
        default: "'bottom-start'",
        description: "Menu direction",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Dropdown Menu",
        code: `<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">Options ▾</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit Record</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownItem destructive>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`,
        render: () => (
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">Options ▾</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Edit Record</DropdownItem>
              <DropdownItem>Duplicate</DropdownItem>
              <DropdownItem destructive>Delete</DropdownItem>
            </DropdownContent>
          </Dropdown>
        ),
      },
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    level: 2,
    description:
      "Displays a list of options for the user to pick from, triggered by a button, with full listbox keyboard navigation and option groups.",
    dependencies: ["@soraui/hooks"],
    tags: ["select", "listbox", "combobox", "options", "dropdown"],
    status: "stable",
    props: [
      {
        name: "defaultValue",
        type: "string",
        description: "The value of the select when initially rendered",
      },
      {
        name: "value",
        type: "string",
        description: "The controlled value of the select",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Event handler called when the value changes",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description:
          "When true, prevents the user from interacting with the select",
      },
      {
        name: "name",
        type: "string",
        description:
          "The name of the select field submitted with the enclosing form",
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description:
          "Select compound sub-components (SelectTrigger, SelectContent, etc.)",
      },
    ],
    accessibility: {
      role: "combobox (trigger) / listbox (popup) / option (item)",
      aria: [
        {
          attribute: "aria-expanded",
          usage: "Indicates whether the select popup listbox is currently open",
        },
        {
          attribute: 'aria-haspopup="listbox"',
          usage:
            "Tells assistive technology that clicking the trigger opens a list of selectable items",
        },
        {
          attribute: "aria-selected",
          usage: "Identifies the currently selected option in the listbox",
        },
        {
          attribute: "aria-controls",
          usage: "Links trigger to listbox content container ID",
        },
      ],
      keyboard: [
        {
          key: "Space / Enter",
          action: "Opens listbox or selects focused option",
        },
        {
          key: "Arrow Down / Up",
          action: "Cycles focus between selectable options",
        },
        {
          key: "Home / End",
          action: "Jumps directly to the first / last option in the list",
        },
        {
          key: "Escape",
          action:
            "Closes listbox popup and returns focus to the trigger button",
        },
      ],
    },
    themingTokens: [
      "--ui-background",
      "--ui-foreground",
      "--ui-popover",
      "--ui-popover-foreground",
      "--ui-primary",
      "--ui-border",
      "--ui-radius",
    ],
    examples: [
      {
        id: "basic",
        title: "Default Select",
        description:
          "A standard select dropdown with placeholder and checkmark indicators.",
        code: `<Select defaultValue="apple">
  <SelectTrigger style={{ maxWidth: '280px', width: '100%' }}>
    <SelectValue placeholder="Select a fruit..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="strawberry">Strawberry</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>`,
        render: () => (
          <Select defaultValue="apple">
            <SelectTrigger style={{ maxWidth: "280px", width: "100%" }}>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="strawberry">Strawberry</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        id: "with-label",
        title: "Select with Form & Label",
        description:
          "Pairing Select with a Label using htmlFor for accessible form composition.",
        code: `<div style={{ display: 'grid', gap: '0.375rem', maxWidth: '320px', width: '100%' }}>
  <Label htmlFor="framework-select" required>Primary Framework</Label>
  <Select defaultValue="react">
    <SelectTrigger id="framework-select">
      <SelectValue placeholder="Select framework..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React.js</SelectItem>
      <SelectItem value="nextjs">Next.js App Router</SelectItem>
      <SelectItem value="vite">Vite SPA</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        render: () => (
          <div
            style={{
              display: "grid",
              gap: "0.375rem",
              maxWidth: "320px",
              width: "100%",
            }}
          >
            <Label htmlFor="framework-select" required>
              Primary Framework
            </Label>
            <Select defaultValue="react">
              <SelectTrigger id="framework-select">
                <SelectValue placeholder="Select framework..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React.js</SelectItem>
                <SelectItem value="nextjs">Next.js App Router</SelectItem>
                <SelectItem value="vite">Vite SPA</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ),
      },
      {
        id: "grouped",
        title: "Grouped Options with Separators",
        description:
          "Organize related options into labeled categories with separators.",
        code: `<Select defaultValue="tokyo">
  <SelectTrigger style={{ maxWidth: '320px', width: '100%' }}>
    <SelectValue placeholder="Select a timezone / city..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="newyork">New York (EST)</SelectItem>
      <SelectItem value="losangeles">Los Angeles (PST)</SelectItem>
      <SelectItem value="chicago">Chicago (CST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="london">London (GMT)</SelectItem>
      <SelectItem value="paris">Paris (CET)</SelectItem>
      <SelectItem value="berlin">Berlin (CET)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Asia & Pacific</SelectLabel>
      <SelectItem value="tokyo">Tokyo (JST)</SelectItem>
      <SelectItem value="singapore">Singapore (SGT)</SelectItem>
      <SelectItem value="sydney">Sydney (AEST)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        render: () => (
          <Select defaultValue="tokyo">
            <SelectTrigger style={{ maxWidth: "320px", width: "100%" }}>
              <SelectValue placeholder="Select a timezone / city..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="newyork">New York (EST)</SelectItem>
                <SelectItem value="losangeles">Los Angeles (PST)</SelectItem>
                <SelectItem value="chicago">Chicago (CST)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="london">London (GMT)</SelectItem>
                <SelectItem value="paris">Paris (CET)</SelectItem>
                <SelectItem value="berlin">Berlin (CET)</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia & Pacific</SelectLabel>
                <SelectItem value="tokyo">Tokyo (JST)</SelectItem>
                <SelectItem value="singapore">Singapore (SGT)</SelectItem>
                <SelectItem value="sydney">Sydney (AEST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
      {
        id: "disabled",
        title: "Disabled State & Options",
        description:
          "Demonstrating disabled select component and individual disabled options.",
        code: `<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
  <Select disabled>
    <SelectTrigger style={{ width: '220px' }}>
      <SelectValue placeholder="Disabled Select" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">Option 1</SelectItem>
    </SelectContent>
  </Select>

  <Select defaultValue="enabled-1">
    <SelectTrigger style={{ width: '220px' }}>
      <SelectValue placeholder="With Disabled Items" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="enabled-1">Available Option</SelectItem>
      <SelectItem value="disabled-1" disabled>Out of Stock (Disabled)</SelectItem>
      <SelectItem value="enabled-2">Available Option 2</SelectItem>
    </SelectContent>
  </Select>
</div>`,
        render: () => (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Select disabled>
              <SelectTrigger style={{ width: "220px" }}>
                <SelectValue placeholder="Disabled Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="enabled-1">
              <SelectTrigger style={{ width: "220px" }}>
                <SelectValue placeholder="With Disabled Items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled-1">Available Option</SelectItem>
                <SelectItem value="disabled-1" disabled>
                  Out of Stock (Disabled)
                </SelectItem>
                <SelectItem value="enabled-2">Available Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ),
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    level: 2,
    description:
      "Temporary notifications with queue management and auto-dismiss timers.",
    dependencies: ["@soraui/hooks"],
    tags: ["toast", "notification", "snackbar", "alert"],
    status: "stable",
    props: [{ name: "title", type: "string", description: "Toast title" }],
    examples: [
      {
        id: "basic",
        title: "Toast Notification",
        code: `<Toast id="toast-1" title="Deployment Successful">Your project has been deployed to production.</Toast>`,
        render: () => (
          <Toast id="toast-1" title="Deployment Successful">
            Your project has been deployed to production.
          </Toast>
        ),
      },
    ],
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "Forms",
    level: 3,
    description:
      "Monthly calendar with date range selection and keyboard arrow navigation.",
    dependencies: [],
    tags: ["calendar", "date", "month", "picker"],
    status: "stable",
    props: [
      { name: "value", type: "Date", description: "Selected date" },
      {
        name: "onSelect",
        type: "(date: Date) => void",
        description: "Date selection callback",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Calendar Month View",
        code: `<Calendar />`,
        render: () => <Calendar />,
      },
    ],
  },
  {
    id: "date-picker",
    name: "DatePicker",
    category: "Forms",
    level: 3,
    description:
      "Date picker input field with floating monthly calendar popover.",
    dependencies: ["@soraui/hooks"],
    tags: ["date-picker", "calendar", "input"],
    status: "stable",
    props: [
      {
        name: "placeholder",
        type: "string",
        default: "'Select date...'",
        description: "Placeholder label",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "DatePicker Input",
        code: `<DatePicker style={{ maxWidth: '280px' }} />`,
        render: () => <DatePicker style={{ maxWidth: "280px" }} />,
      },
    ],
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "Forms",
    level: 3,
    description:
      "Autocomplete search input with real-time filtering and listbox popup.",
    dependencies: ["@soraui/hooks"],
    tags: ["combobox", "autocomplete", "search"],
    status: "stable",
    props: [
      {
        name: "options",
        type: "Array<{ value, label }>",
        description: "Searchable items",
        required: true,
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Combobox Autocomplete",
        code: `<Combobox
  options={[
    { value: 'react', label: 'React.js' },
    { value: 'next', label: 'Next.js' },
    { value: 'vite', label: 'Vite' },
  ]}
  style={{ maxWidth: '280px' }}
/>`,
        render: () => (
          <Combobox
            options={[
              { value: "react", label: "React.js" },
              { value: "next", label: "Next.js" },
              { value: "vite", label: "Vite" },
            ]}
            style={{ maxWidth: "280px" }}
          />
        ),
      },
    ],
  },
  {
    id: "file-uploader",
    name: "FileUploader",
    category: "Forms",
    level: 3,
    description:
      "Drag-and-drop file upload zone with file queue and size validation.",
    dependencies: [],
    tags: ["file-uploader", "upload", "dropzone"],
    status: "stable",
    props: [
      {
        name: "maxSizeMB",
        type: "number",
        default: "5",
        description: "Maximum file size in MB",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "File Dropzone",
        code: `<FileUploader style={{ maxWidth: '440px' }} />`,
        render: () => <FileUploader style={{ maxWidth: "440px" }} />,
      },
    ],
  },
  {
    id: "data-table",
    name: "DataTable",
    category: "Data Display",
    level: 3,
    description:
      "Lightweight sortable, filterable, and paginated data table with row selection.",
    dependencies: [],
    tags: ["data-table", "table", "grid", "rows"],
    status: "stable",
    props: [
      {
        name: "columns",
        type: "DataTableColumn<T>[]",
        description: "Column headers",
        required: true,
      },
      { name: "data", type: "T[]", description: "Row records", required: true },
    ],
    examples: [
      {
        id: "basic",
        title: "Data Table with Sorting",
        code: `<DataTable
  columns={[
    { accessorKey: 'id', header: 'ID', sortable: true },
    { accessorKey: 'name', header: 'Name', sortable: true },
    { accessorKey: 'status', header: 'Status' },
  ]}
  data={[
    { id: '1', name: 'GraphQL API', status: 'Online' },
    { id: '2', name: 'Redis Cache', status: 'Healthy' },
  ]}
/>`,
        render: () => (
          <DataTable
            columns={[
              { accessorKey: "id", header: "ID", sortable: true },
              { accessorKey: "name", header: "Name", sortable: true },
              { accessorKey: "status", header: "Status" },
            ]}
            data={[
              { id: "1", name: "GraphQL API", status: "Online" },
              { id: "2", name: "Redis Cache", status: "Healthy" },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    level: 1,
    description:
      "A control that allows the user to toggle between checked and not checked.",
    dependencies: [],
    tags: ["checkbox", "toggle", "form"],
    status: "stable",
    props: [
      { name: "checked", type: "boolean", description: "Checked state" },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Change callback",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Checkbox Control",
        code: `<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <Checkbox id="demo-check" defaultChecked />
  <Label htmlFor="demo-check">Accept terms and conditions</Label>
</div>`,
        render: () => (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Checkbox id="demo-check" defaultChecked />
            <Label htmlFor="demo-check">Accept terms and conditions</Label>
          </div>
        ),
      },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    category: "Forms",
    level: 2,
    description:
      "A set of checkable radio buttons where no more than one can be checked at a time.",
    dependencies: [],
    tags: ["radio-group", "radio", "form"],
    status: "stable",
    props: [
      {
        name: "defaultValue",
        type: "string",
        description: "Initial checked radio value",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Radio Group Options",
        code: `<RadioGroup defaultValue="card">
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <RadioGroupItem value="card" id="r-card" />
    <Label htmlFor="r-card">Credit Card</Label>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <RadioGroupItem value="paypal" id="r-paypal" />
    <Label htmlFor="r-paypal">PayPal</Label>
  </div>
</RadioGroup>`,
        render: () => (
          <RadioGroup defaultValue="card">
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <RadioGroupItem value="card" id="r-card" />
              <Label htmlFor="r-card">Credit Card</Label>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <RadioGroupItem value="paypal" id="r-paypal" />
              <Label htmlFor="r-paypal">PayPal</Label>
            </div>
          </RadioGroup>
        ),
      },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    category: "Forms",
    level: 1,
    description:
      "A control that allows the user to toggle between on and off states.",
    dependencies: [],
    tags: ["switch", "toggle", "form"],
    status: "stable",
    props: [
      { name: "checked", type: "boolean", description: "Toggle state" },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Change callback",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Switch Toggle",
        code: `<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
  <Switch id="demo-sw" defaultChecked />
  <Label htmlFor="demo-sw">Enable Email Notifications</Label>
</div>`,
        render: () => (
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Switch id="demo-sw" defaultChecked />
            <Label htmlFor="demo-sw">Enable Email Notifications</Label>
          </div>
        ),
      },
    ],
  },
  {
    id: "slider",
    name: "Slider",
    category: "Forms",
    level: 2,
    description:
      "An input where the user selects a value from within a given range.",
    dependencies: [],
    tags: ["slider", "range", "input"],
    status: "stable",
    props: [
      {
        name: "min",
        type: "number",
        default: "0",
        description: "Minimum value",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum value",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Slider Range",
        code: `<Slider defaultValue={50} style={{ maxWidth: '300px' }} />`,
        render: () => (
          <Slider defaultValue={50} style={{ maxWidth: "300px" }} />
        ),
      },
    ],
  },
  {
    id: "input-otp",
    name: "InputOTP",
    category: "Forms",
    level: 2,
    description:
      "One-time password PIN input with auto-advance and clipboard paste support.",
    dependencies: [],
    tags: ["input-otp", "otp", "2fa", "pin"],
    status: "stable",
    props: [
      {
        name: "length",
        type: "number",
        default: "6",
        description: "Number of digits",
      },
      {
        name: "onValueChange",
        type: "(val: string) => void",
        description: "Value update callback",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Input OTP Slots",
        code: `<InputOTP length={6} />`,
        render: () => <InputOTP length={6} />,
      },
    ],
  },
  {
    id: "number-input",
    name: "NumberInput",
    category: "Forms",
    level: 1,
    description: "Numeric stepper input with bounds and step control.",
    dependencies: [],
    tags: ["number-input", "stepper", "numeric"],
    status: "stable",
    props: [
      { name: "min", type: "number", description: "Minimum bound" },
      { name: "max", type: "number", description: "Maximum bound" },
      { name: "step", type: "number", default: "1", description: "Step delta" },
    ],
    examples: [
      {
        id: "basic",
        title: "Number Stepper",
        code: `<NumberInput defaultValue={5} min={1} max={10} style={{ maxWidth: '160px' }} />`,
        render: () => (
          <NumberInput
            defaultValue={5}
            min={1}
            max={10}
            style={{ maxWidth: "160px" }}
          />
        ),
      },
    ],
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    level: 1,
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    dependencies: [],
    tags: ["breadcrumb", "path", "navigation"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Breadcrumb Path",
        code: `<Breadcrumb>
  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem><BreadcrumbLink href="#">Settings</BreadcrumbLink></BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>Security</BreadcrumbItem>
</Breadcrumb>`,
        render: () => (
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Security</BreadcrumbItem>
          </Breadcrumb>
        ),
      },
    ],
  },
  {
    id: "navigation-menu",
    name: "NavigationMenu",
    category: "Navigation",
    level: 2,
    description:
      "A collection of links for navigating websites with dropdown content panels.",
    dependencies: ["@soraui/hooks"],
    tags: ["navigation-menu", "navbar", "menu"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Navigation Menu Bar",
        code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent style={{ padding: '1rem', width: '220px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>Explore components & blocks</p>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
        render: () => (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent
                  style={{ padding: "1rem", width: "220px" }}
                >
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>
                    Explore components & blocks
                  </p>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
      },
    ],
  },
  {
    id: "menubar",
    name: "Menubar",
    category: "Navigation",
    level: 2,
    description:
      "A desktop-grade horizontal menu bar with nested dropdown menus.",
    dependencies: ["@soraui/hooks"],
    tags: ["menubar", "menu", "desktop"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Desktop Menubar",
        code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New File</MenubarItem>
      <MenubarItem>Open Recent</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        render: () => (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New File</MenubarItem>
                <MenubarItem>Open Recent</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
      },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Navigation",
    level: 1,
    description:
      "Numbered page pagination with previous, next, and active states.",
    dependencies: [],
    tags: ["pagination", "pager", "navigation"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Numbered Pagination",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
        render: () => (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
    ],
  },
  {
    id: "stepper",
    name: "Stepper",
    category: "Navigation",
    level: 1,
    description:
      "Sequential progress tracker showing completed, active, and pending steps.",
    dependencies: [],
    tags: ["stepper", "steps", "wizard"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Step Tracker",
        code: `<Stepper>
  <StepperItem step={1} completed>Account</StepperItem>
  <StepperItem step={2} active>Profile</StepperItem>
  <StepperItem step={3}>Review</StepperItem>
</Stepper>`,
        render: () => (
          <Stepper>
            <StepperItem step={1} completed>
              Account
            </StepperItem>
            <StepperItem step={2} active>
              Profile
            </StepperItem>
            <StepperItem step={3}>Review</StepperItem>
          </Stepper>
        ),
      },
    ],
  },
  {
    id: "command-palette",
    name: "CommandPalette",
    category: "Navigation",
    level: 2,
    description: "Fast, composable command menu for keyboard-first navigation.",
    dependencies: ["@soraui/hooks"],
    tags: ["command-palette", "cmd-k", "search"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Command Palette",
        code: `<CommandPalette placeholder="Type a command or search..." />`,
        render: () => (
          <CommandPalette placeholder="Type a command or search..." />
        ),
      },
    ],
  },
  {
    id: "alert-dialog",
    name: "AlertDialog",
    category: "Feedback",
    level: 2,
    description:
      "A modal dialog that interrupts the user with important content and expects confirmation.",
    dependencies: ["@soraui/hooks"],
    tags: ["alert-dialog", "confirm", "modal"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Confirmation Dialog",
        code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone and will permanently erase your data.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Yes, delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        render: () => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone and will permanently erase your
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Yes, delete account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "Overlays",
    level: 2,
    description: "A panel that slides in smoothly from the edge of the screen.",
    dependencies: ["@soraui/hooks"],
    tags: ["drawer", "sheet", "slideout"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Slide-in Drawer",
        code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Side Drawer</Button>
  </DrawerTrigger>
  <DrawerContent style={{ padding: '1.5rem', width: '320px' }}>
    <DrawerHeader>
      <DrawerTitle>Cart Overview</DrawerTitle>
    </DrawerHeader>
    <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground)' }}>Your selected items appear here.</p>
  </DrawerContent>
</Drawer>`,
        render: () => (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Side Drawer</Button>
            </DrawerTrigger>
            <DrawerContent style={{ padding: "1.5rem", width: "320px" }}>
              <DrawerHeader>
                <DrawerTitle>Cart Overview</DrawerTitle>
              </DrawerHeader>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                Your selected items appear here.
              </p>
            </DrawerContent>
          </Drawer>
        ),
      },
    ],
  },
  {
    id: "hover-card",
    name: "HoverCard",
    category: "Overlays",
    level: 2,
    description:
      "For sighted users to preview rich content available behind an anchor or handle.",
    dependencies: ["@soraui/hooks"],
    tags: ["hover-card", "preview", "popup"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "User Card Preview",
        code: `<HoverCard>
  <HoverCardTrigger>
    <span style={{ color: 'var(--ui-primary, #0ea5e9)', cursor: 'pointer' }}>@soraui</span>
  </HoverCardTrigger>
  <HoverCardContent style={{ padding: '1rem', width: '280px' }}>
    <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>SoraUI</h4>
    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground)' }}>The lightweight, accessible UI ecosystem.</p>
  </HoverCardContent>
</HoverCard>`,
        render: () => (
          <HoverCard>
            <HoverCardTrigger>
              <span
                style={{
                  color: "var(--ui-primary, #0ea5e9)",
                  cursor: "pointer",
                }}
              >
                @soraui
              </span>
            </HoverCardTrigger>
            <HoverCardContent style={{ padding: "1rem", width: "280px" }}>
              <h4 style={{ margin: "0 0 0.25rem 0", fontWeight: 600 }}>
                SoraUI
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                The lightweight, accessible UI ecosystem.
              </p>
            </HoverCardContent>
          </HoverCard>
        ),
      },
    ],
  },
  {
    id: "context-menu",
    name: "ContextMenu",
    category: "Overlays",
    level: 2,
    description:
      "Displays a custom menu located at the pointer position when right-clicked.",
    dependencies: ["@soraui/hooks"],
    tags: ["context-menu", "right-click", "menu"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Right-Click Context Area",
        code: `<ContextMenu>
  <ContextMenuTrigger style={{ display: 'flex', height: '100px', width: '280px', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--ui-border)', borderRadius: 'var(--ui-radius)' }}>
    Right click inside this box
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy Link</ContextMenuItem>
    <ContextMenuItem>Inspect</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        render: () => (
          <ContextMenu>
            <ContextMenuTrigger
              style={{
                display: "flex",
                height: "100px",
                width: "280px",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed var(--ui-border)",
                borderRadius: "var(--ui-radius)",
              }}
            >
              Right click inside this box
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Copy Link</ContextMenuItem>
              <ContextMenuItem>Inspect</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
    ],
  },
  {
    id: "progress",
    name: "Progress",
    category: "Feedback",
    level: 1,
    description:
      "Displays an indicator showing the completion progress of a task.",
    dependencies: [],
    tags: ["progress", "bar", "loading"],
    status: "stable",
    props: [
      {
        name: "value",
        type: "number",
        default: "0",
        description: "Progress percentage (0-100)",
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Progress Bar",
        code: `<Progress value={65} style={{ maxWidth: '320px' }} />`,
        render: () => <Progress value={65} style={{ maxWidth: "320px" }} />,
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    level: 1,
    description:
      "An image element with a graceful fallback for representing the user.",
    dependencies: [],
    tags: ["avatar", "user", "profile", "image"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Avatar with Fallback",
        code: `<div style={{ display: 'flex', gap: '0.75rem' }}>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback style={{ backgroundColor: 'var(--ui-primary)', color: 'var(--ui-primary-foreground)' }}>JD</AvatarFallback></Avatar>
</div>`,
        render: () => (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback
                style={{
                  backgroundColor: "var(--ui-primary)",
                  color: "var(--ui-primary-foreground)",
                }}
              >
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        ),
      },
    ],
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "Layout",
    level: 1,
    description: "An interactive component which can be expanded or collapsed.",
    dependencies: [],
    tags: ["collapsible", "toggle", "expand"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Collapsible Area",
        code: `<Collapsible style={{ maxWidth: '320px' }}>
  <CollapsibleTrigger>
    Toggle Details
  </CollapsibleTrigger>
  <CollapsibleContent style={{ padding: '0.75rem 0' }}>
    <p style={{ margin: 0, fontSize: '0.875rem' }}>Hidden secret settings revealed.</p>
  </CollapsibleContent>
</Collapsible>`,
        render: () => (
          <Collapsible style={{ maxWidth: "320px" }}>
            <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
            <CollapsibleContent style={{ padding: "0.75rem 0" }}>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>
                Hidden secret settings revealed.
              </p>
            </CollapsibleContent>
          </Collapsible>
        ),
      },
    ],
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "Data Display",
    level: 1,
    description:
      "A vertical chronological list of events and status milestones.",
    dependencies: [],
    tags: ["timeline", "history", "events"],
    status: "stable",
    props: [],
    examples: [
      {
        id: "basic",
        title: "Milestone Timeline",
        code: `<Timeline>
  <TimelineItem active>
    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>10:00 AM</div>
    <div style={{ fontSize: '0.8125rem', color: 'var(--ui-muted-foreground)' }}>Build Triggered</div>
  </TimelineItem>
  <TimelineItem>
    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>10:02 AM</div>
    <div style={{ fontSize: '0.8125rem', color: 'var(--ui-muted-foreground)' }}>Deployed to Production</div>
  </TimelineItem>
</Timeline>`,
        render: () => (
          <Timeline>
            <TimelineItem active>
              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                10:00 AM
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                Build Triggered
              </div>
            </TimelineItem>
            <TimelineItem>
              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                10:02 AM
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--ui-muted-foreground)",
                }}
              >
                Deployed to Production
              </div>
            </TimelineItem>
          </Timeline>
        ),
      },
    ],
  },
  {
    id: "statistic",
    name: "Statistic",
    category: "Data Display",
    level: 1,
    description: "Display statistics or metrics with trend indicators.",
    dependencies: [],
    tags: ["statistic", "kpi", "metric"],
    status: "stable",
    props: [
      {
        name: "title",
        type: "string",
        description: "Metric title",
        required: true,
      },
      {
        name: "value",
        type: "string | number",
        description: "Metric value",
        required: true,
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Statistic Metric",
        code: `<Statistic title="Monthly Recurring Revenue" value="$42,850" />`,
        render: () => (
          <Statistic title="Monthly Recurring Revenue" value="$42,850" />
        ),
      },
    ],
  },
  {
    id: "tree-view",
    name: "TreeView",
    category: "Navigation",
    level: 2,
    description:
      "A hierarchical list of items with expand and collapse interactions.",
    dependencies: [],
    tags: ["tree-view", "tree", "files", "hierarchy"],
    status: "stable",
    props: [
      {
        name: "items",
        type: "TreeItemData[]",
        description: "Tree items hierarchy",
        required: true,
      },
    ],
    examples: [
      {
        id: "basic",
        title: "Folder Tree Hierarchy",
        code: `<TreeView
  items={[
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'components', label: 'components' },
        { id: 'index.ts', label: 'index.ts' },
      ],
    },
  ]}
/>`,
        render: () => (
          <TreeView
            items={[
              {
                id: "src",
                label: "src",
                children: [
                  { id: "components", label: "components" },
                  { id: "index.ts", label: "index.ts" },
                ],
              },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    level: 1,
    description:
      "A static inline callout component that displays contextual feedback messages. Use for informational notices, warnings, errors, and success confirmations embedded within page content.",
    dependencies: [],
    tags: [
      "alert",
      "banner",
      "callout",
      "notification",
      "warning",
      "error",
      "info",
    ],
    status: "stable",
    props: [
      {
        name: "variant",
        type: "'default' | 'destructive'",
        default: "'default'",
        description: "Visual style variant",
      },
    ],
    accessibility: {
      role: "alert",
    },
    themingTokens: [
      "--ui-border",
      "--ui-card",
      "--ui-foreground",
      "--ui-radius",
      "--ui-destructive",
    ],
    examples: [
      {
        id: "default",
        title: "Default Alert",
        description:
          "A standard alert callout with an icon, title, and description.",
        code: `<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and blocks to your app using the SoraUI CLI.
  </AlertDescription>
</Alert>`,
        render: () => (
          <Alert style={{ maxWidth: "540px" }}>
            <Terminal size={16} />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and blocks to your app using the SoraUI
              CLI.
            </AlertDescription>
          </Alert>
        ),
      },
      {
        id: "destructive",
        title: "Destructive Variant",
        description:
          "Used for critical errors, failed operations, or destructive states.",
        code: `<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again to continue.
  </AlertDescription>
</Alert>`,
        render: () => (
          <Alert variant="destructive" style={{ maxWidth: "540px" }}>
            <AlertCircle size={16} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again to continue.
            </AlertDescription>
          </Alert>
        ),
      },
      {
        id: "action",
        title: "With Action",
        description:
          "Alert with an interactive button or call-to-action alongside the message.",
        code: `<Alert style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingLeft: '1rem' }}>
  <div>
    <AlertTitle style={{ margin: 0 }}>Two-factor authentication</AlertTitle>
    <AlertDescription style={{ margin: 0, marginTop: '0.25rem' }}>
      Protect your account with an extra security layer.
    </AlertDescription>
  </div>
  <Button size="sm" variant="outline">
    Enable
  </Button>
</Alert>`,
        render: () => (
          <Alert
            style={{
              maxWidth: "540px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <div>
              <AlertTitle style={{ margin: 0 }}>
                Two-factor authentication
              </AlertTitle>
              <AlertDescription style={{ margin: 0, marginTop: "0.25rem" }}>
                Protect your account with an extra security layer.
              </AlertDescription>
            </div>
            <Button size="sm" variant="outline">
              Enable
            </Button>
          </Alert>
        ),
      },
      {
        id: "notice",
        title: "Warning Notice",
        description:
          "Callout with amber warning tones for non-blocking alerts.",
        code: `<Alert style={{ borderColor: 'rgba(234, 179, 8, 0.4)', backgroundColor: 'rgba(234, 179, 8, 0.08)' }}>
  <AlertTriangle className="h-4 w-4" style={{ color: '#eab308' }} />
  <AlertTitle style={{ color: '#eab308' }}>Plan Limit Approaching</AlertTitle>
  <AlertDescription>
    You have used 85% of your monthly storage quota. Consider upgrading your plan.
  </AlertDescription>
</Alert>`,
        render: () => (
          <Alert
            style={{
              maxWidth: "540px",
              borderColor: "rgba(234, 179, 8, 0.4)",
              backgroundColor: "rgba(234, 179, 8, 0.08)",
            }}
          >
            <AlertTriangle size={16} style={{ color: "#eab308" }} />
            <AlertTitle style={{ color: "#eab308" }}>
              Plan Limit Approaching
            </AlertTitle>
            <AlertDescription>
              You have used 85% of your monthly storage quota. Consider
              upgrading your plan.
            </AlertDescription>
          </Alert>
        ),
      },
      {
        id: "success",
        title: "Success Confirmation",
        description:
          "Confirmation alert indicating an operation finished successfully.",
        code: `<Alert style={{ borderColor: 'rgba(34, 197, 94, 0.4)', backgroundColor: 'rgba(34, 197, 94, 0.08)' }}>
  <CheckCircle2 className="h-4 w-4" style={{ color: '#22c55e' }} />
  <AlertTitle style={{ color: '#22c55e' }}>Deployment Live</AlertTitle>
  <AlertDescription>
    Your project has been successfully deployed to production.
  </AlertDescription>
</Alert>`,
        render: () => (
          <Alert
            style={{
              maxWidth: "540px",
              borderColor: "rgba(34, 197, 94, 0.4)",
              backgroundColor: "rgba(34, 197, 94, 0.08)",
            }}
          >
            <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
            <AlertTitle style={{ color: "#22c55e" }}>
              Deployment Live
            </AlertTitle>
            <AlertDescription>
              Your project has been successfully deployed to production.
            </AlertDescription>
          </Alert>
        ),
      },
      {
        id: "custom-colors",
        title: "Custom Colors",
        description:
          "Override border, background, and text colors using inline styles to create any semantic color tone — info, warning, success, or error.",
        code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '540px' }}>
  {/* Info — Blue */}
  <Alert style={{ borderColor: 'rgba(59, 130, 246, 0.4)', backgroundColor: 'rgba(59, 130, 246, 0.06)' }}>
    <Info className="h-4 w-4" style={{ color: '#3b82f6' }} />
    <AlertTitle style={{ color: '#3b82f6' }}>New feature available</AlertTitle>
    <AlertDescription>
      Dashboard v2 is live. Explore new analytics and reporting tools.
    </AlertDescription>
  </Alert>

  {/* Warning — Amber */}
  <Alert style={{ borderColor: 'rgba(234, 179, 8, 0.4)', backgroundColor: 'rgba(234, 179, 8, 0.06)' }}>
    <AlertTriangle className="h-4 w-4" style={{ color: '#eab308' }} />
    <AlertTitle style={{ color: '#eab308' }}>Your subscription will expire in 3 days.</AlertTitle>
    <AlertDescription>
      Renew now to avoid service interruption or upgrade to a paid plan.
    </AlertDescription>
  </Alert>

  {/* Success — Green */}
  <Alert style={{ borderColor: 'rgba(34, 197, 94, 0.4)', backgroundColor: 'rgba(34, 197, 94, 0.06)' }}>
    <CheckCircle2 className="h-4 w-4" style={{ color: '#22c55e' }} />
    <AlertTitle style={{ color: '#22c55e' }}>Payment confirmed</AlertTitle>
    <AlertDescription>
      Your invoice #1042 has been paid. A receipt has been sent to your email.
    </AlertDescription>
  </Alert>

  {/* Error — Red (custom, not destructive variant) */}
  <Alert style={{ borderColor: 'rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.06)' }}>
    <AlertCircle className="h-4 w-4" style={{ color: '#ef4444' }} />
    <AlertTitle style={{ color: '#ef4444' }}>Build failed</AlertTitle>
    <AlertDescription>
      3 errors found in production bundle. Check the build logs for details.
    </AlertDescription>
  </Alert>
</div>`,
        render: () => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "540px",
              width: "100%",
            }}
          >
            {/* Info — Blue */}
            <Alert
              style={{
                borderColor: "rgba(59, 130, 246, 0.4)",
                backgroundColor: "rgba(59, 130, 246, 0.06)",
              }}
            >
              <Info size={16} style={{ color: "#3b82f6" }} />
              <AlertTitle style={{ color: "#3b82f6" }}>
                New feature available
              </AlertTitle>
              <AlertDescription>
                Dashboard v2 is live. Explore new analytics and reporting tools.
              </AlertDescription>
            </Alert>

            {/* Warning — Amber */}
            <Alert
              style={{
                borderColor: "rgba(234, 179, 8, 0.4)",
                backgroundColor: "rgba(234, 179, 8, 0.06)",
              }}
            >
              <AlertTriangle size={16} style={{ color: "#eab308" }} />
              <AlertTitle style={{ color: "#eab308" }}>
                Your subscription will expire in 3 days.
              </AlertTitle>
              <AlertDescription>
                Renew now to avoid service interruption or upgrade to a paid
                plan.
              </AlertDescription>
            </Alert>

            {/* Success — Green */}
            <Alert
              style={{
                borderColor: "rgba(34, 197, 94, 0.4)",
                backgroundColor: "rgba(34, 197, 94, 0.06)",
              }}
            >
              <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
              <AlertTitle style={{ color: "#22c55e" }}>
                Payment confirmed
              </AlertTitle>
              <AlertDescription>
                Your invoice #1042 has been paid. A receipt has been sent to
                your email.
              </AlertDescription>
            </Alert>

            {/* Error — Red */}
            <Alert
              style={{
                borderColor: "rgba(239, 68, 68, 0.4)",
                backgroundColor: "rgba(239, 68, 68, 0.06)",
              }}
            >
              <AlertCircle size={16} style={{ color: "#ef4444" }} />
              <AlertTitle style={{ color: "#ef4444" }}>Build failed</AlertTitle>
              <AlertDescription>
                3 errors found in production bundle. Check the build logs for
                details.
              </AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
  },
  {
    id: "aspect-ratio",
    name: "AspectRatio",
    category: "Layout",
    level: 1,
    description:
      "Displays content within a desired aspect ratio with zero cumulative layout shift.",
    dependencies: [],
    tags: ["aspect-ratio", "ratio", "image", "video", "embed", "layout"],
    status: "stable",
    props: [
      {
        name: "ratio",
        type: "number",
        default: "16 / 9",
        description:
          "Desired aspect ratio width / height (e.g. 16/9, 4/3, 1/1, 21/9)",
      },
    ],
    themingTokens: ["--ui-radius"],
    examples: [
      {
        id: "ratios",
        title: "16:9 Image Container",
        code: `<div style={{ width: '100%', maxWidth: '480px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--docs-border)' }}>
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </AspectRatio>
</div>`,
        render: () => (
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid var(--docs-border)",
            }}
          >
            <AspectRatio ratio={16 / 9}>
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AspectRatio>
          </div>
        ),
      },
      {
        id: "square",
        title: "1:1 Square Ratio",
        code: `<div style={{ width: '220px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--docs-border)' }}>
  <AspectRatio ratio={1 / 1}>
    <img
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&dpr=2&q=80"
      alt="Avatar"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </AspectRatio>
</div>`,
        render: () => (
          <div
            style={{
              width: "220px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid var(--docs-border)",
            }}
          >
            <AspectRatio ratio={1 / 1}>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&dpr=2&q=80"
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AspectRatio>
          </div>
        ),
      },
    ],
  },
  {
    id: "attachment",
    name: "Attachment",
    category: "Data Display",
    level: 2,
    description:
      "Displays uploaded file cards, upload progress, file icons, file sizes, and remove actions.",
    dependencies: [],
    tags: ["attachment", "file", "upload", "media", "document", "pdf", "image"],
    status: "stable",
    props: [
      {
        name: "layout",
        type: "'list' | 'grid'",
        default: "'list'",
        description: "Layout arrangement for attachments",
      },
    ],
    themingTokens: ["--ui-border", "--ui-card", "--ui-primary", "--ui-radius"],
    examples: [
      {
        id: "list",
        title: "List View with Progress & File Types",
        code: `<Attachment layout="list">
  <AttachmentItem>
    <AttachmentIcon type="pdf">
      <FileText size={18} />
    </AttachmentIcon>
    <AttachmentInfo>
      <AttachmentName>annual_financial_report_2026.pdf</AttachmentName>
      <AttachmentSize>4.2 MB • Uploaded</AttachmentSize>
    </AttachmentInfo>
    <AttachmentActions>
      <AttachmentRemove />
    </AttachmentActions>
  </AttachmentItem>

  <AttachmentItem>
    <AttachmentPreview src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=200&dpr=2&q=80" />
    <AttachmentInfo>
      <AttachmentName>hero_cover_banner.jpg</AttachmentName>
      <AttachmentSize>1.8 MB • Uploading 75%</AttachmentSize>
      <AttachmentProgress value={75} />
    </AttachmentInfo>
    <AttachmentActions>
      <AttachmentRemove />
    </AttachmentActions>
  </AttachmentItem>
</Attachment>`,
        render: () => (
          <Attachment layout="list">
            <AttachmentItem>
              <AttachmentIcon type="pdf">
                <FileText size={18} />
              </AttachmentIcon>
              <AttachmentInfo>
                <AttachmentName>
                  annual_financial_report_2026.pdf
                </AttachmentName>
                <AttachmentSize>4.2 MB • Uploaded</AttachmentSize>
              </AttachmentInfo>
              <AttachmentActions>
                <AttachmentRemove />
              </AttachmentActions>
            </AttachmentItem>

            <AttachmentItem>
              <AttachmentPreview src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=200&dpr=2&q=80" />
              <AttachmentInfo>
                <AttachmentName>hero_cover_banner.jpg</AttachmentName>
                <AttachmentSize>1.8 MB • Uploading 75%</AttachmentSize>
                <AttachmentProgress value={75} />
              </AttachmentInfo>
              <AttachmentActions>
                <AttachmentRemove />
              </AttachmentActions>
            </AttachmentItem>
          </Attachment>
        ),
      },
      {
        id: "grid",
        title: "Grid Layout",
        code: `<Attachment layout="grid">
  <AttachmentItem>
    <AttachmentIcon type="code">
      <Code size={18} />
    </AttachmentIcon>
    <AttachmentInfo>
      <AttachmentName>schema.prisma</AttachmentName>
      <AttachmentSize>12 KB</AttachmentSize>
    </AttachmentInfo>
    <AttachmentRemove />
  </AttachmentItem>

  <AttachmentItem>
    <AttachmentIcon type="archive">
      <Archive size={18} />
    </AttachmentIcon>
    <AttachmentInfo>
      <AttachmentName>dataset_v2.zip</AttachmentName>
      <AttachmentSize>85.4 MB</AttachmentSize>
    </AttachmentInfo>
    <AttachmentRemove />
  </AttachmentItem>
</Attachment>`,
        render: () => (
          <Attachment layout="grid">
            <AttachmentItem>
              <AttachmentIcon type="code">
                <Code size={18} />
              </AttachmentIcon>
              <AttachmentInfo>
                <AttachmentName>schema.prisma</AttachmentName>
                <AttachmentSize>12 KB</AttachmentSize>
              </AttachmentInfo>
              <AttachmentRemove />
            </AttachmentItem>

            <AttachmentItem>
              <AttachmentIcon type="archive">
                <Archive size={18} />
              </AttachmentIcon>
              <AttachmentInfo>
                <AttachmentName>dataset_v2.zip</AttachmentName>
                <AttachmentSize>85.4 MB</AttachmentSize>
              </AttachmentInfo>
              <AttachmentRemove />
            </AttachmentItem>
          </Attachment>
        ),
      },
    ],
  },
];
