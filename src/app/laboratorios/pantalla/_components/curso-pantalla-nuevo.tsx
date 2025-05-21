import { FormProvider, useForm } from "react-hook-form";
import { api, type RouterInputs } from "@/trpc/react";
import { Button, FormInput, ScrollArea, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { inputAgregarReservaPantalla } from "@/shared/filters/reserva-pantalla-filter.schema";
import { SelectSedeForm } from "@/app/_components/select-ubicacion/select-sede";
import { z } from "zod";

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

type FormAgregarReservaPantalla = RouterInputs["reservas"]["pantalla"]["agregarReservaPantalla"];

export const AgregarCursoPantallaForm = ({ onSubmit, onCancel }: Props) => {
  const agregarReservaPantalla = api.reservas.pantalla.agregarReservaPantalla.useMutation();

  const cursoBase: FormAgregarReservaPantalla = useMemo(() => {
    return {
      docente: "",
      materia: "",
      laboratorio: "",
      horaInicio: "",
      horaFin: "",
      sedeId: "",
    };
  }, []);

  const formHook = useForm<FormAgregarReservaPantalla>({
    mode: "onChange",
    defaultValues: cursoBase,
    resolver: zodResolver(
      inputAgregarReservaPantalla.superRefine(({ horaInicio, horaFin }, ctx) => {
        const date1 = new Date(horaInicio);
        const date2 = new Date(horaFin);

        if (date1 > date2) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_date,
            message: "La hora de inicio debe ser menor a la de fin",
            path: ["horaInicio"],
          });

          return z.NEVER;
        }
      }),
    ),
  });

  const { handleSubmit, control } = formHook;

  useEffect(() => formHook.reset(cursoBase), [formHook, cursoBase]);

  const onFormSubmit = (formData: FormAgregarReservaPantalla) => {
    agregarReservaPantalla.mutate(formData, {
      onSuccess: () => {
        toast.success("Curso agregado a pantalla con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al agregar curso a la pantalla.");
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
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full pr-4">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col space-y-4 px-0 md:px-6">
              <div className="flex w-full flex-col gap-x-4 md:flex-row">
                <div className="mt-4 w-full">
                  <FormInput label={"Docente"} control={control} name="docente" type={"text"} className="mt-2" />
                </div>
              </div>

              <div className="flex w-full flex-col gap-x-4 md:flex-row">
                <div className="mt-4 w-full">
                  <FormInput label={"Materia"} control={control} name="materia" type={"text"} className="mt-2" />
                </div>
              </div>

              <div className="flex w-full flex-col gap-x-4 md:flex-row">
                <div className="mt-4 w-full">
                  <SelectSedeForm
                    name="sedeId"
                    control={control}
                    className="mt-2 text-sm"
                    label={"Sede"}
                    placeholder={"Selecciona una sede"}
                  />
                </div>
                <div className="mt-4 w-full">
                  <FormInput
                    label={"Laboratorio"}
                    control={control}
                    name="laboratorio"
                    type={"text"}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-x-4 md:flex-row">
                <div className="mt-4 w-full">
                  <FormInput
                    label={"Hora de Inicio"}
                    control={control}
                    name="horaInicio"
                    type={"time"}
                    className="mt-2"
                  />
                </div>
                <div className="mt-4 w-full">
                  <FormInput label={"Hora de Fin"} control={control} name="horaFin" type={"time"} className="mt-2" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex w-full flex-row items-end justify-end space-x-4">
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
