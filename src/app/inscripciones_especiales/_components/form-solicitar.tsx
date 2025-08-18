"use client";

import { z } from "zod";
import { api } from "@/trpc/react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormInput, toast } from "@/components/ui";

import { inputSolicitarInscripcionEspecial } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { SelectMateriasMultiple } from "@/app/inscripciones_especiales/_components/select-multiple-materias";
import { SelectAlternativas } from "@/app/inscripciones_especiales/_components/select-alternativas";
import { FormSelect } from "@/components/ui/autocomplete";

const casos = ["Ordenanza 1648", "Cambios de carrera", "Excepcion de correlativas"];

type FormSolicitarInscripcionEspecial = z.infer<typeof inputSolicitarInscripcionEspecial>;

export default function FormularioSolicitudInscripcionEspecial() {
  // const solicitarInscripcioneEspecial = api.inscripcionesEspeciales.solicitar.useMutation();
  // const {data: session} = useSession();
  // console.log(session)

  const solicitudBase: FormSolicitarInscripcionEspecial = {
    nombre: "",
    apellido: "",
    legajo: "",
    caso: "",
    materias: [],
    justificacion: "",
    turnoAlternativa1: "",
    turnoAlternativa2: "",
  };

  const formHook = useForm<FormSolicitarInscripcionEspecial>({
    mode: "onChange",
    defaultValues: solicitudBase,
  });

  const { handleSubmit, control } = formHook;

  const onFormSubmit = async (formData: FormSolicitarInscripcionEspecial) => {
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
                name="caso"
                control={control}
                items={casos}
                label={"Caso de inscripcion"}
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-x-4 sm:flex-row">
              <div className="mt-4 w-full">
                <FormInput label={"Nombre"} control={control} name="nombre" type={"text"} required />
              </div>
              <div className="mt-4 w-full">
                <FormInput label={"Apellido"} control={control} name="apellido" type={"text"} required />
              </div>
            </div>

            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormInput
                  label={"Legajo"}
                  control={control}
                  name="legajo"
                  type={"number"}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
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
