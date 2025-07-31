import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useToast } from './use-toast';

const ToastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'group border-green-500 bg-green-50 text-green-800',
        error: 'group border-red-500 bg-red-50 text-red-800',
        warning: 'group border-amber-500 bg-amber-50 text-amber-800',
        info: 'group border-blue-500 bg-blue-50 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const ToastAction = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
);

const ToastClose = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
);

const ToastTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
);

const ToastDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-sm opacity-90', className)} {...props} />
);

type ToastProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof ToastVariants> & {
    title?: string;
    description?: string;
    action?: React.ReactNode;
    closeButton?: boolean;
  };

const Toast = ({
  className,
  variant,
  title,
  description,
  action,
  closeButton = true,
  ...props
}: ToastProps) => {
  return (
    <div className={cn(ToastVariants({ variant }), className)} {...props}>
      <div className="grid gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      {closeButton && (
        <ToastClose>
          <span className="sr-only">Close</span>
        </ToastClose>
      )}
    </div>
  );
};

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex w-full flex-col items-end gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant}>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </Toast>
      ))}
    </div>
  );
};

export { Toast, ToastAction, ToastClose, ToastDescription, ToastTitle, Toaster };
