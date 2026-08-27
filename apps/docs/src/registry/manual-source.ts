export function getManualComponentCode(id: string, name: string): string {
  switch (id) {
    case "accordion":
      return `"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (val: string) => void;
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
}
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export function Accordion({ type = "single", defaultValue, children, className = "" }: any) {
  const [openItems, setOpenItems] = React.useState<string[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggleItem = (val: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(val) ? [] : [val];
      }
      return prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={\`sora-accordion \${className}\`.trim()}>{children}</div>
    </AccordionContext.Provider>
  );
}

export const AccordionItem = ({ value, children, className = "" }: any) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={\`sora-accordion__item \${className}\`.trim()}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children, className = "" }: any) => {
  const rootCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);
  const value = itemCtx?.value ?? "";
  const isOpen = rootCtx?.openItems.includes(value);

  return (
    <h3 className="sora-accordion__heading">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => rootCtx?.toggleItem(value)}
        className={\`sora-accordion__trigger \${isOpen ? "sora-accordion__trigger--open" : ""} \${className}\`.trim()}
      >
        <span className="sora-accordion__trigger-text">{children}</span>
        <ChevronDown size={16} className="sora-accordion__chevron" aria-hidden="true" />
      </button>
    </h3>
  );
};

export const AccordionContent = ({ children, className = "" }: any) => {
  const rootCtx = React.useContext(AccordionContext);
  const itemCtx = React.useContext(AccordionItemContext);
  const value = itemCtx?.value ?? "";
  const isOpen = rootCtx?.openItems.includes(value);

  if (!isOpen) return null;
  return (
    <div className={\`sora-accordion__content \${className}\`.trim()}>
      <div className="sora-accordion__body">{children}</div>
    </div>
  );
};
`;

    case "alert":
      return `"use client";

import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={\`sora-alert sora-alert--\${variant} \${className}\`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h5 ref={ref} className={\`sora-alert__title \${className}\`.trim()} {...props} />
  )
);
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-alert__description \${className}\`.trim()} {...props} />
  )
);
AlertDescription.displayName = "AlertDescription";
`;

    case "aspect-ratio":
      return `"use client";

import * as React from "react";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, style, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`sora-aspect-ratio \${className}\`.trim()}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: \`\${(1 / ratio) * 100}%\`,
          ...style,
        }}
        {...props}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          className="sora-aspect-ratio__content"
        >
          {children}
        </div>
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";
`;

    case "attachment":
      return `"use client";

import * as React from "react";
import { FileText, Image, Video, Music, Archive, Code, File, X } from "lucide-react";

export function Attachment({ layout = "list", className = "", children, ...props }: any) {
  return (
    <div className={\`sora-attachment-group sora-attachment-group--\${layout} \${className}\`.trim()} {...props}>
      {children}
    </div>
  );
}

export function AttachmentItem({ elevated, className = "", children, ...props }: any) {
  return (
    <div className={\`sora-attachment-item \${elevated ? "sora-attachment-item--elevated" : ""} \${className}\`.trim()} {...props}>
      {children}
    </div>
  );
}

export function AttachmentIcon({ type = "file", className = "", children, ...props }: any) {
  const defaultIcon = {
    pdf: <FileText size={18} />,
    document: <FileText size={18} />,
    image: <Image size={18} />,
    video: <Video size={18} />,
    audio: <Music size={18} />,
    archive: <Archive size={18} />,
    code: <Code size={18} />,
    file: <File size={18} />,
  }[type as string] || <File size={18} />;

  return (
    <div className={\`sora-attachment-icon sora-attachment-icon--\${type} \${className}\`.trim()} {...props}>
      {children || defaultIcon}
    </div>
  );
}

export function AttachmentPreview({ src, alt = "", className = "", children, ...props }: any) {
  return (
    <div className={\`sora-attachment-preview \${className}\`.trim()} {...props}>
      {src ? <img src={src} alt={alt} className="sora-attachment-preview__img" /> : children}
    </div>
  );
}

export function AttachmentInfo({ className = "", children, ...props }: any) {
  return <div className={\`sora-attachment-info \${className}\`.trim()} {...props}>{children}</div>;
}

export function AttachmentName({ className = "", children, ...props }: any) {
  return <span className={\`sora-attachment-name \${className}\`.trim()} {...props}>{children}</span>;
}

export function AttachmentSize({ className = "", children, ...props }: any) {
  return <span className={\`sora-attachment-size \${className}\`.trim()} {...props}>{children}</span>;
}

export function AttachmentProgress({ value = 0, className = "", ...props }: any) {
  return (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className={\`sora-attachment-progress \${className}\`.trim()} {...props}>
      <div className="sora-attachment-progress__bar" style={{ width: \`\${Math.min(100, Math.max(0, value))}%\` }} />
    </div>
  );
}

export function AttachmentActions({ className = "", children, ...props }: any) {
  return <div className={\`sora-attachment-actions \${className}\`.trim()} {...props}>{children}</div>;
}

export function AttachmentRemove({ className = "", onClick, ...props }: any) {
  return (
    <button type="button" aria-label="Remove attachment" onClick={onClick} className={\`sora-attachment-remove \${className}\`.trim()} {...props}>
      <X size={14} />
    </button>
  );
}
`;

    case "alert-dialog":
      return `"use client";

import * as React from "react";

interface AlertContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const AlertContext = React.createContext<AlertContextValue | null>(null);

export function AlertDialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: any) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <AlertContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertContext.Provider>
  );
}

export const AlertDialogTrigger = ({ children, ...props }: any) => {
  const ctx = React.useContext(AlertContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(true)} {...props}>
      {children}
    </button>
  );
};

export const AlertDialogContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(AlertContext);
  if (!ctx?.open) return null;

  return (
    <div className="sora-alert-dialog__overlay" onClick={() => ctx.setOpen(false)}>
      <div
        role="alertdialog"
        aria-modal="true"
        className={\`sora-alert-dialog__content \${className}\`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const AlertDialogHeader = ({ className = "", ...props }: any) => (
  <div className={\`sora-alert-dialog__header \${className}\`.trim()} {...props} />
);

export const AlertDialogTitle = ({ className = "", ...props }: any) => (
  <h2 className={\`sora-alert-dialog__title \${className}\`.trim()} {...props} />
);

export const AlertDialogDescription = ({ className = "", ...props }: any) => (
  <p className={\`sora-alert-dialog__description \${className}\`.trim()} {...props} />
);

export const AlertDialogFooter = ({ className = "", ...props }: any) => (
  <div className={\`sora-alert-dialog__footer \${className}\`.trim()} {...props} />
);

export const AlertDialogAction = ({ children, onClick, ...props }: any) => {
  const ctx = React.useContext(AlertContext);
  return (
    <button
      type="button"
      className="sora-button sora-button--destructive sora-button--md"
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export const AlertDialogCancel = ({ children = "Cancel", onClick, ...props }: any) => {
  const ctx = React.useContext(AlertContext);
  return (
    <button
      type="button"
      className="sora-button sora-button--outline sora-button--md"
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
`;

    case "avatar":
      return `"use client";

import * as React from "react";

export function Avatar({ size = "md", className = "", children, ...props }: any) {
  return (
    <div className={\`sora-avatar sora-avatar--\${size} \${className}\`.trim()} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className = "", ...props }: any) {
  const [hasError, setHasError] = React.useState(false);
  if (!src || hasError) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={\`sora-avatar__image \${className}\`.trim()}
      {...props}
    />
  );
}

export function AvatarFallback({ children, className = "", ...props }: any) {
  return (
    <span className={\`sora-avatar__fallback \${className}\`.trim()} {...props}>
      {children}
    </span>
  );
}
`;

    case "badge":
      return `"use client";

import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
  return (
    <span className={\`sora-badge sora-badge--\${variant} sora-badge--\${size} \${className}\`.trim()} {...props}>
      {children}
    </span>
  );
};
Badge.displayName = "Badge";
`;

    case "breadcrumb":
      return `"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";

export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className = "", ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={\`sora-breadcrumb \${className}\`.trim()} {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className = "", ...props }, ref) => (
    <ol ref={ref} className={\`sora-breadcrumb__list \${className}\`.trim()} {...props} />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className = "", ...props }, ref) => (
    <li ref={ref} className={\`sora-breadcrumb__item \${className}\`.trim()} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ asChild = false, className = "", children, ...props }, ref) => {
  const linkClass = \`sora-breadcrumb__link \${className}\`.trim();
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      className: \`\${linkClass} \${(children.props as any)?.className || ""}\`.trim(),
      ...props,
    });
  }
  return (
    <a ref={ref} className={linkClass} {...props}>
      {children}
    </a>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className = "", ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={\`sora-breadcrumb__page \${className}\`.trim()}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({ children, className = "", ...props }: any) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={\`sora-breadcrumb__separator \${className}\`.trim()}
    {...props}
  >
    {children ?? <ChevronRight size={14} aria-hidden="true" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({ children, className = "", ...props }: any) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={\`sora-breadcrumb__ellipsis \${className}\`.trim()}
    {...props}
  >
    {children ?? (
      <>
        <MoreHorizontal size={16} aria-hidden="true" />
        <span className="sora-sr-only">More</span>
      </>
    )}
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
`;

    case "button":
      return `"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  rounded?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", rounded = false, loading = false, disabled, asChild = false, className = "", children, ...props }, ref) => {
    const isDisabled = disabled ?? loading;
    const btnClass = \`sora-button sora-button--\${variant} sora-button--\${size} \${rounded ? "sora-button--rounded" : ""} \${className}\`.trim();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        className: \`\${btnClass} \${(children.props as any)?.className || ""}\`.trim(),
        "aria-disabled": isDisabled || undefined,
        "data-loading": loading ? "true" : undefined,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        className={btnClass}
        {...props}
      >
        {loading && <span className="sora-button__spinner" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} role="group" className={\`sora-button-group \${className}\`.trim()} {...props}>
      {children}
    </div>
  )
);
ButtonGroup.displayName = "ButtonGroup";
`;

    case "calendar":
      return `"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DateRange {
  from?: Date | undefined;
  to?: Date | undefined;
}

export type CalendarMode = "single" | "range" | "multiple";
export type CaptionLayout = "label" | "dropdown" | "dropdown-buttons";

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "onSelect"> {
  mode?: CalendarMode;
  selected?: Date | Date[] | DateRange | null;
  defaultSelected?: Date | Date[] | DateRange | null;
  onSelect?: (val: any) => void;
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date) => void;
  locale?: string | { code?: string };
  calendarSystem?: "gregory" | "persian" | "islamic" | "islamic-umalqura" | "hebrew" | "buddhist";
  formatters?: {
    formatMonthTitle?: (date: Date, locale?: string) => string;
    formatWeekdayName?: (dayIndex: number, date: Date, locale?: string) => string;
    formatDay?: (date: Date, locale?: string) => string;
    formatMonthDropdown?: (monthIndex: number, date: Date, locale?: string) => string;
  };
  timeZone?: string;
  showWeekNumber?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  captionLayout?: CaptionLayout;
  fromYear?: number;
  toYear?: number;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = "single",
      selected,
      defaultSelected,
      onSelect,
      value: legacyValue,
      defaultValue: legacyDefaultValue,
      onValueChange: legacyOnValueChange,
      locale,
      calendarSystem,
      formatters,
      timeZone,
      showWeekNumber = false,
      minDate,
      maxDate,
      isDateDisabled,
      numberOfMonths = 1,
      showOutsideDays = true,
      fixedWeeks = false,
      weekStartsOn = 0,
      captionLayout = "label",
      fromYear = 1950,
      toYear = 2050,
      className = "",
      ...props
    },
    ref
  ) => {
    const controlledVal = selected !== undefined ? selected : legacyValue;
    const isControlled = controlledVal !== undefined;
    const [uncontrolledVal, setUncontrolledVal] = React.useState(defaultSelected ?? legacyDefaultValue ?? null);
    const currentSelected = isControlled ? controlledVal : uncontrolledVal;

    const initialDate = currentSelected instanceof Date ? currentSelected : new Date();
    const [viewDate, setViewDate] = React.useState(initialDate);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const isSameDay = (a?: Date | null, b?: Date | null) =>
      !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    const isSameMonth = (a?: Date | null, b?: Date | null) =>
      !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

    const handleSelect = (targetDate: Date) => {
      if (mode === "single") {
        const next = isSameDay(currentSelected as Date, targetDate) ? undefined : targetDate;
        if (!isControlled) setUncontrolledVal(next);
        onSelect?.(next);
        if (next) legacyOnValueChange?.(next);
      } else if (mode === "range") {
        const prev = (currentSelected || {}) as DateRange;
        let next: DateRange;
        if (!prev.from || (prev.from && prev.to)) {
          next = { from: targetDate, to: undefined };
        } else {
          next = targetDate < prev.from ? { from: targetDate, to: prev.from } : { from: prev.from, to: targetDate };
        }
        if (!isControlled) setUncontrolledVal(next);
        onSelect?.(next);
      } else if (mode === "multiple") {
        const prev = Array.isArray(currentSelected) ? currentSelected : [];
        const exists = prev.some((d) => isSameDay(d, targetDate));
        const next = exists ? prev.filter((d) => !isSameDay(d, targetDate)) : [...prev, targetDate];
        if (!isControlled) setUncontrolledVal(next);
        onSelect?.(next);
      }
    };

    return (
      <div ref={ref} className={\`sora-calendar \${numberOfMonths > 1 ? "sora-calendar--multiple-months" : ""} \${className}\`.trim()} {...props}>
        <div className="sora-calendar__months">
          {Array.from({ length: numberOfMonths }).map((_, mIdx) => {
            const mDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + mIdx, 1);
            const mYear = mDate.getFullYear();
            const mMonth = mDate.getMonth();
            const daysInMonth = new Date(mYear, mMonth + 1, 0).getDate();
            const startWeekday = (new Date(mYear, mMonth, 1).getDay() - weekStartsOn + 7) % 7;
            const daysInPrevMonth = new Date(mYear, mMonth, 0).getDate();

            const cells: { date: Date; isOutside: boolean; dayNumber: number }[] = [];
            for (let i = startWeekday - 1; i >= 0; i--) {
              cells.push({
                date: new Date(mYear, mMonth - 1, daysInPrevMonth - i),
                isOutside: true,
                dayNumber: daysInPrevMonth - i,
              });
            }
            for (let d = 1; d <= daysInMonth; d++) {
              cells.push({
                date: new Date(mYear, mMonth, d),
                isOutside: false,
                dayNumber: d,
              });
            }
            const totalRows = Math.ceil(cells.length / 7);
            const remaining = totalRows * 7 - cells.length;
            for (let d = 1; d <= remaining; d++) {
              cells.push({
                date: new Date(mYear, mMonth + 1, d),
                isOutside: true,
                dayNumber: d,
              });
            }

            const weeks: (typeof cells)[] = [];
            for (let i = 0; i < cells.length; i += 7) {
              weeks.push(cells.slice(i, i + 7));
            }

            return (
              <div key={mIdx} className="sora-calendar__month">
                <div className="sora-calendar__header">
                  {mIdx === 0 ? (
                    <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} aria-label="Previous month" className="sora-calendar__nav-btn">
                      <ChevronLeft size={16} aria-hidden="true" />
                    </button>
                  ) : <span className="sora-calendar__nav-placeholder" />}

                  <div className="sora-calendar__title">{monthNames[mMonth]} {mYear}</div>

                  {mIdx === numberOfMonths - 1 ? (
                    <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} aria-label="Next month" className="sora-calendar__nav-btn">
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  ) : <span className="sora-calendar__nav-placeholder" />}
                </div>

                <div role="grid" className="sora-calendar__grid">
                  <div role="row" className="sora-calendar__weekdays">
                    {weekdayNames.map((wd) => (
                      <span key={wd} role="columnheader" className="sora-calendar__weekday">{wd}</span>
                    ))}
                  </div>
                  <div className="sora-calendar__days">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} role="row" className="sora-calendar__week-row">
                        {week.map((cell, cIdx) => {
                          const today = new Date();
                          const isToday = isSameDay(today, cell.date);
                          let isSelected = false;

                          if (mode === "single") {
                            isSelected = currentSelected instanceof Date && isSameDay(currentSelected, cell.date);
                          } else if (mode === "multiple") {
                            isSelected = Array.isArray(currentSelected) && currentSelected.some((d) => isSameDay(d, cell.date));
                          }

                          let isStart = false;
                          let isEnd = false;
                          let inRange = false;
                          if (mode === "range" && currentSelected && typeof currentSelected === "object") {
                            const { from, to } = currentSelected as DateRange;
                            if (from && isSameDay(from, cell.date)) isStart = true;
                            if (to && isSameDay(to, cell.date)) isEnd = true;
                            if (from && to && cell.date > from && cell.date < to) inRange = true;
                          }

                          return (
                            <button
                              key={cIdx}
                              type="button"
                              role="gridcell"
                              aria-selected={isSelected || isStart || isEnd || inRange}
                              onClick={() => handleSelect(cell.date)}
                              className={\`sora-calendar__day \${(isSelected || isStart || isEnd) ? "sora-calendar__day--selected" : ""} \${isStart ? "sora-calendar__day--range-start" : ""} \${isEnd ? "sora-calendar__day--range-end" : ""} \${inRange ? "sora-calendar__day--range-middle" : ""} \${isToday ? "sora-calendar__day--today" : ""} \${cell.isOutside ? "sora-calendar__day--outside" : ""}\`.trim()}
                            >
                              {cell.dayNumber}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";
`;

    case "card":
      return `"use client";

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm";
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ size = "default", elevated, className = "", ...props }, ref) => (
    <div
      ref={ref}
      data-size={size}
      className={\`sora-card \${size === "sm" ? "sora-card--sm" : ""} \${elevated ? "sora-card--elevated" : ""} \${className}\`.trim()}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__header \${className}\`.trim()} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={\`sora-card__title \${className}\`.trim()} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={\`sora-card__description \${className}\`.trim()} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__action \${className}\`.trim()} {...props} />
  )
);
CardAction.displayName = "CardAction";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__content \${className}\`.trim()} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`sora-card__footer \${className}\`.trim()} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
`;

    case "checkbox":
      return `"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked" | "defaultChecked"> {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, className = "", id, ...props }, ref) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean | "indeterminate">(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const innerRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = isChecked === "indeterminate";
      }
    }, [isChecked]);

    const isTrueChecked = isChecked === true;
    const isIndeterminate = isChecked === "indeterminate";

    return (
      <label className={\`sora-checkbox \${disabled ? "sora-checkbox--disabled" : ""} \${className}\`.trim()}>
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as any).current = node;
          }}
          id={id}
          type="checkbox"
          checked={isTrueChecked}
          disabled={disabled}
          onChange={(e) => {
            if (disabled) return;
            const next = isChecked === "indeterminate" ? true : e.target.checked;
            if (!isControlled) setUncontrolledChecked(next);
            onCheckedChange?.(next);
          }}
          className="sora-checkbox__input"
          {...props}
        />
        <span
          className={\`sora-checkbox__box \${isTrueChecked || isIndeterminate ? "sora-checkbox__box--checked" : ""} \${isIndeterminate ? "sora-checkbox__box--indeterminate" : ""}\`.trim()}
          aria-hidden="true"
        >
          {isTrueChecked && <Check size={12} strokeWidth={3} className="sora-checkbox__icon" />}
          {isIndeterminate && <Minus size={12} strokeWidth={3} className="sora-checkbox__icon" />}
        </span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
`;

case "collapsible":
      return `"use client";

import * as React from "react";

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, className = "", ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const toggle = () => {
      if (disabled) return;
      const next = !open;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    };

    return (
      <CollapsibleContext.Provider value={{ open, toggle, disabled }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={\`sora-collapsible \${disabled ? "sora-collapsible--disabled" : ""} \${className}\`.trim()}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ asChild = false, onClick, disabled, children, className = "", ...props }, ref) => {
    const ctx = React.useContext(CollapsibleContext);
    const isDisabled = disabled || (ctx?.disabled ?? false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      onClick?.(e);
      ctx?.toggle();
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ...props,
        ref,
        disabled: isDisabled || (children.props as any)?.disabled,
        "aria-expanded": ctx?.open,
        "data-state": ctx?.open ? "open" : "closed",
        "data-disabled": isDisabled ? "" : undefined,
        className: \`\${(children.props as any)?.className || ""} \${className}\`.trim(),
        onClick: (e: any) => {
          (children.props as any)?.onClick?.(e);
          handleClick(e);
        },
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-expanded={ctx?.open}
        data-state={ctx?.open ? "open" : "closed"}
        data-disabled={isDisabled ? "" : undefined}
        onClick={handleClick}
        className={\`sora-collapsible__trigger \${className}\`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    const ctx = React.useContext(CollapsibleContext);
    if (!ctx?.open) return null;
    return (
      <div ref={ref} data-state="open" className={\`sora-collapsible__content \${className}\`.trim()} {...props}>
        {children}
      </div>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";
`;

    case "combobox":
      return `"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X, Loader2 } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: React.ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  dir?: "ltr" | "rtl" | "auto";
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      placeholder = "Search...",
      emptyText = "No options found.",
      disabled = false,
      clearable = false,
      loading = false,
      dir,
      className = "",
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const listboxId = React.useId();

    const selectedOption = options.find((opt) => opt.value === value);
    const filteredOptions = options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) return;
      if (!isControlled) setUncontrolledValue(option.value);
      onValueChange?.(option.value);
      setSearchQuery("");
      setOpen(false);
      inputRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (!isControlled) setUncontrolledValue("");
      onValueChange?.("");
      setSearchQuery("");
      inputRef.current?.focus();
    };

    return (
      <div ref={ref} dir={dir} className={\`sora-combobox \${className}\`.trim()} {...props}>
        <div
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
              inputRef.current?.focus();
            }
          }}
          className={\`sora-combobox__trigger \${open ? "sora-combobox__trigger--open" : ""} \${disabled ? "sora-combobox__trigger--disabled" : ""}\`.trim()}
        >
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-busy={loading ? "true" : undefined}
            disabled={disabled}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!open) setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!open) setOpen(true);
                else setHighlightedIndex((prev) => (prev + 1) % (filteredOptions.length || 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!open) setOpen(true);
                else setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % (filteredOptions.length || 1));
              } else if (e.key === "Enter") {
                const sel = filteredOptions[highlightedIndex];
                if (open && sel) {
                  e.preventDefault();
                  handleSelect(sel);
                }
              } else if (e.key === "Escape") {
                if (open) {
                  e.preventDefault();
                  setOpen(false);
                  setSearchQuery("");
                }
              } else if (e.key === "Backspace" && clearable && searchQuery === "" && value && !disabled) {
                e.preventDefault();
                if (!isControlled) setUncontrolledValue("");
                onValueChange?.("");
              }
            }}
            className="sora-combobox__input"
          />

          <div className="sora-combobox__actions">
            {clearable && value && !disabled && (
              <button
                type="button"
                tabIndex={-1}
                aria-label="Clear selection"
                onClick={handleClear}
                className="sora-combobox__clear"
              >
                <X size={13} aria-hidden="true" />
              </button>
            )}

            {loading ? (
              <Loader2 size={14} className="sora-combobox__spinner" aria-hidden="true" />
            ) : (
              <ChevronsUpDown size={14} className="sora-combobox__icon" aria-hidden="true" />
            )}
          </div>
        </div>

        {open && (
          <div role="listbox" id={listboxId} dir={dir} className="sora-combobox__content">
            {filteredOptions.length === 0 ? (
              <div className="sora-combobox__empty">{emptyText}</div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled ? "true" : undefined}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={\`sora-combobox__item \${isSelected ? "sora-combobox__item--selected" : ""} \${isHighlighted ? "sora-combobox__item--highlighted" : ""} \${opt.disabled ? "sora-combobox__item--disabled" : ""}\`.trim()}
                  >
                    {opt.icon && <span className="sora-combobox__item-icon" aria-hidden="true">{opt.icon}</span>}
                    <div className="sora-combobox__item-text">
                      <span className="sora-combobox__item-label">{opt.label}</span>
                      {opt.description && <span className="sora-combobox__item-desc">{opt.description}</span>}
                    </div>
                    {isSelected && <Check size={14} className="sora-combobox__item-check" aria-hidden="true" />}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);
Combobox.displayName = "Combobox";
`;

    case "command-palette":
      return `"use client";

import * as React from "react";
import { Search } from "lucide-react";

export function CommandPalette({ open, onClose, items = [] }: any) {
  const [query, setQuery] = React.useState("");

  if (!open) return null;

  const filtered = query === "" ? items : items.filter((i: any) =>
    i.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sora-command__overlay" onClick={onClose}>
      <div className="sora-command__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="sora-command__search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="sora-command__list">
          {filtered.map((item: any, idx: number) => (
            <div
              key={idx}
              className="sora-command__item"
              onClick={() => {
                item.onSelect?.();
                onClose?.();
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

    case "context-menu":
      return `"use client";

import * as React from "react";

export function ContextMenu({ children }: any) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
      onClick={() => setPos(null)}
      className="sora-context-menu__wrapper"
    >
      {children}
      {pos && (
        <div
          className="sora-context-menu__content"
          style={{ top: pos.y, left: pos.x, position: "fixed" }}
        >
          <div className="sora-context-menu__item">Back</div>
          <div className="sora-context-menu__item">Forward</div>
          <div className="sora-context-menu__item">Reload</div>
        </div>
      )}
    </div>
  );
}
`;

    case "data-table":
      return `"use client";

import * as React from "react";

export function DataTable({ columns = [], data = [], className = "" }: any) {
  return (
    <div className={\`sora-data-table \${className}\`.trim()}>
      <table className="sora-data-table__table">
        <thead>
          <tr>
            {columns.map((col: any, i: number) => (
              <th key={i}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i}>
              {columns.map((col: any, j: number) => (
                <td key={j}>{typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`;

    case "date-picker":
      return `"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";

export function DatePicker({ value, onChange, placeholder = "Pick a date" }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sora-date-picker">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="sora-date-picker__trigger"
      >
        <CalendarIcon size={14} />
        <span>{value ? value.toLocaleDateString() : placeholder}</span>
      </button>
      {open && (
        <div className="sora-date-picker__popover">
          <Calendar
            value={value}
            onChange={(d: Date) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
`;

    case "dialog":
      return `"use client";

import * as React from "react";
import { X } from "lucide-react";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: any) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export const DialogTrigger = ({ children, ...props }: any) => {
  const ctx = React.useContext(DialogContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(true)} {...props}>
      {children}
    </button>
  );
};

export const DialogContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(DialogContext);
  if (!ctx?.open) return null;

  return (
    <div className="sora-dialog__overlay" onClick={() => ctx.setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        className={\`sora-dialog__content \${className}\`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          type="button"
          aria-label="Close"
          className="sora-dialog__close"
          onClick={() => ctx.setOpen(false)}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export const DialogHeader = ({ className = "", ...props }: any) => (
  <div className={\`sora-dialog__header \${className}\`.trim()} {...props} />
);

export const DialogTitle = ({ className = "", ...props }: any) => (
  <h2 className={\`sora-dialog__title \${className}\`.trim()} {...props} />
);

export const DialogDescription = ({ className = "", ...props }: any) => (
  <p className={\`sora-dialog__description \${className}\`.trim()} {...props} />
);

export const DialogFooter = ({ className = "", ...props }: any) => (
  <div className={\`sora-dialog__footer \${className}\`.trim()} {...props} />
);
`;

    case "drawer":
      return `"use client";

import * as React from "react";
import { X } from "lucide-react";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DrawerContext = React.createContext<DrawerContextValue | null>(null);

export function Drawer({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: any) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const DrawerTrigger = ({ children, ...props }: any) => {
  const ctx = React.useContext(DrawerContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(true)} {...props}>
      {children}
    </button>
  );
};

export const DrawerContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(DrawerContext);
  if (!ctx?.open) return null;

  return (
    <div className="sora-drawer__overlay" onClick={() => ctx.setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        className={\`sora-drawer__content \${className}\`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DrawerHeader = ({ className = "", ...props }: any) => (
  <div className={\`sora-drawer__header \${className}\`.trim()} {...props} />
);

export const DrawerTitle = ({ className = "", ...props }: any) => (
  <h2 className={\`sora-drawer__title \${className}\`.trim()} {...props} />
);

export const DrawerDescription = ({ className = "", ...props }: any) => (
  <p className={\`sora-drawer__description \${className}\`.trim()} {...props} />
);

export const DrawerFooter = ({ className = "", ...props }: any) => (
  <div className={\`sora-drawer__footer \${className}\`.trim()} {...props} />
);
`;

    case "dropdown":
      return `"use client";

import * as React from "react";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function Dropdown({ children }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="sora-dropdown">{children}</div>
    </DropdownContext.Provider>
  );
}

export const DropdownTrigger = ({ children, ...props }: any) => {
  const ctx = React.useContext(DropdownContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(!ctx.open)} {...props}>
      {children}
    </button>
  );
};

export const DropdownContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(DropdownContext);
  if (!ctx?.open) return null;
  return <div className={\`sora-dropdown__content \${className}\`.trim()}>{children}</div>;
};

export const DropdownItem = ({ children, onClick, className = "", ...props }: any) => {
  const ctx = React.useContext(DropdownContext);
  return (
    <div
      role="menuitem"
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      className={\`sora-dropdown__item \${className}\`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownSeparator = ({ className = "" }: any) => (
  <div className={\`sora-dropdown__separator \${className}\`.trim()} />
);
`;

    case "file-uploader":
      return `"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";

export function FileUploader({ onFilesSelected, accept, multiple = false }: any) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="sora-file-uploader"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFilesSelected?.(Array.from(e.target.files || []))}
        style={{ display: "none" }}
      />
      <UploadCloud size={24} className="sora-file-uploader__icon" />
      <p className="sora-file-uploader__text">Drag and drop files here, or click to browse</p>
    </div>
  );
}
`;

    case "hover-card":
      return `"use client";

import * as React from "react";

export function HoverCard({ children }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="sora-hover-card"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { open } as any) : child
      )}
    </div>
  );
}

export const HoverCardTrigger = ({ children, ...props }: any) => <span {...props}>{children}</span>;

export const HoverCardContent = ({ open, children, className = "" }: any) => {
  if (!open) return null;
  return <div className={\`sora-hover-card__content \${className}\`.trim()}>{children}</div>;
};
`;

    case "input":
      return `"use client";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", error = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={\`sora-input sora-input--\${size} \${error ? "sora-input--error" : ""} \${className}\`.trim()}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
`;

    case "input-otp":
      return `"use client";

import * as React from "react";

export function InputOTP({ length = 6, value = "", onChange }: any) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.slice(-1);
    const newArr = value.split("");
    newArr[idx] = val;
    const newVal = newArr.join("");
    onChange?.(newVal);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="sora-input-otp">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          maxLength={1}
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          className="sora-input-otp__slot"
        />
      ))}
    </div>
  );
}
`;

    case "label":
      return `"use client";

import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, disabled, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={\`sora-label \${disabled ? "sora-label--disabled" : ""} \${className}\`.trim()}
        {...props}
      >
        {children}
        {required && (
          <span className="sora-label__required" aria-hidden="true" style={{ color: "var(--ui-destructive, #ef4444)", marginLeft: "0.25rem" }}>
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";
`;

    case "menubar":
      return `"use client";

import * as React from "react";

export function Menubar({ children, className = "" }: any) {
  return <div role="menubar" className={\`sora-menubar \${className}\`.trim()}>{children}</div>;
}

export const MenubarMenu = ({ children }: any) => <div className="sora-menubar__menu">{children}</div>;
export const MenubarTrigger = ({ children, ...props }: any) => (
  <button type="button" className="sora-menubar__trigger" {...props}>{children}</button>
);
export const MenubarContent = ({ children, className = "" }: any) => (
  <div className={\`sora-menubar__content \${className}\`.trim()}>{children}</div>
);
export const MenubarItem = ({ children, className = "", ...props }: any) => (
  <div role="menuitem" className={\`sora-menubar__item \${className}\`.trim()} {...props}>{children}</div>
);
`;

    case "navigation-menu":
      return `"use client";

import * as React from "react";

export function NavigationMenu({ children, className = "" }: any) {
  return <nav className={\`sora-nav-menu \${className}\`.trim()}>{children}</nav>;
}

export const NavigationMenuList = ({ children, className = "" }: any) => (
  <ul className={\`sora-nav-menu__list \${className}\`.trim()}>{children}</ul>
);
export const NavigationMenuItem = ({ children, className = "" }: any) => (
  <li className={\`sora-nav-menu__item \${className}\`.trim()}>{children}</li>
);
export const NavigationMenuTrigger = ({ children, ...props }: any) => (
  <button type="button" className="sora-nav-menu__trigger" {...props}>{children}</button>
);
export const NavigationMenuContent = ({ children, className = "" }: any) => (
  <div className={\`sora-nav-menu__content \${className}\`.trim()}>{children}</div>
);
`;

    case "number-input":
      return `"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";

export function NumberInput({ value = 0, onChange, min, max, step = 1, className = "" }: any) {
  const inc = () => onChange?.(max !== undefined ? Math.min(max, value + step) : value + step);
  const dec = () => onChange?.(min !== undefined ? Math.max(min, value - step) : value - step);

  return (
    <div className={\`sora-number-input \${className}\`.trim()}>
      <button type="button" onClick={dec} className="sora-number-input__btn"><Minus size={14} /></button>
      <input type="number" value={value} onChange={(e) => onChange?.(Number(e.target.value))} className="sora-number-input__field" />
      <button type="button" onClick={inc} className="sora-number-input__btn"><Plus size={14} /></button>
    </div>
  );
}
`;

    case "pagination":
      return `"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ className = "", children, ...props }: any) {
  return <nav aria-label="pagination" className={\`sora-pagination \${className}\`.trim()} {...props}>{children}</nav>;
}

export const PaginationContent = ({ className = "", ...props }: any) => (
  <ul className={\`sora-pagination__content \${className}\`.trim()} {...props} />
);
export const PaginationItem = ({ className = "", ...props }: any) => (
  <li className={\`sora-pagination__item \${className}\`.trim()} {...props} />
);
export const PaginationLink = ({ isActive, className = "", ...props }: any) => (
  <a className={\`sora-pagination__link \${isActive ? "sora-pagination__link--active" : ""} \${className}\`.trim()} {...props} />
);
export const PaginationPrevious = ({ ...props }: any) => (
  <a className="sora-pagination__link sora-pagination__prev" {...props}><ChevronLeft size={16} /> <span>Previous</span></a>
);
export const PaginationNext = ({ ...props }: any) => (
  <a className="sora-pagination__link sora-pagination__next" {...props}><span>Next</span> <ChevronRight size={16} /></a>
);
`;

    case "popover":
      return `"use client";

import * as React from "react";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function Popover({ children }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="sora-popover">{children}</div>
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = ({ children, ...props }: any) => {
  const ctx = React.useContext(PopoverContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(!ctx.open)} {...props}>
      {children}
    </button>
  );
};

export const PopoverContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx?.open) return null;
  return <div className={\`sora-popover__content \${className}\`.trim()}>{children}</div>;
};
`;

    case "progress":
      return `"use client";

import * as React from "react";

export function Progress({ value = 0, max = 100, className = "", ...props }: any) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={\`sora-progress \${className}\`.trim()}
      {...props}
    >
      <div
        className="sora-progress__indicator"
        style={{ width: \`\${percentage}%\` }}
      />
    </div>
  );
}
`;

    case "radio-group":
      return `"use client";

import * as React from "react";

interface RadioGroupContextValue {
  value: string;
  setValue: (val: string) => void;
  name: string;
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export function RadioGroup({ defaultValue = "", value: controlledValue, onValueChange, name = "sora-radio", children, className = "" }: any) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value, setValue, name }}>
      <div role="radiogroup" className={\`sora-radio-group \${className}\`.trim()}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

export const RadioGroupItem = ({ value, id, disabled, className = "", ...props }: any) => {
  const ctx = React.useContext(RadioGroupContext);
  const isChecked = ctx?.value === value;

  return (
    <label className={\`sora-radio-item \${disabled ? "sora-radio-item--disabled" : ""} \${className}\`.trim()}>
      <input
        type="radio"
        id={id}
        name={ctx?.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        onChange={() => ctx?.setValue(value)}
        className="sora-radio-item__input"
        {...props}
      />
      <span className="sora-radio-item__circle">
        {isChecked && <span className="sora-radio-item__dot" />}
      </span>
    </label>
  );
};
`;

    case "select":
      return `"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectContextValue {
  value: string;
  setValue: (value: string, label: string) => void;
  selectedLabel: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
}
const SelectContext = React.createContext<SelectContextValue | null>(null);

export function Select({ defaultValue = "", value: controlledValue, onValueChange, disabled, children }: any) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [selectedLabel, setSelectedLabel] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const setValue = (nextValue: string, nextLabel: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    setSelectedLabel(nextLabel);
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, setValue, selectedLabel, open, setOpen, disabled }}>
      <div className="sora-select">{children}</div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, any>(
  ({ className = "", children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    return (
      <button
        ref={ref}
        type="button"
        disabled={ctx?.disabled}
        onClick={() => ctx?.setOpen(!ctx.open)}
        className={\`sora-select__trigger \${className}\`.trim()}
        {...props}
      >
        <span className="sora-select__trigger-content">{children}</span>
        <ChevronDown size={14} className="sora-select__icon" aria-hidden="true" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = ({ placeholder = "Select...", className = "" }: any) => {
  const ctx = React.useContext(SelectContext);
  return (
    <span className={\`sora-select__value \${!ctx?.selectedLabel ? "sora-select__value--placeholder" : ""} \${className}\`.trim()}>
      {ctx?.selectedLabel || placeholder}
    </span>
  );
};

export const SelectContent = ({ children, className = "" }: any) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx?.open) return null;
  return <div className={\`sora-select__content \${className}\`.trim()}>{children}</div>;
};

export const SelectItem = ({ value, children, className = "", disabled }: any) => {
  const ctx = React.useContext(SelectContext);
  const isSelected = ctx?.value === value;
  const label = typeof children === "string" ? children : value;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => !disabled && ctx?.setValue(value, label)}
      className={\`sora-select__item \${isSelected ? "sora-select__item--selected" : ""} \${disabled ? "sora-select__item--disabled" : ""} \${className}\`.trim()}
    >
      <span>{children}</span>
      {isSelected && <Check size={14} className="sora-select__item-indicator" aria-hidden="true" />}
    </div>
  );
};

export const SelectGroup = ({ className = "", ...props }: any) => (
  <div className={\`sora-select__group \${className}\`.trim()} {...props} />
);

export const SelectLabel = ({ className = "", ...props }: any) => (
  <div className={\`sora-select__label \${className}\`.trim()} {...props} />
);

export const SelectSeparator = ({ className = "" }: any) => (
  <div className={\`sora-select__separator \${className}\`.trim()} {...props} />
);
`;

    case "separator":
      return `"use client";

import * as React from "react";

export function Separator({ orientation = "horizontal", className = "", ...props }: any) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={\`sora-separator sora-separator--\${orientation} \${className}\`.trim()}
      {...props}
    />
  );
}
`;

    case "skeleton":
      return `"use client";

import * as React from "react";

export function Skeleton({ className = "", ...props }: any) {
  return (
    <div
      className={\`sora-skeleton \${className}\`.trim()}
      {...props}
    />
  );
}
`;

    case "slider":
      return `"use client";

import * as React from "react";

export function Slider({ value = 0, min = 0, max = 100, step = 1, onChange, className = "" }: any) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      className={\`sora-slider \${className}\`.trim()}
    />
  );
}
`;

    case "statistic":
      return `"use client";

import * as React from "react";

export function Statistic({ title, value, prefix, suffix, trend, className = "" }: any) {
  return (
    <div className={\`sora-statistic \${className}\`.trim()}>
      {title && <div className="sora-statistic__title">{title}</div>}
      <div className="sora-statistic__value-wrap">
        {prefix && <span className="sora-statistic__prefix">{prefix}</span>}
        <span className="sora-statistic__value">{value}</span>
        {suffix && <span className="sora-statistic__suffix">{suffix}</span>}
      </div>
      {trend && <div className="sora-statistic__trend">{trend}</div>}
    </div>
  );
}
`;

    case "stepper":
      return `"use client";

import * as React from "react";
import { Check } from "lucide-react";

export function Stepper({ steps = [], currentStep = 0, className = "" }: any) {
  return (
    <div className={\`sora-stepper \${className}\`.trim()}>
      {steps.map((step: any, idx: number) => {
        const isDone = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <div
            key={idx}
            className={\`sora-stepper__item \${isDone ? "is-done" : ""} \${isActive ? "is-active" : ""}\`.trim()}
          >
            <div className="sora-stepper__circle">
              {isDone ? <Check size={14} /> : idx + 1}
            </div>
            <span className="sora-stepper__label">{step.title || step}</span>
          </div>
        );
      })}
    </div>
  );
}
`;

    case "switch":
      return `"use client";

import * as React from "react";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className = "", ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const actualChecked = checked !== undefined ? checked : isChecked;

    const handleClick = () => {
      if (disabled) return;
      const next = !actualChecked;
      if (checked === undefined) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={actualChecked}
        disabled={disabled}
        onClick={handleClick}
        className={\`sora-switch \${actualChecked ? "sora-switch--checked" : ""} \${disabled ? "sora-switch--disabled" : ""} \${className}\`.trim()}
        {...props}
      >
        <span className="sora-switch__thumb" aria-hidden="true" />
      </button>
    );
  }
);
Switch.displayName = "Switch";
`;

    case "tabs":
      return `"use client";

import * as React from "react";

interface TabsContextValue {
  value: string;
  setValue: (val: string) => void;
}
const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({ defaultValue = "", value: controlledValue, onValueChange, children, className = "" }: any) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={\`sora-tabs \${className}\`.trim()}>{children}</div>
    </TabsContext.Provider>
  );
}

export const TabsList = ({ children, className = "" }: any) => (
  <div role="tablist" className={\`sora-tabs__list \${className}\`.trim()}>{children}</div>
);

export const TabsTrigger = ({ value, disabled, children, className = "" }: any) => {
  const ctx = React.useContext(TabsContext);
  const isSelected = ctx?.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => ctx?.setValue(value)}
      className={\`sora-tabs__trigger \${isSelected ? "sora-tabs__trigger--active" : ""} \${className}\`.trim()}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className = "" }: any) => {
  const ctx = React.useContext(TabsContext);
  if (ctx?.value !== value) return null;

  return (
    <div role="tabpanel" tabIndex={0} className={\`sora-tabs__content \${className}\`.trim()}>
      {children}
    </div>
  );
};
`;

    case "textarea":
      return `"use client";

import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={error || undefined}
        className={\`sora-textarea \${error ? "sora-textarea--error" : ""} \${className}\`.trim()}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
`;

    case "timeline":
      return `"use client";

import * as React from "react";

export function Timeline({ items = [], className = "" }: any) {
  return (
    <div className={\`sora-timeline \${className}\`.trim()}>
      {items.map((item: any, idx: number) => (
        <div key={idx} className="sora-timeline__item">
          <div className="sora-timeline__node" />
          <div className="sora-timeline__content">
            <div className="sora-timeline__title">{item.title}</div>
            {item.description && <p className="sora-timeline__desc">{item.description}</p>}
            {item.time && <span className="sora-timeline__time">{item.time}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
`;

    case "toast":
      return `"use client";

import * as React from "react";
import { X } from "lucide-react";

export function Toast({ title, description, onClose }: any) {
  return (
    <div className="sora-toast">
      <div className="sora-toast__body">
        {title && <div className="sora-toast__title">{title}</div>}
        {description && <div className="sora-toast__desc">{description}</div>}
      </div>
      <button type="button" onClick={onClose} className="sora-toast__close">
        <X size={14} />
      </button>
    </div>
  );
}
`;

    case "tooltip":
      return `"use client";

import * as React from "react";

export function Tooltip({ children }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="sora-tooltip"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { open } as any) : child
      )}
    </div>
  );
}

export const TooltipTrigger = ({ children, ...props }: any) => <span {...props}>{children}</span>;

export const TooltipContent = ({ open, children, className = "" }: any) => {
  if (!open) return null;
  return (
    <div role="tooltip" className={\`sora-tooltip__content \${className}\`.trim()}>
      {children}
    </div>
  );
};
`;

    case "tree-view":
      return `"use client";

import * as React from "react";
import { ChevronRight, Folder, File } from "lucide-react";

export function TreeView({ data = [], onSelect }: any) {
  return (
    <div className="sora-tree-view">
      {data.map((item: any, idx: number) => (
        <TreeNode key={idx} node={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

function TreeNode({ node, onSelect }: any) {
  const [expanded, setExpanded] = React.useState(false);
  const isFolder = Boolean(node.children && node.children.length > 0);

  return (
    <div className="sora-tree-view__node">
      <div
        className="sora-tree-view__item"
        onClick={() => {
          if (isFolder) setExpanded(!expanded);
          onSelect?.(node);
        }}
      >
        {isFolder && (
          <ChevronRight
            size={14}
            className={\`sora-tree-view__arrow \${expanded ? "sora-tree-view__arrow--open" : ""}\`.trim()}
          />
        )}
        {isFolder ? <Folder size={14} /> : <File size={14} />}
        <span>{node.name}</span>
      </div>
      {isFolder && expanded && (
        <div className="sora-tree-view__children">
          {node.children.map((child: any, idx: number) => (
            <TreeNode key={idx} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
`;

    case "typography":
      return `"use client";

import * as React from "react";

export function Typography({ variant = "p", className = "", children, ...props }: any) {
  const Tag = variant as any;
  return (
    <Tag className={\`sora-typography sora-typography--\${variant} \${className}\`.trim()} {...props}>
      {children}
    </Tag>
  );
}
`;

    default:
      return `"use client";

import * as React from "react";

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add specific component props here
}

export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`sora-${id} \${className}\`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
${name}.displayName = "${name}";
`;
  }
}
