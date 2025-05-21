import { useMemo, type ReactElement } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue } from "@/components/ui";

export const SelectDivisionesForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  const { watch } = useFormContext();
  const anio = watch("anioDeCarrera");
  const { data, isLoading, isError } = api.division.getAll.useQuery();

  const divisiones = useMemo(() => {
    if (!data) return [];

    return data
      .filter((d) => anio === undefined || d.anio === parseInt(anio))
      .map((division) => {
        const { id, nombre: label, anio } = division;

        return {
          label,
          id: String(id),
          anio,
        };
      });
  }, [data, anio]);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center space-x-2">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Select>
        <div className="flex flex-row items-center space-x-2">
          <SelectTrigger
            disabled
            id="selectDivision"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando division" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return <FormSelect className={className} name={name} control={control} items={divisiones} {...props} />;
};
