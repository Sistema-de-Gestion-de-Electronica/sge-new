import { Dialog, DialogPanel } from "@headlessui/react";
import { Button } from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { ScrollArea, FormInput, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputEditarTutor } from "@/shared/filters/admin-usuarios-filter.schema";
import { type z } from "zod";
import { useEffect, useMemo } from "react";
import { type TutorType } from "../table/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  onEditSuccess?: () => void;
  tutor: TutorType;
};

type FormHelperType = {
  diasHorarios: { dia: string; horario: string }[];
};

type FormEditarTutorType = z.infer<typeof inputEditarTutor> & FormHelperType;

export const EditTutorModal = ({ isOpen, onClose, tutor }: Props) => {
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.usuarios.getAllTutores.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const editarTutor = api.admin.usuarios.editarTutor.useMutation();

  const tutorBase = useMemo(() => {
    if (!tutor) return {} as FormEditarTutorType;
    return {
      id: tutor.usuario.id,
      nombre: tutor.usuario.nombre ?? "",
      especialidad: tutor.especialidad ?? "",
      diasHorarios: tutor.diasHorarios || [],
    };
  }, [tutor]);

  const formHook = useForm<FormEditarTutorType>({
    mode: "onChange",
    defaultValues: tutorBase,
    resolver: zodResolver(inputEditarTutor),
  });

  const { handleSubmit, control } = formHook;

  useEffect(() => {
    if (tutorBase) {
      formHook.reset(tutorBase);
    }
  }, [formHook, tutorBase]);

  const onFormSubmit = (formData: FormEditarTutorType) => {
    editarTutor.mutate(formData, {
      onSuccess: () => {
        toast.success("Tutor actualizado con éxito.");
        refreshGetAll();
        onClose();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar el tutor");
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md rounded-lg bg-white p-6">
          <button onClick={onClose} className="absolute right-2 top-2 text-gray-500">
            &times;
          </button>
          <FormProvider {...formHook}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col gap-4">
              <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full pr-4">
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="flex flex-col space-y-4 px-0 md:px-6">
                    <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
                      <div className="mt-4 w-full">
                        <FormInput
                          readOnly
                          label={"Nombre"}
                          control={control}
                          name="nombre"
                          type={"text"}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
                      <div className="mt-4 w-full">
                        <FormInput
                          label={"Especialidad"}
                          control={control}
                          name="especialidad"
                          type={"text"}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="flex w-full flex-col lg:flex-col lg:justify-between lg:gap-x-4">
                      <div className="mt-4 w-full">
                        <FormInput
                          label={"Días y Horarios"}
                          control={control}
                          name="diasHorarios"
                          type={"text"}
                          className="mt-2"
                          placeholder="Ej: Lunes 10:00-12:00, Miércoles 14:00-16:00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="mt-6 flex w-full flex-row items-end justify-end space-x-4">
                <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={onClose}>
                  Cancelar
                </Button>
                <Button title="Guardar" type="submit" variant="default" color="primary">
                  Guardar
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
