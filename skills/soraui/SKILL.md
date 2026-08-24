---
name: soraui
description: Official SoraUI component construction system skill. Provides AI assistants with deep knowledge of 47 accessible primitives, 24 semantic design tokens, 14 production blocks, 4 page templates, 9 cosmic theme presets, and CLI commands.
---

# SoraUI Agent Skill

This skill provides AI coding assistants (Claude Code, Cursor, Copilot, Gemini CLI, Antigravity) with authoritative knowledge about the SoraUI ecosystem to generate 100% accurate, accessible, token-compliant code.

---

## 1. Core Principles

1. **CSS-First**: If layout or styling can be done with CSS custom properties or native browser APIs, avoid adding unnecessary JavaScript.
2. **Zero Hardcoded Colors (`SORA-TOKEN-001`)**: NEVER hardcode hex (`#ffffff`), rgb, or hsl values in component inline styles or classes. Always consume `--ui-*` semantic tokens or `--sora-<comp>-*` component tokens.
3. **UI-Only Boundary (`SORA-BOUNDARY-001`)**: Components, blocks, and templates must remain pure presentational UI. Decouple backend/API logic by accepting standard callback props (`onSubmit`, `onAction`, `onChange`).
4. **Accessibility First (`SORA-A11Y-001`)**: All interactive primitives must preserve ARIA roles (`role="dialog"`, `role="tablist"`, `role="switch"`), keyboard navigation (Tab, Enter, Escape, Arrow keys), and focus traps.

---

## 2. 24-Key Semantic Theme Tokens

SoraUI uses 24 universal CSS custom properties:

```css
/* Base Canvas */
--ui-background
--ui-foreground

/* Cards & Surfaces */
--ui-card
--ui-card-foreground
--ui-popover
--ui-popover-foreground

/* Brand & Interactive */
--ui-primary
--ui-primary-foreground
--ui-secondary
--ui-secondary-foreground
--ui-accent
--ui-accent-foreground
--ui-destructive
--ui-destructive-foreground

/* Muted & Form Controls */
--ui-muted
--ui-muted-foreground
--ui-border
--ui-input
--ui-ring
--ui-radius

/* Sidebar Navigation */
--ui-sidebar
--ui-sidebar-foreground
--ui-sidebar-primary
--ui-sidebar-accent
```

---

## 3. 9 Cosmic Theme Presets

- **`sky`** (Default Light): Azure blue with clean slate neutrals.
- **`cloud`** (Light): Soft neutral cloud tones.
- **`horizon`** (Light): Warm sunset orange & terracotta.
- **`aurora`** (Dark): Vibrant emerald & teal lights.
- **`twilight`** (Dark): Deep dusk violet & indigo.
- **`midnight`** (Default Dark): Deep contrast canvas with indigo/blue accents.
- **`nebula`** (Dark): Deep cosmic purple & magenta.
- **`eclipse`** (Dark): High-contrast pure black with solar gold accent.
- **`starlight`** (Dark): Dark navy with aquatic teal highlights.

To isolate themes in subtrees without re-rendering the app:

```tsx
import { ThemeScope } from "@soraui/react";

<ThemeScope theme="aurora" mode="dark">
  <aside className="p-4 bg-[var(--ui-background)]">...</aside>
</ThemeScope>;
```

---

## 4. Component Catalog (47 Primitives)

### Level 1: CSS-First Primitives

- `Alert`, `AlertTitle`, `AlertDescription` (`variant="default" | "destructive"`, icon support)
- `AspectRatio` (`ratio={16 / 9}`)
- `Attachment` (`file`, `onRemove`, `size`, `preview`)
- `Button` (`variant="primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"`, `size="sm" | "md" | "lg" | "icon"`)
- `Input` (`size="sm" | "md" | "lg"`, `error?: boolean`)
- `Label` (`required?: boolean`, `disabled?: boolean`)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge` (`variant="default" | "secondary" | "outline" | "destructive" | "success" | "warning"`)
- `Textarea`, `Separator`, `Skeleton`, `Typography`
- `Checkbox`, `Switch`, `NumberInput`, `Breadcrumb`, `Pagination`, `Stepper`, `Progress`, `Avatar`, `Collapsible`, `Timeline`, `Statistic`

### Level 2: Interactive Primitives (A11y Hooks)

- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`
- `Dropdown`, `DropdownTrigger`, `DropdownContent`, `DropdownItem`
- `Popover`, `PopoverTrigger`, `PopoverContent`
- `Tooltip`, `TooltipTrigger`, `TooltipContent`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `Toast`, `ToastProvider`, `useToast`
- `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`
- `RadioGroup`, `RadioGroupItem`
- `Slider`, `InputOTP`, `NavigationMenu`, `Menubar`, `CommandPalette`, `AlertDialog`, `Drawer`, `HoverCard`, `ContextMenu`, `TreeView`

### Level 3: Advanced Composite Primitives

- `DataTable` (Sorting, pagination, column visibility, row selection)
- `Combobox` (Searchable filtering dropdown)
- `DatePicker`, `Calendar`
- `FileUploader` (Drag-and-drop file upload with progress state)

---

## 5. Production Blocks (14) & Full-Page Templates (4)

### Compound Blocks

- **Authentication**: `LoginFormBlock`, `RegisterFormBlock`, `ForgotPasswordBlock`, `ResetPasswordBlock`, `TwoFactorBlock`
- **Dashboard**: `DashboardStatCardsBlock`, `AnalyticsChartCardBlock`, `RecentActivityListBlock`, `QuickActionToolbarBlock`
- **Marketing**: `HeroSectionBlock`, `FeatureGridBlock`, `PricingTableBlock`
- **Settings**: `UserProfileFormBlock`, `AccountSecurityFormBlock`

### Full-Page Templates

- `LoginPageTemplate`
- `DashboardPageTemplate`
- `SaaSLandingPageTemplate`
- `SettingsPageTemplate`

---

## 6. CLI Commands Reference

```bash
# Initialize SoraUI in a project (Next.js, Vite, Laravel, React Router, Astro, Manual)
npx @soraui/cli init

# Add components directly to src/components/ui/
npx @soraui/cli add button dialog data-table

# Add production blocks
npx @soraui/cli add block login-form dashboard-stat-cards

# Add full-page templates
npx @soraui/cli add template dashboard-page

# Diagnostic & project detection
npx @soraui/cli doctor --json
```

---

## 7. AI Model Context Protocol (MCP) Server

Connect Claude Desktop or Cursor to the SoraUI canonical registry:

```json
{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp@latest"]
    }
  }
}
```

Key MCP Tools:

- `soraui_get_context`: Architecture and token rules.
- `soraui_search`: Fuzzy search across components, blocks, and templates.
- `soraui_inspect_component`: TypeScript props, WAI-ARIA roles, and code examples.
- `soraui_compose_recipe`: Deterministic full-page recipe generator.
- `soraui_validate_composition`: Static composition analyzer.
