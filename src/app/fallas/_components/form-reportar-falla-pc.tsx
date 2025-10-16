"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, toast } from "@/components/ui";

import { inputReportarFallasPc } from "@/shared/filters/fallas-filter.schema";
import { MultiSelectFormField } from "@/components/ui/multi-select";
import { FormTextarea } from "@/components/ui/textarea";
import { SelectEquipoForm } from "./select-equipo";

type FormHelperType = {
  nroEquipoObject?: { id: string; label: string };
};

type FormReportarFallaPC = z.infer<typeof inputReportarFallasPc> & FormHelperType;

const fallas = ["Monitor", "CPU", "Teclado", "Mouse", "Software", "Red", "CD-ROM", "Impresora", "Otro"].map(
  (falla) => ({ label: falla, value: falla }),
);

export default function FormularioReportarFallaPC() {
  const reporteBase: FormReportarFallaPC = {
    laboratorio: "",
    nroEquipo: "",
    marca: "",
    modelo: "",
    fallas: [],
    descripcionFalla: "",
    nroEquipoObject: undefined,
  };

  const formHook = useForm<FormReportarFallaPC>({
    mode: "onChange",
    defaultValues: reporteBase,
    resolver: zodResolver(inputReportarFallasPc),
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formHook;

  const nroEquipoObject = watch("nroEquipoObject");

  useEffect(() => formHook.setValue("nroEquipo", nroEquipoObject?.id ?? ""), [formHook, nroEquipoObject]);

  const reportarPCMutation = api.fallas.reportarPC.useMutation();

  const onFormSubmit = (formData: FormReportarFallaPC) => {
    reportarPCMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Tu reporte ha sido enviado correctamente.");
        // Resetear todo el formulario a los valores por defecto
        formHook.reset(reporteBase);
        // Limpiar errores y enfocar el primer campo
        formHook.clearErrors();
        formHook.setFocus("nroEquipo");
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
              <div className="mt-4 w-full">
                <SelectEquipoForm
                  label={"Nro de Equipo"}
                  control={control}
                  name="nroEquipoObject"
                  realNameId="nroEquipo"
                />
              </div>
            </div>

            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <Controller
                  name={"fallas"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <label className="mb-3 text-sm">Fallas</label>
                        <MultiSelectFormField
                          options={fallas}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecciona fallas"
                          variant="secondary"
                        />
                        {errors.fallas && <p className="mt-1 text-sm text-red-600">{errors.fallas.message}</p>}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormTextarea
                  className="resize-none"
                  label={"Descripcion de la Falla y forma de replicarla"}
                  control={control}
                  name="descripcionFalla"
                  required
                />
                {errors.descripcionFalla && (
                  <p className="mt-1 text-sm text-red-600">{errors.descripcionFalla.message}</p>
                )}
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
