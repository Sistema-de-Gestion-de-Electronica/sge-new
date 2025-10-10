"use client";

import { z } from "zod";
import { api } from "@/trpc/react";
import { Controller, FieldError, FormProvider, useForm } from "react-hook-form";
import { Button, FormInput, toast, FormAutocomplete } from "@/components/ui";

import { inputReportarFallasPc } from "@/shared/filters/fallas-filter.schema";
import { MultiSelectFormField } from "@/components/ui/multi-select";
import { FormTextarea } from "@/components/ui/textarea";
import { SelectEquipoForm } from "./select-equipo";

type FormReportarFallaPC = z.infer<typeof inputReportarFallasPc>;

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
  };

  const formHook = useForm<FormReportarFallaPC>({
    mode: "onChange",
    defaultValues: reporteBase,
  });

  const { handleSubmit, control } = formHook;

  const reportarPCMutation = api.fallas.reportarPC.useMutation();

  const onFormSubmit = (formData: FormReportarFallaPC) => {
    console.log("Form Data:", formData);
    formData = {
      ...formData,
      nroEquipo: formData.nroEquipo.id
    }

    reportarPCMutation.mutate(formData, {
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
              <div className="mt-4 w-full">
                <SelectEquipoForm label={"Nro de Equipo"} control={control} name="nroEquipo" />
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
                  label={"Descripcion"}
                  control={control}
                  name="descripcionFalla"
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
