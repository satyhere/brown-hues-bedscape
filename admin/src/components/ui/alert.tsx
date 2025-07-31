import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

type AlertVariant = 'default' | 'destructive' | 'success' | 'info';

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

const variantIcons = {
  default: null,
  destructive: <XCircle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
} as const;

const variantClasses = {
  default: 'bg-background text-foreground border',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
} as const;

export function Alert({
  className,
  variant = 'default',
  title,
  description,
  icon,
  children,
  ...props
}: AlertProps) {
  const Icon = icon || variantIcons[variant === 'default' ? 'info' : variant];
  const variantClass = variantClasses[variant];

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
        variantClass,
        className
      )}
      {...props}
    >
      {Icon && <div className="mr-2">{Icon}</div>}
      <div>
        {title && (
          <h3 className="mb-1 text-sm font-medium leading-none tracking-tight">
            {title}
          </h3>
        )}
        {description && (
          <div className="text-sm [&_p]:leading-relaxed">
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
