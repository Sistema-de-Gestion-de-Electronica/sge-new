"use client";

import type { z } from "zod";
import { api } from "@/trpc/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, toast } from "@/components/ui";

import type { inputReportarFallasInstrumento } from "@/shared/filters/fallas-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { FormTextarea } from "@/components/ui/textarea";

// Datos reales desde TRPC

type FormReportarFallaInstrumento = z.infer<typeof inputReportarFallasInstrumento>;

export default function FormularioReportarFallaInstrumento() {
  // const solicitarInscripcioneEspecial = api.inscripcionesEspeciales.solicitar.useMutation();
  // const {data: session} = useSession();
  // console.log(session)

  const reporteBase: FormReportarFallaInstrumento = {
    tipoInstrumento: "",
    instrumento: "",
    descripcionEquipo: "",
    descripcionFalla: "",
    condicion: "",
  };

  const formHook = useForm<FormReportarFallaInstrumento>({
    mode: "onChange",
    defaultValues: reporteBase,
  });

  const { handleSubmit, control, watch } = formHook;

  const reportarInstrumentoMutation = api.fallas.reportarInstrumento.useMutation();

  const { data: tiposData } = api.equipos.getAllTipos.useQuery({ getAll: true });

  const tipoSeleccionado = watch("tipoInstrumento");

  const { data: equiposData } = api.equipos.getAll.useQuery(
    {
      pageSize: "20",
      pageIndex: "0",
      orderBy: "inventarioId",
      orderDirection: "asc",
      searchText: "",
      armario: "",
      tipo: tipoSeleccionado ?? "",
      sede: "",
      laboratorio: "",
    },
    { enabled: !!tipoSeleccionado },
  );

  const onFormSubmit = (formData: FormReportarFallaInstrumento) => {
    console.log("Form Data:", formData);

    reportarInstrumentoMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Tu reporte ha sido enviado correctamente.");
      },
      onError: () => {
        toast.error("Hubo un problema al enviar tu reporte. Por favor, intenta nuevamente.");
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
                name="tipoInstrumento"
                control={control}
                items={(tiposData?.tipos ?? []).map((tipo) => ({ id: String(tipo.id), label: tipo.nombre }))}
                label={"Tipo de Instrumento"}
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <FormSelect
                name="instrumento"
                control={control}
                items={(equiposData?.equipos ?? []).map((eq) => ({
                  id: String(eq.id),
                  label: eq.inventarioId ? `${eq.inventarioId} - ${eq.modelo ?? ""}` : (eq.modelo ?? `Equipo ${eq.id}`),
                }))}
                label={"Instrumento"}
                className="w-full"
              />
            </div>

            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={"Descripcion"}
                  control={control}
                  name="descripcionEquipo"
                  required
                />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={"Condicion del equipo"}
                  control={control}
                  name="condicion"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-0 flex w-full flex-row items-end space-x-4 bg-white md:justify-end lg:sticky">
          <Button title={"Enviar Reporte"} type="submit" variant="default" color="primary" className="w-full">
            Enviar Reporte
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
