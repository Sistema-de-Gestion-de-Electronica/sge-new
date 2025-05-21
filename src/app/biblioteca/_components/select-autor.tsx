import { useMemo, useState, type ReactElement } from "react";
import { type Path, type FieldValues } from "react-hook-form";
import { api } from "@/trpc/react";
import { type IsMulti, type SelectItemAutocomplete } from "@/components/ui/autocomplete";
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

export const SelectAutoresForm = <
  T extends FieldValues,
  TType extends SelectItemAutocomplete | string,
  TMulti extends IsMulti = undefined,
>({
  name,
  control,
  className,
  ...props
}: Omit<FormAutocompleteProps<T, TType, TMulti>, "items"> & { realNameId?: Path<T> }): ReactElement => {
  const utils = api.useUtils();
  const { data, isLoading, isError } = api.biblioteca.getAllAutores.useQuery();
  const agregarAutor = api.biblioteca.crearAutor.useMutation();

  const [query, setQuery] = useState("");

  const autores = useMemo(() => {
    if (!data) return [];

    return data
      .map((autor) => {
        const { id, autorNombre: label } = autor;

        return {
          label,
          id,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const onCreateAutor = () => {
    agregarAutor.mutate(
      { nombre: query },
      {
        onSuccess: (autor) => {
          toast.success(`Autor ${autor.autorNombre} creado con éxito.`);
          utils.biblioteca.getAllAutores.invalidate().catch((err) => {
            console.error(err);
          });
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar el autor");
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
            id="selectAutor"
            className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
          >
            <SelectValue placeholder="Error cargando autores" />
          </SelectTrigger>
        </div>
      </Select>
    );
  }

  return (
    <FormAutocomplete
      async
      items={autores}
      noOptionsComponent={
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
          <span>No se encontró al autor</span>
          <Button
            type="button"
            variant={"default"}
            color={"outline"}
            className="text-primary"
            onClick={onCreateAutor}
            isLoading={agregarAutor.isPending}
          >
            Crear nuevo autor
          </Button>
        </div>
      }
      className={className}
      onQueryChange={setQuery}
      isLoading={isLoading}
      placeholder="Buscar por nombre de autor"
      clearable
      debounceTime={0}
      control={control}
      name={name}
      {...props}
    />
  );
};
