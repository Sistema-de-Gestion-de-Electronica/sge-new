import { useMemo, useState, type ReactElement } from "react";
import { type Path, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { type FormSelectProps } from "@/components/ui/autocomplete";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, FormAutocomplete, Select, SelectTrigger, SelectValue, toast } from "@/components/ui";
import { estaDentroDe } from "@/shared/string-compare";

export const SelectEditorialForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const utils = api.useUtils();
  const { data, isLoading, isError } = api.biblioteca.getAllEditorial.useQuery();
  const agregarEditorial = api.biblioteca.crearEditorial.useMutation();

  const [query, setQuery] = useState("");

  const editoriales = useMemo(() => {
    if (!data) return [];

    return data
      .map((editorial) => {
        const { id, editorial: label } = editorial;

        return {
          label,
          id,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const onCreateEditorial = () => {
    agregarEditorial.mutate(
      { nombre: query },
      {
        onSuccess: (editorial) => {
          toast.success(`Editorial ${editorial.editorial} creada con éxito.`);
          utils.biblioteca.getAllEditorial.invalidate().catch((err) => {
            console.error(err);
          });
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar la editorial");
        },
      },
    );
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
            id="selectEditorial"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando editoriales" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={editoriales}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
          <span>No se encontró la editorial</span>
          <Button
            type="button"
            variant={"default"}
            color={"outline"}
            className="text-primary"
            onClick={onCreateEditorial}
            isLoading={agregarEditorial.isPending}
          >
            Crear nueva editorial
          </Button>
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar por editorial"
      clearable
      debounceTime={0}
      control={control}
      name={name}
      {...props}
    />
  );
};
