import { useMemo, useState, type ReactElement } from "react";
import { type Path, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Button,
  FormAutocomplete,
  type FormAutocompleteProps,
  Select,
  SelectTrigger,
  SelectValue,
  toast,
} from "@/components/ui";
import { estaDentroDe } from "@/shared/string-compare";

export const SelectModelosForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormAutocompleteProps<T, TType>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const { data, isLoading, isError } = api.equipos.getAllModelos.useQuery();

  const [query, setQuery] = useState("");

  const [nuevoModelo, setNuevoModelo] = useState<string | undefined>(undefined);

  const modelosConNuevo = useMemo(() => {
    if (!data) return [];
    if (!nuevoModelo) return data;

    return [nuevoModelo, ...data];
  }, [data, nuevoModelo]);

  const modelos = useMemo(() => {
    if (!data) return [];

    return modelosConNuevo
      .map((modelo) => {
        return {
          label: modelo,
          id: modelo,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, modelosConNuevo, query]);

  const onCreateModelo = () => {
    setNuevoModelo(query);

    toast.success(`Modelo ${query} agregado con éxito.`);
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
            id="selectModelo"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando modelos" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={modelos}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
          <span>No se encontró el modelo</span>
          {query && (
            <Button
              type="button"
              variant={"default"}
              color={"outline"}
              className="text-primary"
              onClick={onCreateModelo}
            >
              Crear nuevo modelo
            </Button>
          )}
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar por modelo de equipo"
      clearable
      debounceTime={0}
      control={control}
      name={name}
      {...props}
    />
  );
};
