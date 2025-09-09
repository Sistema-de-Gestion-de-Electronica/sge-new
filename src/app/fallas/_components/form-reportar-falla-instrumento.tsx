"use client";

import { z } from "zod";
import { api } from "@/trpc/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormInput, toast } from "@/components/ui";

import { inputReportarFallasInstrumento } from "@/shared/filters/fallas-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { FormTextarea } from "@/components/ui/textarea";

import { MOCK_INSTRUMENTOS } from "@/app/fallas/_components/mock-instrumentos"; //TODO eliminar cuando funcione la api

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

  const onFormSubmit = async (formData: FormReportarFallaInstrumento) => {
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
                name="tipoInstrumento"
                control={control}
                items={MOCK_INSTRUMENTOS.map((inst) => ({ id: inst.tipo, label: inst.tipo }))}
                label={"Tipo de Instrumento"}
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <FormSelect
                name="instrumento"
                control={control}
                items={
                  (
                    MOCK_INSTRUMENTOS.find(
                      (inst) => inst.tipo === watch("tipoInstrumento")
                    )?.instrumentos ?? []
                  ).map((inst) => ({ id: inst, label: inst }))
                }
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
                  name="descripcionFalla"
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
