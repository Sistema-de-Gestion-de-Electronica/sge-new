import { useMemo, useState, type ReactElement } from "react";
import { type Path, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { type FormSelectProps } from "@/components/ui/autocomplete";
import { FormAutocomplete, Select, SelectTrigger, SelectValue } from "@/components/ui";

const getItemLabelNameForSelect = (item: { nombre: string; marca: string; modelo: string; inventarioId: string }) => {
  return `${item.nombre} - ${item.marca} - ${item.modelo} - ${item.inventarioId}`;
};

export const SelectEquipoForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = api.equipos.getAll.useQuery({
    searchText: query,
    tipo: "PC",
  });

  const equipos = useMemo(() => {
    if (!data || data.equipos.length === 0) return [];

    return data.equipos.map((equipo) => {
      const { tipo, marca, modelo, inventarioId } = equipo;

      return {
        label: `${tipo.nombre} - ${marca.nombre} - ${modelo ?? ""} - ${inventarioId}`,
        value: inventarioId,
        id: inventarioId,
      };
    });
  }, [data]);

  if (isError) {
    return (
      <Select>
        <div className="flex flex-row items-center space-x-2">
          <SelectTrigger
            disabled
            id="selectEquipo"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando equipos" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={equipos}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
          <span>No se encontró el equipo</span>
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar equipo"
      clearable
      debounceTime={500}
      control={control}
      name={name}
      {...props}
    />
  );
};
