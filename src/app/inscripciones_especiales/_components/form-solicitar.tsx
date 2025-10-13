"use client";

import { useState, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

import { api } from "@/trpc/react";
import { SgeNombre } from "@/generated/prisma";
import { Button, FormInput, Input, toast } from "@/components/ui";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { usePermisos } from "@/app/_hooks/use-context-tiene-permisos";
import type { inputAgregarInscripcion } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { SelectMateriasMultiple } from "@/app/inscripciones_especiales/_components/select-multiple-materias";
import { SelectAlternativas } from "@/app/inscripciones_especiales/_components/select-alternativas";

const casos = ["Ordenanza 1648", "Cambios de carrera", "Excepcion de correlativas"];

type FormSolicitarInscripcionEspecial = z.infer<typeof inputAgregarInscripcion>;

export default function FormularioSolicitudInscripcionEspecial() {
  const solicitarInscripcionEspecial = api.inscripcionesEspeciales.nuevaInscripcionEspecial.useMutation();
  const { session } = usePermisos();
  const { tienePermisos } = useTienePermisos([SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN]);

  const { data: usuario } = api.admin.usuarios.getUsuarioPorId.useQuery(
    { id: session?.user?.id ?? "" },
    { enabled: !!session?.user?.id },
  );

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [legajoBuscado, setLegajoBuscado] = useState<string | null>(null);

  const solicitudBase = useMemo<FormSolicitarInscripcionEspecial>(
    () => ({
      legajo: usuario?.legajo ?? "",
      caso: casos[2] ?? "",
      materiasAdeudadas: [],
      materias: [],
      justificacion: "",
      turnoAlternativa1: "",
      turnoAlternativa2: "",
    }),
    [usuario?.legajo],
  );

  const formHook = useForm<FormSolicitarInscripcionEspecial>({
    mode: "onChange",
    defaultValues: solicitudBase,
  });

  const { handleSubmit, control, getValues, setValue } = formHook;

  const {
    data: usuarioPorLegajo,
    refetch: buscarUsuarioPorLegajo,
    isFetching,
  } = api.admin.usuarios.getUsuarioPorLegajo.useQuery(
    { legajo: legajoBuscado ?? "" },
    { enabled: !!legajoBuscado, retry: false }
  );

  useEffect(() => {
    if (usuario && !tienePermisos) {
      setValue("legajo", usuario.legajo ?? "");
      setNombre(usuario.nombre ?? "");
      setApellido(usuario.apellido ?? "");
    }
  }, [usuario, setValue, tienePermisos]);

  const handleVerificarLegajo = async () => {
    if (!tienePermisos) return;

    const legajo = String(getValues("legajo") ?? "").trim();
    if (!legajo) {
      toast.error("Por favor, ingresa un legajo válido.");
      return;
    }

    setLegajoBuscado(legajo);
    try {
      const result = await buscarUsuarioPorLegajo();
      if (!result.data) {
        toast.error(`No se encontró un usuario con el legajo ${legajo}.`);
        setNombre("");
        setApellido("");
        return;
      }

      setNombre(result.data.nombre ?? "");
      setApellido(result.data.apellido ?? "");
      toast.success(`Legajo ${legajo} verificado correctamente.`);
    } catch (error) {
      console.error(error);
      toast.error(`Error al verificar el legajo ${legajo}.`);
    }
  };

  const onFormSubmit = async (formData: FormSolicitarInscripcionEspecial) => {
    const payload = { ...formData, legajo: String(formData.legajo ?? "") };
    solicitarInscripcionEspecial.mutate(payload, {
      onSuccess: () => {
        toast.success("Tu solicitud de inscripción especial ha sido enviada correctamente.");
        formHook.reset(solicitudBase);
      },
      onError: () => {
        toast.error("Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.");
      },
    });
  };

  return (
<FormProvider {...formHook}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="relative flex w-full flex-col gap-y-4 rounded-md border p-2"
      >
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col space-y-4 px-0">
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <FormSelect
                name="caso"
                control={control}
                items={casos}
                label={"Caso de inscripcion"}
                className="w-full"
              />
            </div>
            <div className="flex w-full items-end gap-2">
              <div className="flex-1">
                <FormInput
                  label="Legajo (Sin guiones o puntos)"
                  name="legajo"
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  control={control}
                  disabled={!tienePermisos} // solo editable si tiene permisos
                />
              </div>
              {tienePermisos && (
                <Button type="button" onClick={handleVerificarLegajo} variant="default" disabled={isFetching}>
                  {isFetching ? "Verificando..." : "Verificar Legajo"}
                </Button>
              )}
            </div>
            
            <div className="flex w-full flex-col gap-x-4 sm:flex-row">
              <div className="mt-4 w-full">
                <Input label="Nombre" type="text" value={nombre} disabled />
              </div>
              <div className="mt-4 w-full">
                <Input label="Apellido" type="text"value={apellido} disabled />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <SelectMateriasMultiple
                  control={control}
                  name="materiasAdeudadas"
                  label={"Materias Adeudadas"}
                  max={6}
                />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <SelectMateriasMultiple control={control} name="materias" />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormInput label={"Justificacion"} control={control} name="justificacion" type={"textarea"} required />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <SelectAlternativas<FormSolicitarInscripcionEspecial>
                  name="turnoAlternativa1"
                  control={control}
                  label="Alternativa 1"
                />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <SelectAlternativas<FormSolicitarInscripcionEspecial>
                  name="turnoAlternativa2"
                  control={control}
                  label="Alternativa 2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-0 flex w-full flex-row items-end space-x-4 bg-white md:justify-end lg:sticky">
          <Button title={"Enviar Solicitud"} type="submit" variant="default" color="primary" className="w-full">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
