import * as React from "react";
import { get } from "lodash";
import { useFormContext, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";
import { cn } from "@/components/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  error?: string;
  charCount?: number; // Prop for character count
  showCharCount?: boolean; // New prop to toggle character count display
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, charCount = 0, showCharCount = false, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {showCharCount && (
          <span className="ml-1 block text-xs text-muted">
            {charCount}/{props.maxLength} caracteres
          </span>
        )}
        {error && <span className={cn("ml-1 block text-xs text-danger")}>{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export interface FormTextareaProps<T extends FieldValues> extends Omit<TextareaProps, "name" | "error" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
}

export const FormTextarea = <T extends FieldValues>({
  control: _ctrl,
  name,
  ...props
}: FormTextareaProps<T>): React.ReactElement => {
  const { register, formState, watch } = useFormContext<T>();
  const error = get(formState.errors, name, undefined) as FieldError | undefined;
  const value = watch(name) as string;
  const charCount = value ? value.length : 0;
  return <Textarea {...props} {...register(name)} error={error?.message} charCount={charCount} />;
};

export { Textarea };
