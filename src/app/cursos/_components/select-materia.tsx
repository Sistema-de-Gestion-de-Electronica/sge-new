import { useMemo, type ReactElement } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue } from "@/components/ui";

export const SelectMateriasForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  const { data, isLoading, isError } = api.materia.getAll.useQuery();
  const { setValue } = useFormContext();

  const materias = useMemo(() => {
    if (!data) return [];

    return data.map((materia) => {
      const { id, nombre: label, anio } = materia;

      return {
        label,
        id: String(id),
        anio,
      };
    });
  }, [data]);

  const onMateriaChange = (value: string | null | undefined) => {
    const selectedMateria = materias.find((d) => d.id === value);
    if (selectedMateria) {
      setValue("anioDeCarrera", selectedMateria.anio.toString());
    }
  };

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
            id="selectMaterias"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando materias" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormSelect
      className={className}
      name={name}
      control={control}
      items={materias}
      onChange={onMateriaChange}
      {...props}
    />
  );
};
