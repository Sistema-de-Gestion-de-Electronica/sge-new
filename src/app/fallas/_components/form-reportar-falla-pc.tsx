"use client";

import { z } from "zod";
import { api } from "@/trpc/react";
import { Controller, FieldError, FormProvider, useForm } from "react-hook-form";
import { Button, FormInput, toast } from "@/components/ui";

import { inputReportarFallasPc } from "@/shared/filters/fallas-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { MultiSelectFormField } from "@/components/ui/multi-select";
import { FormTextarea } from "@/components/ui/textarea";

type FormReportarFallaPC = z.infer<typeof inputReportarFallasPc>;

const fallas = ["Monitor", "CPU", "Teclado", "Mouse", "Software", "Red", "CD-ROM", "Impresora", "Otro"].map(
  (falla) => ({ label: falla, value: falla }),
);

export default function FormularioReportarFallaPC() {
  // const solicitarInscripcioneEspecial = api.inscripcionesEspeciales.solicitar.useMutation();
  // const {data: session} = useSession();
  // console.log(session)
  const { data: laboratorios } = api.laboratorios.getAll.useQuery({});

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

  const onFormSubmit = async (formData: FormReportarFallaPC) => {
    console.log("Form Data:", formData);
    // solicitarInscripcioneEspecial.mutate(formData, {
    //   onSuccess: () => {
    //     toast.success("Tu solicitud de inscripción especial ha sido enviada correctamente.");
    //   },
    //   onError: () => {
    //     toast.error("Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.");
    //   },
    // });
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
                name="laboratorio"
                control={control}
                items={laboratorios?.map((lab) => lab.nombre) ?? []}
                label={"Laboratorio"}
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-x-4 sm:flex-row">
              <div className="mt-4 w-full">
                <FormInput label={"Marca"} control={control} name="marca" type={"text"} required />
              </div>
              <div className="mt-4 w-full">
                <FormInput label={"Modelo"} control={control} name="modelo" type={"text"} required />
              </div>
            </div>

            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormInput label={"Nro de Equipo"} control={control} name="nroEquipo" type={"text"} required />
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
