"use client";

import type { z } from "zod";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button, toast } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/Label";

import type { inputReportarFallasInstrumento } from "@/shared/filters/fallas-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { FormTextarea } from "@/components/ui/textarea";

type FormReportarFallaInstrumento = z.infer<typeof inputReportarFallasInstrumento>;

export default function FormularioReportarFallaInstrumento() {
  const reporteBase: FormReportarFallaInstrumento = {
    esInventariado: true,
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

  const { handleSubmit, control, watch, reset } = formHook;

  const reportarInstrumentoMutation = api.fallas.reportarInstrumento.useMutation();

  const esInventariado = watch("esInventariado");
  const tipoSeleccionado = watch("tipoInstrumento");

  useEffect(() => {
    reset({
      esInventariado,
      tipoInstrumento: "",
      instrumento: "",
      descripcionEquipo: "",
      descripcionFalla: "",
      condicion: "",
    });
  }, [esInventariado, reset]);

  const { data: tiposData } = api.equipos.getAllTipos.useQuery({ getAll: true });

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
    { enabled: esInventariado && !!tipoSeleccionado },
  );

  const onFormSubmit = (formData: FormReportarFallaInstrumento) => {
    if (formData.esInventariado && (!formData.tipoInstrumento || !formData.instrumento)) {
      toast.error("Para instrumentos inventariados, debe seleccionar el tipo e instrumento.");
      return;
    }

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
            {/* Toggle para tipo de instrumento */}
            <div className="flex w-full flex-col gap-2 rounded-lg border p-4">
              <Label className="text-sm font-medium">¿Tiene numero de serie?</Label>
              <Controller
                name="esInventariado"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="inventariado" className={!field.value ? "text-muted-foreground" : ""}>
                      No Inventariado
                    </Label>
                    <Switch id="inventariado" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="inventariado" className={field.value ? "" : "text-muted-foreground"}>
                      Inventariado
                    </Label>
                  </div>
                )}
              />
            </div>

            {/* Campos condicionales según el tipo */}
            {esInventariado ? (
              <>
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
                      label: eq.inventarioId
                        ? `${eq.inventarioId} - ${eq.modelo ?? ""}`
                        : (eq.modelo ?? `Equipo ${eq.id}`),
                    }))}
                    label={"Instrumento"}
                    className="w-full"
                  />
                </div>
              </>
            ) : null}

            {/* Descripción del instrumento/equipo */}
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={esInventariado ? "Descripción del Equipo" : "Descripción del Instrumento"}
                  control={control}
                  name="descripcionEquipo"
                  placeholder={
                    esInventariado
                      ? "Información adicional del equipo seleccionado"
                      : "Describe el instrumento (marca, modelo, características, ubicación, etc.)"
                  }
                  required
                />
              </div>
            </div>

            {/* Descripción de la falla */}
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={"Descripcion de la Falla y forma de replicarla"}
                  control={control}
                  name="descripcionFalla"
                  placeholder="Describe el problema o falla detectada"
                  required
                />
              </div>
            </div>

            {/* Condición del equipo */}
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={"Condición del Instrumento"}
                  control={control}
                  name="condicion"
                  placeholder="Estado general del instrumento (funcionando parcialmente, no enciende, daños visibles, etc.)"
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
