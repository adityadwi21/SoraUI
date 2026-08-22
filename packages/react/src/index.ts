
/**
 * @soraui/react — Main entry point
 * Exports all 22 SoraUI React components (Level 1, Level 2, Level 3).
 * Each component is independently tree-shakeable.
 */

// Level 1 — Zero/Minimal Runtime Components
export { Button } from './components/button/button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/button/button.types';

export { Input } from './components/input/input';
export type { InputProps, InputSize } from './components/input/input.types';

export { Label } from './components/label/label';
export type { LabelProps } from './components/label/label.types';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/card/card';
export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
} from './components/card/card.types';

export { Badge } from './components/badge/badge';
export type { BadgeProps, BadgeVariant } from './components/badge/badge.types';

export { Textarea } from './components/textarea/textarea';
export type { TextareaProps } from './components/textarea/textarea.types';

export { Separator } from './components/separator/separator';
export type { SeparatorProps, SeparatorOrientation } from './components/separator/separator.types';

export { Skeleton } from './components/skeleton/skeleton';
export type { SkeletonProps } from './components/skeleton/skeleton.types';

export { Typography } from './components/typography/typography';
export type { TypographyProps, TypographyVariant } from './components/typography/typography.types';

// Level 2 — Interactive Components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './components/tooltip/tooltip';
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from './components/tooltip/tooltip.types';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from './components/popover/popover';
export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from './components/popover/popover.types';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './components/tabs/tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsOrientation,
} from './components/tabs/tabs.types';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/accordion/accordion';
export type {
  AccordionProps,
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionType,
} from './components/accordion/accordion.types';

export {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './components/dialog/dialog';
export type {
  DialogProps,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from './components/dialog/dialog.types';

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from './components/dropdown/dropdown';
export type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownSeparatorProps,
  DropdownLabelProps,
} from './components/dropdown/dropdown.types';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './components/select/select';
export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './components/select/select.types';

export {
  ToastProvider,
  useToast,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
} from './components/toast/toast';
export type {
  ToastData,
  ToastProviderProps,
  ToastViewportProps,
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastActionProps,
  ToastVariant,
} from './components/toast/toast.types';

// Level 3 — Advanced Components
export { Calendar } from './components/calendar/calendar';
export type { CalendarProps } from './components/calendar/calendar.types';

export { DatePicker } from './components/date-picker/date-picker';
export type { DatePickerProps } from './components/date-picker/date-picker.types';

export { Combobox } from './components/combobox/combobox';
export type { ComboboxProps, ComboboxOption } from './components/combobox/combobox.types';

export { FileUploader } from './components/file-uploader/file-uploader';
export type { FileUploaderProps, UploadedFile } from './components/file-uploader/file-uploader.types';

export { DataTable } from './components/data-table/data-table';
export type { DataTableProps, DataTableColumn } from './components/data-table/data-table.types';

// Phase 7 — Component Expansion
export { Checkbox } from './components/checkbox/checkbox';
export type { CheckboxProps } from './components/checkbox/checkbox.types';

export { RadioGroup, RadioGroupItem } from './components/radio-group/radio-group';
export type { RadioGroupProps, RadioGroupItemProps } from './components/radio-group/radio-group.types';

export { Switch } from './components/switch/switch';
export type { SwitchProps } from './components/switch/switch.types';

export { Slider } from './components/slider/slider';
export type { SliderProps } from './components/slider/slider.types';

export { InputOTP } from './components/input-otp/input-otp';
export type { InputOTPProps } from './components/input-otp/input-otp.types';

export { NumberInput } from './components/number-input/number-input';
export type { NumberInputProps } from './components/number-input/number-input.types';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './components/breadcrumb/breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
} from './components/breadcrumb/breadcrumb.types';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from './components/navigation-menu/navigation-menu';
export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
} from './components/navigation-menu/navigation-menu.types';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './components/menubar/menubar';
export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
} from './components/menubar/menubar.types';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './components/pagination/pagination';
export type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
} from './components/pagination/pagination.types';

export {
  Stepper,
  StepperItem,
} from './components/stepper/stepper';
export type {
  StepperProps,
  StepperItemProps,
} from './components/stepper/stepper.types';

export {
  CommandPalette,
  CommandItem,
} from './components/command-palette/command-palette';
export type {
  CommandPaletteProps,
  CommandItemProps,
} from './components/command-palette/command-palette.types';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/alert-dialog/alert-dialog';
export type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './components/alert-dialog/alert-dialog.types';

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './components/drawer/drawer';
export type {
  DrawerProps,
  DrawerTriggerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerCloseProps,
  DrawerSide,
} from './components/drawer/drawer.types';

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from './components/hover-card/hover-card';
export type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
} from './components/hover-card/hover-card.types';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './components/context-menu/context-menu';
export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
} from './components/context-menu/context-menu.types';

export { Progress } from './components/progress/progress';
export type { ProgressProps } from './components/progress/progress.types';

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './components/avatar/avatar';
export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from './components/avatar/avatar.types';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './components/collapsible/collapsible';
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './components/collapsible/collapsible.types';

export {
  Timeline,
  TimelineItem,
} from './components/timeline/timeline';
export type {
  TimelineProps,
  TimelineItemProps,
} from './components/timeline/timeline.types';

export { Statistic } from './components/statistic/statistic';
export type { StatisticProps } from './components/statistic/statistic.types';

export { TreeView } from './components/tree-view/tree-view';
export type { TreeViewProps, TreeItemData } from './components/tree-view/tree-view.types';

// Theme Engine & Scope Primitives
export { ThemeProvider } from './theme/theme-provider';
export type { ThemeProviderProps } from './theme/theme-provider';

export { ThemeScope } from './theme/theme-scope';
export type { ThemeScopeProps } from './theme/theme-scope';

export { useTheme } from './theme/use-theme';
export type {
  ThemeMode,
  ResolvedThemeMode,
  ThemeContextValue,
} from './theme/use-theme';

// Phase 9 — Production Blocks
export { LoginForm } from './blocks/auth/login-form';
export type { LoginFormProps } from './blocks/auth/login-form';

export { RegisterForm } from './blocks/auth/register-form';
export type { RegisterFormProps } from './blocks/auth/register-form';

export { ForgotPasswordForm } from './blocks/auth/forgot-password-form';
export type { ForgotPasswordFormProps } from './blocks/auth/forgot-password-form';

export { OTPVerification } from './blocks/auth/otp-verification';
export type { OTPVerificationProps } from './blocks/auth/otp-verification';

export { DashboardShell } from './blocks/dashboard/dashboard-shell';
export type { DashboardShellProps } from './blocks/dashboard/dashboard-shell';

export { MetricGrid } from './blocks/dashboard/metric-grid';
export type { MetricGridProps } from './blocks/dashboard/metric-grid';

export { DataTableBlock } from './blocks/dashboard/data-table-block';
export type { DataTableBlockProps } from './blocks/dashboard/data-table-block';

export { HeroSection } from './blocks/marketing/hero-section';
export type { HeroSectionProps } from './blocks/marketing/hero-section';

export { FeatureGrid } from './blocks/marketing/feature-grid';
export type { FeatureGridProps } from './blocks/marketing/feature-grid';

export { PricingTable } from './blocks/marketing/pricing-table';
export type { PricingTableProps } from './blocks/marketing/pricing-table';

export { FAQSection } from './blocks/marketing/faq-section';
export type { FAQSectionProps } from './blocks/marketing/faq-section';

export { FooterSection } from './blocks/marketing/footer-section';
export type { FooterSectionProps } from './blocks/marketing/footer-section';

export { MultiStepWizard } from './blocks/forms/multi-step-wizard';
export type { MultiStepWizardProps } from './blocks/forms/multi-step-wizard';

export { SettingsForm } from './blocks/forms/settings-form';
export type { SettingsFormProps } from './blocks/forms/settings-form';

export type {
  BlockCategory,
  TemplateCategory,
  BlockMetadata,
  TemplateMetadata,
  SocialProvider,
  MetricItem,
  NavigationItem,
  FeatureItem,
  PricingPlan,
  FAQItem,
  FooterColumn,
  WizardStep,
} from './blocks/types';

// Phase 9 — Page Templates
export { LoginPageTemplate } from './templates/login-page-template';
export type { LoginPageTemplateProps } from './templates/login-page-template';

export { DashboardPageTemplate } from './templates/dashboard-page-template';
export type { DashboardPageTemplateProps } from './templates/dashboard-page-template';

export { SaaSLandingPageTemplate } from './templates/saas-landing-page-template';
export type { SaaSLandingPageTemplateProps } from './templates/saas-landing-page-template';

export { SettingsPageTemplate } from './templates/settings-page-template';
export type { SettingsPageTemplateProps } from './templates/settings-page-template';