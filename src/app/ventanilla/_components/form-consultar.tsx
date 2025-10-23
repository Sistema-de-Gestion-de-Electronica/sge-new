"use client";

import { z } from "zod";
import { api } from "@/trpc/react";
import { Controller, FieldError, FormProvider, useForm } from "react-hook-form";
import { Button, FormInput, toast, FormAutocomplete } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { inputConsulta } from "@/shared/filters/ventanilla-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { MultiSelectFormField } from "@/components/ui/multi-select";
import { FormTextarea } from "@/components/ui/textarea";

type FormConsultar = z.infer<typeof inputConsulta>;

export default function FormularioConsultar() {
  const consultaBase: FormConsultar = {
    nombre: "",
    apellido: "",
    email: "",
    legajo: "",
    consulta: "",
  };

  const formHook = useForm<FormConsultar>({
    mode: "onChange",
    defaultValues: consultaBase,
    resolver: zodResolver(inputConsulta),
  });

  const { handleSubmit, control, reset } = formHook;

  const consultarMutation = api.ventanilla.consultar.useMutation();

  const onFormSubmit = (formData: FormConsultar) => {
    console.log("Form Data:", formData);

    consultarMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Tu consulta ha sido enviada correctamente.");
        reset(consultaBase);
      },
      onError: (error) => {
        const errorMessage = "Hubo un problema al enviar tu consulta. Por favor, intenta nuevamente.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <FormProvider {...formHook}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="relative flex w-full flex-col gap-y-4 rounded-md border p-4"
      >
        <div className="flex w-full flex-col gap-y-4">
          <FormInput<FormConsultar> label="Nombre" name="nombre" control={control} required />
          <FormInput<FormConsultar> label="Apellido" name="apellido" control={control} required />
          <FormInput<FormConsultar> label="Email" name="email" control={control} type="email" required />
          <FormInput<FormConsultar>
            label="Legajo (Opcional)"
            name="legajo"
            control={control}
            type="text"
            placeholder="Solo números"
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <FormTextarea<FormConsultar> label="Consulta" name="consulta" control={control} required />
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="default" color="primary" className="w-full md:w-auto">
            Enviar Consulta
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
