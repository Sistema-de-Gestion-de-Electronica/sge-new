import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, FormInput, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useMemo } from "react";
import { inputEditarEquipos } from "@/shared/filters/equipos-filter.schema";
import { SelectSedeForm } from "@/app/_components/select-ubicacion/select-sede";
import { SelectMarcasForm } from "../../_components/select-marca";
import { SelectLaboratorioConArmariosForm } from "@/app/_components/select-ubicacion/select-laboratorio";
import { SelectArmarioForm } from "@/app/_components/select-ubicacion/select-armario";
import { SelectEstanteForm } from "@/app/_components/select-ubicacion/select-estante";
import { SelectTipoForm } from "../../_components/select-tipo";
import { SelectEstadoForm } from "../../_components/select-estado";
import { FormTextarea } from "@/components/ui/textarea";
import { SelectModelosForm } from "../../_components/select-modelo";

type Props = {
  id?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

type FormHelperType = {
  marca: { id: number; label: string };
  tipo: { id: number; label: string };
  modeloForm: { id: number; label: string };
};

type FormEditarEquipoType = z.infer<typeof inputEditarEquipos> & FormHelperType;

export const EquipoForm = ({ id, onSubmit, onCancel }: Props) => {
  const esNuevo = id === undefined;
  const equipoId = parseInt(id ?? "");

  const {
    data: equipo,
    isLoading,
    isError,
  } = api.equipos.equipoPorId.useQuery({ id: equipoId }, { enabled: !!id, refetchOnWindowFocus: false });

  const editarEquipo = api.equipos.editarEquipo.useMutation();
  const agregarEquipo = api.equipos.nuevoEquipo.useMutation();

  const equipoBase: FormEditarEquipoType = useMemo(() => {
    if (!equipo) return {} as FormEditarEquipoType;
    return {
      id: equipo.id,
      inventarioId: equipo.inventarioId,
      marcaId: equipo.marca.id,
      marca: {
        id: equipo.marca.id,
        label: equipo.marca.nombre,
      },
      modelo: equipo.modelo ?? "",
      modeloForm: {
        id: 1,
        label: equipo.modelo ?? "",
      },
      numeroSerie: equipo.numeroSerie ?? "",
      palabrasClave: equipo.palabrasClave ?? "",
      tipoId: equipo.tipo.id,
      tipo: {
        id: equipo.tipo.id,
        label: equipo.tipo.nombre,
      },
      estadoId: String(equipo.estadoId),
      sedeId: String(equipo.sedeId),
      laboratorioId: String(equipo.laboratorioId),
      armarioId: String(equipo.armarioId),
      estanteId: String(equipo.estanteId),
      observaciones: equipo.observaciones ?? "",
      imagen: equipo.imagen ?? "",
    };
  }, [equipo]);

  const formHook = useForm<FormEditarEquipoType>({
    mode: "onChange",
    defaultValues: equipoBase,
    resolver: zodResolver(inputEditarEquipos),
  });

  const { handleSubmit, control, watch } = formHook;

  const [sedeId, laboratorioId, armarioId, estanteId] = watch(["sedeId", "laboratorioId", "armarioId", "estanteId"]);
  const [marca, tipo, modeloForm] = watch(["marca", "tipo", "modeloForm"]);

  useEffect(() => formHook.reset(equipoBase), [formHook, equipoBase]);
  useEffect(() => formHook.setValue("marcaId", marca?.id), [formHook, marca]);
  useEffect(() => formHook.setValue("tipoId", tipo?.id), [formHook, tipo]);
  useEffect(() => formHook.setValue("modelo", modeloForm?.label), [formHook, modeloForm]);
  useEffect(() => {
    formHook.setValue("sedeId", sedeId);
    formHook.setValue("laboratorioId", laboratorioId);
    formHook.setValue("armarioId", armarioId);
    formHook.setValue("estanteId", estanteId);
  }, [formHook, armarioId, sedeId, laboratorioId, estanteId]);

  if (!esNuevo && isNaN(equipoId)) {
    return <div>Error al cargar...</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  const onFormSubmit = (formData: FormEditarEquipoType) => {
    if (esNuevo) {
      agregarEquipo.mutate(formData, {
        onSuccess: () => {
          toast.success("Equipo agregado con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar el equipo");
        },
      });
      return;
    }

    editarEquipo.mutate(formData, {
      onSuccess: () => {
        toast.success("Equipo actualizado con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar el equipo");
      },
    });
  };

  const handleCancel = () => {
    formHook.reset();
    onCancel();
  };

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col gap-4">
        <div className="flex w-full flex-col justify-center lg:items-center">
          <div className="flex flex-col space-y-4 px-0 md:px-6">
            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              {!esNuevo && (
                <div className="mt-4 w-full">
                  <FormInput
                    label={"Inventario"}
                    control={control}
                    name="inventarioId"
                    placeholder={"Ingrese el inventario"}
                    type={"text"}
                    className="mt-2"
                    readOnly
                  />
                </div>
              )}

              <div className="mt-4 w-full">
                <SelectMarcasForm
                  name="marca"
                  realNameId="marcaId"
                  control={control}
                  className="mt-2"
                  label={"Marca"}
                  placeholder={"Seleccione una marca"}
                />
              </div>

              <div className="mt-4 w-full">
                <SelectModelosForm
                  label={"Modelo"}
                  control={control}
                  name="modeloForm"
                  realNameId="modelo"
                  className="mt-2"
                  placeholder={"Seleccione un modelo"}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              <div className="mt-4 basis-1/2">
                <FormInput
                  label={"Número de serie"}
                  control={control}
                  name="numeroSerie"
                  placeholder={"Ingrese el número de serie"}
                  type={"text"}
                  className="mt-2"
                />
              </div>

              <div className="mt-4 basis-1/2">
                <FormInput
                  label={"Palabras clave"}
                  control={control}
                  name="palabrasClave"
                  placeholder={"Ingrese las palabras claves"}
                  type={"text"}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              <div className="mt-4 basis-1/2">
                <SelectTipoForm
                  name="tipo"
                  realNameId="tipoId"
                  control={control}
                  className="mt-2"
                  label={"Tipo"}
                  placeholder={"Seleccione un tipo"}
                />
              </div>

              <div className="mt-4 basis-1/2">
                <SelectEstadoForm
                  name="estadoId"
                  control={control}
                  className="mt-2"
                  label={"Estado"}
                  placeholder={"Seleccione un estado"}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              <div className="mt-4 basis-1/2">
                <SelectSedeForm
                  name="sedeId"
                  control={control}
                  className="mt-2"
                  label={"Sede"}
                  placeholder={"Seleccione una sede"}
                  onChange={() => {
                    // @ts-expect-error - undefined
                    formHook.setValue("laboratorioId", undefined);
                    formHook.setValue("armarioId", undefined);
                    formHook.setValue("estanteId", undefined);
                  }}
                />
              </div>

              <div className="mt-4 basis-1/2">
                <SelectLaboratorioConArmariosForm
                  name="laboratorioId"
                  control={control}
                  className="mt-2"
                  label={"Laboratorio"}
                  sedeId={sedeId ? String(sedeId) : undefined}
                  disabled={!sedeId}
                  placeholder={!sedeId ? "Seleccione una sede" : "Seleccione un laboratorio"}
                  onChange={() => {
                    formHook.setValue("armarioId", undefined);
                    formHook.setValue("estanteId", undefined);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              <div className="mt-4 basis-1/2">
                <SelectArmarioForm
                  name="armarioId"
                  control={control}
                  className="mt-2"
                  label={"Armario"}
                  laboratorioId={laboratorioId}
                  placeholder={!laboratorioId ? "Seleccione un laboratorio" : "Seleccione un armario"}
                  onChange={() => {
                    formHook.setValue("estanteId", undefined);
                  }}
                />
              </div>

              <div className="mt-4 basis-1/2">
                <SelectEstanteForm
                  name="estanteId"
                  control={control}
                  className="mt-2"
                  label={"Estante"}
                  armarioId={armarioId}
                  placeholder={!armarioId ? "Seleccione un armario" : "Seleccione un estante"}
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 md:flex-row lg:flex-row lg:justify-between">
              <div className="mb-1 mt-4 h-auto w-full">
                <FormTextarea label={"Observaciones"} name="observaciones" control={control} id="observaciones" />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-0 flex w-full flex-row items-end space-x-4 bg-white md:justify-end lg:sticky">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button title="Guardar" type="submit" variant="default" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
