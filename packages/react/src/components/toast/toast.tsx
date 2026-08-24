import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  type ReactNode,
} from 'react';
import { X } from 'lucide-react';
import { Portal } from '@soraui/hooks';
import type {
  ToastData,
  ToastProviderProps,
  ToastViewportProps,
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastActionProps,
  ToastVariant,
} from './toast.types';

interface ToastContextValue {
  toasts: ToastData[];
  toast: (options: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;
function generateId() {
  idCounter += 1;
  return `sora-toast-${idCounter}`;
}

export function ToastProvider({ maxToasts = 5, children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: Omit<ToastData, 'id'>) => {
      const id = generateId();
      const newToast: ToastData = { id, duration: 5000, ...options };
      setToasts((prev) => [newToast, ...prev].slice(0, maxToasts));
      return id;
    },
    [maxToasts]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return { toast: context.toast, dismiss: context.dismiss, toasts: context.toasts };
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, ...props }, ref) => {
    const { toasts, dismiss } = useToast();

    if (toasts.length === 0) return null;

    return (
      <Portal>
        <div
          ref={ref}
          role="region"
          aria-label="Notifications"
          aria-live="polite"
          className={cx('sora-toast__viewport', className)}
          {...props}
        >
          {toasts.map((item) => (
            <ToastItem key={item.id} data={item} onDismiss={() => dismiss(item.id)} />
          ))}
        </div>
      </Portal>
    );
  }
);
ToastViewport.displayName = 'ToastViewport';

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: () => void }) {
  useEffect(() => {
    if (!data.duration || data.duration === Infinity) return;
    const timer = setTimeout(onDismiss, data.duration);
    return () => clearTimeout(timer);
  }, [data.duration, onDismiss]);

  const isDestructive = data.variant === 'destructive';

  return (
    <div
      role={isDestructive ? 'alert' : 'status'}
      className={cx(
        'sora-toast',
        'sora-toast--' + (data.variant ?? 'default')
      )}
    >
      <div className="sora-toast__body">
        {data.title && <div className="sora-toast__title">{data.title}</div>}
        {data.description && <div className="sora-toast__description">{data.description}</div>}
      </div>
      {data.action && <div className="sora-toast__action">{data.action}</div>}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="sora-toast__close"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ id, variant = 'default', className, children, ...props }, ref) => {
    const { dismiss } = useToast();
    return (
      <div
        ref={ref}
        role={variant === 'destructive' ? 'alert' : 'status'}
        className={cx('sora-toast', 'sora-toast--' + variant, className)}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => dismiss(id)}
          aria-label="Close notification"
          className="sora-toast__close"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    );
  }
);
Toast.displayName = 'Toast';

export const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx('sora-toast__title', className)} {...props}>
      {children}
    </div>
  )
);
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx('sora-toast__description', className)} {...props}>
      {children}
    </div>
  )
);
ToastDescription.displayName = 'ToastDescription';