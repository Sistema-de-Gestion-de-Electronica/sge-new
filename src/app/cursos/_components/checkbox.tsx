import { type Control, type FieldValues, type Path, useController } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  className?: string;
}

export const CheckboxActivo = <T extends FieldValues>({ name, control, ...props }: CheckboxFieldProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <label className="flex items-center space-x-4">
      <Checkbox checked={!!value} onCheckedChange={(checked: boolean) => onChange(checked === true)} {...props} />
      <span>{value ? "Activo" : "Inactivo"}</span>
    </label>
  );
};
