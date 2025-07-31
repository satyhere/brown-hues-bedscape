import * as React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

const FormContext = React.createContext<{
  form: ReturnType<typeof useReactHookForm>;
} | null>(null);

function Form({
  children,
  form,
  className,
  onSubmit,
  ...props
}: {
  children: React.ReactNode;
  form: ReturnType<typeof useReactHookForm>;
  onSubmit: (data: any) => void;
  className?: string;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  return (
    <FormContext.Provider value={{ form }}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormContext);
  const [id] = React.useState(() => Math.random().toString(36).substr(2, 9));

  if (!fieldContext) {
    throw new Error('useFormField should be used within <Form>');
  }

  const { form } = fieldContext;
  const { name } = form.register(id);

  return {
    id,
    name,
    form,
  };
}

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  );
});
FormField.displayName = 'FormField';

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative mt-1', className)}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  );
});
FormItem.displayName = 'FormItem';

type FormFieldProps = {
  name: string;
  render: (field: any) => React.ReactNode;
  description?: string;
  label?: string;
  className?: string;
};

function FormFieldComponent({
  name,
  render,
  description,
  label,
  className,
}: FormFieldProps) {
  const { form } = useFormField();
  const { error } = form.formState;
  const fieldError = error?.[name];

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        {render({
          ...form.register(name),
          'aria-invalid': !!fieldError,
        })}
      </FormControl>
      {description && !fieldError && (
        <FormDescription>{description}</FormDescription>
      )}
      {fieldError?.message && (
        <FormMessage>{fieldError.message as string}</FormMessage>
      )}
    </FormItem>
  );
}

function useForm<T extends z.ZodTypeAny>({
  schema,
  defaultValues,
  ...props
}: {
  schema: T;
  defaultValues?: z.infer<T>;
} & Omit<Parameters<typeof useReactHookForm>[0], 'resolver'>) {
  return useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues,
    ...props,
  });
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField: FormFieldComponent,
  useForm,
  useFormField,
};
