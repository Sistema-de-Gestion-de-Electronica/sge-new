import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, FormInput, ScrollArea, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputEditarDivision, inputAgregarDivision } from "@/shared/filters/divisiones-filter.schema"; // Reemplazar con el schema adecuado
import { type z } from "zod";
import { useEffect, useMemo } from "react";
import { FormSelect } from "@/components/ui/autocomplete";
import RemoveDivisionModal from "../_components/remove-division";

type Props = {
  id?: string;
  name?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

type FormEditarDivisionType = z.infer<typeof inputEditarDivision>;

export const DivisionForm = ({ id, name, onSubmit, onCancel }: Props) => {
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.division.getFiltered.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const onDeleteDivision = () => {
    refreshGetAll();
  };

  const esNuevo = id === undefined;
  const divisionId = parseInt(id ?? "");

  const {
    data: division,
    isLoading,
    isError,
  } = api.division.getDivisionById.useQuery({ id: divisionId }, { enabled: !!id });

  const editarDivision = api.division.editarDivision.useMutation();
  const agregarDivision = api.division.nuevaDivision.useMutation();

  const divisionBase: FormEditarDivisionType = useMemo(() => {
    if (!division) return {} as FormEditarDivisionType;
    return {
      id: division.id,
      nombre: division.nombre,
      anio: division.anio ? String(division.anio) : "",
    };
  }, [division]);

  const formHook = useForm<FormEditarDivisionType>({
    mode: "onChange",
    defaultValues: divisionBase,
    resolver: zodResolver(id ? inputEditarDivision : inputAgregarDivision),
  });

  const { handleSubmit, control } = formHook;

  useEffect(() => formHook.reset(divisionBase), [formHook, divisionBase]);

  const onFormSubmit = (formData: FormEditarDivisionType) => {
    if (esNuevo) {
      agregarDivision.mutate(formData, {
        onSuccess: () => {
          toast.success("División agregada con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar la división");
        },
      });
      return;
    }

    editarDivision.mutate(formData, {
      onSuccess: () => {
        toast.success("División actualizada con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar la división");
      },
    });
  };

  const handleCancel = () => {
    formHook.reset();
    onCancel();
  };

  if (!esNuevo && isNaN(divisionId)) {
    return <div>Error al cargar...</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col gap-8 md:px-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <FormInput
                label={"Nombre"}
                control={control}
                name="nombre"
                type={"text"}
                className="bg-white text-gray-900"
                maxLength={5}
              />
            </div>
            <div className="w-full">
              <FormSelect
                label={"Año"}
                control={control}
                name="anio"
                className="mt-2 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                items={["1", "2", "3", "4", "5", "6"]}
              />
            </div>
          </div>
        </ScrollArea>
        <div className="flex w-full flex-row items-end justify-end space-x-4">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          {!esNuevo && (
            <RemoveDivisionModal divisionId={id} nombre={name} onSubmit={onDeleteDivision}></RemoveDivisionModal>
          )}
          <Button title="Guardar" type="submit" variant="default" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
