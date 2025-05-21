import { useMemo, type ReactElement } from "react";
import { type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue } from "@/components/ui";
import { Label } from "@radix-ui/react-label";

export const SelectSedeConLaboratorioForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  const { data, isLoading, isError } = api.admin.laboratorios.getAllSedesConLaboratorios.useQuery();

  const sedes = useMemo(() => {
    if (!data) return [];

    return data.map((sede) => {
      const { id, nombre: label } = sede;

      return {
        label,
        id: String(id),
      };
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center space-x-2">
        {props.label && <Label className="mb-3 block text-sm">{props.label}</Label>}
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Select>
        <div className="flex flex-row items-center space-x-2">
          {props.label && <Label className="mb-3 block text-sm">{props.label}</Label>}
          <SelectTrigger
            disabled
            id="selectSede"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando sedes" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormSelect
      isLoading={isLoading}
      className={className}
      name={name}
      control={control}
      items={sedes}
      label={"Selecciona una sede"}
      {...props}
    />
  );
};
